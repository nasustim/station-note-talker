import { comments } from './data'

/**
 * speak()の音声をWebAudioAPIのAudioNodeにわたす方法がわからないので一旦保留
 */
export function startByWebSpeechApi () {
  const uttr = new SpeechSynthesisUtterance()
  uttr.lang = "ja-JP"
  uttr.rate = 0.7
  uttr.pitch = 1.18
  for ( let v of comments ) {
    uttr.text = v
  }
  window.speechSynthesis.speak(uttr)
}

export function stop () {

}