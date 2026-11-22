// ==================== APPLICATION STATE ====================
// หมายเหตุ: ข้อมูลเพลงทั้งหมดถูกดึงมาจากไฟล์ tracks.js (ตัวแปร TRACKS)

let currentPage = 'home';
let currentMood = 'all';
let savedTrackIds = (() => {
  try {
    const v = JSON.parse(localStorage.getItem('ena_saved_tracks') || '[]');
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
})();
let currentTrack = null;
let recommendedTrackId = null;
let isPlaying = false;
let isLyricsOpen = false;
let isFocusMode = false;
let isFocusLyricsVisible = true;
let isCompactPlayer = false;
let activeLyricIndex = -1;

// Focus Auto-Hide UI State (ค่าเริ่มต้น 30 วินาที: 0 = ปิด, 30 = 30วิ, 60 = 1นาที)
let focusAutoHideSeconds = (() => {
  try {
    const saved = localStorage.getItem('ena_focus_autohide');
    if (saved !== null && ['0', '30', '60'].includes(saved)) return Number(saved);
  } catch (e) {}
  return 30;
})();
let focusIdleTimer = null;

// Crossfade State (ค่าเริ่มต้นเปิดใช้งาน 1.8 วินาที)
let isCrossfadeEnabled = (() => {
  try {
    const saved = localStorage.getItem('ena_crossfade');
    if (saved !== null) return saved === 'true';
  } catch (e) {}
  return true;
})();
const CROSSFADE_DURATION_SEC = 1.8;

// Sync Helper State (ตัวช่วยจับเวลาทำเนื้อเพลงซิงก์)
let isSyncHelperOpen = false;
let helperBlocks = [];
let helperTimestamps = [];

// Volume State (เริ่มต้นที่ 30%)
let currentVolume = 0.30;
try {
  const sv = parseFloat(localStorage.getItem('ena_volume'));
  if (!isNaN(sv) && sv >= 0 && sv <= 1) currentVolume = sv;
} catch (e) {}
let previousVolume = currentVolume > 0 ? currentVolume : 0.30;
let isMuted = currentVolume === 0;
let sleepFadeMultiplier = 1; // ตัวคูณสำหรับเฟดเสียงช่วง Sleep Timer (1 = ปกติ, 0 = เงียบสนิท)

// Resume Playback State (จำเพลงและเวลาล่าสุด)
const RESUME_STORAGE_KEY = 'ena_resume_state';
let lastResumeSaveAt = 0;

function parseDurationToSeconds(durStr) {
  if (!durStr || typeof durStr !== 'string') return 0;
  const parts = durStr.split(':').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

function getEffectiveDuration() {
  if (realAudioPlayer.duration && !isNaN(realAudioPlayer.duration) && isFinite(realAudioPlayer.duration)) {
    return realAudioPlayer.duration;
  }
  return currentTrack ? parseDurationToSeconds(currentTrack.duration) : 0;
}

// กรองเฉพาะเพลงที่มีข้อมูลจริง (ข้ามเพลงตัวอย่างที่ยังไม่ใส่ชื่อ)
function getValidTracks() {
  return TRACKS.filter(t => t.title && t.title !== "ชื่อเพลงภาษาไทยหรืออังกฤษ");
}

// สุ่มลำดับอาร์เรย์ (Fisher-Yates Shuffle)
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ==================== DUAL-DECK AUDIO & CROSSFADE ENGINE ====================
const deckA = new Audio();
const deckB = new Audio();
let realAudioPlayer = deckA;
let activeDeckFade = 1;      // ระดับการเฟดของเพลงหลักปัจจุบัน (0 -> 1)
let activeFadeInterval = null;
let outgoingFadeInterval = null;

let audioCtx = null;
let chordInterval = null;
let synthClockInterval = null;
let synthElapsedSeconds = 0;
let noiseNode = null;
let masterGain = null;

function getMasterTargetVolume() {
  const baseVol = isMuted ? 0 : currentVolume;
  return Math.max(0, Math.min(1, baseVol * sleepFadeMultiplier));
}

// จุดเดียวสำหรับตั้งความดังเสียง (ครอบคลุมทั้งเพลงจริง, Crossfade, โหมด Synth และ Sleep Timer Fade)
function applyMasterVolume() {
  const effectiveVol = getMasterTargetVolume();

  realAudioPlayer.volume = Math.max(0, Math.min(1, effectiveVol * activeDeckFade));

  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(effectiveVol * 0.32, audioCtx.currentTime, 0.04);
  }
}

function initAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = getMasterTargetVolume() * 0.32;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function clearAllCrossfadeTimers() {
  if (activeFadeInterval) {
    clearInterval(activeFadeInterval);
    activeFadeInterval = null;
  }
  if (outgoingFadeInterval) {
    clearInterval(outgoingFadeInterval);
    outgoingFadeInterval = null;
  }
}

function stopDeckImmediately(deck) {
  try {
    deck.pause();
  } catch (e) {}
}

function stopAmbientSound(preserveCrossfade = false) {
  if (!preserveCrossfade) {
    clearAllCrossfadeTimers();
    stopDeckImmediately(deckA);
    stopDeckImmediately(deckB);
    activeDeckFade = 1;
  } else {
    realAudioPlayer.pause();
  }

  if (chordInterval) {
    clearInterval(chordInterval);
    chordInterval = null;
  }
  if (synthClockInterval) {
    clearInterval(synthClockInterval);
    synthClockInterval = null;
  }
  if (noiseNode) {
    try {
      noiseNode.stop();
      noiseNode.disconnect();
    } catch (e) {}
    noiseNode = null;
  }
}

// ผูก Event ถาวรกับทั้ง 2 Deck (ไม่ใช้ .ontimeupdate / .onended ที่ถูกเขียนทับได้)
[deckA, deckB].forEach((deck) => {
  deck.addEventListener('timeupdate', () => {
    if (deck !== realAudioPlayer) return;
    const total = getEffectiveDuration();
    updateSeekUI(deck.currentTime, total);
    updateSyncedLyricsHighlight(deck.currentTime);
    if (isPlaying) {
      maybeSaveResumeState(deck.currentTime);
    }

    // เริ่ม Crossfade ล่วงหน้าอัตโนมัติเมื่อใกล้จบเพลง
    if (
      isCrossfadeEnabled &&
      isPlaying &&
      repeatMode !== 'one' &&
      sleepTimerMode !== 'end' &&
      !deck._autoCrossfadeTriggered &&
      deck.duration &&
      isFinite(deck.duration) &&
      deck.duration > CROSSFADE_DURATION_SEC + 2 &&
      deck.duration - deck.currentTime <= CROSSFADE_DURATION_SEC
    ) {
      deck._autoCrossfadeTriggered = true;
      nextTrack(true, true);
    }
  });

  deck.addEventListener('loadedmetadata', () => {
    if (deck !== realAudioPlayer) return;
    updateSeekUI(deck.currentTime, getEffectiveDuration());
  });

  deck.addEventListener('error', () => {
    if (deck !== realAudioPlayer || !currentTrack || !currentTrack.audioUrl) return;
    isPlaying = false;
    updatePlayPauseButtonUI();
    refreshPlayIcons();
    showToast('ไม่พบไฟล์เสียง: ' + currentTrack.audioUrl);
  });

  deck.addEventListener('ended', () => {
    if (deck !== realAudioPlayer) return;
    handleTrackEnded();
  });
});

function startAmbientSound(track, useCrossfade = false) {
  const isNewRealTrack = track.audioUrl && track.audioUrl.trim() !== "";
  const prevDeck = realAudioPlayer;
  const wasPrevPlaying = !prevDeck.paused && prevDeck.src && prevDeck.currentTime > 0;
  const shouldCrossfade = useCrossfade && isCrossfadeEnabled && isNewRealTrack && wasPrevPlaying;

  if (shouldCrossfade) {
    stopAmbientSound(true);
    clearAllCrossfadeTimers();

    const outgoingDeck = prevDeck;
    const incomingDeck = prevDeck === deckA ? deckB : deckA;
    realAudioPlayer = incomingDeck;
    incomingDeck._autoCrossfadeTriggered = false;

    const startOutgoingVol = outgoingDeck.volume;
    const steps = 30;
    const stepMs = (CROSSFADE_DURATION_SEC * 1000) / steps;
    let stepCount = 0;

    outgoingFadeInterval = setInterval(() => {
      stepCount++;
      const ratio = Math.max(0, 1 - stepCount / steps);
      outgoingDeck.volume = Math.max(0, Math.min(1, startOutgoingVol * ratio));
      if (stepCount >= steps) {
        clearInterval(outgoingFadeInterval);
        outgoingFadeInterval = null;
        stopDeckImmediately(outgoingDeck);
      }
    }, stepMs);

    activeDeckFade = 0.02;
    incomingDeck.src = track.audioUrl;
    incomingDeck.currentTime = 0;
    applyMasterVolume();

    incomingDeck.play().then(() => {
      let inStep = 0;
      activeFadeInterval = setInterval(() => {
        inStep++;
        activeDeckFade = Math.min(1, inStep / steps);
        applyMasterVolume();
        if (inStep >= steps) {
          clearInterval(activeFadeInterval);
          activeFadeInterval = null;
          activeDeckFade = 1;
          applyMasterVolume();
        }
      }, stepMs);
    }).catch(err => {
      activeDeckFade = 1;
      applyMasterVolume();
      if (err && err.name === 'AbortError') return;
      isPlaying = false;
      updatePlayerUI();
      refreshPlayIcons();
      showToast('เล่นเพลงไม่ได้ — ตรวจสอบไฟล์: ' + track.audioUrl);
    });
    return;
  }

  // กรณีเล่นปกติ / กด Play ต่อจาก Pause / โหมด Synth
  stopAmbientSound(false);
  activeDeckFade = 1;
  applyMasterVolume();

  if (isNewRealTrack) {
    realAudioPlayer._autoCrossfadeTriggered = false;
    if (!realAudioPlayer.src.endsWith(encodeURI(track.audioUrl))) {
      realAudioPlayer.src = track.audioUrl;
    }
    realAudioPlayer.play().catch(err => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้ กรุณาตรวจสอบที่อยู่ไฟล์:", err);
      if (err && err.name === 'AbortError') return;
      isPlaying = false;
      updatePlayerUI();
      refreshPlayIcons();
      showToast('เล่นเพลงไม่ได้ — ตรวจสอบไฟล์: ' + track.audioUrl);
    });
    return;
  }

  // โหมด Synth Ambient (กรณีไม่ได้ใส่ไฟล์เสียงจริง)
  initAudioContext();

  const bufferSize = audioCtx.sampleRate * 3;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = buffer;
  noiseNode.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = track.ambience === 'rain' ? 650 : track.ambience === 'waves' ? 380 : 260;

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.value = track.ambience === 'rain' ? 0.09 : 0.06;

  noiseNode.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noiseNode.start();

  let step = 0;
  const playChord = () => {
    if (!isPlaying || !audioCtx) return;
    const chord = track.chords[step % track.chords.length];
    const now = audioCtx.currentTime;

    chord.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      noteGain.gain.setValueAtTime(0.0001, now + idx * 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.09, now + idx * 0.08 + 0.6);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 3.8);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 4.0);
    });
    step++;
  };

  playChord();
  chordInterval = setInterval(playChord, 4000);

  const totalSec = parseDurationToSeconds(track.duration) || 180;
  synthClockInterval = setInterval(() => {
    if (!isPlaying) return;
    synthElapsedSeconds += 0.5;
    updateSeekUI(synthElapsedSeconds, totalSec);
    updateSyncedLyricsHighlight(synthElapsedSeconds);
    maybeSaveResumeState(synthElapsedSeconds);

    if (synthElapsedSeconds >= totalSec) {
      synthElapsedSeconds = 0;
      handleTrackEnded();
    }
  }, 500);
}

