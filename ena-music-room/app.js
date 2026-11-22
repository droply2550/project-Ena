// ==================== APPLICATION STATE ====================
// หมายเหตุ: ข้อมูลเพลงทั้งหมดถูกดึงมาจากไฟล์ tracks.js (ตัวแปร TRACKS)

let currentPage = 'home';
let currentMood = 'all';
let savedTrackIds = JSON.parse(localStorage.getItem('ena_saved_tracks') || '[]');
let currentTrack = null;
let recommendedTrackId = null;
let isPlaying = false;
let isLyricsOpen = false;
let isCompactPlayer = false;
let activeLyricIndex = -1;

// Sync Helper State (ตัวช่วยจับเวลาทำเนื้อเพลงซิงก์)
let isSyncHelperOpen = false;
let helperBlocks = [];
let helperTimestamps = [];

// Volume State (เริ่มต้นที่ 30%)
let currentVolume = 0.30;
let previousVolume = 0.30;
let isMuted = false;

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

// ==================== REAL AUDIO & AMBIENT SYNTH ENGINE ====================
let realAudioPlayer = new Audio();
let audioCtx = null;
let chordInterval = null;
let noiseNode = null;
let masterGain = null;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = isMuted ? 0 : currentVolume * 0.32;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function stopAmbientSound() {
  realAudioPlayer.pause();

  if (chordInterval) {
    clearInterval(chordInterval);
    chordInterval = null;
  }
  if (noiseNode) {
    try {
      noiseNode.stop();
      noiseNode.disconnect();
    } catch (e) {}
    noiseNode = null;
  }
}

function startAmbientSound(track) {
  stopAmbientSound();

  if (track.audioUrl && track.audioUrl.trim() !== "") {
    if (!realAudioPlayer.src.endsWith(encodeURI(track.audioUrl))) {
      realAudioPlayer.src = track.audioUrl;
    }
    realAudioPlayer.volume = isMuted ? 0 : currentVolume;
    realAudioPlayer.play().catch(err => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้ กรุณาตรวจสอบที่อยู่ไฟล์:", err);
    });
    realAudioPlayer.onended = () => nextTrack();
    return;
  }

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
}

// ==================== VOLUME CONTROLS ====================
function changeVolume(val) {
  const numeric = Number(val);
  currentVolume = numeric / 100;
  isMuted = numeric === 0;

  if (!isMuted) {
    previousVolume = currentVolume;
  }

  realAudioPlayer.volume = currentVolume;

  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(currentVolume * 0.32, audioCtx.currentTime, 0.04);
  }

  updateVolumeUI(numeric);
}

function toggleMute() {
  const slider = document.getElementById('volume-slider');
  if (isMuted || currentVolume === 0) {
    isMuted = false;
    currentVolume = previousVolume > 0 ? previousVolume : 0.30;
    slider.value = Math.round(currentVolume * 100);
  } else {
    previousVolume = currentVolume;
    isMuted = true;
    currentVolume = 0;
    slider.value = 0;
  }

  realAudioPlayer.volume = isMuted ? 0 : currentVolume;

  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(isMuted ? 0 : currentVolume * 0.32, audioCtx.currentTime, 0.04);
  }

  updateVolumeUI(Number(slider.value));
}

function updateVolumeUI(percent) {
  const slider = document.getElementById('volume-slider');
  const iconOn = document.getElementById('icon-vol-on');
  const iconMute = document.getElementById('icon-vol-mute');

  slider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, rgba(168, 182, 204, 0.25) ${percent}%, rgba(168, 182, 204, 0.25) 100%)`;

  if (percent === 0) {
    iconOn.classList.add('hidden');
    iconMute.classList.remove('hidden');
  } else {
    iconOn.classList.remove('hidden');
    iconMute.classList.add('hidden');
  }
}

// ==================== SEEK / PROGRESS BAR & SYNCED LYRICS ====================
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function seekTrack(percent) {
  if (!currentTrack) return;
  const slider = document.getElementById('seek-slider');
  
  slider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, rgba(168, 182, 204, 0.2) ${percent}%, rgba(168, 182, 204, 0.2) 100%)`;

  if (realAudioPlayer.duration) {
    realAudioPlayer.currentTime = (percent / 100) * realAudioPlayer.duration;
    document.getElementById('current-time').textContent = formatTime(realAudioPlayer.currentTime);
    updateSyncedLyricsHighlight(realAudioPlayer.currentTime);
  }
}

