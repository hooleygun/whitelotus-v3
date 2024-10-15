const animCards = document.querySelectorAll('._anim-card');

if (animCards.length > 0){
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params){
    for (i = 0; i < animCards.length; i++){
      const animCard = animCards[i];
      const animCardHeight = animCard.offsetHeight;
      const animCardOffset = offset(animCard).top;
      const animStart = 3;

      let animCardPoint = window.innerHeight - animCardHeight / animStart;

      if (animCardHeight > window.innerHeight){
        animCardPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((scrollY > animCardOffset - animCardPoint) && scrollY < (animCardOffset + animCardHeight)){
        animCard.classList.add('_element-active-l1');
      } //else { animCardL1.classList.remove('_element-active-l1'); }
    }
  };
  function offset(el){
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollX || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
  };
  animOnScroll()
}