// ==================== CROSSFADE SETTINGS ====================
function toggleCrossfade() {
  isCrossfadeEnabled = !isCrossfadeEnabled;
  updateCrossfadeUI();
  try { localStorage.setItem('ena_crossfade', String(isCrossfadeEnabled)); } catch (e) {}
  showToast(isCrossfadeEnabled ? 'เปิด Crossfade เปลี่ยนเพลงนุ่มนวลแล้ว' : 'ปิด Crossfade (เปลี่ยนเพลงทันที)');
}

function updateCrossfadeUI() {
  const btn = document.getElementById('btn-crossfade-toggle');
  if (!btn) return;
  btn.textContent = isCrossfadeEnabled ? 'ON' : 'OFF';
  btn.setAttribute('aria-pressed', String(isCrossfadeEnabled));
  btn.classList.toggle('border-[var(--accent)]', isCrossfadeEnabled);
  btn.classList.toggle('xo-bg-accent-15', isCrossfadeEnabled);
  btn.classList.toggle('text-[var(--accent)]', isCrossfadeEnabled);
  btn.classList.toggle('border-[var(--border-subtle)]', !isCrossfadeEnabled);
  btn.classList.toggle('text-[var(--text-secondary)]', !isCrossfadeEnabled);
}

// ==================== VOLUME CONTROLS ====================
function changeVolume(val) {
  const numeric = Math.max(0, Math.min(100, Number(val)));
  currentVolume = numeric / 100;
  isMuted = numeric === 0;

  if (!isMuted) {
    previousVolume = currentVolume;
  }

  applyMasterVolume();
  updateVolumeUI(numeric);
  try { localStorage.setItem('ena_volume', String(currentVolume)); } catch (e) {}
}

function adjustVolumeBy(deltaPercent) {
  const currentPercent = isMuted ? 0 : Math.round(currentVolume * 100);
  const nextPercent = Math.max(0, Math.min(100, currentPercent + deltaPercent));
  const slider = document.getElementById('volume-slider');
  if (slider) slider.value = nextPercent;
  changeVolume(nextPercent);
  showToast(`ระดับเสียง ${nextPercent}%`);
}

function toggleMute() {
  const slider = document.getElementById('volume-slider');
  if (isMuted || currentVolume === 0) {
    isMuted = false;
    currentVolume = previousVolume > 0 ? previousVolume : 0.30;
    if (slider) slider.value = Math.round(currentVolume * 100);
  } else {
    previousVolume = currentVolume;
    isMuted = true;
    currentVolume = 0;
    if (slider) slider.value = 0;
  }

  applyMasterVolume();
  const percent = isMuted ? 0 : Math.round(currentVolume * 100);
  updateVolumeUI(percent);
  showToast(isMuted ? 'ปิดเสียงแล้ว (Mute)' : `เปิดเสียง (${percent}%)`);
}

function updateVolumeUI(percent) {
  const slider = document.getElementById('volume-slider');
  const iconOn = document.getElementById('icon-vol-on');
  const iconMute = document.getElementById('icon-vol-mute');

  const fSlider = document.getElementById('focus-volume-slider');
  const fIconOn = document.getElementById('focus-icon-vol-on');
  const fIconMute = document.getElementById('focus-icon-vol-mute');

  const bgStyle = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, rgba(168, 182, 204, 0.25) ${percent}%, rgba(168, 182, 204, 0.25) 100%)`;

  if (slider) {
    slider.value = percent;
    slider.style.background = bgStyle;
  }
  if (fSlider) {
    fSlider.value = percent;
    fSlider.style.background = bgStyle;
  }

  [[iconOn, iconMute], [fIconOn, fIconMute]].forEach(([onEl, muteEl]) => {
    if (!onEl || !muteEl) return;
    if (percent === 0) {
      onEl.classList.add('hidden');
      muteEl.classList.remove('hidden');
    } else {
      onEl.classList.remove('hidden');
      muteEl.classList.add('hidden');
    }
  });
}

// ==================== AMBIENT SOUND MIXER (RAIN / WAVES / VINYL) ====================
const AMBIENT_LAYERS = {
  rain: { active: false, volume: 0, lastVolume: 0.45, node: null, gain: null },
  waves: { active: false, volume: 0, lastVolume: 0.45, node: null, gain: null, lfo: null },
  vinyl: { active: false, volume: 0, lastVolume: 0.40, node: null, gain: null }
};

function createAmbientLayerNodes(type) {
  initAudioContext();
  const layer = AMBIENT_LAYERS[type];
  if (layer.node) return;

  const sampleRate = audioCtx.sampleRate;
  const bufferSeconds = 4;
  const bufferSize = sampleRate * bufferSeconds;
  const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);

  if (type === 'rain') {
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.0990460;
      b1 = 0.96300 * b1 + white * 0.2965164;
      b2 = 0.57000 * b2 + white * 1.0526913;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.12;
    }
  } else if (type === 'waves') {
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + (0.02 * white)) / 1.02;
      data[i] = lastOut * 2.2;
    }
  } else if (type === 'vinyl') {
    for (let i = 0; i < bufferSize; i++) {
      const hiss = (Math.random() * 2 - 1) * 0.018;
      const pop = Math.random() > 0.9982 ? (Math.random() * 2 - 1) * 0.55 : 0;
      data[i] = hiss + pop;
    }
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = audioCtx.createBiquadFilter();
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;

  if (type === 'rain') {
    filter.type = 'bandpass';
    filter.frequency.value = 950;
    filter.Q.value = 0.6;
    source.connect(filter);
    filter.connect(gainNode);
  } else if (type === 'waves') {
    filter.type = 'lowpass';
    filter.frequency.value = 340;
    const waveMod = audioCtx.createGain();
    waveMod.gain.value = 0.65;
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.11;
    lfoGain.gain.value = 0.35;
    lfo.connect(lfoGain);
    lfoGain.connect(waveMod.gain);
    lfo.start();
    layer.lfo = lfo;

    source.connect(filter);
    filter.connect(waveMod);
    waveMod.connect(gainNode);
  } else if (type === 'vinyl') {
    filter.type = 'highpass';
    filter.frequency.value = 1100;
    source.connect(filter);
    filter.connect(gainNode);
  }

  gainNode.connect(audioCtx.destination);
  source.start();

  layer.node = source;
  layer.gain = gainNode;
}

function destroyAmbientLayerNodes(type) {
  const layer = AMBIENT_LAYERS[type];
  if (layer.lfo) {
    try { layer.lfo.stop(); layer.lfo.disconnect(); } catch (e) {}
    layer.lfo = null;
  }
  if (layer.node) {
    try { layer.node.stop(); layer.node.disconnect(); } catch (e) {}
    layer.node = null;
  }
  layer.gain = null;
}

function setAmbientLayerVolume(type, percentVal) {
  const layer = AMBIENT_LAYERS[type];
  if (!layer) return;
  const pct = Math.max(0, Math.min(100, Number(percentVal)));
  const vol = pct / 100;

  layer.volume = vol;
  layer.active = pct > 0;
  if (pct > 0) {
    layer.lastVolume = vol;
    createAmbientLayerNodes(type);
    const maxScale = type === 'vinyl' ? 0.35 : 0.42;
    layer.gain.gain.setTargetAtTime(vol * maxScale, audioCtx.currentTime, 0.06);
  } else {
    destroyAmbientLayerNodes(type);
  }

  updateAmbientMixerUI();
}

function toggleAmbientLayer(type) {
  const layer = AMBIENT_LAYERS[type];
  if (!layer) return;
  if (layer.active && layer.volume > 0) {
    setAmbientLayerVolume(type, 0);
  } else {
    const targetPct = Math.round((layer.lastVolume || 0.45) * 100);
    setAmbientLayerVolume(type, targetPct);
  }
}

function stopAllAmbientMixer() {
  Object.keys(AMBIENT_LAYERS).forEach(type => setAmbientLayerVolume(type, 0));
  showToast('ปิดเสียงบรรยากาศทั้งหมดแล้ว');
}

function updateAmbientMixerUI() {
  const activeNames = [];
  const labels = { rain: 'RAIN', waves: 'WAVES', vinyl: 'VINYL' };

  Object.keys(AMBIENT_LAYERS).forEach(type => {
    const layer = AMBIENT_LAYERS[type];
    const pct = Math.round(layer.volume * 100);
    const slider = document.getElementById(`amb-slider-${type}`);
    const valEl = document.getElementById(`amb-val-${type}`);
    const dotEl = document.getElementById(`amb-dot-${type}`);
    const btnEl = document.getElementById(`amb-btn-${type}`);

    if (slider) {
      slider.value = pct;
      slider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, rgba(168, 182, 204, 0.25) ${pct}%, rgba(168, 182, 204, 0.25) 100%)`;
    }
    if (valEl) valEl.textContent = `${pct}%`;
    if (dotEl) {
      dotEl.classList.toggle('bg-[var(--accent)]', layer.active);
      dotEl.classList.toggle('bg-[var(--text-secondary)]/40', !layer.active);
    }
    if (btnEl) btnEl.setAttribute('aria-pressed', String(layer.active));

    if (layer.active) activeNames.push(labels[type]);
  });

  const dotHeader = document.getElementById('sleep-timer-dot');
  if (dotHeader) {
    const hasSleep = typeof sleepTimerMode !== 'undefined' && sleepTimerMode !== 'off';
    dotHeader.classList.toggle('hidden', !hasSleep && activeNames.length === 0);
  }

  const focusStatus = document.getElementById('focus-ambient-status');
  if (focusStatus) {
    focusStatus.textContent = activeNames.length > 0
      ? `AMBIENT MIXER · ${activeNames.join(' + ')}`
      : 'AMBIENT MIXER · OFF';
  }
}