function seekToSeconds(seconds) {
  if (!currentTrack || !realAudioPlayer.duration) return;
  realAudioPlayer.currentTime = Math.max(0, Math.min(seconds, realAudioPlayer.duration));
  updateSyncedLyricsHighlight(realAudioPlayer.currentTime);
  if (!isPlaying) {
    togglePlayPause();
  }
}

function renderLyricsContent(track) {
  const container = document.getElementById('lyrics-display');
  activeLyricIndex = -1;

  // ถ้าเพลงนี้มี syncedLyrics ให้แสดงแบบซิงก์ทีละท่อน
  if (Array.isArray(track.syncedLyrics) && track.syncedLyrics.length > 0) {
    container.classList.remove('whitespace-pre-line');
    container.innerHTML = `<div class="space-y-2">` + track.syncedLyrics.map((item, idx) => `
      <div 
        id="lyric-line-${idx}" 
        onclick="seekToSeconds(${item.time})"
        title="คลิกเพื่อเล่นท่อนนี้ (${formatTime(item.time)})"
        class="lyric-line whitespace-pre-line">
        ${item.text}
      </div>
    `).join('') + `</div>`;
  } else {
    // ถ้ายังไม่ได้ทำซิงก์ ให้แสดงเนื้อเพลงเต็มแบบเดิม
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
      if (!el) return;
      if (idx === activeLyricIndex) {
        el.classList.add('active');
        // เลื่อนหน้าต่างเนื้อเพลงให้ท่อนปัจจุบันอยู่ตรงกลางเสมอ
        if (isLyricsOpen) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        el.classList.remove('active');
      }
    });
  }
}

realAudioPlayer.addEventListener('timeupdate', () => {
  if (!realAudioPlayer.duration) return;
  const percent = (realAudioPlayer.currentTime / realAudioPlayer.duration) * 100;
  const slider = document.getElementById('seek-slider');
  
  slider.value = percent;
  slider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, rgba(168, 182, 204, 0.2) ${percent}%, rgba(168, 182, 204, 0.2) 100%)`;

  document.getElementById('current-time').textContent = formatTime(realAudioPlayer.currentTime);
  document.getElementById('total-duration').textContent = formatTime(realAudioPlayer.duration);

  updateSyncedLyricsHighlight(realAudioPlayer.currentTime);
});

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
  // แยกเนื้อเพลงออกเป็นท่อน ๆ ตามบรรทัดว่าง (ตัดเส้นคั่น --- ออก)
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
  const time = Number(realAudioPlayer.currentTime.toFixed(1));
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

  // แสดงตัวอย่างท่อนที่กำลังรอมาร์กเวลาในหน้าต่างเนื้อเพลง
  const container = document.getElementById('lyrics-display');
  if (!isSyncHelperOpen) return;

  container.classList.remove('whitespace-pre-line');
  container.innerHTML = `<div class="space-y-2">` + helperBlocks.map((block, idx) => {
    const marked = helperTimestamps[idx];
    const isNext = idx === helperTimestamps.length;
    return `
      <div class="p-3 rounded-xl border ${isNext ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--border-subtle)] opacity-70'} whitespace-pre-line">
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
    const escaped = item.text.replace(/`/g, '\\`');
    return `  { time: ${item.time}, text: \`${escaped}\` }`;
  }).join(",\n") + "\n],";

  navigator.clipboard.writeText(formatted).then(() => {
    alert(`คัดลอกโค้ด syncedLyrics จำนวน ${helperTimestamps.length} ท่อนเรียบร้อย!\nนำไปวางในเพลง "${currentTrack.title}" ในไฟล์ tracks.js ได้เลยครับ`);
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
      updateSyncedLyricsHighlight(realAudioPlayer.currentTime);
    }
  } else {
    drawer.classList.add('translate-x-full');
    btn.classList.remove('lyrics-btn-active');
  }
}

