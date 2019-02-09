// 初始化swiper
var mySwiper = new Swiper('.swiper-container', {
    direction: "vertical",
    on:{
        init: function(){
          swiperAnimateCache(this); 
          swiperAnimate(this); 
          var arrowflag = 0; 
          setInterval(function(){
            arrowflag ++;
            if(arrowflag %2 == 0){
              $(".arrow").fadeOut();
            } else {
              $(".arrow").fadeIn();
            }
          },1000)
        }, 
        slideChangeTransitionEnd: function(){ 
          swiperAnimate(this); 
        } 
      }  
})    

// 初始化烟花
$('#fireWork').fireworks({ 
    sound: false, // sound effect
    opacity: 0.9, 
    width: '100%', 
    height: '100%' 
  });