// ==================== RESUME PLAYBACK (เล่นต่อจากที่ค้างไว้) ====================
function saveResumeStateNow(customTime) {
  if (!currentTrack) return;
  const isReal = currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
  const time = typeof customTime === 'number'
    ? customTime
    : (isReal ? realAudioPlayer.currentTime : synthElapsedSeconds);

  try {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify({
      id: currentTrack.id,
      time: Math.max(0, Number(time.toFixed(2)))
    }));
    lastResumeSaveAt = Date.now();
  } catch (e) {}
}

function maybeSaveResumeState(time) {
  if (Date.now() - lastResumeSaveAt >= 2000) {
    saveResumeStateNow(time);
  }
}

function clearResumeState() {
  try { localStorage.removeItem(RESUME_STORAGE_KEY); } catch (e) {}
}

function restoreResumeState() {
  try {
    const raw = localStorage.getItem(RESUME_STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved.id !== 'number') return;

    const track = getValidTracks().find(t => t.id === saved.id);
    if (!track) {
      clearResumeState();
      return;
    }

    const savedTime = Math.max(0, Number(saved.time) || 0);
    currentTrack = track;
    isPlaying = false;

    const isReal = track.audioUrl && track.audioUrl.trim() !== "";
    if (isReal) {
      realAudioPlayer.src = track.audioUrl;
      realAudioPlayer.preload = 'metadata';
      const applySavedTime = () => {
        const dur = getEffectiveDuration();
        const clamped = dur > 0 ? Math.min(savedTime, Math.max(0, dur - 0.5)) : savedTime;
        realAudioPlayer.currentTime = clamped;
        updateSeekUI(clamped, dur || parseDurationToSeconds(track.duration));
        updateSyncedLyricsHighlight(clamped);
      };
      if (realAudioPlayer.readyState >= 1) {
        applySavedTime();
      } else {
        realAudioPlayer.addEventListener('loadedmetadata', applySavedTime, { once: true });
      }
    } else {
      synthElapsedSeconds = savedTime;
    }

    updatePlayerUI();
    updateSeekUI(savedTime, parseDurationToSeconds(track.duration));
    updateSyncedLyricsHighlight(savedTime);
    refreshPlayIcons();
    updateMediaSession();
  } catch (e) {}
}

window.addEventListener('beforeunload', () => {
  if (currentTrack) saveResumeStateNow();
});

// ==================== SEEK / PROGRESS BAR & SYNCED LYRICS ====================
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateSeekUI(currentSec, totalSec) {
  const slider = document.getElementById('seek-slider');
  const curEl = document.getElementById('current-time');
  const totEl = document.getElementById('total-duration');
  if (!slider || !curEl || !totEl) return;

  const safeTotal = totalSec > 0 ? totalSec : 0;
  const safeCur = Math.max(0, Math.min(currentSec || 0, safeTotal || currentSec || 0));
  const percent = safeTotal > 0 ? (safeCur / safeTotal) * 100 : 0;

  slider.value = percent;
  slider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, rgba(168, 182, 204, 0.2) ${percent}%, rgba(168, 182, 204, 0.2) 100%)`;
  curEl.textContent = formatTime(safeCur);
  if (safeTotal > 0) {
    totEl.textContent = formatTime(safeTotal);
  }

  const fSlider = document.getElementById('focus-seek-slider');
  const fCur = document.getElementById('focus-current-time');
  const fTot = document.getElementById('focus-total-duration');
  if (fSlider && fCur && fTot) {
    fSlider.value = percent;
    fSlider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, rgba(168, 182, 204, 0.2) ${percent}%, rgba(168, 182, 204, 0.2) 100%)`;
    fCur.textContent = formatTime(safeCur);
    if (safeTotal > 0) fTot.textContent = formatTime(safeTotal);
  }
}

function seekTrack(percent) {
  if (!currentTrack) return;
  const numericPercent = Math.max(0, Math.min(100, Number(percent)));
  const totalSec = getEffectiveDuration();

  if (totalSec > 0) {
    const nextSec = (numericPercent / 100) * totalSec;
    const isReal = currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
    if (isReal) {
      realAudioPlayer.currentTime = nextSec;
    } else {
      synthElapsedSeconds = nextSec;
    }
    updateSeekUI(nextSec, totalSec);
    updateSyncedLyricsHighlight(nextSec);
    saveResumeStateNow(nextSec);
  }
}

function seekToSeconds(seconds) {
  if (!currentTrack) return;
  const totalSec = getEffectiveDuration();
  if (totalSec <= 0) return;

  const clamped = Math.max(0, Math.min(seconds, totalSec));
  const isReal = currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
  if (isReal) {
    realAudioPlayer.currentTime = clamped;
  } else {
    synthElapsedSeconds = clamped;
  }
  updateSeekUI(clamped, totalSec);
  updateSyncedLyricsHighlight(clamped);
  saveResumeStateNow(clamped);

  if (!isPlaying) {
    togglePlayPause();
  }
}

function renderLyricsContent(track) {
  const container = document.getElementById('lyrics-display');
  activeLyricIndex = -1;

  if (Array.isArray(track.syncedLyrics) && track.syncedLyrics.length > 0) {
    container.classList.remove('whitespace-pre-line');
    container.innerHTML = `<div class="space-y-2">` + track.syncedLyrics.map((item, idx) => `
      <div 
        id="lyric-line-${idx}" 
        role="button"
        tabindex="0"
        onclick="seekToSeconds(${item.time})"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();seekToSeconds(${item.time});}"
        title="คลิกเพื่อเล่นท่อนนี้ (${formatTime(item.time)})"
        class="lyric-line whitespace-pre-line">
        ${item.text}
      </div>
    `).join('') + `</div>`;
  } else {
    container.classList.add('whitespace-pre-line');
    container.textContent = track.lyrics || "";
  }
}

function updateSyncedLyricsHighlight(currentTime) {
  if (!currentTrack || !Array.isArray(currentTrack.syncedLyrics) || currentTrack.syncedLyrics.length === 0) {
    return;
  }

  const lines = currentTrack.syncedLyrics;
  let foundIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (currentTime >= lines[i].time) {
      foundIndex = i;
    } else {
      break;
    }
  }

  if (foundIndex !== activeLyricIndex) {
    activeLyricIndex = foundIndex;

    lines.forEach((_, idx) => {
      const el = document.getElementById(`lyric-line-${idx}`);
      if (el) {
        if (idx === activeLyricIndex) {
          el.classList.add('active');
          if (isLyricsOpen) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          el.classList.remove('active');
        }
      }

      const fEl = document.getElementById(`focus-lyric-line-${idx}`);
      if (fEl) {
        if (idx === activeLyricIndex) {
          fEl.classList.add('active');
          if (isFocusMode && isFocusLyricsVisible) {
            fEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          fEl.classList.remove('active');
        }
      }
    });
  }
}

// ==================== SYNC HELPER (เครื่องมือช่วยจับเวลาเนื้อเพลง) ====================
function toggleSyncHelper() {
  isSyncHelperOpen = !isSyncHelperOpen;
  const panel = document.getElementById('sync-helper-panel');
  const btn = document.getElementById('btn-sync-helper-toggle');

  panel.classList.toggle('hidden', !isSyncHelperOpen);
  btn.classList.toggle('lyrics-btn-active', isSyncHelperOpen);

  if (isSyncHelperOpen && currentTrack) {
    resetSyncHelper();
  }
}

function resetSyncHelper() {
  if (!currentTrack) return;
  const raw = (currentTrack.lyrics || "").replace(/-{5,}/g, '\n\n');
  helperBlocks = raw
    .split(/\n\s*\n/)
    .map(b => b.trim())
    .filter(b => b.length > 0 && !b.startsWith('สรุปความหมายเพลง'));

  helperTimestamps = [];
  updateSyncHelperUI();
}

function markNextLyricTimestamp() {
  if (!currentTrack || helperTimestamps.length >= helperBlocks.length) return;
  const isReal = currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
  const rawTime = isReal ? realAudioPlayer.currentTime : synthElapsedSeconds;
  const time = Number(rawTime.toFixed(1));
  helperTimestamps.push({
    time,
    text: helperBlocks[helperTimestamps.length]
  });
  updateSyncHelperUI();
}

function updateSyncHelperUI() {
  const progress = document.getElementById('sync-helper-progress');
  if (progress) {
    progress.textContent = `${helperTimestamps.length} / ${helperBlocks.length} ท่อน`;
  }

  const container = document.getElementById('lyrics-display');
  if (!isSyncHelperOpen) return;

  container.classList.remove('whitespace-pre-line');
  container.innerHTML = `<div class="space-y-2">` + helperBlocks.map((block, idx) => {
    const marked = helperTimestamps[idx];
    const isNext = idx === helperTimestamps.length;
    return `
      <div class="p-3 rounded-xl border ${isNext ? 'border-[var(--accent)] xo-bg-accent-10' : 'border-[var(--border-subtle)] opacity-70'} whitespace-pre-line">
        <div class="text-[11px] font-en text-[var(--accent)] mb-1">
          ${marked ? `✓ บันทึกเวลาแล้ว: ${marked.time}s` : isNext ? '👉 กดมาร์กเมื่อถึงท่อนนี้' : `ท่อนที่ ${idx + 1}`}
        </div>
        <div>${block}</div>
      </div>
    `;
  }).join('') + `</div>`;
}

