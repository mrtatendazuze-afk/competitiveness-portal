/* Animated page transitions: only navigation (hash changes) animates; scenario re-renders stay instant. */
(function(){
  const page=document.getElementById('page'); if(!page) return;
  const play=()=>{page.classList.remove('zcr-in','zcr-anim');void page.offsetWidth;page.classList.add('zcr-in','zcr-anim');
    setTimeout(()=>page.classList.remove('zcr-anim','zcr-in'),1300);};
  let t;
  window.zcrNavigate=function(){
    clearTimeout(t);page.classList.add('zcr-out');
    t=setTimeout(()=>{page.classList.remove('zcr-out');route();play();zcrScroll();},170);
  };
  play();
})();
