(function(window,document){
    var translate = 0;
    var app = {
       init:function(th){
           if(/(windows)/i.test(navigator.userAgent)){
               location.href = 'views/pc.html';
           }
           document.addEventListener('DOMContentLoaded',function(){
               app.bindTapEvent();
           },false);
       }(),

       setViewport:function(result){
           this.style.webkitTransform = "translate("+result+"px)";
           translate = result;
       },

       bindTapEvent:function(){
           var scope = this;
           var viewport = document.querySelector('#viewport');
           var bodyWidth = window.innerWidth;
           var startX,startY;
           var lastSize = 0;
           var finalDelta = 0;
           var direction = "";
           var isSlide = false;
           var deltaT = 0;
           var startT = 0;

           document.addEventListener("touchstart",function(e){
               e.preventDefault();
               var touch = e.touches[0];
               startX = touch.pageX;
               startY = touch.pageY;
               lastSize = translate;
               isSlide = false;
               viewport.style.webkitTransition = "";
               startT = new Date().getTime();

           },false);
           document.addEventListener("touchmove",function(e){
               e.preventDefault();
               var touch = e.touches[0];
               var deltaX = touch.pageX - startX;
               var deltaY = touch.pageY - startY;
               if (Math.abs(deltaX)>Math.abs(deltaY)){
                   finalDelta = deltaX;
                   var result = lastSize + deltaX;
                   if (result <=0 && result >= -bodyWidth*2){
                       scope.setViewport.call(viewport,result);
                       isSlide = true;
                   }
                   direction = deltaX>0?"right":"left";
               }

           },false);

           document.addEventListener("touchend",function(e){
               e.preventDefault();
               deltaT = new Date().getTime() - startT;
               if (isSlide){
                    viewport.style.webkitTransition = "0.3s ease -webkit-transform";
                    if(deltaT < 300){
                        if(direction == 'left'){
                            scope.setViewport.call(viewport,translate-(bodyWidth+finalDelta));
                        }else {
                            scope.setViewport.call(viewport,translate+bodyWidth-finalDelta);
                        }
                    }else {
                        if (Math.abs(finalDelta)/bodyWidth < 0.5){
                            scope.setViewport.call(viewport,translate-finalDelta);
                        }else{
                            if(direction == 'left'){
                                scope.setViewport.call(viewport,translate-(bodyWidth+finalDelta));
                            }else {
                                scope.setViewport.call(viewport,translate+bodyWidth-finalDelta);
                            }
                        }
                    }
                }
           },false);

       }
    }
})(window,document);