function copySyncedLyricsCode() {
  if (helperTimestamps.length === 0) {
    alert("ยังไม่ได้มาร์กเวลาเลยครับ กดเล่นเพลงแล้วกดปุ่ม '+ มาร์กเวลาท่อนถัดไป' ตามจังหวะได้เลย");
    return;
  }

  const formatted = "syncedLyrics: [\n" + helperTimestamps.map(item => {
    const escaped = item.text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return `  { time: ${item.time}, text: \`${escaped}\` }`;
  }).join(",\n") + "\n],";

  navigator.clipboard.writeText(formatted).then(() => {
    alert(`คัดลอกโค้ด syncedLyrics จำนวน ${helperTimestamps.length} ท่อนเรียบร้อย!\nนำไปวางในเพลง "${currentTrack.title}" ในไฟล์ tracks.js ได้เลยครับ`);
  }).catch(() => {
    window.prompt('คัดลอกอัตโนมัติไม่ได้ กด Ctrl+C เพื่อคัดลอกโค้ดนี้:', formatted);
  });
}

// ==================== DRAGGABLE & RESIZABLE MINI-PLAYER ====================
function initDraggableAndResizablePlayer() {
  const player = document.getElementById('mini-player');
  const dragBar = document.getElementById('player-drag-bar');
  const resizeHandle = document.getElementById('player-resize-handle');

  let isDragging = false;
  let isResizing = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;
  let initialWidth = 0;

  function lockFreePosition() {
    const rect = player.getBoundingClientRect();
    player.style.left = `${rect.left}px`;
    player.style.top = `${rect.top}px`;
    player.style.bottom = 'auto';
    player.style.transform = 'none';
    player.style.width = `${rect.width}px`;
    player.style.maxWidth = 'none';
  }

  function updateNarrowLayout(width) {
    if (width < 460) {
      player.classList.add('is-narrow');
    } else {
      player.classList.remove('is-narrow');
    }
  }

  function onDragStart(e) {
    if (e.target.closest('button')) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    lockFreePosition();
    const rect = player.getBoundingClientRect();

    isDragging = true;
    startX = clientX;
    startY = clientY;
    initialLeft = rect.left;
    initialTop = rect.top;

    player.style.borderColor = 'var(--accent)';
  }

  function onResizeStart(e) {
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lockFreePosition();
    const rect = player.getBoundingClientRect();

    isResizing = true;
    startX = clientX;
    initialWidth = rect.width;
    initialLeft = rect.left;

    player.style.borderColor = 'var(--accent)';
  }

  function onPointerMove(e) {
    if (!isDragging && !isResizing) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (isDragging) {
      const dx = clientX - startX;
      const dy = clientY - startY;
      const rect = player.getBoundingClientRect();

      const maxLeft = window.innerWidth - rect.width - 8;
      const maxTop = window.innerHeight - rect.height - 8;

      const nextLeft = Math.max(8, Math.min(initialLeft + dx, maxLeft));
      const nextTop = Math.max(8, Math.min(initialTop + dy, maxTop));

      player.style.left = `${nextLeft}px`;
      player.style.top = `${nextTop}px`;
    }

    if (isResizing) {
      const dx = clientX - startX;
      const maxAllowedWidth = Math.min(1040, window.innerWidth - initialLeft - 12);
      const nextWidth = Math.max(300, Math.min(initialWidth + dx, maxAllowedWidth));

      player.style.width = `${nextWidth}px`;
      updateNarrowLayout(nextWidth);
    }
  }

  function onPointerEnd() {
    if (isDragging || isResizing) {
      isDragging = false;
      isResizing = false;
      player.style.borderColor = '';
    }
  }

  window.addEventListener('resize', () => {
    if (player.style.transform !== 'none') return;
    const rect = player.getBoundingClientRect();
    const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
    const maxTop = Math.max(8, window.innerHeight - rect.height - 8);
    player.style.left = `${Math.max(8, Math.min(rect.left, maxLeft))}px`;
    player.style.top = `${Math.max(8, Math.min(rect.top, maxTop))}px`;
  });

  dragBar.addEventListener('mousedown', onDragStart);
  dragBar.addEventListener('touchstart', onDragStart, { passive: true });

  resizeHandle.addEventListener('mousedown', onResizeStart);
  resizeHandle.addEventListener('touchstart', onResizeStart, { passive: true });

  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: true });

  window.addEventListener('mouseup', onPointerEnd);
  window.addEventListener('touchend', onPointerEnd);
}

function toggleCompactPlayer() {
  const player = document.getElementById('mini-player');
  const iconMin = document.getElementById('icon-minimize');
  const iconMax = document.getElementById('icon-maximize');

  isCompactPlayer = !isCompactPlayer;
  player.classList.toggle('is-compact', isCompactPlayer);

  iconMin.classList.toggle('hidden', isCompactPlayer);
  iconMax.classList.toggle('hidden', !isCompactPlayer);

  const rect = player.getBoundingClientRect();
  if (rect.bottom > window.innerHeight - 8 && player.style.top && player.style.top !== 'auto') {
    const adjustedTop = Math.max(8, window.innerHeight - rect.height - 12);
    player.style.top = `${adjustedTop}px`;
  }
}

function resetPlayerPosition() {
  const player = document.getElementById('mini-player');
  isCompactPlayer = false;

  player.classList.remove('is-compact', 'is-narrow');
  document.getElementById('icon-minimize').classList.remove('hidden');
  document.getElementById('icon-maximize').classList.add('hidden');

  player.style.left = '50%';
  player.style.top = 'auto';
  player.style.bottom = '20px';
  player.style.transform = 'translateX(-50%)';
  player.style.width = '94%';
  player.style.maxWidth = '740px';
}

// ==================== RIGHT-HAND LYRICS DRAWER ====================
function toggleLyricsPanel(forceState) {
  const drawer = document.getElementById('lyrics-right-drawer');
  const btn = document.getElementById('btn-lyrics-toggle');

  if (typeof forceState === 'boolean') {
    isLyricsOpen = forceState;
  } else {
    isLyricsOpen = !isLyricsOpen;
  }

  if (isLyricsOpen) {
    drawer.classList.remove('translate-x-full');
    btn.classList.add('lyrics-btn-active');
    if (currentTrack && !isSyncHelperOpen) {
      const isReal = currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
      updateSyncedLyricsHighlight(isReal ? realAudioPlayer.currentTime : synthElapsedSeconds);
    }
  } else {
    drawer.classList.add('translate-x-full');
    btn.classList.remove('lyrics-btn-active');
  }
}

// ==================== FOCUS / AMBIENT SCREEN MODE & AUTO-HIDE UI ====================
function setFocusAutoHideDelay(seconds) {
  const num = Number(seconds);
  focusAutoHideSeconds = [0, 30, 60].includes(num) ? num : 30;
  try { localStorage.setItem('ena_focus_autohide', String(focusAutoHideSeconds)); } catch (e) {}
  updateFocusAutoHideUI();
  resetFocusIdleTimer();

  const label = focusAutoHideSeconds === 0 ? 'ปิดการซ่อนอัตโนมัติ' : `ซ่อนปุ่มเมื่อนิ่ง ${focusAutoHideSeconds} วินาที`;
  showToast(label);
}

function updateFocusAutoHideUI() {
  const labelEl = document.getElementById('focus-autohide-label');
  if (labelEl) {
    labelEl.textContent = focusAutoHideSeconds === 0
      ? 'ปิดอยู่'
      : focusAutoHideSeconds === 60
        ? '1 นาที'
        : `${focusAutoHideSeconds} วินาที`;
  }

  document.querySelectorAll('.autohide-opt-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.autohide === String(focusAutoHideSeconds));
  });
}

function resetFocusIdleTimer() {
  const overlay = document.getElementById('focus-screen-overlay');
  if (!overlay) return;

  overlay.classList.remove('focus-ui-idle');
  if (focusIdleTimer) {
    clearTimeout(focusIdleTimer);
    focusIdleTimer = null;
  }

  if (!isFocusMode || focusAutoHideSeconds <= 0) return;

  const settingsModal = document.getElementById('settings-dropdown');
  if (settingsModal && !settingsModal.classList.contains('hidden')) return;

  focusIdleTimer = setTimeout(() => {
    if (isFocusMode && focusAutoHideSeconds > 0) {
      const modal = document.getElementById('settings-dropdown');
      if (modal && !modal.classList.contains('hidden')) return;
      overlay.classList.add('focus-ui-idle');
    }
  }, focusAutoHideSeconds * 1000);
}

function initFocusAutoHideListeners() {
  const overlay = document.getElementById('focus-screen-overlay');
  if (!overlay) return;

  ['mousemove', 'mousedown', 'touchstart', 'wheel'].forEach(ev => {
    overlay.addEventListener(ev, () => {
      if (isFocusMode) resetFocusIdleTimer();
    }, { passive: true });
  });
}

function toggleFocusMode(forceState) {
  const overlay = document.getElementById('focus-screen-overlay');
  const btn = document.getElementById('btn-focus-toggle');
  if (!overlay) return;

  const nextState = typeof forceState === 'boolean' ? forceState : !isFocusMode;
  if (nextState && !currentTrack) {
    showToast('กรุณาเปิดเพลงก่อนเข้าโหมดจดจ่อเต็มจอ');
    return;
  }

  isFocusMode = nextState;
  overlay.classList.toggle('hidden', !isFocusMode);
  document.body.classList.toggle('focus-mode-active', isFocusMode);
  if (btn) btn.classList.toggle('lyrics-btn-active', isFocusMode);

  if (isFocusMode) {
    toggleLyricsPanel(false);
    syncFocusScreenUI();
    resetFocusIdleTimer();
    const isReal = currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
    updateSyncedLyricsHighlight(isReal ? realAudioPlayer.currentTime : synthElapsedSeconds);
  } else {
    overlay.classList.remove('focus-ui-idle');
    if (focusIdleTimer) {
      clearTimeout(focusIdleTimer);
      focusIdleTimer = null;
    }
  }
}

function toggleFocusLyrics(forceState) {
  isFocusLyricsVisible = typeof forceState === 'boolean' ? forceState : !isFocusLyricsVisible;
  const lyricsCol = document.getElementById('focus-lyrics-col');
  const leftCol = document.getElementById('focus-left-col');
  const btn = document.getElementById('focus-btn-lyrics-toggle');

  if (lyricsCol && leftCol) {
    lyricsCol.classList.toggle('hidden', !isFocusLyricsVisible);
    if (isFocusLyricsVisible) {
      leftCol.className = 'lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 transition-all duration-300';
    } else {
      leftCol.className = 'lg:col-span-12 flex flex-col items-center text-center space-y-5 transition-all duration-300';
    }
  }

  if (btn) {
    btn.classList.toggle('lyrics-btn-active', isFocusLyricsVisible);
    btn.setAttribute('aria-pressed', String(isFocusLyricsVisible));
  }
}

