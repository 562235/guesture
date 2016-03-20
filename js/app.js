(function(window,document){
    var translate = 0;
    var pageNow = 1;
    var points = null;
    var currentPoint = -1;
    var app = {
       init:function(th){
           if(/(windows)/i.test(navigator.userAgent)){
               location.href = 'views/pc.html';
           }
           document.addEventListener('DOMContentLoaded',function(){
               app.bindTouchEvent();
               points = document.querySelectorAll('.pagenumber div') ;
               app.setCurrentPosition();
           },false);

       }(),

        /**
         * @param result
         */
       setViewport:function(result){
           this.style.webkitTransform = "translate3d("+result+"px,0,0)";
           translate = result;
       },

        bindTouchEvent:function(){
           var scope = this;
           var viewport =  document.querySelector('#viewport');
           var bodyWidth = window.innerWidth;
           var maxWidth = bodyWidth * 4;
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

           }.bind(this),false);
           document.addEventListener("touchmove",function(e){
               e.preventDefault();
               var touch = e.touches[0];
               var deltaX = touch.pageX - startX;
               var deltaY = touch.pageY - startY;
               if (Math.abs(deltaX)>Math.abs(deltaY)){
                   finalDelta = deltaX;
                   var result = lastSize + deltaX;
                   if (result <=0 && result >= -bodyWidth*4){
                       scope.setViewport.call(viewport,result);
                       isSlide = true;
                   }
                   direction = deltaX>0?"right":"left";
               }

           }.bind(this),false);

           document.addEventListener("touchend",function(e){
               e.preventDefault();
               var transform = 0;
               deltaT = new Date().getTime() - startT;
               if (isSlide){
                    viewport.style.webkitTransition = "0.3s ease -webkit-transform";
                    if(deltaT < 300){
                        transform = direction == 'left'?
                        translate-(bodyWidth+finalDelta):translate+bodyWidth-finalDelta;
                        transform = transform > 0 ? 0 : transform;
                        transform = transform < -maxWidth ? -maxWidth : transform;

                    }else {
                        if (Math.abs(finalDelta)/bodyWidth < 0.5){
                            transform = translate-finalDelta;
                        }else{
                            transform = direction == 'left'?
                            translate-(bodyWidth+finalDelta):translate+bodyWidth-finalDelta;
                            transform = transform > 0 ? 0 : transform;
                            transform = transform < -maxWidth ? -maxWidth : transform;
                         }
                    }
                   this.setViewport.call(viewport,transform);
                   pageNow = Math.round(Math.abs(transform) / bodyWidth) + 1;
                   setTimeout(function(){
                       this.setCurrentPosition();
                   }.bind(this),100);
                   console.log(pageNow)
                }
           }.bind(this),false);

           document.addEventListener("touchcancel",function(e){
               e.preventDefault();
               var transform = 0;
               deltaT = new Date().getTime() - startT;
               if (isSlide){
                   viewport.style.webkitTransition = "0.3s ease -webkit-transform";
                   if(deltaT < 300){
                       transform = direction == 'left'?
                       translate-(bodyWidth+finalDelta):translate+bodyWidth-finalDelta;
                       transform = transform > 0 ? 0 : transform;
                       transform = transform < -maxWidth ? -maxWidth : transform;

                   }else {
                       if (Math.abs(finalDelta)/bodyWidth < 0.5){
                           transform = translate-finalDelta;
                       }else{
                           transform = direction == 'left'?
                           translate-(bodyWidth+finalDelta):translate+bodyWidth-finalDelta;
                           transform = transform > 0 ? 0 : transform;
                           transform = transform < -maxWidth ? -maxWidth : transform;
                       }
                   }
                   this.setViewport.call(viewport,transform);
                   pageNow = Math.round(Math.abs(transform) / bodyWidth) + 1;
                   setTimeout(function(){
                       this.setCurrentPosition();
                   }.bind(this),100);
                   console.log(pageNow)
               }



           },false)
       },

       setCurrentPosition:function(){
           if (currentPoint != -1){
               points[currentPoint].className = '';
           }
           currentPoint = pageNow - 1;
           points[currentPoint].className = 'now';
       }
    }
})(window,document);
