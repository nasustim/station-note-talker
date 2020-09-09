const { spawnSync } = require('child_process')
const comments = require('./data')

//  音声ファイル作成
for(let i in comments) {
  spawnSync('say', [
    '-v', 'Kyoko',      // Kyokoさん
    '-o', `./assets/aiff/voice-${i}`, // macos catalinaではaiff; m4aで書き出そうとするとエラーが出た
    `${comments[i]}`
  ])
}

// 扱いやすいmp3に変換
for(let i in comments) {
  spawnSync('ffmpeg', [
    '-i', `./assets/aiff/voice-${i}.aiff`,
    `./assets/mp3/voice-${i}.mp3`
  ])
}