function syncFocusScreenUI() {
  if (!currentTrack) return;
  const art = document.getElementById('focus-artwork');
  const jpFallback = document.getElementById('focus-jp-fallback');
  const moodBadge = document.getElementById('focus-mood-badge');
  const titleEl = document.getElementById('focus-title');
  const artistEl = document.getElementById('focus-artist');

  if (art) {
    if (currentTrack.coverUrl && currentTrack.coverUrl.trim() !== "") {
      art.style.backgroundImage = `url('${currentTrack.coverUrl}')`;
      art.style.backgroundSize = 'cover';
      art.style.backgroundPosition = 'center';
      if (jpFallback) jpFallback.classList.add('hidden');
    } else {
      art.style.backgroundImage = '';
      if (jpFallback) {
        jpFallback.textContent = currentTrack.jpTitle || '静かな夜';
        jpFallback.classList.remove('hidden');
      }
    }
  }

  if (moodBadge) moodBadge.textContent = currentTrack.mood || currentTrack.category || 'MIDNIGHT';
  if (titleEl) titleEl.textContent = currentTrack.title;
  if (artistEl) artistEl.textContent = `${currentTrack.artist} · ${currentTrack.jpTitle}`;

  const fPlay = document.getElementById('focus-icon-play');
  const fPause = document.getElementById('focus-icon-pause');
  if (fPlay && fPause) {
    fPlay.classList.toggle('hidden', isPlaying);
    fPause.classList.toggle('hidden', !isPlaying);
  }

  const focusLyrics = document.getElementById('focus-lyrics-display');
  if (focusLyrics) {
    if (Array.isArray(currentTrack.syncedLyrics) && currentTrack.syncedLyrics.length > 0) {
      focusLyrics.classList.remove('whitespace-pre-line');
      focusLyrics.innerHTML = `<div class="space-y-2.5">` + currentTrack.syncedLyrics.map((item, idx) => `
        <div 
          id="focus-lyric-line-${idx}" 
          role="button"
          tabindex="0"
          onclick="seekToSeconds(${item.time})"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();seekToSeconds(${item.time});}"
          class="lyric-line whitespace-pre-line">
          ${item.text}
        </div>
      `).join('') + `</div>`;
    } else {
      focusLyrics.classList.add('whitespace-pre-line');
      focusLyrics.textContent = currentTrack.lyrics || "";
    }
  }

  updateQueueButtons();
  updateVolumeUI(isMuted ? 0 : Math.round(currentVolume * 100));
}

// ==================== CARD RENDERING & ACCESSIBILITY ====================
function handleCardKeydown(event, callback) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
}

