const animItemsL1 = document.querySelectorAll('._anim-item-l1');

if (animItemsL1.length > 0){
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params){
    for (i = 0; i < animItemsL1.length; i++){
      const animItemL1 = animItemsL1[i];
      const animItemL1Height = animItemL1.offsetHeight;
      const animItemL1Offset = offset(animItemL1).top;
      const animStart = 3;

      let animItemL1Point = window.innerHeight - animItemL1Height / animStart;

      if (animItemL1Height > window.innerHeight){
        animItemL1Point = window.innerHeight - window.innerHeight / animStart;
      }

      if ((scrollY > animItemL1Offset - animItemL1Point) && scrollY < (animItemL1Offset + animItemL1Height)){
        animItemL1.classList.add('_element-active-l1');
      } //else { animItemL1.classList.remove('_element-active-l1'); }
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