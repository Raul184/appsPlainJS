const play = (e) => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;
  //rewind to start in case multiple hit
  audio.currentTime = 0;
  //play audio tag => By default from 0 to 100. rewind in case of repetition
  audio.play();

  //key effects
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  key.classList.add("playing");
  // setTimeout(() => key.classList.remove("playing") , 100);
}

//best WAY
function removeTransition(e){
  if(e.propertyName !== 'transform') return;
  //key
  this.classList.remove("playing");
}

//ON INIT
(function init(){
  //Init
  console.log('init');
  //Remove play class effects
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  //Play
  window.addEventListener('keydown', play);
})();