function createTrackCardHTML(track, indexLabel) {
  const isSaved = savedTrackIds.includes(track.id);
  const isCurrentPlaying = currentTrack && currentTrack.id === track.id && isPlaying;
  const hasCover = track.coverUrl && track.coverUrl.trim() !== "";
  const saveLabel = isSaved ? `นำ ${track.title} ออกจากเพลงที่เก็บไว้` : `เก็บเพลง ${track.title} ไว้ฟัง`;

  return `
    <article class="editorial-card rounded-2xl overflow-hidden flex flex-col justify-between group">
      <div 
        role="button"
        tabindex="0"
        aria-label="เล่นเพลง ${track.title} โดย ${track.artist}"
        onclick="playTrackById(${track.id})" 
        onkeydown="handleCardKeydown(event, () => playTrackById(${track.id}))"
        class="card-artwork-box relative h-56 p-5 flex flex-col justify-between cursor-pointer overflow-hidden">
        
        ${hasCover ? `
          <img src="${track.coverUrl}" alt="${track.title}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0B1220]/85 via-[#0B1220]/25 to-[#0B1220]/45"></div>
        ` : `
          <div class="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity duration-500">
            <div class="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border border-[#6FA8E8]/40"></div>
            <div class="absolute right-6 top-6 font-jp text-xs text-[#F4F7FC]/50 tracking-widest">${track.jpTitle}</div>
          </div>
        `}

        <div class="relative z-10 flex items-center justify-between">
          <span class="text-[11px] font-en tracking-[0.16em] text-[#F4F7FC]/90 font-medium drop-shadow-sm">
            ${indexLabel || track.number}
          </span>

          <button 
            type="button"
            data-save-btn="${track.id}"
            aria-label="${saveLabel}"
            aria-pressed="${isSaved}"
            onclick="event.stopPropagation(); toggleSaveTrack(${track.id})" 
            onkeydown="event.stopPropagation()"
            title="${saveLabel}"
            class="w-8 h-8 rounded-full bg-[#0B1220]/45 hover:bg-[#0B1220]/75 backdrop-blur-sm flex items-center justify-center text-[#F4F7FC] transition-colors cursor-pointer">
            <svg data-save-icon="${track.id}" class="w-3.5 h-3.5 ${isSaved ? 'fill-[#6FA8E8] text-[#6FA8E8]' : 'fill-none text-[#F4F7FC]/85'}" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <div class="relative z-10 flex items-center justify-between mt-auto">
          <span class="text-[11px] font-en text-[#F4F7FC]/85 drop-shadow-sm">${track.duration}</span>
          <div data-play-icon="${track.id}" class="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-[#F4F7FC] group-hover:scale-105 group-hover:bg-[#6FA8E8] group-hover:text-[#0B1220] transition-all">
            ${isCurrentPlaying 
              ? `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
              : `<svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`
            }
          </div>
        </div>
      </div>

      <div 
        role="button"
        tabindex="0"
        aria-label="เล่นเพลง ${track.title} โดย ${track.artist}"
        onclick="playTrackById(${track.id})" 
        onkeydown="handleCardKeydown(event, () => playTrackById(${track.id}))"
        class="p-6 flex-1 flex flex-col justify-between space-y-4 cursor-pointer">
        <div class="space-y-1.5">
          <p class="text-[10px] font-en tracking-[0.18em] uppercase text-[var(--accent)] font-medium">
            ${track.category}
          </p>
          <h3 class="text-lg font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors">
            ${track.title}
          </h3>
          <p class="text-xs text-[var(--text-secondary)] font-en">
            ${track.artist}
          </p>
        </div>

        <p class="text-xs xo-text-text-secondary-90 leading-relaxed font-light pt-3 border-t border-[var(--border-subtle)]">
          ${track.description}
        </p>
      </div>
    </article>
  `;
}

// เก็บรายชื่อ 3 เพลงที่สุ่มได้ในรอบการเปิดเว็บครั้งนี้
let randomFeaturedList = [];

function initRandomSelections() {
  const validTracks = getValidTracks();
  const shuffled = shuffleArray(validTracks);

  randomFeaturedList = shuffled.slice(0, 3);

  if (shuffled.length > 0) {
    const pool = shuffled.length > 3 ? shuffled.slice(3) : shuffled;
    const rec = pool[Math.floor(Math.random() * pool.length)];
    recommendedTrackId = rec.id;

    const recBadge = document.getElementById('hero-rec-badge');
    if (recBadge) {
      recBadge.textContent = `RECOMMENDED · ${rec.title.toUpperCase()}`;
    }
  }
}

function playRecommendedTrack() {
  const validTracks = getValidTracks();
  if (validTracks.length === 0) return;
  const rec = validTracks.find(t => t.id === recommendedTrackId) || validTracks[0];
  playTrackById(rec.id, true);
}

function playRandomTrack() {
  const validTracks = getValidTracks();
  if (validTracks.length === 0) return;
  playTrackById(validTracks[Math.floor(Math.random() * validTracks.length)].id, true);
}

function renderFeaturedTracks() {
  const container = document.getElementById('featured-tracks-grid');
  if (!container) return;

  if (randomFeaturedList.length === 0) {
    initRandomSelections();
  }

  container.innerHTML = randomFeaturedList
    .map((t, idx) => createTrackCardHTML(t, `0${idx + 1} / 03`))
    .join('');
}

function renderLibraryTracks() {
  const container = document.getElementById('library-tracks-grid');
  const emptyState = document.getElementById('library-empty');

  const filtered = getFilteredTracks();

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    container.innerHTML = filtered.map((t, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      const total = String(filtered.length).padStart(2, '0');
      return createTrackCardHTML(t, `${num} / ${total}`);
    }).join('');
  }

  const savedCountEl = document.getElementById('saved-count');
  if (savedCountEl) savedCountEl.textContent = `(${savedTrackIds.length})`;
}

// ==================== NAVIGATION & FILTERS ====================
const PAGES = ['home', 'library', 'about'];

function showPage(pageId) {
  currentPage = pageId;

  document.querySelectorAll('.page-view').forEach(sec => sec.classList.remove('active'));
  document.getElementById(`page-${pageId}`).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.remove('active');
    btn.removeAttribute('aria-current');
  });
  const navBtn = document.getElementById(`nav-${pageId}`);
  navBtn.classList.add('active');
  navBtn.setAttribute('aria-current', 'page');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pageId === 'library') renderLibraryTracks();
}

function setHash(h) {
  if (location.hash === '#' + h) { applyHash(); return; }
  location.hash = h;
}

function applyHash() {
  let raw = '';
  try { raw = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
  const [page, mood] = raw.split(':');
  const target = PAGES.includes(page) ? page : 'home';
  showPage(target);
  if (target === 'library' && mood) setMoodFilter(mood);
}

function navigateTo(pageId) {
  setHash(pageId);
}

window.addEventListener('hashchange', applyHash);

function setMoodFilter(mood) {
  currentMood = mood;
  document.querySelectorAll('.filter-pill').forEach(btn => {
    if (btn.dataset.mood === mood) {
      btn.classList.add('active');
      btn.classList.remove('text-[var(--text-secondary)]');
    } else {
      btn.classList.remove('active');
      btn.classList.add('text-[var(--text-secondary)]');
    }
  });
  renderLibraryTracks();
}

function filterTracks() {
  renderLibraryTracks();
}

function resetFilters() {
  document.getElementById('search-input').value = '';
  setMoodFilter('all');
}

function jumpToMood(mood) {
  setHash('library:' + encodeURIComponent(mood));
}

// อัปเดตปุ่มหัวใจโดยไม่ Re-render การ์ดทั้งใบ (รักษา Focus ไม่ให้หลุด)
function refreshSaveIcons(trackId) {
  const track = getValidTracks().find(t => t.id === trackId);
  const isSaved = savedTrackIds.includes(trackId);
  const label = track
    ? (isSaved ? `นำ ${track.title} ออกจากเพลงที่เก็บไว้` : `เก็บเพลง ${track.title} ไว้ฟัง`)
    : (isSaved ? 'นำออกจากเพลงที่เก็บไว้' : 'เก็บเพลงนี้ไว้ฟัง');

  document.querySelectorAll(`[data-save-btn="${trackId}"]`).forEach(btn => {
    btn.setAttribute('aria-pressed', String(isSaved));
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  });

  document.querySelectorAll(`[data-save-icon="${trackId}"]`).forEach(svg => {
    if (isSaved) {
      svg.classList.remove('fill-none', 'text-[#F4F7FC]/85');
      svg.classList.add('fill-[#6FA8E8]', 'text-[#6FA8E8]');
    } else {
      svg.classList.remove('fill-[#6FA8E8]', 'text-[#6FA8E8]');
      svg.classList.add('fill-none', 'text-[#F4F7FC]/85');
    }
  });

  const savedCountEl = document.getElementById('saved-count');
  if (savedCountEl) savedCountEl.textContent = `(${savedTrackIds.length})`;
}

function toggleSaveTrack(id) {
  if (savedTrackIds.includes(id)) {
    savedTrackIds = savedTrackIds.filter(item => item !== id);
  } else {
    savedTrackIds.push(id);
  }
  localStorage.setItem('ena_saved_tracks', JSON.stringify(savedTrackIds));

  if (currentPage === 'library' && currentMood === 'Saved') {
    renderLibraryTracks();
    refreshSaveIcons(id);
  } else {
    refreshSaveIcons(id);
  }
}

// ==================== PLAYER CONTROLS ====================
function playTrackById(id, userInitiated = true, useCrossfade = true) {
  const track = getValidTracks().find(t => t.id === id);
  if (!track) return;

  if (currentTrack && currentTrack.id === id) {
    togglePlayPause();
    return;
  }

  if (userInitiated && sleepTimerMode === 'end') {
    setSleepTimer(0);
    showToast('ยกเลิกตัวตั้งเวลา "จบเพลงนี้" เนื่องจากเปลี่ยนเพลง');
  }

  const shouldCrossfade = useCrossfade && isPlaying && currentTrack !== null;
  synthElapsedSeconds = 0;

  currentTrack = track;
  isPlaying = true;
  updatePlayerUI();
  updateSeekUI(0, parseDurationToSeconds(track.duration));
  startAmbientSound(track, shouldCrossfade);
  refreshPlayIcons();
  updateMediaSession();
  saveResumeStateNow(0);
}

function togglePlayPause() {
  if (!currentTrack) return;
  isPlaying = !isPlaying;

  if (isPlaying) {
    startAmbientSound(currentTrack, false);
  } else {
    stopAmbientSound(false);
    saveResumeStateNow();
  }
  updatePlayPauseButtonUI();
  refreshPlayIcons();
}

function nextTrack(auto, fromAutoCrossfade = false) {
  if (!currentTrack) return;
  const isAuto = auto === true;
  const next = pickNext(1, isAuto);
  if (!next) {
    if (!fromAutoCrossfade) {
      isPlaying = false;
      stopAmbientSound(false);
      updatePlayPauseButtonUI();
      refreshPlayIcons();
    }
    return;
  }
  playQueueTrack(next, !isAuto, true);
}

function prevTrack() {
  if (!currentTrack) return;
  const isReal = currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
  const curTime = isReal ? realAudioPlayer.currentTime : synthElapsedSeconds;

  if (curTime > 3) {
    if (isReal) realAudioPlayer.currentTime = 0;
    else synthElapsedSeconds = 0;
    updateSeekUI(0, getEffectiveDuration());
    updateSyncedLyricsHighlight(0);
    saveResumeStateNow(0);
    return;
  }
  const prev = pickNext(-1, false);
  if (prev) playQueueTrack(prev, true, true);
}

function closePlayer() {
  isPlaying = false;
  currentTrack = null;
  stopAmbientSound(false);
  realAudioPlayer.currentTime = 0;
  synthElapsedSeconds = 0;
  clearResumeState();
  toggleLyricsPanel(false);
  toggleFocusMode(false);
  const player = document.getElementById('mini-player');
  player.classList.add('player-hidden');
  refreshPlayIcons();
  updateMediaSession();
}

function updatePlayPauseButtonUI() {
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const eq = document.getElementById('player-eq');
  if (iconPlay && iconPause && eq) {
    if (isPlaying) {
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
      eq.classList.remove('paused');
    } else {
      iconPlay.classList.remove('hidden');
      iconPause.classList.add('hidden');
      eq.classList.add('paused');
    }
  }

  const fPlay = document.getElementById('focus-icon-play');
  const fPause = document.getElementById('focus-icon-pause');
  if (fPlay && fPause) {
    fPlay.classList.toggle('hidden', isPlaying);
    fPause.classList.toggle('hidden', !isPlaying);
  }
}

function updatePlayerUI() {
  if (!currentTrack) return;
  const player = document.getElementById('mini-player');
  player.classList.remove('player-hidden');

  const isReal = currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
  const curTime = isReal ? realAudioPlayer.currentTime : synthElapsedSeconds;
  const totalSec = getEffectiveDuration() || parseDurationToSeconds(currentTrack.duration);
  updateSeekUI(curTime, totalSec);

  const playerArt = document.getElementById('player-art');
  if (currentTrack.coverUrl && currentTrack.coverUrl.trim() !== "") {
    playerArt.style.backgroundImage = `linear-gradient(rgba(11,18,32,0.35), rgba(11,18,32,0.35)), url('${currentTrack.coverUrl}')`;
    playerArt.style.backgroundSize = 'cover';
    playerArt.style.backgroundPosition = 'center';
  } else {
    playerArt.style.backgroundImage = '';
  }

  document.getElementById('player-title').textContent = currentTrack.title;
  document.getElementById('player-tag').textContent = currentTrack.mood || currentTrack.category;
  document.getElementById('player-artist').innerHTML = `${currentTrack.artist} · <span class="opacity-75">${currentTrack.jpTitle}</span>`;

  document.getElementById('drawer-song-title').textContent = currentTrack.title;
  document.getElementById('drawer-song-artist').textContent = `${currentTrack.artist} · ${currentTrack.jpTitle}`;
  document.getElementById('drawer-song-duration').textContent = currentTrack.duration;

  if (isSyncHelperOpen) {
    resetSyncHelper();
  } else {
    renderLyricsContent(currentTrack);
  }

  syncFocusScreenUI();
  updatePlayPauseButtonUI();
}

// ==================== THEME & DRAGGABLE SETTINGS MODAL ====================
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('ena_theme', isLight ? 'light' : 'dark');
  updateSettingsThemeLabel();
}

function toggleSettingsMenu(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById('settings-dropdown');
  const backdrop = document.getElementById('settings-modal-backdrop');
  if (!modal) return;

  const isOpening = modal.classList.contains('hidden');
  if (isOpening) {
    modal.style.left = '50%';
    modal.style.top = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.classList.remove('hidden');
    if (backdrop) backdrop.classList.remove('hidden');
    updateSettingsThemeLabel();
    updateFocusAutoHideUI();
    updateCrossfadeUI();
    if (isFocusMode) resetFocusIdleTimer();
  } else {
    closeSettingsModal();
  }
}

function closeSettingsModal() {
  const modal = document.getElementById('settings-dropdown');
  const backdrop = document.getElementById('settings-modal-backdrop');
  if (modal) modal.classList.add('hidden');
  if (backdrop) backdrop.classList.add('hidden');
  if (isFocusMode) resetFocusIdleTimer();
}

function updateSettingsThemeLabel() {
  const label = document.getElementById('settings-theme-text');
  if (!label) return;
  const isLight = document.body.classList.contains('light-theme');
  label.textContent = isLight ? 'โหมดกลางวัน (Morning)' : 'โหมดกลางคืน (Midnight)';
}

function initDraggableSettingsModal() {
  const modal = document.getElementById('settings-dropdown');
  const dragBar = document.getElementById('settings-drag-bar');
  if (!modal || !dragBar) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  function onDragStart(e) {
    if (e.target.closest('button')) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = modal.getBoundingClientRect();
    modal.style.left = `${rect.left}px`;
    modal.style.top = `${rect.top}px`;
    modal.style.transform = 'none';

    isDragging = true;
    startX = clientX;
    startY = clientY;
    initialLeft = rect.left;
    initialTop = rect.top;
    modal.style.borderColor = 'var(--accent)';
  }

  function onDragMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;
    const rect = modal.getBoundingClientRect();

    const maxLeft = window.innerWidth - rect.width - 8;
    const maxTop = window.innerHeight - rect.height - 8;

    modal.style.left = `${Math.max(8, Math.min(initialLeft + dx, maxLeft))}px`;
    modal.style.top = `${Math.max(8, Math.min(initialTop + dy, maxTop))}px`;
  }

  function onDragEnd() {
    if (isDragging) {
      isDragging = false;
      modal.style.borderColor = '';
    }
  }

  dragBar.addEventListener('mousedown', onDragStart);
  dragBar.addEventListener('touchstart', onDragStart, { passive: true });
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove, { passive: true });
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);
}

// ==================== SETTINGS TABS & SHORTCUTS VIEW (?) ====================
function switchSettingsTab(tabName) {
  const isShortcuts = tabName === 'shortcuts';
  const panelGeneral = document.getElementById('settings-panel-general');
  const panelShortcuts = document.getElementById('settings-panel-shortcuts');
  const btnGeneral = document.getElementById('tab-btn-general');
  const btnShortcuts = document.getElementById('tab-btn-shortcuts');

  if (!panelGeneral || !panelShortcuts) return;

  panelGeneral.classList.toggle('hidden', isShortcuts);
  panelShortcuts.classList.toggle('hidden', !isShortcuts);

  if (btnGeneral && btnShortcuts) {
    btnGeneral.classList.toggle('border-[var(--accent)]', !isShortcuts);
    btnGeneral.classList.toggle('text-[var(--text-primary)]', !isShortcuts);
    btnGeneral.classList.toggle('border-transparent', isShortcuts);
    btnGeneral.classList.toggle('text-[var(--text-secondary)]', isShortcuts);

    btnShortcuts.classList.toggle('border-[var(--accent)]', isShortcuts);
    btnShortcuts.classList.toggle('text-[var(--text-primary)]', isShortcuts);
    btnShortcuts.classList.toggle('border-transparent', !isShortcuts);
    btnShortcuts.classList.toggle('text-[var(--text-secondary)]', !isShortcuts);
  }
}

function toggleShortcutsModal() {
  const modal = document.getElementById('settings-dropdown');
  const panelShortcuts = document.getElementById('settings-panel-shortcuts');
  if (!modal) return;

  const isModalClosed = modal.classList.contains('hidden');
  const isAlreadyOnShortcuts = !isModalClosed && panelShortcuts && !panelShortcuts.classList.contains('hidden');

  if (isAlreadyOnShortcuts) {
    closeSettingsModal();
  } else {
    if (isModalClosed) {
      toggleSettingsMenu();
    }
    switchSettingsTab('shortcuts');
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const settingsModal = document.getElementById('settings-dropdown');
    if (settingsModal && !settingsModal.classList.contains('hidden')) {
      closeSettingsModal();
    } else if (isFocusMode) {
      toggleFocusMode(false);
    }
  }
});

// ==================== SLEEP TIMER (FADE OUT, END OF TRACK & +15m) ====================
let sleepTimerInterval = null;
let sleepRemainingSeconds = 0;
let sleepTimerMode = 'off'; // 'off' | 'timer' | 'end'

function updateSleepExtendPill() {
  const pill = document.getElementById('sleep-extend-pill');
  const secEl = document.getElementById('sleep-pill-sec');
  if (!pill) return;

  if (sleepTimerMode === 'timer' && sleepRemainingSeconds > 0 && sleepRemainingSeconds <= 60) {
    pill.classList.remove('hidden');
    if (secEl) secEl.textContent = `${sleepRemainingSeconds}s`;
  } else {
    pill.classList.add('hidden');
  }
}

function setSleepTimer(option) {
  if (sleepTimerInterval) {
    clearInterval(sleepTimerInterval);
    sleepTimerInterval = null;
  }

  sleepFadeMultiplier = 1;
  applyMasterVolume();

  document.querySelectorAll('.sleep-opt-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.sleep === String(option));
  });

  const countdownEl = document.getElementById('sleep-timer-countdown');
  const dotEl = document.getElementById('sleep-timer-dot');
  const hasAmbient = Object.values(AMBIENT_LAYERS).some(l => l.active);

  if (option === 'end') {
    if (!currentTrack) {
      showToast('กรุณาเปิดเพลงก่อนเลือกโหมด "จบเพลงนี้"');
      setSleepTimer(0);
      return;
    }
    sleepTimerMode = 'end';
    sleepRemainingSeconds = 0;
    if (countdownEl) countdownEl.textContent = 'เมื่อจบเพลงนี้';
    if (dotEl) dotEl.classList.remove('hidden');
    updateSleepExtendPill();
    showToast('ตั้งเวลาปิดเพลงเมื่อจบเพลงนี้แล้ว');
    return;
  }

  const minutes = Number(option);
  if (isNaN(minutes) || minutes <= 0) {
    sleepTimerMode = 'off';
    sleepRemainingSeconds = 0;
    if (countdownEl) countdownEl.textContent = 'ปิดอยู่';
    if (dotEl) dotEl.classList.toggle('hidden', !hasAmbient);
    updateSleepExtendPill();
    return;
  }

  sleepTimerMode = 'timer';
  sleepRemainingSeconds = minutes * 60;
  if (dotEl) dotEl.classList.remove('hidden');
  updateSleepCountdownDisplay();
  updateSleepExtendPill();

  sleepTimerInterval = setInterval(() => {
    sleepRemainingSeconds--;
    updateSleepCountdownDisplay();
    updateSleepExtendPill();

    if (sleepRemainingSeconds <= 15 && sleepRemainingSeconds > 0) {
      sleepFadeMultiplier = sleepRemainingSeconds / 15;
      applyMasterVolume();
    }

    if (sleepRemainingSeconds <= 0) {
      clearInterval(sleepTimerInterval);
      sleepTimerInterval = null;

      if (isPlaying) {
        togglePlayPause();
      } else {
        stopAmbientSound(false);
      }

      sleepFadeMultiplier = 1;
      applyMasterVolume();
      setSleepTimer(0);
      showToast('ครบเวลา Sleep Timer แล้ว ฝันดีครับ');
    }
  }, 1000);
}

function extendSleepTimer15() {
  if (sleepTimerMode === 'end' || sleepTimerMode === 'off') {
    setSleepTimer(15);
    showToast('เปลี่ยนเป็นตั้งเวลาปิดเพลง 15 นาที');
    return;
  }

  sleepRemainingSeconds += 15 * 60;
  sleepFadeMultiplier = 1;
  applyMasterVolume();

  document.querySelectorAll('.sleep-opt-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  updateSleepCountdownDisplay();
  updateSleepExtendPill();
  showToast('เพิ่มเวลา Sleep Timer อีก 15 นาที');
}

function updateSleepCountdownDisplay() {
  const countdownEl = document.getElementById('sleep-timer-countdown');
  if (!countdownEl) return;
  const mins = Math.floor(sleepRemainingSeconds / 60);
  const secs = sleepRemainingSeconds % 60;
  countdownEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ==================== KEYBOARD SHORTCUTS (SYNC, SPACE, ARROWS, M, N/P, L, F, ?) ====================
let secretKeyBuffer = '';

window.addEventListener('keydown', (e) => {
  if (isFocusMode) resetFocusIdleTimer();

  if (e.defaultPrevented) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;

  // 1. Spacebar: เล่น / หยุดเพลงชั่วคราว
  if (e.code === 'Space') {
    if (tag === 'BUTTON' || tag === 'A' || e.target.closest('[role="button"]')) return;
    if (!currentTrack) return;
    e.preventDefault();
    togglePlayPause();
    return;
  }

  // 2. ลูกศรซ้าย / ขวา: กรอถอยหลัง / เดินหน้าทีละ 5 วินาที
  if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
    const totalSec = getEffectiveDuration();
    if (currentTrack && totalSec > 0) {
      e.preventDefault();
      const step = e.code === 'ArrowRight' ? 5 : -5;
      const isReal = currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
      const curTime = isReal ? realAudioPlayer.currentTime : synthElapsedSeconds;
      const nextTime = Math.min(Math.max(0, curTime + step), totalSec);

      if (isReal) realAudioPlayer.currentTime = nextTime;
      else synthElapsedSeconds = nextTime;

      updateSeekUI(nextTime, totalSec);
      updateSyncedLyricsHighlight(nextTime);
      saveResumeStateNow(nextTime);
    }
    return;
  }

  // 3. ลูกศรขึ้น / ลง: ปรับเสียงทีละ 5%
  if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
    e.preventDefault();
    adjustVolumeBy(e.code === 'ArrowUp' ? 5 : -5);
    return;
  }

  if (e.key.length !== 1) return;
  const lowerKey = e.key.toLowerCase();

  // อัปเดตบัฟเฟอร์รหัสลับ "sync" / "ผัืแ" ก่อน เพื่อป้องกันตัว 'n' ใน "sync" ไปข้ามเพลง
  const prevBuffer = secretKeyBuffer;
  secretKeyBuffer = (secretKeyBuffer + lowerKey).slice(-4);

  if (secretKeyBuffer === 'sync' || secretKeyBuffer === 'ผัืแ') {
    secretKeyBuffer = '';
    if (!currentTrack) {
      alert('กรุณากดเล่นเพลงที่ต้องการทำซิงก์ก่อน 1 เพลง แล้วพิมพ์ sync อีกครั้งครับ');
      return;
    }

    const btn = document.getElementById('btn-sync-helper-toggle');
    if (!btn) return;

    const willShow = btn.classList.contains('hidden');
    btn.classList.toggle('hidden', !willShow);

    if (willShow) {
      if (isFocusMode) toggleFocusMode(false);
      if (!isLyricsOpen) toggleLyricsPanel(true);
      if (!isSyncHelperOpen) toggleSyncHelper();
    } else {
      if (isSyncHelperOpen) toggleSyncHelper();
    }
    return;
  }

  if (lowerKey === 'n' && prevBuffer.endsWith('sy')) {
    return;
  }

  // 4. คีย์ลัดควบคุมห้องฟังเพลง: M, N, P, L, F, ?
  if (lowerKey === 'm') {
    e.preventDefault();
    toggleMute();
    return;
  }

  if (lowerKey === 'n') {
    if (!currentTrack) return;
    e.preventDefault();
    nextTrack(false);
    return;
  }

  if (lowerKey === 'p') {
    if (!currentTrack) return;
    e.preventDefault();
    prevTrack();
    return;
  }

  if (lowerKey === 'l') {
    if (!currentTrack) return;
    e.preventDefault();
    if (isFocusMode) {
      toggleFocusLyrics();
    } else {
      toggleLyricsPanel();
    }
    return;
  }

  if (lowerKey === 'f') {
    if (!currentTrack) return;
    e.preventDefault();
    toggleFocusMode();
    return;
  }

  if (e.key === '?') {
    e.preventDefault();
    toggleShortcutsModal();
    return;
  }
});

// ==================== MINIMAL AUDIO VISUALIZER ====================
function injectAndSyncVisualizer() {
  const titleEl = document.getElementById('player-title');
  if (!titleEl) return;

  let viz = document.getElementById('ena-mini-visualizer');
  if (!viz) {
    viz = document.createElement('span');
    viz.id = 'ena-mini-visualizer';
    viz.className = 'ena-visualizer';
    viz.innerHTML = '<span></span><span></span><span></span><span></span>';
    titleEl.parentNode.insertBefore(viz, titleEl.nextSibling);
  }

  const playingNow = !realAudioPlayer.paused || isPlaying;
  viz.classList.toggle('playing', playingNow);
}

// ==================== AMBIENT STARDUST & FIREFLIES EFFECT ====================
function initAmbientParticles() {
  const canvas = document.getElementById('ambient-particles');
  if (!canvas) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particleCount = Math.min(65, Math.floor((width * height) / 22000));
  const particles = [];

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.isFirefly = Math.random() > 0.72;
      this.radius = this.isFirefly ? Math.random() * 1.8 + 1.4 : Math.random() * 1.1 + 0.4;
      this.vx = (Math.random() - 0.5) * (this.isFirefly ? 0.35 : 0.18);
      this.vy = -(Math.random() * (this.isFirefly ? 0.32 : 0.16) + 0.06);
      this.phase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.025 + 0.01;
      this.maxAlpha = this.isFirefly ? Math.random() * 0.55 + 0.35 : Math.random() * 0.45 + 0.15;
    }

    update() {
      this.phase += this.twinkleSpeed;

      this.x += this.vx + Math.sin(this.phase * 0.7) * (this.isFirefly ? 0.25 : 0.08);
      this.y += this.vy;

      const dx = (mouseX - width / 2) * 0.00015;
      const dy = (mouseY - height / 2) * 0.00015;
      this.x += dx * (this.isFirefly ? 2.2 : 1);
      this.y += dy * (this.isFirefly ? 2.2 : 1);

      if (this.y < -15) this.reset(false);
      if (this.x < -15) this.x = width + 15;
      if (this.x > width + 15) this.x = -15;
    }

    draw() {
      const isLight = document.body.classList.contains('light-theme');
      const alpha = ((Math.sin(this.phase) + 1) / 2) * this.maxAlpha;

      ctx.save();
      ctx.beginPath();

      if (this.isFirefly) {
        const glowRadius = this.radius * 5;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius);

        if (isLight) {
          gradient.addColorStop(0, `rgba(74, 128, 196, ${alpha})`);
          gradient.addColorStop(1, 'rgba(74, 128, 196, 0)');
        } else {
          gradient.addColorStop(0, `rgba(111, 168, 232, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(168, 206, 250, ${alpha * 0.35})`);
          gradient.addColorStop(1, 'rgba(111, 168, 232, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(74, 128, 196, ${alpha * 0.9})`
        : `rgba(244, 247, 252, ${alpha})`;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// ==================== FILTER / QUEUE: SHUFFLE & REPEAT ====================
let isShuffle = false;
let repeatMode = 'all'; // 'off' | 'all' | 'one'
const DEFAULT_TITLE = document.title;

function getFilteredTracks() {
  const query = (document.getElementById('search-input')?.value || '').trim().toLowerCase();
  return getValidTracks().filter(track => {
    const matchesMood =
      currentMood === 'all' ? true :
      currentMood === 'Saved' ? savedTrackIds.includes(track.id) :
      track.mood === currentMood;

    const haystack = [track.title, track.jpTitle, track.artist, track.category, track.mood, track.description]
      .filter(Boolean).join(' ').toLowerCase();
    return matchesMood && (!query || haystack.includes(query));
  });
}

function getPlaybackList() {
  const list = getFilteredTracks();
  return currentTrack && list.some(t => t.id === currentTrack.id) ? list : getValidTracks();
}

function pickNext(dir, auto) {
  const list = getPlaybackList();
  if (!list.length || !currentTrack) return null;
  if (isShuffle && list.length > 1) {
    let r;
    do { r = list[Math.floor(Math.random() * list.length)]; } while (r.id === currentTrack.id);
    return r;
  }
  const idx = list.findIndex(t => t.id === currentTrack.id);
  const n = idx + dir;
  if (auto && repeatMode === 'off' && n >= list.length) return null;
  return list[(n + list.length) % list.length];
}

function playQueueTrack(t, userInitiated = false, useCrossfade = true) {
  if (currentTrack && t.id === currentTrack.id) {
    if (userInitiated && sleepTimerMode === 'end') {
      setSleepTimer(0);
    }
    realAudioPlayer.currentTime = 0;
    synthElapsedSeconds = 0;
    isPlaying = true;
    startAmbientSound(t, false);
    updatePlayerUI();
    refreshPlayIcons();
    saveResumeStateNow(0);
    return;
  }
  playTrackById(t.id, userInitiated, useCrossfade);
}

function handleTrackEnded() {
  if (sleepTimerMode === 'end') {
    isPlaying = false;
    stopAmbientSound(false);
    realAudioPlayer.currentTime = 0;
    synthElapsedSeconds = 0;
    updateSeekUI(0, getEffectiveDuration());
    updatePlayPauseButtonUI();
    refreshPlayIcons();
    setSleepTimer(0);
    saveResumeStateNow(0);
    showToast('จบเพลงแล้ว ปิดการเล่นตามที่ตั้งเวลาไว้');
    return;
  }

  if (repeatMode === 'one') {
    realAudioPlayer.currentTime = 0;
    synthElapsedSeconds = 0;
    if (currentTrack && currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "") {
      realAudioPlayer.play().catch(() => {});
    }
    return;
  }
  nextTrack(true, false);
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  updateQueueButtons();
}

function cycleRepeat() {
  repeatMode = repeatMode === 'all' ? 'one' : repeatMode === 'one' ? 'off' : 'all';
  updateQueueButtons();
}

function updateQueueButtons() {
  const repeatTitle = repeatMode === 'one' ? 'เล่นซ้ำเพลงเดียว' : repeatMode === 'all' ? 'เล่นวนทั้งรายการ' : 'ไม่เล่นซ้ำ';
  const shuffleTitle = isShuffle ? 'สุ่มลำดับ: เปิด' : 'สุ่มลำดับ: ปิด';

  ['btn-shuffle', 'focus-btn-shuffle'].forEach(id => {
    const s = document.getElementById(id);
    if (!s) return;
    s.classList.toggle('lyrics-btn-active', isShuffle);
    s.setAttribute('aria-pressed', String(isShuffle));
    s.title = shuffleTitle;
  });

  ['btn-repeat', 'focus-btn-repeat'].forEach(id => {
    const r = document.getElementById(id);
    if (!r) return;
    r.classList.toggle('lyrics-btn-active', repeatMode !== 'off');
    r.setAttribute('aria-pressed', String(repeatMode !== 'off'));
    r.title = repeatTitle;
  });

  ['repeat-badge', 'focus-repeat-badge'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.classList.toggle('hidden', repeatMode !== 'one');
  });
}