// ==================== CARD RENDERING ====================
function createTrackCardHTML(track, indexLabel) {
  const isSaved = savedTrackIds.includes(track.id);
  const isCurrentPlaying = currentTrack && currentTrack.id === track.id && isPlaying;
  const hasCover = track.coverUrl && track.coverUrl.trim() !== "";

  return `
    <article class="editorial-card rounded-2xl overflow-hidden flex flex-col justify-between group">
      <div onclick="playTrackById(${track.id})" class="card-artwork-box relative h-56 p-5 flex flex-col justify-between cursor-pointer overflow-hidden">
        
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
            onclick="event.stopPropagation(); toggleSaveTrack(${track.id})" 
            title="${isSaved ? 'นำออกจากเพลงที่เก็บไว้' : 'เก็บเพลงนี้ไว้ฟัง'}"
            class="w-8 h-8 rounded-full bg-[#0B1220]/45 hover:bg-[#0B1220]/75 backdrop-blur-sm flex items-center justify-center text-[#F4F7FC] transition-colors cursor-pointer">
            <svg class="w-3.5 h-3.5 ${isSaved ? 'fill-[#6FA8E8] text-[#6FA8E8]' : 'fill-none text-[#F4F7FC]/85'}" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <div class="relative z-10 flex items-center justify-between mt-auto">
          <span class="text-[11px] font-en text-[#F4F7FC]/85 drop-shadow-sm">${track.duration}</span>
          <div class="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-[#F4F7FC] group-hover:scale-105 group-hover:bg-[#6FA8E8] group-hover:text-[#0B1220] transition-all">
            ${isCurrentPlaying 
              ? `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
              : `<svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`
            }
          </div>
        </div>
      </div>

      <div onclick="playTrackById(${track.id})" class="p-6 flex-1 flex flex-col justify-between space-y-4 cursor-pointer">
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

        <p class="text-xs text-[var(--text-secondary)]/90 leading-relaxed font-light pt-3 border-t border-[var(--border-subtle)]">
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
    const rec = shuffled[Math.floor(Math.random() * shuffled.length)];
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

  const randomPick = validTracks[Math.floor(Math.random() * validTracks.length)];
  playTrackById(randomPick.id);
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
  const query = (document.getElementById('search-input')?.value || '').trim().toLowerCase();

  const validTracks = getValidTracks();

  let filtered = validTracks.filter(track => {
    const matchesMood = 
      currentMood === 'all' ? true :
      currentMood === 'Saved' ? savedTrackIds.includes(track.id) :
      track.mood === currentMood;

    const matchesQuery = !query || 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.category.toLowerCase().includes(query) ||
      track.description.toLowerCase().includes(query);

    return matchesMood && matchesQuery;
  });

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

  document.getElementById('saved-count').textContent = `(${savedTrackIds.length})`;
}

// ==================== NAVIGATION & FILTERS ====================
function navigateTo(pageId) {
  currentPage = pageId;
  
  document.querySelectorAll('.page-view').forEach(sec => sec.classList.remove('active'));
  document.getElementById(`page-${pageId}`).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`nav-${pageId}`).classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pageId === 'library') renderLibraryTracks();
}

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

function toggleSaveTrack(id) {
  if (savedTrackIds.includes(id)) {
    savedTrackIds = savedTrackIds.filter(item => item !== id);
  } else {
    savedTrackIds.push(id);
  }
  localStorage.setItem('ena_saved_tracks', JSON.stringify(savedTrackIds));
  renderFeaturedTracks();
  renderLibraryTracks();
}

// ==================== PLAYER CONTROLS ====================
function playTrackById(id) {
  const track = getValidTracks().find(t => t.id === id);
  if (!track) return;

  if (currentTrack && currentTrack.id === id) {
    togglePlayPause();
    return;
  }

  realAudioPlayer.currentTime = 0;

  currentTrack = track;
  isPlaying = true;
  updatePlayerUI();
  startAmbientSound(track);
  renderFeaturedTracks();
  renderLibraryTracks();
}

function togglePlayPause() {
  if (!currentTrack) return;
  isPlaying = !isPlaying;

  if (isPlaying) {
    startAmbientSound(currentTrack);
  } else {
    stopAmbientSound();
  }
  updatePlayerUI();
  renderFeaturedTracks();
  renderLibraryTracks();
}

function nextTrack() {
  const validTracks = getValidTracks();
  if (!currentTrack || validTracks.length === 0) return;
  const idx = validTracks.findIndex(t => t.id === currentTrack.id);
  const next = validTracks[(idx + 1) % validTracks.length];
  playTrackById(next.id);
}

