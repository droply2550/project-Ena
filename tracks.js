// ==================== DATABASE: CURATED TRACKS & LYRICS ====================
// วิธีใส่เพลงจริง: นำไฟล์ .mp3 ไปวางในโฟลเดอร์ music/ แล้วใส่ชื่อไฟล์ในช่อง audioUrl เช่น "music/song1.mp3"
// วิธีใส่รูปปก: นำไฟล์รูปไปวางในโฟลเดอร์ images/ แล้วใส่ชื่อไฟล์ในช่อง coverUrl เช่น "images/cover1.jpg"

const TRACKS = [
  {
    id: 1,
    category: "J-POP / Late Night",
    mood: "Late Night",
    title: "Engeki",
    jpTitle: "演劇",
    artist: "Nightcord at 25:00",
    description: "ใช้ชีวิตตามบทบาทที่ใครบางคนมอบให้ จนหลงลืมไปว่าตัวตนที่แท้จริงของเราคือใคร",
    duration: "05:06",
    coverUrl: "images/engeki.png",
    audioUrl: "music/Engeki.mp3",
    chords: [[261.63, 329.63, 392.00, 493.88], [220.00, 261.63, 329.63, 392.00]],
    ambience: "city",
    lyrics: `(ครั้งหนึ่ง มีใครบางคนพูดเอาไว้)
Aru toki dareka ga iimashita
或る時誰かが言いました

(ทุกคนต่างมีบทบาทเป็นของตัวเอง)
Minna yakuwari ga aru n da to
みんな役割があるんだと

(ต่างแบ่งปันสิ่งที่แต่ละคนขาดให้แก่กัน)
Tarinai mono o wakachiatte
足りないものを分かち合って

(คอยเติมเต็มซึ่งกันและกัน แล้วใช้ชีวิตต่อไป)
Oginaiatte ikite iru to
補い合って生きていると

(ถ้าเป็นอย่างนั้น ช่องว่างภายในตัวฉัน)
Sore nara watashi no kūhaku wa
それなら私の空白は

(ก็คงมีใครสักคนมาเติมเต็มให้ได้สินะ)
Dareka ga umete kureru hazu de
誰かが埋めてくれる筈で

(ได้ยินฉันไหม คุณใครคนนั้น)
Kikoemasu ka sono dareka-san
聞こえますか その誰かさん

--------------------

(มีใครบางคนพูดกับใครอีกคนว่า)
Dareka ga dareka ni iimashita
誰かが誰かに言いました

(บทบาทของเธอคือแบบนี้)
Kimi no yakuwari wa kō datte
君の役割はこうだって

(“นี่คือคำพูดที่เกิดจากความรัก”)
"Kore wa ai yue no kotoba da" to
「これは愛故の言葉だ」と

(“ทุกคนต่างก็ใช้ชีวิตกันแบบนี้ทั้งนั้น”)
"Minna sō yatte ikiteru" to
「皆そうやって生きてる」と

(ฉันดีใจที่ได้เห็นรอยยิ้มของพวกเขา)
Yorokobu kao ga ureshikutte
喜ぶ顔が嬉しくって

(จึงพยายามอย่างสุดชีวิตเพื่อแสดงบทบาทนั้น)
Hisshi de yaku o enjimashita
必死で役を演じました

(ถึงขั้นลืมแม้กระทั่งวิธีหายใจ)
Kokyū sae mo wasureru hodo
呼吸さえも忘れるほど

--------------------

(สถานที่ทิ้งขยะในตรอกแคบ ๆ)
Rojiura no gomi okiba
路地裏のごみ置き場

(กระเป๋านักเรียนที่ถูกโยนทิ้งอย่างไม่ไยดี)
Zatsu ni suterareta randoseru
雑に捨てられたランドセル

(นิสัยที่แม้แต่ตอนหัวเราะก็ยังต้องคอยระวังสายตาคนรอบข้าง)
Warau toki sura mawari o ki ni suru kuse wa
笑う時すら周りを気にする癖は

(มันเริ่มต้นขึ้นตั้งแต่เมื่อไรกันนะ)
Itsu kara datta kke
いつからだったっけ

--------------------

(หากมีพรเพียงข้อเดียวที่ฉันสามารถขอได้)
Moshimo negai ga tada hitotsu dake
もしも願いがただひとつだけ

(หากมันเป็นจริง ฉันก็อยากให้ทุกอย่างจบลงเสียที)
Kanau naraba owarasetai n da
叶うならば終わらせたいんだ

(การแสดงอันน่าขันนี้)
Kono fuzaketa engeki o
この ふざけた演劇を

(ฉันใช้ชีวิตมาโดยเข้าใจทุกอย่างผิดพลาดมาตลอด)
Machigatta mama ikite kita n da
間違ったまま 生きてきたんだ

(ถึงตอนนี้จะถูกปลดปลอกคอออกแล้วก็ตาม)
Ima sara kubiwa o hazusareta tte
今更首輪を外されたって

(แล้วฉันจะต้องไปที่ไหนกันล่ะ)
Ittai doko e ikeba ii no
一体何処へ行けばいいの

(ฉันเพียงต้องการตัวตนที่เป็นตัวฉันอย่างแท้จริง)
Tada tashika na jibun o hoshita
ただ確かな 自分を欲した

(นี่คือสิ่งตอบแทนของความปรารถนานั้นหรือคะ พระเจ้า)
Sono daishō ga kore desu ka kamisama
その代償がこれですか神様

(ทุกอย่างมันโหดร้ายเกินไปแล้ว ทุกอย่างเลย)
Zenbu hidosugiru yo zenbu
全部酷過ぎるよ全部

(พอแล้วล่ะ ได้โปรดรีบ ๆ)
Mō ii kara sa hayaku
もういいからさ 早く

(ทำให้มันจบลงเสียที)
Owarasete yo
終わらせてよ

--------------------

(โลกใบนี้ถูกสร้างขึ้นจากความไร้เหตุผลของใครบางคน)
Sekai wa dareka no rifujin to
世界は誰かの理不尽と

(และความอดทนอดกลั้นของใครอีกหลายคน)
Dareka no gaman de dekite iru
誰かの我慢で出来ている

(แม้แต่บทบาทอันโหดร้ายที่ถูกยัดเยียดมาให้)
Oshi tsukerareta hidoi yaku mo
押し付けられた酷い役も

(ทุกคนต่างก็พยายามแสดงมันอย่างสุดชีวิต)
Minna hisshi de enjite iru
みんな必死で演じている

(ถ้าเป็นอย่างนั้น ความผิดหวังของฉันเอง)
Sore nara watashi no shitsubō mo
それなら私の失望も

(สักวันก็คงผลิบานเป็นดอกไม้ได้สินะ)
Itsuka wa hana o sakasu hazu de
いつかは花を咲かす筈で

(ฉันเคยเชื่อว่ามันต้องมีความหมาย)
Imi ga aru to shinjite ita
意味があると信じていた

--------------------

(ความปรารถนาเล็ก ๆ น้อย ๆ)
Sasayaka na negaigoto
ささやかな願い事

(ความหวังอันบริสุทธิ์และความฝันถึงอนาคต)
Muku na kibō ya shōrai no yume
無垢な希望や将来の夢

(ว่าหากอธิษฐานสักวันหนึ่งมันจะต้องเป็นจริง)
Inori sae sureba itsuka kanau to
祈りさえすればいつか叶うと

(ใครกันนะที่เป็นคนสอนฉันแบบนั้น)
Dare ni osowattan dakke
誰に教わったんだっけ

--------------------

(หากคุณกำลังมองดูฉันอยู่ที่ไหนสักแห่ง)
Moshimo dokoka de mite iru no nara
もしも何処かで見ているのなら

(ช่วยตั้งชื่อให้ตัวฉันในตอนนี้ที)
Ima no watashi ni namae o tsukete
今の私に名前を付けて

(ฉันไม่รู้แล้วว่าตัวเองเป็นใคร)
Mō wakaranaku natta n da
もう分からなくなったんだ

(ได้โปรดเถอะ อย่าเข้ามาใกล้ฉันเลย)
Onegai dakara konaide kure to
お願いだから 来ないでくれと

(ฉันประสานมือที่สั่นเทาทั้งสองข้างแล้วอธิษฐาน)
Furueta ryōte o awase inotte
震えた両手を合わせ祈って

(แต่ถึงอย่างนั้น เช้าวันใหม่ก็ยังคงมาถึง)
Sore demo asa wa yatte kuru no
それでも朝はやってくるの

(ฉันเพียงต้องการอนาคตที่แน่นอนสักครั้ง)
Tada tashika na mirai o hoshita
ただ確かな 未来を欲した

(ความปรารถนาโง่เขลาเช่นนั้นเลยหรือคะ พระเจ้า)
Sonna ni baka na negai desu ka kamisama
そんなに馬鹿な願いですか神様

(ทุกอย่างมันช่างว่างเปล่าไปหมดแล้ว ทุกสิ่งเลย)
Zenbu mō munashii zenbu
全部もう虚しい全部

(ฉันแค่เหนื่อยล้าเหลือเกิน กับการ)
Tada tsukareta n da iki o
ただ疲れたんだ 息を

(ที่ต้องคอยหายใจต่อไป)
Shitsuzukeru no ga
し続けるのが

--------------------

(ฉันปรารถนาที่จะได้รับความรัก)
Aisaretai to negatte
愛されたいと願って

(และเพื่อให้ได้รับความรัก ฉันกลับทอดทิ้งตัวเอง)
Aisareru tame jibun o sutete
愛される為自分を捨てて

(บนเวทีที่ไม่มีแม้แต่ผู้ชมเหลืออยู่อีกแล้ว)
Mō haya kankyaku mo inai butai no ue de
最早観客もいない舞台の上で

(เสียงหนึ่งได้ดังก้องขึ้นมา)
Koe ga hibiita n da
声が響いたんだ

--------------------

(“ฉันอยู่ตรงนี้นะ” เสียงนั้นกำลังร่ำไห้)
"Watashi wa koko da yo" to naite iru
「私はここだよ」と泣いている

(“ได้โปรดสังเกตเห็นฉันที” เสียงนั้นกำลังกรีดร้อง)
"Dōka kizuite" to sakende iru
「どうか気付いて」と叫んでいる

(เป็นเสียงที่ไม่มีใครได้ยิน มีเพียงฉันเท่านั้นที่เข้าใจ)
Dare ni mo kikoenai watashi ni shika wakaranai
誰にも聞こえない 私にしか分からない

(มันคือเสียงของ “ตัวฉัน” เอง)
"Watashi" no koe datta
"わたし"の声だった

--------------------

(ฉันยังคงหายใจต่อไป ทั้งที่ใช้ชีวิตมาอย่างผิดพลาด)
Machigatta mama iki o tsuzuke
間違ったまま 息をし続け

(และเพิ่งมารู้ตัวเอาตอนนี้เอง)
Ima sara ki ga tsuite shimatta n da
今更気が付いてしまったんだ

(ว่าที่แห่งนี้ไม่มีที่ว่างสำหรับฉันอีกต่อไปแล้ว)
Ibasho wa mō koko ni wa nai to
居場所はもうここには無いと

(ฉันเพียงปรารถนาตัวตนที่เป็นตัวฉันอย่างแท้จริง)
Tada tashika na jibun o hoshite
ただ確かな 自分を欲して

(ณ ปลายทางที่ฉันหนีเข้าไปหลบซ่อน ฉันได้พบแสงเล็ก ๆ)
Nigekonda saki de mitsuketa chiisana
逃げ込んだ先で見つけた小さな

(แสงสว่างที่จะช่วยคลายคำสาปนั้นให้มลายไป)
Noroi o toku ano akari o
呪いを解くあの灯りを

(ตอนนี้ ฉันจะทำให้การแสดงบนเวทีของฉันจบลงเสียที)
Ima watashi no butai o owaraseru kara
今 私の舞台を終わらせるから

(จงลืมตาตื่นขึ้นมา)
Me o samashite
目を覚まして

(อา...)
Ah
Ah

สรุปความหมายเพลง
เพลงนี้ใช้ภาพของ ละครเวทีและบทบาทที่ถูกกำหนด เป็นสัญลักษณ์ของการใช้ชีวิตตามความคาดหวังของคนอื่น
เชื่อว่าทุกคนต่างมีบทบาทของตัวเอง และพยายามแสดงบทบาทที่ได้รับมอบหมายอย่างดีที่สุด เพราะคิดว่าหากทำให้คนอื่นมีความสุข ตัวเองก็จะได้รับความรักกลับมา แต่สุดท้ายกลับหลงลืมไปว่าตัวเองเป็นใคร`
  ,syncedLyrics: [
  { time: 1.5, text: `(ครั้งหนึ่ง มีใครบางคนพูดเอาไว้)
Aru toki dareka ga iimashita
或る時誰かが言いました` },
  { time: 4.6, text: `(ทุกคนต่างมีบทบาทเป็นของตัวเอง)
Minna yakuwari ga aru n da to
みんな役割があるんだと` },
  { time: 7.5, text: `(ต่างแบ่งปันสิ่งที่แต่ละคนขาดให้แก่กัน)
Tarinai mono o wakachiatte
足りないものを分かち合って` },
  { time: 10.3, text: `(คอยเติมเต็มซึ่งกันและกัน แล้วใช้ชีวิตต่อไป)
Oginaiatte ikite iru to
補い合って生きていると` },
  { time: 12.9, text: `(ถ้าเป็นอย่างนั้น ช่องว่างภายในตัวฉัน)
Sore nara watashi no kūhaku wa
それなら私の空白は` },
  { time: 15.7, text: `(ก็คงมีใครสักคนมาเติมเต็มให้ได้สินะ)
Dareka ga umete kureru hazu de
誰かが埋めてくれる筈で` },
  { time: 18.7, text: `(ได้ยินฉันไหม คุณใครคนนั้น)
Kikoemasu ka sono dareka-san
聞こえますか その誰かさん` },
  { time: 20.6, text: `(มีใครบางคนพูดกับใครอีกคนว่า)
Dareka ga dareka ni iimashita
誰かが誰かに言いました` },
  { time: 39.9, text: `(บทบาทของเธอคือแบบนี้)
Kimi no yakuwari wa kō datte
君の役割はこうだって` },
  { time: 42.8, text: `(“นี่คือคำพูดที่เกิดจากความรัก”)
"Kore wa ai yue no kotoba da" to
「これは愛故の言葉だ」と` },
  { time: 45.5, text: `(“ทุกคนต่างก็ใช้ชีวิตกันแบบนี้ทั้งนั้น”)
"Minna sō yatte ikiteru" to
「皆そうやって生きてる」と` },
  { time: 48, text: `(ฉันดีใจที่ได้เห็นรอยยิ้มของพวกเขา)
Yorokobu kao ga ureshikutte
喜ぶ顔が嬉しくって` },
  { time: 50.8, text: `(จึงพยายามอย่างสุดชีวิตเพื่อแสดงบทบาทนั้น)
Hisshi de yaku o enjimashita
必死で役を演じました` },
  { time: 53.1, text: `(ถึงขั้นลืมแม้กระทั่งวิธีหายใจ)
Kokyū sae mo wasureru hodo
呼吸さえも忘れるほど` },
  { time: 58.5, text: `(สถานที่ทิ้งขยะในตรอกแคบ ๆ)
Rojiura no gomi okiba
路地裏のごみ置き場` },
  { time: 61.1, text: `(กระเป๋านักเรียนที่ถูกโยนทิ้งอย่างไม่ไยดี)
Zatsu ni suterareta randoseru
雑に捨てられたランドセル` },
  { time: 64, text: `(นิสัยที่แม้แต่ตอนหัวเราะก็ยังต้องคอยระวังสายตาคนรอบข้าง)
Warau toki sura mawari o ki ni suru kuse wa
笑う時すら周りを気にする癖は` },
  { time: 65.8, text: `(มันเริ่มต้นขึ้นตั้งแต่เมื่อไรกันนะ)
Itsu kara datta kke
いつからだったっけ` },
  { time: 69.3, text: `(หากมีพรเพียงข้อเดียวที่ฉันสามารถขอได้)
Moshimo negai ga tada hitotsu dake
もしも願いがただひとつだけ` },
  { time: 72.1, text: `(หากมันเป็นจริง ฉันก็อยากให้ทุกอย่างจบลงเสียที)
Kanau naraba owarasetai n da
叶うならば終わらせたいんだ` },
  { time: 75, text: `(การแสดงอันน่าขันนี้)
Kono fuzaketa engeki o
この ふざけた演劇を` },
  { time: 76.4, text: `(ฉันใช้ชีวิตมาโดยเข้าใจทุกอย่างผิดพลาดมาตลอด)
Machigatta mama ikite kita n da
間違ったまま 生きてきたんだ` },
  { time: 79.6, text: `(ถึงตอนนี้จะถูกปลดปลอกคอออกแล้วก็ตาม)
Ima sara kubiwa o hazusareta tte
今更首輪を外されたって` },
  { time: 83.9, text: `(แล้วฉันจะต้องไปที่ไหนกันล่ะ)
Ittai doko e ikeba ii no
一体何処へ行けばいいの` },
  { time: 88.2, text: `(ฉันเพียงต้องการตัวตนที่เป็นตัวฉันอย่างแท้จริง)
Tada tashika na jibun o hoshita
ただ確かな 自分を欲した` },
  { time: 93.8, text: `(นี่คือสิ่งตอบแทนของความปรารถนานั้นหรือคะ พระเจ้า)
Sono daishō ga kore desu ka kamisama
その代償がこれですか神様` },
  { time: 99.6, text: `(ทุกอย่างมันโหดร้ายเกินไปแล้ว ทุกอย่างเลย)
Zenbu hidosugiru yo zenbu
全部酷過ぎるよ全部` },
  { time: 101.9, text: `(พอแล้วล่ะ ได้โปรดรีบ ๆ)
Mō ii kara sa hayaku
もういいからさ 早く` },
  { time: 104.7, text: `(ทำให้มันจบลงเสียที)
Owarasete yo
終わらせてよ` },
  { time: 119.3, text: `(โลกใบนี้ถูกสร้างขึ้นจากความไร้เหตุผลของใครบางคน)
Sekai wa dareka no rifujin to
世界は誰かの理不尽と` },
  { time: 121.4, text: `(และความอดทนอดกลั้นของใครอีกหลายคน)
Dareka no gaman de dekite iru
誰かの我慢で出来ている` },
  { time: 124.5, text: `(แม้แต่บทบาทอันโหดร้ายที่ถูกยัดเยียดมาให้)
Oshi tsukerareta hidoi yaku mo
押し付けられた酷い役も` },
  { time: 127.1, text: `(ทุกคนต่างก็พยายามแสดงมันอย่างสุดชีวิต)
Minna hisshi de enjite iru
みんな必死で演じている` },
  { time: 129.8, text: `(ถ้าเป็นอย่างนั้น ความผิดหวังของฉันเอง)
Sore nara watashi no shitsubō mo
それなら私の失望も` },
  { time: 132.3, text: `(สักวันก็คงผลิบานเป็นดอกไม้ได้สินะ)
Itsuka wa hana o sakasu hazu de
いつかは花を咲かす筈で` },
  { time: 135.2, text: `(ฉันเคยเชื่อว่ามันต้องมีความหมาย)
Imi ga aru to shinjite ita
意味があると信じていた` },
  { time: 140.5, text: `(ความปรารถนาเล็ก ๆ น้อย ๆ)
Sasayaka na negaigoto
ささやかな願い事` },
  { time: 142.8, text: `(ความหวังอันบริสุทธิ์และความฝันถึงอนาคต)
Muku na kibō ya shōrai no yume
無垢な希望や将来の夢` },
  { time: 145.6, text: `(ว่าหากอธิษฐานสักวันหนึ่งมันจะต้องเป็นจริง)
Inori sae sureba itsuka kanau to
祈りさえすればいつか叶うと` },
  { time: 150.7, text: `(ใครกันนะที่เป็นคนสอนฉันแบบนั้น)
Dare ni osowattan dakke
誰に教わったんだっけ` },
  { time: 154.5, text: `(หากคุณกำลังมองดูฉันอยู่ที่ไหนสักแห่ง)
Moshimo dokoka de mite iru no nara
もしも何処かで見ているのなら` },
  { time: 156, text: `(ช่วยตั้งชื่อให้ตัวฉันในตอนนี้ที)
Ima no watashi ni namae o tsukete
今の私に名前を付けて` },
  { time: 157.5, text: `(ฉันไม่รู้แล้วว่าตัวเองเป็นใคร)
Mō wakaranaku natta n da
もう分からなくなったんだ` },
  { time: 162.2, text: `(ได้โปรดเถอะ อย่าเข้ามาใกล้ฉันเลย)
Onegai dakara konaide kure to
お願いだから 来ないでくれと` },
  { time: 167.2, text: `(ฉันประสานมือที่สั่นเทาทั้งสองข้างแล้วอธิษฐาน)
Furueta ryōte o awase inotte
震えた両手を合わせ祈って` },
  { time: 170.5, text: `(แต่ถึงอย่างนั้น เช้าวันใหม่ก็ยังคงมาถึง)
Sore demo asa wa yatte kuru no
それでも朝はやってくるの` },
  { time: 173.9, text: `(ฉันเพียงต้องการอนาคตที่แน่นอนสักครั้ง)
Tada tashika na mirai o hoshita
ただ確かな 未来を欲した` },
  { time: 178, text: `(ความปรารถนาโง่เขลาเช่นนั้นเลยหรือคะ พระเจ้า)
Sonna ni baka na negai desu ka kamisama
そんなに馬鹿な願いですか神様` },
  { time: 181.3, text: `(ทุกอย่างมันช่างว่างเปล่าไปหมดแล้ว ทุกสิ่งเลย)
Zenbu mō munashii zenbu
全部もう虚しい全部` },
  { time: 183.8, text: `(ฉันแค่เหนื่อยล้าเหลือเกิน กับการ)
Tada tsukareta n da iki o
ただ疲れたんだ 息を` },
  { time: 187.7, text: `(ที่ต้องคอยหายใจต่อไป)
Shitsuzukeru no ga
し続けるのが` },
  { time: 200.7, text: `(ฉันปรารถนาที่จะได้รับความรัก)
Aisaretai to negatte
愛されたいと願って` },
  { time: 203.3, text: `(และเพื่อให้ได้รับความรัก ฉันกลับทอดทิ้งตัวเอง)
Aisareru tame jibun o sutete
愛される為自分を捨てて` },
  { time: 205.9, text: `(บนเวทีที่ไม่มีแม้แต่ผู้ชมเหลืออยู่อีกแล้ว)
Mō haya kankyaku mo inai butai no ue de
最早観客もいない舞台の上で` },
  { time: 209.3, text: `(เสียงหนึ่งได้ดังก้องขึ้นมา)
Koe ga hibiita n da
声が響いたんだ` },
  { time: 212.2, text: `(“ฉันอยู่ตรงนี้นะ” เสียงนั้นกำลังร่ำไห้)
"Watashi wa koko da yo" to naite iru
「私はここだよ」と泣いている` },
  { time: 214, text: `(“ได้โปรดสังเกตเห็นฉันที” เสียงนั้นกำลังกรีดร้อง)
"Dōka kizuite" to sakende iru
「どうか気付いて」と叫んでいる` },
  { time: 216.4, text: `(เป็นเสียงที่ไม่มีใครได้ยิน มีเพียงฉันเท่านั้นที่เข้าใจ)
Dare ni mo kikoenai watashi ni shika wakaranai
誰にも聞こえない 私にしか分からない` },
  { time: 219.7, text: `(มันคือเสียงของ “ตัวฉัน” เอง)
"Watashi" no koe datta
"わたし"の声だった` },
  { time: 223.8, text: `(ฉันยังคงหายใจต่อไป ทั้งที่ใช้ชีวิตมาอย่างผิดพลาด)
Machigatta mama iki o tsuzuke
間違ったまま 息をし続け` },
  { time: 232.2, text: `(และเพิ่งมารู้ตัวเอาตอนนี้เอง)
Ima sara ki ga tsuite shimatta n da
今更気が付いてしまったんだ` },
  { time: 241.2, text: `(ว่าที่แห่งนี้ไม่มีที่ว่างสำหรับฉันอีกต่อไปแล้ว)
Ibasho wa mō koko ni wa nai to
居場所はもうここには無いと` },
  { time: 243.7, text: `(ฉันเพียงปรารถนาตัวตนที่เป็นตัวฉันอย่างแท้จริง)
Tada tashika na jibun o hoshite
ただ確かな 自分を欲して` },
  { time: 249.1, text: `(ณ ปลายทางที่ฉันหนีเข้าไปหลบซ่อน ฉันได้พบแสงเล็ก ๆ)
Nigekonda saki de mitsuketa chiisana
逃げ込んだ先で見つけた小さな` },
  { time: 252.4, text: `(แสงสว่างที่จะช่วยคลายคำสาปนั้นให้มลายไป)
Noroi o toku ano akari o
呪いを解くあの灯りを` },
  { time: 254.8, text: `(ตอนนี้ ฉันจะทำให้การแสดงบนเวทีของฉันจบลงเสียที)
Ima watashi no butai o owaraseru kara
今 私の舞台を終わらせるから` },
  { time: 257.8, text: `(จงลืมตาตื่นขึ้นมา)
Me o samashite
目を覚まして` },
  { time: 270.4, text: `(อา...)
Ah
Ah` }
],
},
  {
    id: 2,
    category: "J-ROCK / Warmth",
    mood: "Warmth",
    title: "Itsuka",
    jpTitle: "いつか",
    artist: "Arekun",
    description: "แม้วันนี้จะเต็มไปด้วยความทรงจำที่เจ็บปวด และวันพรุ่งนี้อาจไม่เป็นอย่างที่หวัง แต่ขอเพียงมีชีวิตต่อไป เพื่อพบกับวันที่เราจะยิ้มให้กับเรื่องราวเหล่านั้นได้อีกครั้ง",
    duration: "04:19",
    coverUrl: "images/Itsuka.jpg",
    audioUrl: "music/Itsuka.mp3",
    chords: [[174.61, 220.00, 261.63, 329.63], [196.00, 246.94, 293.66, 349.23]],
    ambience: "waves",
    lyrics: `(วันเวลาอันโหดร้ายยังคงไหลผ่านไป)
Zankoku ni hibi wa nagarete iku
残酷に日々は流れていく

(ดวงจันทร์ที่ส่องแสงอย่างแผ่วเบา วันนี้ก็ยังคงงดงาม)
Awaku terasu tsuki wa kyou mo kirei de
淡く照らす月は今日も綺麗で

(เวลาผ่านพ้นไปอย่างอึดอัดคับแคบ)
Kyuukutsu ni jikan wa sugite iku
窮屈に時間は過ぎていく

(ตอนนี้ฉันเพียงกำลังตามหาสถานที่ที่เหมาะกับตัวเอง)
Niau ibasho o ima wa sagashiteru dake
似合う居場所を今は探してるだけ

--------------------

(อย่าปล่อยให้ตัวเองถูกกลืนหายไป อย่าเปลี่ยนแปลงไปจากเดิม)
Somaranaide kawaranaide
染まらないで 変わらないで

(อย่าหวาดกลัวเลย เงยหน้ามองท้องฟ้าสิ)
Kowagaranaide sora o miagete
怖がらないで 空を見上げて

--------------------

(แม้ความทรงจำอันแสนเจ็บปวดจะบีบรัดหัวใจ)
Kurushii omoide ga mune o shimetsukeru kedo
苦しい思い出が胸を締め付けるけど

(แม้วันเวลาที่เป็นไปดั่งใจหวังจะไม่ได้มาถึงง่าย ๆ)
Omoidoori no hibi wa sou konai kedo
思い通りの日々はそうこないけど

(เพื่อที่จะได้มองเห็นแสงสว่างของวันหนึ่ง... วันที่รอคอยวันนั้น)
Itsuka, sono itsuka no akari o miru tame ni
いつか、そのいつかの明かりを見るために

(จงมีชีวิตอยู่กับปัจจุบัน แล้วประคองลมหายใจให้ดำเนินต่อไป)
Ima o ikiyou iki o tsunagou
今を生きよう 息を繋ごう

--------------------

(วันแล้ววันเล่า อย่างไร้จุดหมายและไร้ทิศทาง)
Tantan to tada bakuzen to
淡々とただ漠然と

(แม้แต่ทิวทัศน์ที่เคยวิ่งผ่านและมองเห็น)
Hashitte mita keshiki mo hora
走って見た景色もほら

(ก็ค่อย ๆ เปลี่ยนแปลงไปเช่นกัน)
Utsurikawatte iku
移り変わっていく

(เพราะท้ายที่สุดแล้ว ทุกสิ่งล้วนเป็นสิ่งที่จะค่อย ๆ ห่างไกลออกไป)
Itsuka wa toonoi te iku mono dakara
いつかは遠のいていくものだから

(อย่ามัวแต่จมอยู่กับการร่ำลาเลย)
Sayonara ni hitatte bakari inaide
さよならに浸ってばかりいないで

(จงส่องแสงให้กับเส้นทางใต้ฝ่าเท้า เพื่อไม่ให้ลืมมันไป ไม่ว่าอย่างไรก็ตาม)
Ashimoto o terasou douka wasurenai you ni
足元を照らそう どうか忘れないように

--------------------

(แม้จะหกล้ม หรือร้องไห้ ก็ไม่เป็นไร)
Korondatte naitatte ii
転んだって 泣いたっていい

(ขอเพียงเพื่อให้เธอยังคงเป็นตัวของตัวเองได้)
Tada kimi ga kimi de irareru tame ni
ただ君が君でいられるために

--------------------

(แม้ความทรงจำอันแสนเจ็บปวดจะบีบรัดหัวใจ)
Kurushii omoide ga mune o shimetsukeru kedo
苦しい思い出が胸を締め付けるけど

(แม้วันเวลาที่เป็นไปดั่งใจหวังจะไม่ได้มาถึงง่าย ๆ)
Omoidoori no hibi wa sou konai kedo
思い通りの日々はそうこないけど

(เพื่อที่จะได้มองเห็นแสงสว่างของวันหนึ่ง... วันที่รอคอยวันนั้น)
Itsuka, sono itsuka no akari o miru tame ni
いつか、そのいつかの明かりを見るために

(จงมีชีวิตอยู่กับปัจจุบัน แล้วสานต่อสายใยแห่งชีวิต)
Ima o ikiyou inochi o tsunagou
今を生きよう 命を繋ごう

--------------------

(ความรู้สึกทั้งหมดที่หวนกลับมา จะค่อย ๆ เปลี่ยนเป็นรอยยิ้ม)
Yomigaeru omoi no subete ga egao ni kawatte
蘇る思いの全てが笑顔に変わって

(วันเวลาที่หมุนเวียนซ้ำไปซ้ำมา จากนี้จะเริ่มมีสีสันขึ้นมา)
Kurikaesu hibi ni kore kara iro ga tsuite
繰り返す日々にこれから色がついて

(ขอให้เป็นวันนี้ที่สักวันหนึ่ง เราจะมองย้อนกลับมาแล้วรู้สึกว่าปัจจุบันช่างงดงาม)
Itsuka ima ga utsukushii to omoeru kyou de
いつか 今が美しいと思える今日で

(ขอให้หัวใจได้รับการเติมเต็ม และขอให้เธอยังคงเป็นตัวของตัวเอง)
Mitaseru you ni kimi de irareru you ni
満たせるように 君でいられるように

--------------------

(แม้ความทรงจำอันแสนเจ็บปวดจะบีบรัดหัวใจ)
Kurushii omoide ga mune o shimetsukeru kedo
苦しい思い出が胸を締め付けるけど

(แม้วันเวลาที่เป็นไปดั่งใจหวังจะไม่ได้มาถึงง่าย ๆ)
Omoidoori no hibi wa sou konai kedo
思い通りの日々はそうこないけど

(เพื่อที่จะได้มองเห็นแสงสว่างของวันหนึ่ง... วันที่รอคอยวันนั้น)
Itsuka, sono itsuka no akari o miru tame ni
いつか、そのいつかの明かりを見るために

(จงมีชีวิตอยู่กับปัจจุบัน แล้วประคองลมหายใจให้ดำเนินต่อไป)
Ima o ikiyou iki o tsunagou
今を生きよう 息を繋ごう

สรุปความหมายเพลง
เพลงนี้พูดถึงการใช้ชีวิตท่ามกลางวันเวลาที่โหดร้าย ความทรงจำที่เจ็บปวด และความรู้สึกว่าโลกใบนี้อาจไม่มีพื้นที่ที่เหมาะสมสำหรับตัวเรา
แต่ถึงอย่างนั้น เพลงก็ไม่ได้บอกให้เราต้องเข้มแข็งตลอดเวลา ไม่จำเป็นต้องฝืนยิ้ม หรือทำเหมือนไม่เคยเจ็บปวด เพราะแม้จะหกล้ม แม้จะร้องไห้ ก็ไม่เป็นไร ขอเพียงอย่าสูญเสียตัวตนของตัวเองไป`
 ,syncedLyrics: [
  { time: 14.3, text: `(วันเวลาอันโหดร้ายยังคงไหลผ่านไป)
Zankoku ni hibi wa nagarete iku
残酷に日々は流れていく` },
  { time: 19.9, text: `(ดวงจันทร์ที่ส่องแสงอย่างแผ่วเบา วันนี้ก็ยังคงงดงาม)
Awaku terasu tsuki wa kyou mo kirei de
淡く照らす月は今日も綺麗で` },
  { time: 25.4, text: `(เวลาผ่านพ้นไปอย่างอึดอัดคับแคบ)
Kyuukutsu ni jikan wa sugite iku
窮屈に時間は過ぎていく` },
  { time: 31.5, text: `(ตอนนี้ฉันเพียงกำลังตามหาสถานที่ที่เหมาะกับตัวเอง)
Niau ibasho o ima wa sagashiteru dake
似合う居場所を今は探してるだけ` },
  { time: 36.3, text: `(อย่าปล่อยให้ตัวเองถูกกลืนหายไป อย่าเปลี่ยนแปลงไปจากเดิม)
Somaranaide kawaranaide
染まらないで 変わらないで` },
  { time: 42.2, text: `(อย่าหวาดกลัวเลย เงยหน้ามองท้องฟ้าสิ)
Kowagaranaide sora o miagete
怖がらないで 空を見上げて` },
  { time: 49.2, text: `(แม้ความทรงจำอันแสนเจ็บปวดจะบีบรัดหัวใจ)
Kurushii omoide ga mune o shimetsukeru kedo
苦しい思い出が胸を締め付けるけど` },
  { time: 57.8, text: `(แม้วันเวลาที่เป็นไปดั่งใจหวังจะไม่ได้มาถึงง่าย ๆ)
Omoidoori no hibi wa sou konai kedo
思い通りの日々はそうこないけど` },
  { time: 64.1, text: `(เพื่อที่จะได้มองเห็นแสงสว่างของวันหนึ่ง... วันที่รอคอยวันนั้น)
Itsuka, sono itsuka no akari o miru tame ni
いつか、そのいつかの明かりを見るために` },
  { time: 70.2, text: `(จงมีชีวิตอยู่กับปัจจุบัน แล้วประคองลมหายใจให้ดำเนินต่อไป)
Ima o ikiyou iki o tsunagou
今を生きよう 息を繋ごう` },
  { time: 89.8, text: `(วันแล้ววันเล่า อย่างไร้จุดหมายและไร้ทิศทาง)
Tantan to tada bakuzen to
淡々とただ漠然と` },
  { time: 92.7, text: `(แม้แต่ทิวทัศน์ที่เคยวิ่งผ่านและมองเห็น)
Hashitte mita keshiki mo hora
走って見た景色もほら` },
  { time: 96.1, text: `(ก็ค่อย ๆ เปลี่ยนแปลงไปเช่นกัน)
Utsurikawatte iku
移り変わっていく` },
  { time: 99.5, text: `(เพราะท้ายที่สุดแล้ว ทุกสิ่งล้วนเป็นสิ่งที่จะค่อย ๆ ห่างไกลออกไป)
Itsuka wa toonoi te iku mono dakara
いつかは遠のいていくものだから` },
  { time: 102.7, text: `(อย่ามัวแต่จมอยู่กับการร่ำลาเลย)
Sayonara ni hitatte bakari inaide
さよならに浸ってばかりいないで` },
  { time: 104.1, text: `(จงส่องแสงให้กับเส้นทางใต้ฝ่าเท้า เพื่อไม่ให้ลืมมันไป ไม่ว่าอย่างไรก็ตาม)
Ashimoto o terasou douka wasurenai you ni
足元を照らそう どうか忘れないように` },
  { time: 113.3, text: `(แม้จะหกล้ม หรือร้องไห้ ก็ไม่เป็นไร)
Korondatte naitatte ii
転んだって 泣いたっていい` },
  { time: 116.4, text: `(ขอเพียงเพื่อให้เธอยังคงเป็นตัวของตัวเองได้)
Tada kimi ga kimi de irareru tame ni
ただ君が君でいられるために` },
  { time: 126, text: `(แม้ความทรงจำอันแสนเจ็บปวดจะบีบรัดหัวใจ)
Kurushii omoide ga mune o shimetsukeru kedo
苦しい思い出が胸を締め付けるけど` },
  { time: 130.2, text: `(แม้วันเวลาที่เป็นไปดั่งใจหวังจะไม่ได้มาถึงง่าย ๆ)
Omoidoori no hibi wa sou konai kedo
思い通りの日々はそうこないけど` },
  { time: 137.8, text: `(เพื่อที่จะได้มองเห็นแสงสว่างของวันหนึ่ง... วันที่รอคอยวันนั้น)
Itsuka, sono itsuka no akari o miru tame ni
いつか、そのいつかの明かりを見るために` },
  { time: 144.1, text: `(จงมีชีวิตอยู่กับปัจจุบัน แล้วสานต่อสายใยแห่งชีวิต)
Ima o ikiyou inochi o tsunagou
今を生きよう 命を繋ごう` },
  { time: 175.1, text: `(ความรู้สึกทั้งหมดที่หวนกลับมา จะค่อย ๆ เปลี่ยนเป็นรอยยิ้ม)
Yomigaeru omoi no subete ga egao ni kawatte
蘇る思いの全てが笑顔に変わって` },
  { time: 180.7, text: `(วันเวลาที่หมุนเวียนซ้ำไปซ้ำมา จากนี้จะเริ่มมีสีสันขึ้นมา)
Kurikaesu hibi ni kore kara iro ga tsuite
繰り返す日々にこれから色がついて` },
  { time: 186.8, text: `(ขอให้เป็นวันนี้ที่สักวันหนึ่ง เราจะมองย้อนกลับมาแล้วรู้สึกว่าปัจจุบันช่างงดงาม)
Itsuka ima ga utsukushii to omoeru kyou de
いつか 今が美しいと思える今日で` },
  { time: 193.4, text: `(ขอให้หัวใจได้รับการเติมเต็ม และขอให้เธอยังคงเป็นตัวของตัวเอง)
Mitaseru you ni kimi de irareru you ni
満たせるように 君でいられるように` },
  { time: 199.7, text: `(แม้ความทรงจำอันแสนเจ็บปวดจะบีบรัดหัวใจ)
Kurushii omoide ga mune o shimetsukeru kedo
苦しい思い出が胸を締め付けるけど` },
  { time: 205.2, text: `(แม้วันเวลาที่เป็นไปดั่งใจหวังจะไม่ได้มาถึงง่าย ๆ)
Omoidoori no hibi wa sou konai kedo
思い通りの日々はそうこないけど` },
  { time: 211.4, text: `(เพื่อที่จะได้มองเห็นแสงสว่างของวันหนึ่ง... วันที่รอคอยวันนั้น)
Itsuka, sono itsuka no akari o miru tame ni
いつか、そのいつかの明かりを見るために` },
  { time: 217.5, text: `(จงมีชีวิตอยู่กับปัจจุบัน แล้วประคองลมหายใจให้ดำเนินต่อไป)
Ima o ikiyou iki o tsunagou
今を生きよう 息を繋ごう` }
],
},
  {
    id: 3,
    category: "ALTERNATIVE ROCK / WARMTH",
    mood: "Warmth",
    title: "more than words",
    jpTitle: "more than words",
    artist: "Hitsujibungaku ",
    description: "บางครั้งคำพูดก็ไม่อาจถ่ายทอดทุกความรู้สึกได้หมด แต่ถึงอย่างนั้น เราก็ยังพยายามรักตัวเอง และก้าวผ่านค่ำคืนที่ยากลำบากไปให้ได้",
    duration: "04:58",
    coverUrl: "images/mtw1.jpg",
    audioUrl: "music/mtw.mp3",
    chords: [[293.66, 349.23, 440.00, 523.25], [196.00, 246.94, 293.66, 392.00]],
    ambience: "warm",
    lyrics: `(ฉันเอาแต่ย้อนนึกถึงคำพูดที่เขาเคยพูด)
Kare ga itta kotoba nando mo omoikaeshite
彼が言った言葉 何度も思い返して

(ฉันตอบกลับไปได้ดีหรือเปล่านะ? คิดวนไปวนมาไม่รู้จบ)
Umaku henji dekita ka? Guruguruguru suru
上手く返事できたか? グルグルグルする

(ตั้งแต่เมื่อไรไม่รู้ การเลือกคำตอบที่ถูกต้องกลับกลายเป็นเรื่องง่ายขึ้น)
Itsu kara ka seikai o erabu no ga raku ni natte
いつからか正解を選ぶのが楽になって

(ฉันคอยกลบเกลื่อนจังหวะอันไร้เดียงสาที่อยากพูดความจริงในใจอย่างขอไปที)
Honne iu mujaki na peesu tekitou ni gomakashite iru
本音言う無邪気なペース適当に誤魔化している

(เพราะถึงจะหัวเราะแล้วบอกว่า “อะไรก็ช่างมันเถอะ”)
Datte dou datte ii tte waratte mo
だって どうだっていいって笑っても

(ฉันก็ยัง...)
Mada jibun no koto o
まだ自分のことを

(ดิ้นรนอยากจะรักตัวเองอยู่ไม่ใช่หรือ?)
Aishitai n datte mogaite iru n deshou?
愛したいんだってもがいているんでしょう?

(เรื่องราวที่เต็มไปด้วยความผิดพลาดมากมาย...)
Kitto machigai darake no sutoorii
きっと 間違いだらけのストーリー

(แม้ในค่ำคืนที่แทบจะจมดิ่งลงไป ก็ไม่ได้มีเธออยู่เพียงลำพัง)
Obore sou na yoru mo hitori ja nai kara
溺れそうな夜も一人じゃないから

(ฉันจะอยู่เคียงข้างเธอ)
Just be by your side, huh, huh, yeah

(และมอบให้เธอมากกว่าถ้อยคำ)
And give you more than words

(มอบให้เธอมากกว่าถ้อยคำ)
Give you more than words

Oh, oh, ah

Eh, yeah

--------------------

(ฉันลบอีเมลที่เขียนค้างไว้ แล้วกลับไปเริ่มต้นใหม่อีกครั้ง)
Kakikake no meeru furidashi ni modos hite
書きかけのメール 振り出しに戻して

(ฉันคิดวนไปวนมา เพราะตัวเองที่ไม่อาจตัดสินใจให้เด็ดขาดได้)
Kimekirenai jibun ni guruguruguru suru
決めきれない自分にグルグルグルする

(ในโลกที่มีเรื่องมากมายเหลือเกินที่เราไม่เข้าใจ)
Wakaranai koto ga oosugiru sekai ja
分からないことが多すぎる世界じゃ

(แม้จะแสร้งทำเป็นฉลาด ก็ยังต้องเจ็บปวดอยู่ดี)
Kashikoi furi o shite mo kizutsuitari suru
賢いふりをしても傷ついたりする

(ตั้งแต่เมื่อไรไม่รู้ ฉันกลับเอาแต่พยายามหลีกเลี่ยงความผิดพลาด)
Itsu kara ka shippai o sakeru no ni muki ni natte
いつからか失敗を避けるのにむきになって

(ละทิ้งสิ่งที่ตัวเองต้องการจริง ๆ แล้วก็ไม่รู้ว่าตัวเองอยากทำอะไร)
Hontou ni hoshii mono akiramete nani ga shitai ka
本当に欲しいもの諦めて 何がしたいか

(มองไม่เห็น ปล่อยให้มันผ่านไป จนเก่งขึ้นมาเพียงเรื่องการสิ้นหวัง)
Mienakute misugoshite zetsubou dake tokui ni natte
見えなくて見過ごして 絶望だけ得意になって

(จะตัดสินว่าทุกอย่างสายเกินไปแล้ว ก็ยังเร็วเกินไปหน่อยนะ)
Sore o mou teokure to kimeru ni wa chotto hayai ne
それをもう手遅れと決めるにはちょっと早いね

(เพราะแม้ในเวลาที่ทำอะไรไม่ได้เลย...)
Datte dou shiyou mo nai toki demo
だって どうしようもないときでも

(ฉันก็ยัง...)
Mada jibun no koto o
まだ自分のことを

(รู้อยู่ไม่ใช่หรือว่าอยากจะเชื่อมั่นในตัวเอง?)
Shinjitai n datte kizuite iru n deshou?
信じたいんだって気づいているんでしょう?

(หากเธอเองก็มีค่ำคืนที่ต้องเดินผ่าน...)
Kitto onaji you na itami o
きっと 同じような痛みを

(ความเจ็บปวดแบบเดียวกันนี้...)
Tadoru yo ga kimi ni mo aru nara
辿ってく夜がきみにもあるなら

(ฉันจะอยู่เคียงข้างเธอ)
Just be by your side, huh, huh, yeah

(และมอบให้เธอมากกว่าถ้อยคำ)
And give you more than words

(มอบให้เธอมากกว่าถ้อยคำ)
Give you more than words

--------------------

(จากนี้ไป ฉันจะไม่ยอมปล่อยมือจากสิ่งใดเลย)
Kono saki wa nani hitotsu yuzurenai
この先は何一つ譲れない

(จะทุ่มเทอย่างสุดกำลัง)
Zenryoku de (I get it now, get it now)
全力で (I get it now, get it now)

(แสงไฟที่ส่องสว่างแม้ในความมืดมิดแบบไหนก็ตาม)
Donna kurayami datte terasu raito
どんな暗闇だって照らすライト

(การที่มีเธออยู่ตรงนี้)
Anata ga iru koto
あなたがいること

(แม้จะล้มลงจนเปื้อนโคลนไปทั้งตัว ก็ช่วยไม่ได้หรอกนะ)
Korondatte dorodara ke mo shikata nai
転んで泥だらけも仕方ない

(ฉันหยุดไม่ได้แล้ว)
Yamerannai (I get it now, get it now)
やめらんない (I get it now, get it now)

(ถ้ามัวแต่มองว่าคุ้มหรือไม่คุ้ม ก็ไม่มีอะไรเกิดขึ้นหรอก)
Sontoku mite cha nani mo umarenai
損得見てちゃ何も生まれない

(เรายังไปต่อได้อีกไกล มุ่งหน้าสู่อิสรภาพกันเถอะ)
Mada mada we can head to freedom
まだまだ we can head to freedom

(ฉันอยากเดิมพันกับช่วงเวลาตรงหน้าอยู่เสมอ)
Itsumo tada shunkan ni kaketete tai
いつもただ瞬間に賭けてたい

(ไม่ต้องมีข้อแก้ตัวอีกแล้ว ใช้ชีวิตเพียงครั้งเดียวเท่านั้น)
Iiwake wa mou iranai live only once
言い訳はもういらない live only once

(จงเริ่มเต้นไปเลย เสียงดนตรีจะไม่มีวันหยุดลง)
Odoridase myuujikku wa tomaranai
踊り出せミュージックは止まらない

(ไม่มีอะไรที่ฉันต้องหวาดกลัวอีกแล้ว)
Nanni mo kowakunai wa
何にも怖くないわ

(ฉันจะมอบให้เธอมากกว่าถ้อยคำ)
Give you more than words

สรุปความหมายเพลง
เพลงนี้พูดถึงคนที่ใช้ชีวิตด้วยการคิดมากอยู่เสมอ คอยทบทวนคำพูดของตัวเอง กลัวว่าจะตอบผิด กลัวความผิดพลาด และพยายามเลือกสิ่งที่ถูกต้องจนบางครั้งกลับลืมไปว่า ตัวเองต้องการอะไรกันแน่`,
    syncedLyrics: [
  { time: 17.7, text: `(ฉันเอาแต่ย้อนนึกถึงคำพูดที่เขาเคยพูด)
Kare ga itta kotoba nando mo omoikaeshite
彼が言った言葉 何度も思い返して` },
  { time: 25.1, text: `(ฉันตอบกลับไปได้ดีหรือเปล่านะ? คิดวนไปวนมาไม่รู้จบ)
Umaku henji dekita ka? Guruguruguru suru
上手く返事できたか? グルグルグルする` },
  { time: 32.4, text: `(ตั้งแต่เมื่อไรไม่รู้ การเลือกคำตอบที่ถูกต้องกลับกลายเป็นเรื่องง่ายขึ้น)
Itsu kara ka seikai o erabu no ga raku ni natte
いつからか正解を選ぶのが楽になって` },
  { time: 39.8, text: `(ฉันคอยกลบเกลื่อนจังหวะอันไร้เดียงสาที่อยากพูดความจริงในใจอย่างขอไปที)
Honne iu mujaki na peesu tekitou ni gomakashite iru
本音言う無邪気なペース適当に誤魔化している` },
  { time: 46.9, text: `(เพราะถึงจะหัวเราะแล้วบอกว่า “อะไรก็ช่างมันเถอะ”)
Datte dou datte ii tte waratte mo
だって どうだっていいって笑っても` },
  { time: 53.4, text: `(ฉันก็ยัง...)
Mada jibun no koto o
まだ自分のことを` },
  { time: 57.1, text: `(ดิ้นรนอยากจะรักตัวเองอยู่ไม่ใช่หรือ?)
Aishitai n datte mogaite iru n deshou?
愛したいんだってもがいているんでしょう?` },
  { time: 61.9, text: `(เรื่องราวที่เต็มไปด้วยความผิดพลาดมากมาย...)
Kitto machigai darake no sutoorii
きっと 間違いだらけのストーリー` },
  { time: 67.8, text: `(แม้ในค่ำคืนที่แทบจะจมดิ่งลงไป ก็ไม่ได้มีเธออยู่เพียงลำพัง)
Obore sou na yoru mo hitori ja nai kara
溺れそうな夜も一人じゃないから` },
  { time: 74.7, text: `(ฉันจะอยู่เคียงข้างเธอ)
Just be by your side, huh, huh, yeah` },
  { time: 81.6, text: `(และมอบให้เธอมากกว่าถ้อยคำ)
And give you more than words` },
  { time: 89.8, text: `(มอบให้เธอมากกว่าถ้อยคำ)
Give you more than words` },
  { time: 95.7, text: `Oh, oh, ah` },
  { time: 98.2, text: `Eh, yeah` },
  { time: 106.5, text: `(ฉันลบอีเมลที่เขียนค้างไว้ แล้วกลับไปเริ่มต้นใหม่อีกครั้ง)
Kakikake no meeru furidashi ni modos hite
書きかけのメール 振り出しに戻して` },
  { time: 113.5, text: `(ฉันคิดวนไปวนมา เพราะตัวเองที่ไม่อาจตัดสินใจให้เด็ดขาดได้)
Kimekirenai jibun ni guruguruguru suru
決めきれない自分にグルグルグルする` },
  { time: 120.8, text: `(ในโลกที่มีเรื่องมากมายเหลือเกินที่เราไม่เข้าใจ)
Wakaranai koto ga oosugiru sekai ja
分からないことが多すぎる世界じゃ` },
  { time: 125.5, text: `(แม้จะแสร้งทำเป็นฉลาด ก็ยังต้องเจ็บปวดอยู่ดี)
Kashikoi furi o shite mo kizutsuitari suru
賢いふりをしても傷ついたりする` },
  { time: 135.6, text: `(ตั้งแต่เมื่อไรไม่รู้ ฉันกลับเอาแต่พยายามหลีกเลี่ยงความผิดพลาด)
Itsu kara ka shippai o sakeru no ni muki ni natte
いつからか失敗を避けるのにむきになって` },
  { time: 143.2, text: `(ละทิ้งสิ่งที่ตัวเองต้องการจริง ๆ แล้วก็ไม่รู้ว่าตัวเองอยากทำอะไร)
Hontou ni hoshii mono akiramete nani ga shitai ka
本当に欲しいもの諦めて 何がしたいか` },
  { time: 150.5, text: `(มองไม่เห็น ปล่อยให้มันผ่านไป จนเก่งขึ้นมาเพียงเรื่องการสิ้นหวัง)
Mienakute misugoshite zetsubou dake tokui ni natte
見えなくて見過ごして 絶望だけ得意になって` },
  { time: 157.9, text: `(จะตัดสินว่าทุกอย่างสายเกินไปแล้ว ก็ยังเร็วเกินไปหน่อยนะ)
Sore o mou teokure to kimeru ni wa chotto hayai ne
それをもう手遅れと決めるにはちょっと早いね` },
  { time: 168.9, text: `(เพราะแม้ในเวลาที่ทำอะไรไม่ได้เลย...)
Datte dou shiyou mo nai toki demo
だって どうしようもないときでも` },
  { time: 174.8, text: `(ฉันก็ยัง...)
Mada jibun no koto o
まだ自分のことを` },
  { time: 178.7, text: `(รู้อยู่ไม่ใช่หรือว่าอยากจะเชื่อมั่นในตัวเอง?)
Shinjitai n datte kizuite iru n deshou?
信じたいんだって気づいているんでしょう?` },
  { time: 183.6, text: `(หากเธอเองก็มีค่ำคืนที่ต้องเดินผ่าน...)
Kitto onaji you na itami o
きっと 同じような痛みを` },
  { time: 190.2, text: `(ความเจ็บปวดแบบเดียวกันนี้...)
Tadoru yo ga kimi ni mo aru nara
辿ってく夜がきみにもあるなら` },
  { time: 196.4, text: `(ฉันจะอยู่เคียงข้างเธอ)
Just be by your side, huh, huh, yeah` },
  { time: 203.9, text: `(และมอบให้เธอมากกว่าถ้อยคำ)
And give you more than words` },
  { time: 211.4, text: `(มอบให้เธอมากกว่าถ้อยคำ)
Give you more than words` },
  { time: 219.1, text: `(จากนี้ไป ฉันจะไม่ยอมปล่อยมือจากสิ่งใดเลย)
Kono saki wa nani hitotsu yuzurenai
この先は何一つ譲れない` },
  { time: 233.3, text: `(จะทุ่มเทอย่างสุดกำลัง)
Zenryoku de (I get it now, get it now)
全力で (I get it now, get it now)` },
  { time: 235.7, text: `(แสงไฟที่ส่องสว่างแม้ในความมืดมิดแบบไหนก็ตาม)
Donna kurayami datte terasu raito
どんな暗闇だって照らすライト` },
  { time: 238.9, text: `(การที่มีเธออยู่ตรงนี้)
Anata ga iru koto
あなたがいること` },
  { time: 243.1, text: `(แม้จะล้มลงจนเปื้อนโคลนไปทั้งตัว ก็ช่วยไม่ได้หรอกนะ)
Korondatte dorodara ke mo shikata nai
転んで泥だらけも仕方ない` },
  { time: 246.6, text: `(ฉันหยุดไม่ได้แล้ว)
Yamerannai (I get it now, get it now)
やめらんない (I get it now, get it now)` },
  { time: 250.3, text: `(ถ้ามัวแต่มองว่าคุ้มหรือไม่คุ้ม ก็ไม่มีอะไรเกิดขึ้นหรอก)
Sontoku mite cha nani mo umarenai
損得見てちゃ何も生まれない` },
  { time: 254, text: `(เรายังไปต่อได้อีกไกล มุ่งหน้าสู่อิสรภาพกันเถอะ)
Mada mada we can head to freedom
まだまだ we can head to freedom` },
  { time: 257.6, text: `(ฉันอยากเดิมพันกับช่วงเวลาตรงหน้าอยู่เสมอ)
Itsumo tada shunkan ni kaketete tai
いつもただ瞬間に賭けてたい` },
  { time: 261.8, text: `(ไม่ต้องมีข้อแก้ตัวอีกแล้ว ใช้ชีวิตเพียงครั้งเดียวเท่านั้น)
Iiwake wa mou iranai live only once
言い訳はもういらない live only once` },
  { time: 265.1, text: `(จงเริ่มเต้นไปเลย เสียงดนตรีจะไม่มีวันหยุดลง)
Odoridase myuujikku wa tomaranai
踊り出せミュージックは止まらない` },
  { time: 269.1, text: `(ไม่มีอะไรที่ฉันต้องหวาดกลัวอีกแล้ว)
Nanni mo kowakunai wa
何にも怖くないわ` },
  { time: 285.3, text: `(ฉันจะมอบให้เธอมากกว่าถ้อยคำ)
Give you more than words` }
],
  },
  {
    id: 4,
    category: "J-POP / RAIN",
    mood: "Rainy Window",
    title: "Blooming in the Mud",
    jpTitle: "泥中に咲く",
    artist: "Wolpis Carter",
    description: "แม้ชีวิตจะเต็มไปด้วยโคลนตมและเส้นทางที่มืดมน แต่เรายังคงมีเหตุผลที่จะมีชีวิตอยู่ และผลิบานในแบบของตัวเอง",
    duration: "04:50",
    coverUrl: "images/DNI.jpg",
    audioUrl: "music/DNI.mp3",
    chords: [[246.94, 293.66, 369.99, 440.00], [164.81, 246.94, 329.63, 392.00]],
    ambience: "rain",
    lyrics: `(หัวใจที่แตกสลายไม่อาจกลั่นกรองสิ่งใดได้อีก น้ำตาจึงค่อย ๆ เหือดแห้งไปอย่างเงียบงัน)
Kudaketa kokoro ga roka dekinakute namida wa sotto karete yuku
砕けた心が濾過できなくて 涙はそっと枯れてゆく

(แม้แต่หยดเดียวก็ไม่อาจไหลรินออกมาได้แล้ว ตลกดีใช่ไหมล่ะ ฉันพูดพลางหัวเราะ)
Mō hitotsubu mo nagarenakute okashii yo ne tte waratteru
もう一粒も 流れなくて 可笑しいよねって 笑ってる

(ชีวิตอันโหดร้าย หนามแหลมในเขาวงกตที่ขวางกั้นเส้นทางของเธอ)
Kokuretsu na jinsei anata o saegiru meiro no kyokusen
酷烈な人生 あなたを遮る迷路の荊棘

(ความมืดมิดแห่งโลกอันแปดเปื้อนขวางกั้นอยู่ตรงหน้า เธอคือคนที่ทุกข์ตรมยิ่งกว่าใคร)
Jokusei no yami tachihadakaru kimi wa dare yori mo ureu hito
濁世の闇 立ちはだかる 君は誰よりも憂う人

(เพราะอย่างนั้น ตอนนี้พวกเราจึงกำลังจะจมดิ่งลงไปจนแทบเอาชีวิตไม่รอดแล้วใช่ไหม)
Dakara ima bokura wa oborekaketeru sunzen darō
だから今 僕らは溺れかけてる寸前だろう

(ฉันได้รับการช่วยชีวิตด้วยลมหายใจที่ถูกต้อง แต่ตอนนี้ก็แค่มีชีวิตอยู่เพื่อรอวันหนึ่งที่จะต้องตาย)
Tadashii kokyū ni sukuwareta ima wa itsuka shinu tame ni ikiteru dake da
正しい呼吸に救われた 今はいつか死ぬために生きてるだけだ

--------------------

(เมื่อได้รู้เหตุผลที่ฉันเกลียดสายฝน ก็ทำให้หวนนึกถึงบางสิ่งจากส่วนลึกของหัวใจ)
Ame ga kirai na wake o shiru to fukai tokoro de omoidasu koto
雨が嫌いなわけを知ると 深いところで思い出すこと

(ใช่แล้ว หากเป็นฟองสบู่เม็ดใหญ่ ก็คงล่องลอยนุ่มนวล และค่อย ๆ โปรยปรายลงมา)
Sō ōtsubu no shabon dama nara kitto fuwafuwa de shitōto
そう 大粒のシャボン玉なら きっとふわふわでしとしと

(ฉันก้มมองสีของพื้นดินขณะเดิน เลือกเดินไปตามที่ที่ไม่มีแอ่งน้ำ)
Jimen no iro o mite aruku mizutamari no nai basho eranderu
地面の色を見て歩く 水溜りのない場所 選んでる

(ที่แท้ก็เพื่อหลีกเลี่ยงเส้นทางอันเลวร้ายสินะ เราก็คงต้องปกป้องตัวเองเอาไว้เหมือนกัน)
Sate wa fuguu na michi o soreru tame jikobōei datte suru n deshō
さては 不遇な道を逸れるため 自己防衛だってするんでしょう

--------------------

(ตอนนี้ฉันคือมนุษย์คนหนึ่ง วันนี้ พรุ่งนี้ และวันถัดจากนั้นก็เช่นกัน)
Boku wa ima ningen desu kyō mo ashita mo sono tsugi no hi mo
僕は今 人間です 今日も明日も その次の日も

(เพียงยอมรับตัวเองได้แค่นั้นก็เพียงพอแล้ว ทุกคนต่างหายใจด้วยลมหายใจที่แตกต่างกัน)
Mitomeru no wa sono kurai de ii minna betsubetsu no iki o tabeteru
認めるのは そのくらいでいい みんな別々の息を食べてる

(ใช่แล้ว ตอนนี้เธอก็เป็นมนุษย์คนหนึ่งเช่นกัน เพียงแค่เธอเกลียดรูปลักษณ์ของตัวเองเท่านั้น)
Sō kimi mo ima ningen desu sono sugata ga kirai na dake de
そう 君も今 人間です その姿が嫌いなだけで

(ฉันเกลียดเธอไม่ลงหรอก เพราะเธอเป็นคนอ่อนโยน เป็นคนที่คอยอธิษฐานเผื่อทุกคน)
Nikumenai yo yasashii kara kimi wa dare no tame ni mo negau hito
憎めないよ 優しいから 君は誰の為にも願う人

(ลาลาลาลาลาลา...)
La la la la la la...
(ララララララ...)

--------------------

(เพื่อให้ดอกไม้เพียงหนึ่งกลีบร่วงโรยลง น้ำ ดิน แสงสว่าง รวมถึงเมล็ดพันธุ์ของมัน)
Hitohira no hana ga chiru tame ni mizu mo tsuchi mo hikari mo sono tane mo
ひとひらの花が散るために 水も土も光も その種も

(ทุกสิ่งที่อยู่ตรงหน้าฉัน ทั้งความหมายของมัน อดีต และอนาคต)
Boku no me no mae ni aru mono ga sono imi mo kako mo mirai mo
僕の目の前にあるものが その意味も過去も未来も

(หากขาดสิ่งใดสิ่งหนึ่งไป ก็ไม่มีทางถือกำเนิดขึ้นมาได้เลย ไม่ว่าจะเป็นฉัน เธอ หรือคนคนนั้น)
Hitotsu to kaketeru to umarenai ze boku mo kimi mo ano hito mo
ひとつと欠けると生まれないぜ 僕も君も あの人も

(ทั้งที่ปากพูดว่าไม่มีอะไรเลย แต่กลับโยนสัมภาระจากอดีตให้เธอเป็นคนแบกรับ)
Nan demo nai to iinagara kako no nimotsu o kimi ni seowaseru
なんでもないと言いながら 過去の荷物を君に背負わせる

--------------------

(โชคชะตาขวางทางเอาไว้ ความเข้าใจผิด... ก็เป็นผลจากการกระทำของตัวเองทั้งนั้น)
Unmei ga tōsenbō suru kanchigai jisekujitoku da yo
運命が通せんぼする 勘違い 自業自得だよ

(แต่สถานการณ์มันไม่สู้ดีเลยนี่นา อยากหนีใช่ไหม อยากมีชีวิตอยู่ต่อใช่ไหม)
Demo jōkyō ga yokunai kara ne nigetai yo ne ikitai yo ne
でも状況が良くないからね 逃げたいよね 生きたいよね

(หากมีช่วงเวลาที่ฉันจะยอมทิ้งร่างกายนี้ลงไป)
Kono karada o nagedasu sono shunkan ga aru to sureba
この身体を投げ出す その瞬間があるとすれば

(ก็จงผ่าความมืดมิดของโลกใบนี้ออก แล้วลองค้นหาความหมายของการที่เราได้เกิดมาที่นี่กันเถอะ)
Kono yo no yami kirisaite sa koko ni umareta imi o sagasō ka
この世の闇 切り裂いてさ ここに生まれた意味を探そうか

--------------------

(จุดเริ่มต้นของจุดจบ เมื่อมันเริ่มต้นขึ้น ชีวิตนี้ก็จะกลายเป็นชีวิตสุดท้าย)
Owari no hajimari hajimareba saigo no jinsei dakara
終わりの始まり 始まれば最後の人生だから

(หลังการเดินทางอันยาวนานแสนไกล คงมีช่วงเวลาที่เรียกว่า “ตอนนี้” อยู่เพียงหนึ่งเดียว)
Tohō mo nai tabi no sue ni ima shika nai toki ga aru no darō
途方もない 旅の末に 今しかない「時」があるのだろう

(ถึงอย่างนั้น ก็ยังรู้สึกอึดอัดเหมือนหายใจไม่ออกอยู่ดี)
Sore demo nandaka ikigurushii na
それでもなんだか息苦しいな

(“การมีชีวิตอยู่ก็เพื่อรอวันหนึ่งที่จะต้องตาย”)
(Itsuka shinu tame ni ikiteru nante)
(いつか死ぬために生きてるなんて)

(ถ้าอย่างนั้นล่ะก็ ถ้าเป็นเช่นนั้น...)
Sore nara sa sore naraba
それならさ それならば

--------------------

(มาทำให้ระฆังแห่งหัวใจที่ไม่มีวันแตกสลาย ไม่มีวันพังทลาย ไม่มีวันแหลกสลาย ดังก้องขึ้นกันเถอะ)
Mō kowarenai kowarenai kowarenai kokoro no kane o narasō
もう壊れない 壊れない 壊れない心の 鐘を鳴らそう

(แม้ท้องฟ้าจะมืดครึ้ม ไม่ว่าที่ไหนก็เปรอะเปื้อนไปด้วยโคลน)
Donten darō doromamire sa doko mo kakomokamo
曇天だろう 泥まみれさ どこもかしこも

(ตอนนี้ มาขีดเส้นลงบนเขาวงกตที่ขวางกั้นเส้นทางแห่งอนาคตของโลกใบนี้กันเถอะ)
Ima kono yo no yukue o saegiru meiro ni sen o hikō ze
今 この世の行方を 遮る迷路に 線を引こうぜ

(เพราะเส้นเหล่านั้นจะกลายเป็นแผนที่ที่ซ้อนทับกัน เป็นดอกไม้ที่ผลิบานขึ้นเพื่อส่องแสงให้เธอ)
Sono sen ga sa kasanaru chizu kimi o terasu tame ni saku hana sa
その線がさ 重なる地図 君を照らすために咲く花さ

สรุปความหมายเพลง
เพลงนี้พูดถึงการมีชีวิตอยู่ท่ามกลางความเจ็บปวด โดยไม่ได้พยายามบอกว่าทุกอย่างจะดีขึ้นในทันที แต่ค่อย ๆ ชวนให้เรายอมรับตัวเองและคนอื่นในฐานะมนุษย์คนหนึ่ง`
 ,syncedLyrics: [
  { time: 28.8, text: `(หัวใจที่แตกสลายไม่อาจกลั่นกรองสิ่งใดได้อีก น้ำตาจึงค่อย ๆ เหือดแห้งไปอย่างเงียบงัน)
Kudaketa kokoro ga roka dekinakute namida wa sotto karete yuku
砕けた心が濾過できなくて 涙はそっと枯れてゆく` },
  { time: 39.2, text: `(แม้แต่หยดเดียวก็ไม่อาจไหลรินออกมาได้แล้ว ตลกดีใช่ไหมล่ะ ฉันพูดพลางหัวเราะ)
Mō hitotsubu mo nagarenakute okashii yo ne tte waratteru
もう一粒も 流れなくて 可笑しいよねって 笑ってる` },
  { time: 50.6, text: `(ชีวิตอันโหดร้าย หนามแหลมในเขาวงกตที่ขวางกั้นเส้นทางของเธอ)
Kokuretsu na jinsei anata o saegiru meiro no kyokusen
酷烈な人生 あなたを遮る迷路の荊棘` },
  { time: 56.6, text: `(ความมืดมิดแห่งโลกอันแปดเปื้อนขวางกั้นอยู่ตรงหน้า เธอคือคนที่ทุกข์ตรมยิ่งกว่าใคร)
Jokusei no yami tachihadakaru kimi wa dare yori mo ureu hito
濁世の闇 立ちはだかる 君は誰よりも憂う人` },
  { time: 62.4, text: `(เพราะอย่างนั้น ตอนนี้พวกเราจึงกำลังจะจมดิ่งลงไปจนแทบเอาชีวิตไม่รอดแล้วใช่ไหม)
Dakara ima bokura wa oborekaketeru sunzen darō
だから今 僕らは溺れかけてる寸前だろう` },
  { time: 67.6, text: `(ฉันได้รับการช่วยชีวิตด้วยลมหายใจที่ถูกต้อง แต่ตอนนี้ก็แค่มีชีวิตอยู่เพื่อรอวันหนึ่งที่จะต้องตาย)
Tadashii kokyū ni sukuwareta ima wa itsuka shinu tame ni ikiteru dake da
正しい呼吸に救われた 今はいつか死ぬために生きてるだけだ` },
  { time: 85.1, text: `(เมื่อได้รู้เหตุผลที่ฉันเกลียดสายฝน ก็ทำให้หวนนึกถึงบางสิ่งจากส่วนลึกของหัวใจ)
Ame ga kirai na wake o shiru to fukai tokoro de omoidasu koto
雨が嫌いなわけを知ると 深いところで思い出すこと` },
  { time: 95.8, text: `(ใช่แล้ว หากเป็นฟองสบู่เม็ดใหญ่ ก็คงล่องลอยนุ่มนวล และค่อย ๆ โปรยปรายลงมา)
Sō ōtsubu no shabon dama nara kitto fuwafuwa de shitōto
そう 大粒のシャボン玉なら きっとふわふわでしとしと` },
  { time: 107, text: `(ฉันก้มมองสีของพื้นดินขณะเดิน เลือกเดินไปตามที่ที่ไม่มีแอ่งน้ำ)
Jimen no iro o mite aruku mizutamari no nai basho eranderu
地面の色を見て歩く 水溜りのない場所 選んでる` },
  { time: 112.4, text: `(ที่แท้ก็เพื่อหลีกเลี่ยงเส้นทางอันเลวร้ายสินะ เราก็คงต้องปกป้องตัวเองเอาไว้เหมือนกัน)
Sate wa fuguu na michi o soreru tame jikobōei datte suru n deshō
さては 不遇な道を逸れるため 自己防衛だってするんでしょう` },
  { time: 118.4, text: `(ตอนนี้ฉันคือมนุษย์คนหนึ่ง วันนี้ พรุ่งนี้ และวันถัดจากนั้นก็เช่นกัน)
Boku wa ima ningen desu kyō mo ashita mo sono tsugi no hi mo
僕は今 人間です 今日も明日も その次の日も` },
  { time: 122.3, text: `(เพียงยอมรับตัวเองได้แค่นั้นก็เพียงพอแล้ว ทุกคนต่างหายใจด้วยลมหายใจที่แตกต่างกัน)
Mitomeru no wa sono kurai de ii minna betsubetsu no iki o tabeteru
認めるのは そのくらいでいい みんな別々の息を食べてる` },
  { time: 129.6, text: `(ใช่แล้ว ตอนนี้เธอก็เป็นมนุษย์คนหนึ่งเช่นกัน เพียงแค่เธอเกลียดรูปลักษณ์ของตัวเองเท่านั้น)
Sō kimi mo ima ningen desu sono sugata ga kirai na dake de
そう 君も今 人間です その姿が嫌いなだけで` },
  { time: 135.4, text: `(ฉันเกลียดเธอไม่ลงหรอก เพราะเธอเป็นคนอ่อนโยน เป็นคนที่คอยอธิษฐานเผื่อทุกคน)
Nikumenai yo yasashii kara kimi wa dare no tame ni mo negau hito
憎めないよ 優しいから 君は誰の為にも願う人` },
  { time: 141.2, text: `(ลาลาลาลาลาลา...)
La la la la la la...
(ララララララ...)` },
  { time: 152.9, text: `(เพื่อให้ดอกไม้เพียงหนึ่งกลีบร่วงโรยลง น้ำ ดิน แสงสว่าง รวมถึงเมล็ดพันธุ์ของมัน)
Hitohira no hana ga chiru tame ni mizu mo tsuchi mo hikari mo sono tane mo
ひとひらの花が散るために 水も土も光も その種も` },
  { time: 158.3, text: `(ทุกสิ่งที่อยู่ตรงหน้าฉัน ทั้งความหมายของมัน อดีต และอนาคต)
Boku no me no mae ni aru mono ga sono imi mo kako mo mirai mo
僕の目の前にあるものが その意味も過去も未来も` },
  { time: 163.8, text: `(หากขาดสิ่งใดสิ่งหนึ่งไป ก็ไม่มีทางถือกำเนิดขึ้นมาได้เลย ไม่ว่าจะเป็นฉัน เธอ หรือคนคนนั้น)
Hitotsu to kaketeru to umarenai ze boku mo kimi mo ano hito mo
ひとつと欠けると生まれないぜ 僕も君も あの人も` },
  { time: 169.6, text: `(ทั้งที่ปากพูดว่าไม่มีอะไรเลย แต่กลับโยนสัมภาระจากอดีตให้เธอเป็นคนแบกรับ)
Nan demo nai to iinagara kako no nimotsu o kimi ni seowaseru
なんでもないと言いながら 過去の荷物を君に背負わせる` },
  { time: 175.4, text: `(โชคชะตาขวางทางเอาไว้ ความเข้าใจผิด... ก็เป็นผลจากการกระทำของตัวเองทั้งนั้น)
Unmei ga tōsenbō suru kanchigai jisekujitoku da yo
運命が通せんぼする 勘違い 自業自得だよ` },
  { time: 185.8, text: `(แต่สถานการณ์มันไม่สู้ดีเลยนี่นา อยากหนีใช่ไหม อยากมีชีวิตอยู่ต่อใช่ไหม)
Demo jōkyō ga yokunai kara ne nigetai yo ne ikitai yo ne
でも状況が良くないからね 逃げたいよね 生きたいよね` },
  { time: 199.2, text: `(หากมีช่วงเวลาที่ฉันจะยอมทิ้งร่างกายนี้ลงไป)
Kono karada o nagedasu sono shunkan ga aru to sureba
この身体を投げ出す その瞬間があるとすれば` },
  { time: 205.8, text: `(ก็จงผ่าความมืดมิดของโลกใบนี้ออก แล้วลองค้นหาความหมายของการที่เราได้เกิดมาที่นี่กันเถอะ)
Kono yo no yami kirisaite sa koko ni umareta imi o sagasō ka
この世の闇 切り裂いてさ ここに生まれた意味を探そうか` },
  { time: 211.8, text: `(จุดเริ่มต้นของจุดจบ เมื่อมันเริ่มต้นขึ้น ชีวิตนี้ก็จะกลายเป็นชีวิตสุดท้าย)
Owari no hajimari hajimareba saigo no jinsei dakara
終わりの始まり 始まれば最後の人生だから` },
  { time: 217, text: `(หลังการเดินทางอันยาวนานแสนไกล คงมีช่วงเวลาที่เรียกว่า “ตอนนี้” อยู่เพียงหนึ่งเดียว)
Tohō mo nai tabi no sue ni ima shika nai toki ga aru no darō
途方もない 旅の末に 今しかない「時」があるのだろう` },
  { time: 223.4, text: `(ถึงอย่างนั้น ก็ยังรู้สึกอึดอัดเหมือนหายใจไม่ออกอยู่ดี)
Sore demo nandaka ikigurushii na
それでもなんだか息苦しいな` },
  { time: 227.9, text: `(“การมีชีวิตอยู่ก็เพื่อรอวันหนึ่งที่จะต้องตาย”)
(Itsuka shinu tame ni ikiteru nante)
(いつか死ぬために生きてるなんて)` },
  { time: 239.5, text: `(ถ้าอย่างนั้นล่ะก็ ถ้าเป็นเช่นนั้น...)
Sore nara sa sore naraba
それならさ それならば` },
  { time: 244.9, text: `(มาทำให้ระฆังแห่งหัวใจที่ไม่มีวันแตกสลาย ไม่มีวันพังทลาย ไม่มีวันแหลกสลาย ดังก้องขึ้นกันเถอะ)
Mō kowarenai kowarenai kowarenai kokoro no kane o narasō
もう壊れない 壊れない 壊れない心の 鐘を鳴らそう` },
  { time: 250.9, text: `(แม้ท้องฟ้าจะมืดครึ้ม ไม่ว่าที่ไหนก็เปรอะเปื้อนไปด้วยโคลน)
Donten darō doromamire sa doko mo kakomokamo
曇天だろう 泥まみれさ どこもかしこも` },
  { time: 256.2, text: `(ตอนนี้ มาขีดเส้นลงบนเขาวงกตที่ขวางกั้นเส้นทางแห่งอนาคตของโลกใบนี้กันเถอะ)
Ima kono yo no yukue o saegiru meiro ni sen o hikō ze
今 この世の行方を 遮る迷路に 線を引こうぜ` },
  { time: 262.4, text: `(เพราะเส้นเหล่านั้นจะกลายเป็นแผนที่ที่ซ้อนทับกัน เป็นดอกไม้ที่ผลิบานขึ้นเพื่อส่องแสงให้เธอ)
Sono sen ga sa kasanaru chizu kimi o terasu tame ni saku hana sa
その線がさ 重なる地図 君を照らすために咲く花さ` }
],
},
  {
    id: 5,
    category: "J-ROCK / Late Night",
    mood: "Late Night",
    title: "Reason for existence",
    jpTitle: "生きるよすが",
    artist: "Tsukuyomi",
    description: "แม้หัวใจจะเต็มไปด้วยรอยร้าว และค่ำคืนจะมืดมนเพียงใด ขอให้บทเพลงนี้เป็นแสงเล็ก ๆ ที่ช่วยยืนยันว่าเรายังมีเหตุผลที่จะมีชีวิตอยู่ต่อ",
    duration: "04:04",
    coverUrl: "images/rfe.jpg",
    audioUrl: "music/rfe.mp3",
    chords: [[220.00, 277.18, 329.63, 415.30], [146.83, 220.00, 293.66, 369.99]],
    ambience: "city",
    lyrics: `(จงเบ่งบานและเติมเต็มท้องฟ้าสีน้ำเงินเข้มแห่งราตรี ให้เป็นสิ่งยึดเหนี่ยวในการมีชีวิตอยู่)
Yoru no ai ni saite michite ike ikiru yosuga
夜の藍に咲いて満ちていけ 生きるよすが

(บาดแผล คำโกหก และความเจ็บปวด จงกลายเป็นบทกวี)
Kizu mo uso mo itami mo uta ni nare
傷も嘘も痛みも詩になれ

(ความฝันและความรักที่ฉันเขียนลงไป จะช่วยใครไว้ได้บ้างไหม)
Yume o ai o kaite nani o sukuemasu ka
夢を 愛を書いて何を救えますか

(จงกลายเป็นแสงสว่างที่ย้อมแต่งท้องฟ้าอันหม่นเศร้า)
Ureu sora o someru hikari ni nare
憂う空を染める光になれ

(รูปแบบของความสุขที่พบเห็นได้ทั่วไปบนโลกใบนี้)
Kono yo ni arifureta koufuku no katachi
この世にありふれた幸福の形

(กลับไม่อาจเติมเต็มช่องว่างที่เว้าแหว่งอยู่ภายในได้)
Sore ja aita ana wa umerarenai
それじゃ空いた穴は埋められない

(ฉันนี่มันคนโกหก ทั้งที่พูดว่าตัวเองยังมีชีวิตอยู่)
Usotsuki nan da boku wa ikite iru da toka
嘘つきなんだ僕は 生きているだとか

(ทั้งที่หัวใจดวงนี้เป็นเพียงเครื่องจักรเท่านั้น)
Kono kikai mitai na kokoro de sa
この機械みたいな心でさ

(ทำไม่ได้ ไม่เข้าใจ ไม่มีวันเปลี่ยนแปลง)
Dekinai wakaranai kawaranai
出来ない 解らない 変わらない

(ถ้อยคำเหล่านั้นกลายเป็นเพียงท่วงทำนองแห่งเสียงอันไร้ค่า)
Kotobatachi wa mukachi na neiro to kasu
言葉達は無価値な音色と化す

(ไม่อาจเติมเต็ม ไม่อาจทำให้เป็นจริง)
Mitasarenai kanawanai
満たされない 叶わない

(บทเพลงเช่นนี้...)
Konna uta ja
こんな歌じゃ

(อา... ไม่อาจส่องแสงไปถึงหัวใจของใครได้เลย)
Aa dare no kokoro mo terasenai
ああ だれの心も照らせない

--------------------

(จงฉีกกระชากและกวาดล้างความเศร้าแห่งราตรีไปเสีย ให้เป็นสิ่งยึดเหนี่ยวในการมีชีวิตอยู่)
Yoru no ai o saite naide ike ikiru yosuga
夜の哀を裂いて薙いでいけ 生きるよすが

(ทั้งความผิดพลาด คำตอบ วันนี้ และอนาคต จงกลายเป็นบทกวี)
Machigai mo kotae mo kyou mo mirai mo uta ni nare
間違いも答えも今日も未来も詩になれ

(เสียงที่ฉันขับขานออกมานี้ ตอนนี้เธอได้ยินมันหรือเปล่า)
Kanadeta kono koe ga ima kikoemasu ka
奏でたこの声が いま聴こえますか

(เสียงกรีดร้องอันแสนโง่เขลาของคนโง่อย่างฉัน)
Orokana boku no bakageta sakebi o
愚かな僕の馬鹿げた叫びを

(ได้โปรด ได้โปรดเถอะ สำหรับชีวิตที่เป็นเพียงชีวิตเช่นนี้)
Douka douka konna inochi ni
どうか どうか こんな命に

(ช่วยมอบเหตุผลที่จะมีชีวิตอยู่ต่อไปในวันพรุ่งนี้ให้ฉันที)
Ashita o ikiru riyuu o kure yo
明日を生きる理由をくれよ

(ได้โปรด ได้โปรด ช่วยค้นหาฉันให้พบที)
Douka douka boku o mitsukete
どうか どうか 僕を見つけて

(ดวงจันทร์ยามเที่ยงวันที่มีอยู่จริงอย่างแน่นอนดวงนั้น)
Tashika ni aru mahiru no tsuki o
慥かに在る真昼の月を

--------------------

(ลำคอที่กลืนถ้อยคำเหล่านั้นลงไปกลับรู้สึกปวดแปลบ)
Kotoba o nomikonda nodo ga uzuita
言葉を飲み込んだ喉が疼いた

(สิ่งนี้ที่ติดค้างอยู่ในอก คืออะไรกันแน่)
Mune ni tsukaeru kore wa nani ka
胸に痞える これは何か

(ฉันเงยหน้ามองความมืดมิดที่กลืนกินหัวใจ)
Kokoro o nomikonda yami o aoida
心を呑み込んだ闇を仰いだ

(แล้วเอื้อมมือออกไปหาแสงสีชาดที่สาดส่องเข้ามา)
Sashita akane ni te o nobasu
差した茜に 手を伸ばす

--------------------

(ไม่ใช่ทุกสิ่งหรอกนะที่จะได้รับผลตอบแทนกลับคืนมา)
Subete ga sorya mukuwareru mono ja nai
全てがそりゃ報われるものじゃない

(ทั้งเวลาและเงินทองอาจกลายเป็นสิ่งสูญเปล่าก็ได้)
Jikan mo kane mo muda ni naru kamo na
時間も金も無駄になるかもな

(สักวันหนึ่ง ทุกสิ่งก็จะเลือนหายไปในอดีต)
Itsuka wa kako ni kiete iku
いつかは過去に消えていく

(ถึงอย่างนั้น เหตุผลที่ฉันยังขับขานบทเพลง ก็เพราะฉันได้ถือกำเนิดขึ้นมาบนโลกใบนี้)
Soredemo boku ga utau no wa koko ni umareta kara
それでも僕が歌うのはここに生まれたから

(ยังมีบางสิ่งที่ไม่อาจช่วยไว้ได้ด้วยความถูกต้องเพียงอย่างเดียว)
Tadashii dake ja sukuenai mono mo aru
正しいだけじゃ救えないものもある

(หากการไม่ร้องไห้คือความเข้มแข็งแล้วล่ะก็)
Nakanai koto ga tsuyosa datte n nara
泣かないことが強さだってんなら

(ฉันจะเป็นคนอ่อนแอแบบนี้ต่อไปก็ได้)
Boku wa yowai mama de ii
僕は弱いままでいい

--------------------

(จงฉีกกระชากและกวาดล้างความเศร้าแห่งราตรีไปเสีย ให้เป็นสิ่งยึดเหนี่ยวในการมีชีวิตอยู่)
Yoru no ai o saite naide ike ikiru yosuga
夜の哀を裂いて薙いでいけ 生きるよすが

(ทั้งความผิดพลาด คำตอบ วันนี้ และอนาคต จงกลายเป็นบทกวี)
Machigai mo kotae mo kyou mo mirai mo uta ni nare
間違いも答えも今日も未来も詩になれ

(ฉันไม่เข้าใจเลย)
Wakaranai
わからない

(ไม่ว่าจะพรสวรรค์หรือชีวิต ก็ใช่ว่าจะเข้าใจมันได้ง่าย ๆ)
Sai mo jinsei mo wakaru mono ka
才も人生もわかるものか

(แม้จะเต็มไปด้วยคำโกหกก็ตาม ถึงอย่างนั้น...)
Uso darake demo soredemo
嘘だらけでも それでも

(จงมีชีวิตต่อไป แม้จะไม่มีทั้งความรักหรือสิ่งใดเลยก็ตาม คืนวันก็ยังคงสว่างขึ้น)
Ikiro ai mo nani mo nakutatte akeru yoru da
生きろ 愛も何も無くたって明ける夜だ

(เหตุผลที่เราเกิดมา จะเป็นสิ่งที่สร้างขึ้นภายหลังก็ไม่เป็นไร)
Umareta riyuu nante atozuke datte ii
生まれた理由なんて後付けだっていい

(อย่าเรียกภาพของการค่อย ๆ ดับสูญว่าเป็นความงดงามเลย)
Shiniyuku sama o sore o bi to yobu na
死にゆく様を それを美と呼ぶな

(ไม่มีดอกไม้ดอกไหนที่เบ่งบานขึ้นมาเพียงเพื่อร่วงโรยหรอก จริงไหม)
Chiru tame ni saku hana nante nai daro
散る為に咲く花なんて無いだろ

(สิ่งที่งดงาม แม้จะดูน่าเกลียดเพียงใดก็ตาม)
Minikui hodo ni utsukushii mono o
醜い程に美しいものを

(ช่วยเติมเต็มหัวใจที่แหว่งเว้าของฉันทีเถอะ)
Kaketa kokoro o umete kure yo
欠けた心を埋めてくれよ

(ด้วยบทเพลงแบบไหน ด้วยถ้อยคำแบบใด...)
Donna uta de donna kotoba de
どんな歌で どんな言葉で

(ฉันจะกลายเป็นสิ่งยึดเหนี่ยวในค่ำคืนอันมืดมิดได้อย่างไรกันนะ?)
Kurai yoru no yosuga ni nareru? Ah
昏い夜のよすがになれる? Ah

(สิ่งที่ฉันวิงวอนต่อพระเจ้า มีเพียงสิ่งเดียวเท่านั้น)
Kamisama ni negau no wa tada hitotsu dake
神様に願うのは ただ一つだけ

สรุปความหมายเพลง
「生きるよすが」 หมายถึง สิ่งยึดเหนี่ยวที่ทำให้เรายังมีเหตุผลที่จะมีชีวิตอยู่
เพลงนี้เล่าถึงคนคนหนึ่งที่รู้สึกว่าหัวใจของตัวเองว่างเปล่าราวกับเครื่องจักร พยายามใช้บทเพลงและถ้อยคำเพื่อช่วยเหลือผู้อื่น แต่กลับตั้งคำถามว่าคำพูดของตัวเองมีคุณค่าจริงหรือไม่ เพราะแม้แต่ตัวเขาเองก็ยังไม่สามารถเติมเต็มช่องว่างภายในได้`
  ,syncedLyrics: [
  { time: 0.6, text: `(จงเบ่งบานและเติมเต็มท้องฟ้าสีน้ำเงินเข้มแห่งราตรี ให้เป็นสิ่งยึดเหนี่ยวในการมีชีวิตอยู่)
Yoru no ai ni saite michite ike ikiru yosuga
夜の藍に咲いて満ちていけ 生きるよすが` },
  { time: 4.6, text: `(บาดแผล คำโกหก และความเจ็บปวด จงกลายเป็นบทกวี)
Kizu mo uso mo itami mo uta ni nare
傷も嘘も痛みも詩になれ` },
  { time: 8, text: `(ความฝันและความรักที่ฉันเขียนลงไป จะช่วยใครไว้ได้บ้างไหม)
Yume o ai o kaite nani o sukuemasu ka
夢を 愛を書いて何を救えますか` },
  { time: 12, text: `(จงกลายเป็นแสงสว่างที่ย้อมแต่งท้องฟ้าอันหม่นเศร้า)
Ureu sora o someru hikari ni nare
憂う空を染める光になれ` },
  { time: 35.9, text: `(รูปแบบของความสุขที่พบเห็นได้ทั่วไปบนโลกใบนี้)
Kono yo ni arifureta koufuku no katachi
この世にありふれた幸福の形` },
  { time: 39.6, text: `(กลับไม่อาจเติมเต็มช่องว่างที่เว้าแหว่งอยู่ภายในได้)
Sore ja aita ana wa umerarenai
それじゃ空いた穴は埋められない` },
  { time: 43.1, text: `(ฉันนี่มันคนโกหก ทั้งที่พูดว่าตัวเองยังมีชีวิตอยู่)
Usotsuki nan da boku wa ikite iru da toka
嘘つきなんだ僕は 生きているだとか` },
  { time: 47.3, text: `(ทั้งที่หัวใจดวงนี้เป็นเพียงเครื่องจักรเท่านั้น)
Kono kikai mitai na kokoro de sa
この機械みたいな心でさ` },
  { time: 50.4, text: `(ทำไม่ได้ ไม่เข้าใจ ไม่มีวันเปลี่ยนแปลง)
Dekinai wakaranai kawaranai
出来ない 解らない 変わらない` },
  { time: 53.7, text: `(ถ้อยคำเหล่านั้นกลายเป็นเพียงท่วงทำนองแห่งเสียงอันไร้ค่า)
Kotobatachi wa mukachi na neiro to kasu
言葉達は無価値な音色と化す` },
  { time: 57.4, text: `(ไม่อาจเติมเต็ม ไม่อาจทำให้เป็นจริง)
Mitasarenai kanawanai
満たされない 叶わない` },
  { time: 59.9, text: `(บทเพลงเช่นนี้...)
Konna uta ja
こんな歌じゃ` },
  { time: 61.5, text: `(อา... ไม่อาจส่องแสงไปถึงหัวใจของใครได้เลย)
Aa dare no kokoro mo terasenai
ああ だれの心も照らせない` },
  { time: 64.9, text: `(จงฉีกกระชากและกวาดล้างความเศร้าแห่งราตรีไปเสีย ให้เป็นสิ่งยึดเหนี่ยวในการมีชีวิตอยู่)
Yoru no ai o saite naide ike ikiru yosuga
夜の哀を裂いて薙いでいけ 生きるよすが` },
  { time: 69, text: `(ทั้งความผิดพลาด คำตอบ วันนี้ และอนาคต จงกลายเป็นบทกวี)
Machigai mo kotae mo kyou mo mirai mo uta ni nare
間違いも答えも今日も未来も詩になれ` },
  { time: 72.7, text: `(เสียงที่ฉันขับขานออกมานี้ ตอนนี้เธอได้ยินมันหรือเปล่า)
Kanadeta kono koe ga ima kikoemasu ka
奏でたこの声が いま聴こえますか` },
  { time: 76.7, text: `(เสียงกรีดร้องอันแสนโง่เขลาของคนโง่อย่างฉัน)
Orokana boku no bakageta sakebi o
愚かな僕の馬鹿げた叫びを` },
  { time: 80.8, text: `(ได้โปรด ได้โปรดเถอะ สำหรับชีวิตที่เป็นเพียงชีวิตเช่นนี้)
Douka douka konna inochi ni
どうか どうか こんな命に` },
  { time: 82.9, text: `(ช่วยมอบเหตุผลที่จะมีชีวิตอยู่ต่อไปในวันพรุ่งนี้ให้ฉันที)
Ashita o ikiru riyuu o kure yo
明日を生きる理由をくれよ` },
  { time: 88.7, text: `(ได้โปรด ได้โปรด ช่วยค้นหาฉันให้พบที)
Douka douka boku o mitsukete
どうか どうか 僕を見つけて` },
  { time: 92.1, text: `(ดวงจันทร์ยามเที่ยงวันที่มีอยู่จริงอย่างแน่นอนดวงนั้น)
Tashika ni aru mahiru no tsuki o
慥かに在る真昼の月を` },
  { time: 109.6, text: `(ลำคอที่กลืนถ้อยคำเหล่านั้นลงไปกลับรู้สึกปวดแปลบ)
Kotoba o nomikonda nodo ga uzuita
言葉を飲み込んだ喉が疼いた` },
  { time: 115.9, text: `(สิ่งนี้ที่ติดค้างอยู่ในอก คืออะไรกันแน่)
Mune ni tsukaeru kore wa nani ka
胸に痞える これは何か` },
  { time: 119.3, text: `(ฉันเงยหน้ามองความมืดมิดที่กลืนกินหัวใจ)
Kokoro o nomikonda yami o aoida
心を呑み込んだ闇を仰いだ` },
  { time: 123.7, text: `(แล้วเอื้อมมือออกไปหาแสงสีชาดที่สาดส่องเข้ามา)
Sashita akane ni te o nobasu
差した茜に 手を伸ばす` },
  { time: 125.6, text: `(ไม่ใช่ทุกสิ่งหรอกนะที่จะได้รับผลตอบแทนกลับคืนมา)
Subete ga sorya mukuwareru mono ja nai
全てがそりゃ報われるものじゃない` },
  { time: 130.9, text: `(ทั้งเวลาและเงินทองอาจกลายเป็นสิ่งสูญเปล่าก็ได้)
Jikan mo kane mo muda ni naru kamo na
時間も金も無駄になるかもな` },
  { time: 134.9, text: `(สักวันหนึ่ง ทุกสิ่งก็จะเลือนหายไปในอดีต)
Itsuka wa kako ni kiete iku
いつかは過去に消えていく` },
  { time: 137.8, text: `(ถึงอย่างนั้น เหตุผลที่ฉันยังขับขานบทเพลง ก็เพราะฉันได้ถือกำเนิดขึ้นมาบนโลกใบนี้)
Soredemo boku ga utau no wa koko ni umareta kara
それでも僕が歌うのはここに生まれたから` },
  { time: 157.2, text: `(ยังมีบางสิ่งที่ไม่อาจช่วยไว้ได้ด้วยความถูกต้องเพียงอย่างเดียว)
Tadashii dake ja sukuenai mono mo aru
正しいだけじゃ救えないものもある` },
  { time: 163.2, text: `(หากการไม่ร้องไห้คือความเข้มแข็งแล้วล่ะก็)
Nakanai koto ga tsuyosa datte n nara
泣かないことが強さだってんなら` },
  { time: 168.4, text: `(ฉันจะเป็นคนอ่อนแอแบบนี้ต่อไปก็ได้)
Boku wa yowai mama de ii
僕は弱いままでいい` },
  { time: 171.8, text: `(จงฉีกกระชากและกวาดล้างความเศร้าแห่งราตรีไปเสีย ให้เป็นสิ่งยึดเหนี่ยวในการมีชีวิตอยู่)
Yoru no ai o saite naide ike ikiru yosuga
夜の哀を裂いて薙いでいけ 生きるよすが` },
  { time: 171.9, text: `(ทั้งความผิดพลาด คำตอบ วันนี้ และอนาคต จงกลายเป็นบทกวี)
Machigai mo kotae mo kyou mo mirai mo uta ni nare
間違いも答えも今日も未来も詩になれ` },
  { time: 175.9, text: `(ฉันไม่เข้าใจเลย)
Wakaranai
わからない` },
  { time: 182.8, text: `(ไม่ว่าจะพรสวรรค์หรือชีวิต ก็ใช่ว่าจะเข้าใจมันได้ง่าย ๆ)
Sai mo jinsei mo wakaru mono ka
才も人生もわかるものか` },
  { time: 184.1, text: `(แม้จะเต็มไปด้วยคำโกหกก็ตาม ถึงอย่างนั้น...)
Uso darake demo soredemo
嘘だらけでも それでも` },
  { time: 187.2, text: `(จงมีชีวิตต่อไป แม้จะไม่มีทั้งความรักหรือสิ่งใดเลยก็ตาม คืนวันก็ยังคงสว่างขึ้น)
Ikiro ai mo nani mo nakutatte akeru yoru da
生きろ 愛も何も無くたって明ける夜だ` },
  { time: 190.2, text: `(เหตุผลที่เราเกิดมา จะเป็นสิ่งที่สร้างขึ้นภายหลังก็ไม่เป็นไร)
Umareta riyuu nante atozuke datte ii
生まれた理由なんて後付けだっていい` },
  { time: 195, text: `(อย่าเรียกภาพของการค่อย ๆ ดับสูญว่าเป็นความงดงามเลย)
Shiniyuku sama o sore o bi to yobu na
死にゆく様を それを美と呼ぶな` },
  { time: 199, text: `(ไม่มีดอกไม้ดอกไหนที่เบ่งบานขึ้นมาเพียงเพื่อร่วงโรยหรอก จริงไหม)
Chiru tame ni saku hana nante nai daro
散る為に咲く花なんて無いだろ` },
  { time: 202.5, text: `(สิ่งที่งดงาม แม้จะดูน่าเกลียดเพียงใดก็ตาม)
Minikui hodo ni utsukushii mono o
醜い程に美しいものを` },
  { time: 204.7, text: `(ช่วยเติมเต็มหัวใจที่แหว่งเว้าของฉันทีเถอะ)
Kaketa kokoro o umete kure yo
欠けた心を埋めてくれよ` },
  { time: 204.8, text: `(ด้วยบทเพลงแบบไหน ด้วยถ้อยคำแบบใด...)
Donna uta de donna kotoba de
どんな歌で どんな言葉で` },
  { time: 210.6, text: `(ฉันจะกลายเป็นสิ่งยึดเหนี่ยวในค่ำคืนอันมืดมิดได้อย่างไรกันนะ?)
Kurai yoru no yosuga ni nareru? Ah
昏い夜のよすがになれる? Ah` },
  { time: 221.7, text: `(สิ่งที่ฉันวิงวอนต่อพระเจ้า มีเพียงสิ่งเดียวเท่านั้น)
Kamisama ni negau no wa tada hitotsu dake
神様に願うのは ただ一つだけ` }
],
},
  {
    id: 6,
    category: "J-POP / Soft Waves",
    mood: "Soft Waves",
    title: "Bubbles",
    jpTitle: "あわ",
    artist: "asmi",
    description: "บางความรู้สึกใสจนมองเห็น แต่กลับเปราะบางเกินกว่าจะเอื้อมมือไปสัมผัส",
    duration: "03:35",
    coverUrl: "images/bubbles.png",
    audioUrl: "music/Bubbles_asmi.mp3",
    chords: [[196.00, 246.94, 293.66, 369.99], [164.81, 196.00, 246.94, 293.66]],
    ambience: "waves",
    lyrics: `(ฉันเป็นเพียงความโปร่งใส แม้ทุกคนจะมองเห็นฉันก็ตาม)
Watashi wa tōmei dare kara mo miete iru kedo
私は透明 誰からも見えているけど

(แม้แต่เรื่องธรรมดาที่ใคร ๆ ก็ทำได้ ฉันกลับทำไม่ได้ จนคุ้นชินกับการเอ่ยคำขอโทษ)
Atarimae no koto mo dekinakute ayamaru koto ni narete
当たり前の事も出来なくて 謝る事に慣れて

(อา... หากฉันเหวี่ยงแขนวิ่งไปให้สุดแรง ยิ่งกว่าใคร ๆ)
Ah dare yori mo ude o futte hashittara
Ah 誰よりも腕を振って走ったら

(ฉันก็เอาแต่ล้มลงซ้ำแล้วซ้ำเล่า บาดแผลก็มีแต่เพิ่มขึ้นเรื่อย ๆ)
Koronde shimatte bakkari kizu ga fuete bakkari
転んでしまってばっかり 傷が増えてばっかり

--------------------

(เมืองยามค่ำคืนที่ส่องประกายเจิดจ้า)
Mabayushiku hikaru yoru no machi to
眩しく光る夜の街と

(กับท้องฟ้าที่แทบมองไม่เห็นดวงดาว)
Amari hoshi no mienai hoshizora
あまり星の見えない星空

(ยิ่งแสงสว่างทวีความเข้มข้นขึ้นเท่าไร)
Hikari ga tsuyoku nareba naru hodo ni
光が強くなればなるほどに

(บางสิ่งกลับยิ่งเลือนรางหายไป)
Nanika ga kasunde yuku
何かが霞んでゆく

--------------------

(ฉันรู้สึกเหมือนฟองอากาศที่ลอยตุ๊บป่องอยู่กลางน้ำ)
Pukapuka ukabu awa mitai da wa
ぷかぷか浮かぶあわみたいだわ

(ทั้งที่ว่างเปล่า แต่ความรู้สึกข้างในกลับสั่นไหว)
Karappo na no ni nakami (kimochi) wa yureru
からっぽなのに 中身(きもち)は揺れる

(ฉันต้องลอยไปไกลแค่ไหนกัน ถึงจะไปถึงที่ที่ควรไป)
Doko made tonde yukeba ii no ka
何処まで飛んで行けばいいのか

(ในโลกที่ฉันยังไม่อาจเอ่ยบอกเรื่องนี้กับเธอได้)
Kimi ni ienai mama no sekai de
君に言えないままの世界で

(ฉันรู้สึกเหมือนฟองอากาศที่ลอยตุ๊บป่องอยู่กลางน้ำ)
Pukapuka ukabu awa mitai da wa
ぷかぷか浮かぶあわみたいだわ

(พยายามกลมกลืนเข้ากับทิวทัศน์ เพื่อไม่ให้ตัวเองแตกสลาย)
Warenai yō ni keshiki ni najimu
割れないように景色に馴染む

(เพียงใช้ชีวิตผ่านไปวัน ๆ โดยไร้สีสัน)
Iro ga nai mama yarisugosu dake
色がないままやり過ごすだけ

(แบบนี้... มันดีจริง ๆ แล้วหรือเปล่านะ)
Kore de hontō ni ii n da kke
これで本当にいいんだっけ

--------------------

(ฉันเป็นเพียงความโปร่งใส ไม่รู้จักสีสันใด ๆ เลย)
Watashi wa tōmei donna iro mo shiranai
私は透明 どんな彩(いろ)も知らない

(รู้สึกเหมือนจะเลือนหายไปได้ทุกเมื่อ)
Itsu demo kiete shimai sō de
いつでも消えてしまいそうで

(แต่กลับไม่อาจกลายเป็นเช่นนั้นได้ ท่ามกลางหมอกที่มองไม่เห็นทาง)
Sō wa narenai muchū
そうはなれない霧中

(หากฉันสามารถเบ่งบานได้เหมือนดอกไม้ ก็คงดีไม่น้อย)
Hana mitai ni sakeru naraba yokatta no ni
花みたいに咲けるならば良かったのに

(ทั้งที่ไม่มีแม้แต่ดอกตูมให้ผลิบานขึ้นมาเลย)
Doko ni mo tsubomi nante dekinai mama
どこにも蕾なんて出来ないまま

--------------------

(ท้องฟ้ายังคงหมุนเวียนไปตามปกติ)
Itsumo dōri ni mawaru sora ni
いつも通りに廻る空に

(มีแสงสว่างมากมายเปล่งประกายอยู่บนนั้น)
Ikutsumo kagayaita hikari
いくつも輝いた光

(แม้จะมีแสงดวงหนึ่งดับลงไป)
Hitotsu tomoshibi ga kieta to shite
1つ灯かりが消えたとして

(แน่นอนว่าไม่มีใครสังเกตเห็นมัน)
Kitto dare mo sore ni kizukanai
きっと誰もそれに気付かない

(ทั้งที่โลกใบนี้เต็มไปด้วยเรื่องที่ไม่อาจทำอะไรได้)
Dōshiyō mo nai koto darake no
どうしようもない事だらけの

(ทั้งที่เป็นโลกแบบนี้แท้ ๆ)
Konna sekai na no ni
こんな世界なのに

(ทำไมวันเวลาที่เราได้สัมผัสกันเหล่านี้)
Dōshite konna ni mo fureru hibi ga
どうしてこんなにも触れる日々が

(ถึงได้งดงาม งดงามเหลือเกิน)
Kirei kirei
綺麗 綺麗

--------------------

(ฉันรู้สึกเหมือนฟองอากาศที่ลอยตุ๊บป่องอยู่กลางน้ำ)
Pukapuka ukabu awa mitai da wa
ぷかぷか浮かぶあわみたいだわ

(ทั้งที่ว่างเปล่า แต่ความรู้สึกข้างในกลับสั่นไหว)
Karappo na no ni nakami (kimochi) wa yureru
からっぽなのに 中身(きもち)は揺れる

(ฉันต้องลอยไปไกลแค่ไหนกัน ถึงจะไปถึงที่ที่ควรไป)
Doko made tonde yukeba ii no ka
何処まで飛んで行けばいいのか

(ในโลกที่ฉันยังไม่อาจเอ่ยบอกเรื่องนี้กับเธอได้)
Kimi ni ienai mama no sekai de
君に言えないままの世界で

(ฉันรู้สึกเหมือนฟองอากาศที่ลอยตุ๊บป่องอยู่กลางน้ำ)
Pukapuka ukabu awa mitai da wa
ぷかぷか浮かぶあわみたいだわ

(พยายามกลมกลืนเข้ากับทิวทัศน์ เพื่อไม่ให้ตัวเองแตกสลาย)
Warenai yō ni keshiki ni najimu
割れないように景色に馴染む

(เพียงใช้ชีวิตผ่านไปวัน ๆ โดยไร้สีสัน)
Iro ga nai mama yarisugosu dake
色がないままやり過ごすだけ
(แบบนี้... มันดีจริง ๆ แล้วหรือเปล่านะ)
Kore de hontō ni ii n da kke
これで本当にいいんだっけ

--------------------

(อา...)
Ah
ah

(ฉันเป็นเพียงความโปร่งใส เป็นคนขี้ขลาดเสียจนถึงที่สุด)
Watashi wa tōmei doko made mo yowamushi de
私は透明 どこまでも弱虫で

(แม้แต่ความกล้าหาญ ฉันก็ยังไม่มี)
Yūki datte nai kedo
勇気だってないけど

(แต่ถึงอย่างนั้น... ในตอนนี้ ฉันอาจจะ...)
Dakedo ima nara
だけど今なら

สรุปความหมายเพลง
เพลงนี้พูดถึงคนที่รู้สึกว่าตัวเองเป็นเพียงสิ่งโปร่งใส แม้จะมีตัวตนอยู่ท่ามกลางผู้คน แต่กลับไม่รู้สึกว่าตัวเองโดดเด่นหรือมีความหมายมากพอ
ภาพเปรียบเทียบสำคัญคือ ฟองอากาศ ที่ลอยไปอย่างไร้จุดหมาย ภายนอกดูว่างเปล่าและเปราะบาง แต่ภายในกลับเต็มไปด้วยความรู้สึกที่สั่นไหวอยู่ตลอดเวลา`
,syncedLyrics: [
  { time: 24.3, text: `(ฉันเป็นเพียงความโปร่งใส แม้ทุกคนจะมองเห็นฉันก็ตาม)
Watashi wa tōmei dare kara mo miete iru kedo
私は透明 誰からも見えているけど` },
  { time: 28.6, text: `(แม้แต่เรื่องธรรมดาที่ใคร ๆ ก็ทำได้ ฉันกลับทำไม่ได้ จนคุ้นชินกับการเอ่ยคำขอโทษ)
Atarimae no koto mo dekinakute ayamaru koto ni narete
当たり前の事も出来なくて 謝る事に慣れて` },
  { time: 32.6, text: `(อา... หากฉันเหวี่ยงแขนวิ่งไปให้สุดแรง ยิ่งกว่าใคร ๆ)
Ah dare yori mo ude o futte hashittara
Ah 誰よりも腕を振って走ったら` },
  { time: 36.3, text: `(ฉันก็เอาแต่ล้มลงซ้ำแล้วซ้ำเล่า บาดแผลก็มีแต่เพิ่มขึ้นเรื่อย ๆ)
Koronde shimatte bakkari kizu ga fuete bakkari
転んでしまってばっかり 傷が増えてばっかり` },
  { time: 39.9, text: `(เมืองยามค่ำคืนที่ส่องประกายเจิดจ้า)
Mabayushiku hikaru yoru no machi to
眩しく光る夜の街と` },
  { time: 42.2, text: `(กับท้องฟ้าที่แทบมองไม่เห็นดวงดาว)
Amari hoshi no mienai hoshizora
あまり星の見えない星空` },
  { time: 44.5, text: `(ยิ่งแสงสว่างทวีความเข้มข้นขึ้นเท่าไร)
Hikari ga tsuyoku nareba naru hodo ni
光が強くなればなるほどに` },
  { time: 46.8, text: `(บางสิ่งกลับยิ่งเลือนรางหายไป)
Nanika ga kasunde yuku
何かが霞んでゆく` },
  { time: 52, text: `(ฉันรู้สึกเหมือนฟองอากาศที่ลอยตุ๊บป่องอยู่กลางน้ำ)
Pukapuka ukabu awa mitai da wa
ぷかぷか浮かぶあわみたいだわ` },
  { time: 54.3, text: `(ทั้งที่ว่างเปล่า แต่ความรู้สึกข้างในกลับสั่นไหว)
Karappo na no ni nakami (kimochi) wa yureru
からっぽなのに 中身(きもち)は揺れる` },
  { time: 60.2, text: `(ฉันต้องลอยไปไกลแค่ไหนกัน ถึงจะไปถึงที่ที่ควรไป)
Doko made tonde yukeba ii no ka
何処まで飛んで行けばいいのか` },
  { time: 64, text: `(ในโลกที่ฉันยังไม่อาจเอ่ยบอกเรื่องนี้กับเธอได้)
Kimi ni ienai mama no sekai de
君に言えないままの世界で` },
  { time: 68.3, text: `(ฉันรู้สึกเหมือนฟองอากาศที่ลอยตุ๊บป่องอยู่กลางน้ำ)
Pukapuka ukabu awa mitai da wa
ぷかぷか浮かぶあわみたいだわ` },
  { time: 72.4, text: `(พยายามกลมกลืนเข้ากับทิวทัศน์ เพื่อไม่ให้ตัวเองแตกสลาย)
Warenai yō ni keshiki ni najimu
割れないように景色に馴染む` },
  { time: 76.3, text: `(เพียงใช้ชีวิตผ่านไปวัน ๆ โดยไร้สีสัน)
Iro ga nai mama yarisugosu dake
色がないままやり過ごすだけ` },
  { time: 80, text: `(แบบนี้... มันดีจริง ๆ แล้วหรือเปล่านะ)
Kore de hontō ni ii n da kke
これで本当にいいんだっけ` },
  { time: 92.8, text: `(ฉันเป็นเพียงความโปร่งใส ไม่รู้จักสีสันใด ๆ เลย)
Watashi wa tōmei donna iro mo shiranai
私は透明 どんな彩(いろ)も知らない` },
  { time: 96.2, text: `(รู้สึกเหมือนจะเลือนหายไปได้ทุกเมื่อ)
Itsu demo kiete shimai sō de
いつでも消えてしまいそうで` },
  { time: 102.2, text: `(แต่กลับไม่อาจกลายเป็นเช่นนั้นได้ ท่ามกลางหมอกที่มองไม่เห็นทาง)
Sō wa narenai muchū
そうはなれない霧中` },
  { time: 103.3, text: `(หากฉันสามารถเบ่งบานได้เหมือนดอกไม้ ก็คงดีไม่น้อย)
Hana mitai ni sakeru naraba yokatta no ni
花みたいに咲けるならば良かったのに` },
  { time: 104.8, text: `(ทั้งที่ไม่มีแม้แต่ดอกตูมให้ผลิบานขึ้นมาเลย)
Doko ni mo tsubomi nante dekinai mama
どこにも蕾なんて出来ないまま` },
  { time: 108.3, text: `(ท้องฟ้ายังคงหมุนเวียนไปตามปกติ)
Itsumo dōri ni mawaru sora ni
いつも通りに廻る空に` },
  { time: 110.5, text: `(มีแสงสว่างมากมายเปล่งประกายอยู่บนนั้น)
Ikutsumo kagayaita hikari
いくつも輝いた光` },
  { time: 112.6, text: `(แม้จะมีแสงดวงหนึ่งดับลงไป)
Hitotsu tomoshibi ga kieta to shite
1つ灯かりが消えたとして` },
  { time: 116.1, text: `(แน่นอนว่าไม่มีใครสังเกตเห็นมัน)
Kitto dare mo sore ni kizukanai
きっと誰もそれに気付かない` },
  { time: 139.8, text: `(ทั้งที่โลกใบนี้เต็มไปด้วยเรื่องที่ไม่อาจทำอะไรได้)
Dōshiyō mo nai koto darake no
どうしようもない事だらけの` },
  { time: 146.5, text: `(ทั้งที่เป็นโลกแบบนี้แท้ ๆ)
Konna sekai na no ni
こんな世界なのに` },
  { time: 148.7, text: `(ทำไมวันเวลาที่เราได้สัมผัสกันเหล่านี้)
Dōshite konna ni mo fureru hibi ga
どうしてこんなにも触れる日々が` },
  { time: 153, text: `(ถึงได้งดงาม งดงามเหลือเกิน)
Kirei kirei
綺麗 綺麗` },
  { time: 157.6, text: `(ฉันรู้สึกเหมือนฟองอากาศที่ลอยตุ๊บป่องอยู่กลางน้ำ)
Pukapuka ukabu awa mitai da wa
ぷかぷか浮かぶあわみたいだわ` },
  { time: 162.2, text: `(ทั้งที่ว่างเปล่า แต่ความรู้สึกข้างในกลับสั่นไหว)
Karappo na no ni nakami (kimochi) wa yureru
からっぽなのに 中身(きもち)は揺れる` },
  { time: 166, text: `(ฉันต้องลอยไปไกลแค่ไหนกัน ถึงจะไปถึงที่ที่ควรไป)
Doko made tonde yukeba ii no ka
何処まで飛んで行けばいいのか` },
  { time: 169.8, text: `(ในโลกที่ฉันยังไม่อาจเอ่ยบอกเรื่องนี้กับเธอได้)
Kimi ni ienai mama no sekai de
君に言えないままの世界で` },
  { time: 174.4, text: `(ฉันรู้สึกเหมือนฟองอากาศที่ลอยตุ๊บป่องอยู่กลางน้ำ)
Pukapuka ukabu awa mitai da wa
ぷかぷか浮かぶあわみたいだわ` },
  { time: 176.9, text: `(พยายามกลมกลืนเข้ากับทิวทัศน์ เพื่อไม่ให้ตัวเองแตกสลาย)
Warenai yō ni keshiki ni najimu
割れないように景色に馴染む` },
  { time: 183.5, text: `(เพียงใช้ชีวิตผ่านไปวัน ๆ โดยไร้สีสัน)
Iro ga nai mama yarisugosu dake
色がないままやり過ごすだけ
(แบบนี้... มันดีจริง ๆ แล้วหรือเปล่านะ)
Kore de hontō ni ii n da kke
これで本当にいいんだっけ` },
  { time: 195.4, text: `(อา...)
Ah
ah` },
  { time: 198.6, text: `(ฉันเป็นเพียงความโปร่งใส เป็นคนขี้ขลาดเสียจนถึงที่สุด)
Watashi wa tōmei doko made mo yowamushi de
私は透明 どこまでも弱虫で` },
  { time: 202, text: `(แม้แต่ความกล้าหาญ ฉันก็ยังไม่มี)
Yūki datte nai kedo
勇気だってないけど` },
  { time: 204.2, text: `(แต่ถึงอย่างนั้น... ในตอนนี้ ฉันอาจจะ...)
Dakedo ima nara
だけど今なら` }
],
  },
  {
    id: 7,
    category: "J-POP / INDIE",
    mood: "Late Night",
    title: "Irony",
    jpTitle: "アイロニ",
    artist: "Majiko",
    description: "บางครั้งก็แค่อยากหยุดพักจากชีวิตที่ยาวไกล เหนื่อยกับการพยายาม เหนื่อยกับความหวังที่เอื้อมไม่ถึง และเหนื่อยกับการต้องทำเหมือนว่าทุกอย่างยังไหว",
    duration: "04:06",
    coverUrl: "images/irony.jpg",
    audioUrl: "music/Irony.mp3",
    chords: [[261.63, 329.63, 392.00, 493.88], [220.00, 261.63, 329.63, 392.00]],
    ambience: "city",
    lyrics: `(ฉันเดินจนเริ่มเหนื่อยล้าขึ้นมานิดหน่อยแล้ว)
Sukoshi arukitsukaretan da
少し歩き疲れたんだ

(ฉันเดินจนเริ่มเหนื่อยล้าขึ้นมานิดหน่อยแล้ว)
Sukoshi arukitsukaretan da
少し歩き疲れたんだ

(แม้จะเป็นถ้อยคำธรรมดาที่ใคร ๆ ก็พูดกัน)
Tsukinami na hyougen dakedo
月並みな表現だけど

(บนเส้นทางอันยาวไกลที่เรียกกันว่าชีวิต)
Jinsei toka iu nagai michi o
人生とかいう長い道を

(ฉันแค่อยากหยุดพักสักหน่อย)
Sukoshi yasumitain da
少し休みたいんだ

(ถึงจะอยากหยุดพักสักหน่อยก็เถอะ)
Sukoshi yasumitain dakedo
少し休みたいんだけど

(แต่เวลากลับโหดร้ายและเดินหน้าไปทุกขณะ)
Jikan wa kokuikkoku zankoku to
時間は刻一刻残酷と

(คอยฉุดกระชากฉันให้ก้าวต่อไป)
Watashi o hippatte ikun da
私を引っ張っていくんだ

--------------------

(เหมือนทุกอย่างกำลังจะไปได้ดีอยู่แล้วแท้ ๆ)
Umaku ikisou nan dakedo
うまく行きそうなんだけど

(แต่กลับมีแต่เรื่องที่ไม่เป็นไปอย่างที่หวัง)
Umaku ikanai koto bakari de
上手くいがないことばかりで

(จนเผลอทำท่าว่าจะร้องไห้ออกมาเสียอย่างนั้น)
Ukatsunimo naite shimai sou ni naru
うかつにも泣いてしまいそうになる

(ช่างน่าสมเพชจริง ๆ เลยนะ)
Nasakenai hontou ni na
情けない 本当にな

--------------------

(ความรู้สึกน่าเวทนาเหล่านั้นน่ะ)
Mijime na kimochi nanka
惨めな気持ちなんか

(ฉันก็ลิ้มรสมันมาจนแทบเอียนเต็มทนแล้ว)
Iya to iu hodo ajiwatte kita shi
嫌と言うほど味わってきたし

(ทั้งที่ควรจะโยนความคับแค้นใจอะไรแบบนั้น)
Tokkuni kuyashisa nante mono wa
とっくに悔しさなんてものは

(ทิ้งไปตั้งนานแล้วแท้ ๆ)
Sutete kita hazu na noni
捨ててきたはずなのに

--------------------

(มันก็ไม่ได้เลวร้ายถึงขั้นต้องแบกรับความสิ้นหวังไว้หรอก)
Zetsubou idaku hodo
絶望抱くほど
(Warui wake ja nai kedo)
悪いわけじゃないけど

(แต่สิ่งที่ฉันต้องการ)
Hoshii mono wa
欲しい物は

(กลับอยู่ไกลเกินเอื้อมไปเพียงนิดเดียวอยู่เสมอ)
Itsumo sukoshi te ni wa todokanai
いつも少し手には届かない

(ความค้างคาแบบครึ่ง ๆ กลาง ๆ นั้นน่ะ)
Sonna hanpa da to ne nanka
そんな 半端 だとね なんか

(มันทำให้ฉันเผลอคาดหวังขึ้นมา)
Kitai shite shimau kara
期待してしまうから

(ถ้าอย่างนั้น สู้ทำให้มันจบ ๆ ไปเสียเลยดีกว่า)
Sore nara mou isso no koto
それならもういっそのこと

(ช่วยผลักฉันให้ร่วงลงไปถึงก้นเหวเลยสิ)
Donzoko made tsukiotoshite yo
どん底まで突き落としてよ

--------------------

(ถึงจะบอกว่ามีคำตอบอยู่ก็ตาม)
Kotae nante iwaretatte
答えなんて iwaretatte

(แต่สำหรับแต่ละคน คำตอบนั้นก็ถูกสับเปลี่ยนไปได้)
Hito ni yotte wa surikawatte tte
人によってはすり替わってって

(เพราะอย่างนั้น คำว่าแน่นอนน่ะ ไม่ว่าอย่างไรก็...)
Dakara zettai nante zettai
だから絶対なんて絶対

(ฉันไม่มีทางเชื่อมันได้หรอก)
Shinjirannai yo
信じらんないよ

--------------------

(นี่... ที่บอกว่าความทุกข์เป็นสิ่งที่ทุกคนต่างก็มี)
Nee kurushimi tte dare ni demo aru tte
ねぇ 苦しみって誰にでもあるって

(ฉันก็รู้อยู่แล้ว แล้วมันยังไงล่ะ?)
Sonna no wakatteru kara nandatte?
そんなの分かってるからなんだって？

(ถ้าอย่างนั้น แค่หัวเราะกลบเกลื่อนแล้วปล่อยมันผ่านไปก็พอหรือไง?)
Nara waratte sumaserば ii no?
なら笑って済ませればいいの？

(ฉันไม่เข้าใจอะไรอีกแล้ว)
Mou wakannai yo
もうわかんないよ

(บ้าเอ๊ย!)
Baka!
バカ！

--------------------

(ทั้งที่ฉันก็ถูกพูดใส่มาตั้งมากมายขนาดนั้นแท้ ๆ)
Sanzan iwarete kita kuse ni
散々言われてきたくせ ni

(แต่เอาเข้าจริง ฉันก็ไม่ได้รู้สึกแย่กับมันไปเสียทั้งหมด)
Nanda manzara demo nain da
なんだ まんざらでもないんだ

(เรื่องที่หากคิดให้ง่ายเข้าไว้ ก็จะกลายเป็นเรื่องง่ายแท้ ๆ)
Kantan ni kangaetara raku na koto mo
簡単に考えたら楽なことも

(ฉันกลับคิดให้มันกลายเป็นเรื่องยากเย็นเสียเอง)
Nankan ni kangaetetan da
難関に考えてたんだ

--------------------

(ทุกอย่างค่อย ๆ กลายเป็นเรื่องน่าเบื่อหน่ายขึ้นเรื่อย ๆ)
Dandan to iroiro mendou ni natte
だんだんと色々めんどくなって

(จะให้มันจบลงไปอย่างเงียบ ๆ เฉย ๆ เลยดีไหมนะ)
Mou tantan to owarasechaou ka
もう淡々と終わらせちゃおうか

(“เป็นอะไรไป? จิตตกเหรอ?”)
"Yanda?"
「病んだ？」

(ฉันเบื่อที่จะต้องได้ยินคำพูดแบบนั้นเต็มทีแล้ว)
Toka mou iya ni natta kara
とかもう嫌になったから

(ถ้ามันจะจบลงอย่างนุ่มนวลเงียบ ๆ ไปเลยก็คงดีแล้วล่ะ)
Yanwari to owareba mou ii jan ka
やんわりと終わればもういいじゃんか

--------------------

(ความฝันหรือความหวังอะไรพวกนั้น)
Yume da toka kibou toka
夢だとか希望とか

(หรือความหมายของการมีชีวิตอยู่)
Ikiteru imi toka
生きてる意味とか

(สิ่งเหล่านั้นน่ะ ไม่ใช่สิ่งที่จำเป็นอะไรขนาดนั้นหรอก)
Betsu ni sonna mono wa sashite
別にそんなものはさして

(เพราะฉันไม่ได้ต้องการมันมากมายอะไร)
Hitsuyou nai kara
必要ないから

(ขอเพียงโอกาสที่เป็นรูปธรรม)
Gutaiteki de
具体的で

(และเข้าใจได้ง่าย)
Wakariyasui
わかりやすい

(ช่วยมอบโอกาสแบบนั้นให้ฉันที)
Kikai o kudasai
機会を下さい

--------------------

(ระหว่างที่มัวแต่ตามหาสถานที่สำหรับร้องไห้)
Nakibasho sagasu uchi ni
泣き場所探すうちに

(ฉันก็เหนื่อยจนร้องไห้ไม่ไหวอีกแล้ว)
Mou naki tsukarechatta yo
もう 泣き 疲れちゃったよ

--------------------

(ฉันเกลียดคำพูดสวยหรูทั้งหลาย เพราะว่า...)
Kireigoto tte kirai datte
綺麗ごとって嫌い だって

(แม้จะเผลอคาดหวังไปแล้ว แต่มันก็ไม่เคยกลายเป็นรูปเป็นร่าง)
Kitai shichatte mo katachi ni nannakute
期待しちゃっても形になんなくて

(ที่บอกว่า “ดวงดาวกำลังเฝ้ามองพวกเราอยู่” น่ะ)
Hoshi ga bokura mimamotte tte
「星が僕ら見守って」って

(ก็มีแค่ตอนกลางคืนไม่ใช่หรือไง)
Yoru shika nai jan
夜しかないじゃん

--------------------

(นี่... ความอ่อนโยนของเธอคนนั้นน่ะ)
Nee kimi no sono yasashii toko
ねぇ 君のその優しいとこ

(ฉันกลับเผลอปรารถนามันขึ้นมาอย่างไม่ทันตั้งตัว)
Fukaku ni mo motomechau kara
不覚にも求めちゃうから

(ตรงส่วนที่เปราะบางในหัวใจดวงนี้)
Kono kokoro yarakai toko
この心やらかいとこ

(อย่ามาแตะต้องมันอีกเลย)
Mou sawannai de
もう触んないで

(ไม่เอานะ!)
Yada!
ヤダ！

--------------------

(ปล่อยฉันไว้คนเดียวเถอะ)
Mou hottoite
もうほっといて

(ทิ้งฉันไว้ตรงนี้เถอะ)
Mou oite tte
もうおいてって

(เส้นทางสายนี้ที่แปดเปื้อนจนมอมแมมไปหมดแล้ว)
Yogorekitta kono michi wa
汚れきったこの道は

(คงไม่มีวันเปลี่ยนแปลงไปอีกแล้ว อา...)
Mou kawannai yo aa
もう変わんないよ嗚呼

--------------------

(ฉันเหนื่อยล้าจนหมดแรงใจ)
Tsukarechatte yowaki ni natte
疲れちゃって 弱気になって

(ถึงอยากจะหนีไป)
Nige dashitatte
逃げ出したって

(มันก็ไร้ประโยชน์อยู่ดี)
Muda nan datte
無駄なんだって

(เพราะอย่างนั้น ฉันจึงปิดกั้นตัวเอง ไม่รับฟังอะไรแล้ว)
Dakara naimen mimi fusai de
だから内面耳ふさいで

(แล้วร้องไห้ออกมาว่า ทุกอย่างมันเลวร้ายเหลือเกิน)
Mou saitei datte naite
もう最低だって泣いて

(ชีวิตนี่มันคืออะไรกันแน่?)
Jinsei tte nan na no tte
人生ってなんなのって

(แม้จะไม่เข้าใจอะไรเลย แต่แค่มีชีวิตอยู่...)
Wakannakute mo ikiteru dake de
わかんなくても生きてるだけで

(ฉันควรคิดว่าตัวเองมีความสุขแล้วอย่างนั้นไหม?)
Shiawase tte omoeba ii no?
幸せって思えばいいの？

(ฉันไม่เข้าใจอะไรอีกแล้ว)
Mou wakannai yo
もうわかんないよ

(บ้าเอ๊ย!)
Baka!
バカ！

สรุปความหมายเพลง
เพลงนี้พูดถึงความเหนื่อยล้าของคนที่พยายามใช้ชีวิตต่อไป ทั้งที่ไม่รู้ว่าตัวเองกำลังเดินไปเพื่ออะไร
ผู้เล่าไม่ได้กำลังเผชิญกับความทุกข์ครั้งใหญ่เพียงครั้งเดียว แต่เป็นความผิดหวังเล็ก ๆ ที่สะสมซ้ำแล้วซ้ำเล่า พยายามทำให้ทุกอย่างดีขึ้น พยายามเลือกคำตอบที่ถูกต้อง พยายามไม่ร้องไห้ แต่สุดท้ายก็กลับพบว่าสิ่งที่ต้องการอยู่ใกล้แค่เอื้อม ทว่ากลับไม่เคยคว้ามันมาได้จริง ๆ`
  }
];