// ==================== UI FEEDBACK: PLAY ICONS, TOAST, MEDIA SESSION ====================
const ICON_PLAY_SM = '<svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
const ICON_PAUSE_SM = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

function refreshPlayIcons() {
  document.querySelectorAll('[data-play-icon]').forEach(el => {
    const on = currentTrack && String(currentTrack.id) === el.dataset.playIcon && isPlaying;
    el.innerHTML = on ? ICON_PAUSE_SM : ICON_PLAY_SM;
  });
  injectAndSyncVisualizer();
  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = !currentTrack ? 'none' : (isPlaying ? 'playing' : 'paused');
  }
}

function showToast(msg) {
  let el = document.getElementById('ena-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'ena-toast';
    el.className = 'ena-toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 3500);
}

function updateMediaSession() {
  document.title = currentTrack ? `${currentTrack.title} · Ena.` : DEFAULT_TITLE;
  if (!('mediaSession' in navigator)) return;
  if (!currentTrack) {
    navigator.mediaSession.metadata = null;
    return;
  }
  const hasCover = currentTrack.coverUrl && currentTrack.coverUrl.trim() !== '';
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      album: 'Ena. Listening Room',
      artwork: hasCover ? [{ src: new URL(currentTrack.coverUrl, location.href).href }] : []
    });
  } catch (e) {}
}