function prevTrack() {
  const validTracks = getValidTracks();
  if (!currentTrack || validTracks.length === 0) return;
  const idx = validTracks.findIndex(t => t.id === currentTrack.id);
  const prev = validTracks[(idx - 1 + validTracks.length) % validTracks.length];
  playTrackById(prev.id);
}

function closePlayer() {
  isPlaying = false;
  currentTrack = null;
  stopAmbientSound();
  realAudioPlayer.currentTime = 0;
  toggleLyricsPanel(false);
  const player = document.getElementById('mini-player');
  player.classList.add('player-hidden');
  renderFeaturedTracks();
  renderLibraryTracks();
}

function updatePlayerUI() {
  if (!currentTrack) return;
  const player = document.getElementById('mini-player');
  player.classList.remove('player-hidden');

  const seekSlider = document.getElementById('seek-slider');
  seekSlider.value = 0;
  seekSlider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) 0%, rgba(168, 182, 204, 0.2) 0%, rgba(168, 182, 204, 0.2) 100%)`;
  document.getElementById('current-time').textContent = "00:00";
  document.getElementById('total-duration').textContent = currentTrack.duration;

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

  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const eq = document.getElementById('player-eq');

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

// ==================== THEME TOGGLE (MIDNIGHT / MORNING) ====================
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  document.getElementById('icon-moon').classList.toggle('hidden', isLight);
  document.getElementById('icon-sun').classList.toggle('hidden', !isLight);
  localStorage.setItem('ena_theme', isLight ? 'light' : 'dark');
}

// ==================== INITIALIZE ====================
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('ena_theme') === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('icon-moon').classList.add('hidden');
    document.getElementById('icon-sun').classList.remove('hidden');
  }
  updateVolumeUI(30);
  initDraggableAndResizablePlayer();
  initRandomSelections();
  renderFeaturedTracks();
  renderLibraryTracks();
});



// พิมพ์รหัสลับ "sync" บนคีย์บอร์ดเพื่อเปิด/ปิดโหมดจับเวลาเนื้อเพลง
let secretKeyBuffer = '';

window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key.length !== 1) return;

  secretKeyBuffer = (secretKeyBuffer + e.key.toLowerCase()).slice(-4);

  if (secretKeyBuffer === 'sync') {
    secretKeyBuffer = '';
    const btn = document.getElementById('btn-sync-helper-toggle');
    if (!btn) return;

    const willShow = btn.classList.contains('hidden');
    btn.classList.toggle('hidden', !willShow);

    if (willShow) {
      if (!isLyricsOpen) toggleLyricsPanel(true);
      if (!isSyncHelperOpen) toggleSyncHelper();
    } else {
      if (isSyncHelperOpen) toggleSyncHelper();
    }
  }
});

// ==================== AMBIENT STARDUST & FIREFLIES EFFECT ====================
function initAmbientParticles() {
  const canvas = document.getElementById('ambient-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // ปรับจำนวนละอองดาว/หิ่งห้อยตามขนาดหน้าจอ (ประมาณ 45-65 ดวงกำลังสวย)
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
      // แบ่งเป็น 2 แบบ: ละอองดาวเม็ดเล็ก กับ หิ่งห้อยดวงใหญ่เรืองแสง
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

      // การเคลื่อนที่ลอยเอื่อย ๆ คล้ายหิ่งห้อย
      this.x += this.vx + Math.sin(this.phase * 0.7) * (this.isFirefly ? 0.25 : 0.08);
      this.y += this.vy;

      // แรงดึงดูด/คล้อยตามเมาส์เบา ๆ
      const dx = (mouseX - width / 2) * 0.00015;
      const dy = (mouseY - height / 2) * 0.00015;
      this.x += dx * (this.isFirefly ? 2.2 : 1);
      this.y += dy * (this.isFirefly ? 2.2 : 1);

      // วนกลับมาเมื่อลอยพ้นขอบจอ
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
        // แสงฟุ้งรอบตัวหิ่งห้อย
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

      // แกนกลางของดาว / หิ่งห้อย
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

// เริ่มทำงานเอฟเฟกต์ทันทีเมื่อโหลดหน้าเว็บ
window.addEventListener('DOMContentLoaded', initAmbientParticles);

// เปิดหน้าคลังเพลงพร้อมเลือกหมวดหมู่อารมณ์จาก Footer ทันที
function jumpToMood(mood) {
  navigateTo('library');
  setMoodFilter(mood);
}