function initMediaSession() {
  if (!('mediaSession' in navigator)) return;
  const set = (action, fn) => { try { navigator.mediaSession.setActionHandler(action, fn); } catch (e) {} };
  set('play', () => { if (currentTrack && !isPlaying) togglePlayPause(); });
  set('pause', () => { if (currentTrack && isPlaying) togglePlayPause(); });
  set('previoustrack', () => prevTrack());
  set('nexttrack', () => nextTrack());
  set('seekbackward', () => {
    const isReal = currentTrack && currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
    seekToSeconds((isReal ? realAudioPlayer.currentTime : synthElapsedSeconds) - 10);
  });
  set('seekforward', () => {
    const isReal = currentTrack && currentTrack.audioUrl && currentTrack.audioUrl.trim() !== "";
    seekToSeconds((isReal ? realAudioPlayer.currentTime : synthElapsedSeconds) + 10);
  });
  set('seekto', d => { if (d && d.seekTime != null) seekToSeconds(d.seekTime); });
}

// ==================== SETTINGS MODAL: FOCUS MANAGEMENT ====================
let lastFocusBeforeModal = null;
const _openSettingsBase = toggleSettingsMenu;
const _closeSettingsBase = closeSettingsModal;

toggleSettingsMenu = function (e) {
  const modal = document.getElementById('settings-dropdown');
  const wasHidden = modal && modal.classList.contains('hidden');
  if (wasHidden) {
    lastFocusBeforeModal = document.activeElement;
    switchSettingsTab('general');
  }
  _openSettingsBase(e);
  if (wasHidden) {
    const closeBtn = modal.querySelector('button[aria-label="ปิดหน้าต่างตั้งค่า"]');
    if (closeBtn) closeBtn.focus();
  }
};

closeSettingsModal = function () {
  const modal = document.getElementById('settings-dropdown');
  const wasOpen = modal && !modal.classList.contains('hidden');
  _closeSettingsBase();
  if (wasOpen && lastFocusBeforeModal && lastFocusBeforeModal.focus) lastFocusBeforeModal.focus();
};

window.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const modal = document.getElementById('settings-dropdown');
  if (!modal || modal.classList.contains('hidden')) return;
  const f = [...modal.querySelectorAll('button')];
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

// ==================== INITIALIZE ====================
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('ena_theme') === 'light') {
    document.body.classList.add('light-theme');
  }
  updateSettingsThemeLabel();
  updateFocusAutoHideUI();
  updateCrossfadeUI();
  const volSlider = document.getElementById('volume-slider');
  if (volSlider) volSlider.value = Math.round(currentVolume * 100);
  updateVolumeUI(Math.round(currentVolume * 100));
  updateAmbientMixerUI();
  initDraggableAndResizablePlayer();
  initDraggableSettingsModal();
  initFocusAutoHideListeners();
  initRandomSelections();
  renderFeaturedTracks();
  renderLibraryTracks();
  initAmbientParticles();
  injectAndSyncVisualizer();
  [deckA, deckB].forEach(deck => {
    ['play', 'pause', 'ended', 'emptied'].forEach(ev => deck.addEventListener(ev, injectAndSyncVisualizer));
  });
  initMediaSession();
  updateQueueButtons();
  restoreResumeState();
  if (location.hash) applyHash();
});