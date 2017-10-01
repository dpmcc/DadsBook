(function BallinadeeWayMap() {
    $(document).ready(function () {
        console.log('Page loaded');
       // var _SVG_Map_Object = new _SVG_Map('.map-container');
     var _SVG_Typography_Object = new _SVG_Typography('.title-container',{
         OnInitialised:function(Alphabet,$SVG){
             var that = this;
             _.each(Alphabet, function(item){
                 
                  
                 
             });

          //  TweenMax.to(that.Get('B').$Element, 3, {skewX:90}, 2.5);
         //   TweenMax.to(that.Get('E').$Element, 3, {skewX:90}, 2.5);
            var TitleTimeline = new TimelineMax({repeat:-1});
            var ease = Linear.easeNone;

var $Morph1 = $SVG.find('#Morph1'),$Morph2 = $SVG.find('#Morph2');

TweenMax.set($Morph1, {x:3,y:4,scale:5});
TweenMax.set($Morph2, {x:3,y:4,scale:5});
TweenMax.to($Morph1, 5, {morphSVG:$Morph2});


// TweenMax.to(that.Get('B').$Element, 3, {skewX:90}, 2.5);
  //          TweenLite.to($Morph1, 5, {morphSVG:$Morph2});
            /*
var $B1 = $SVG.find('#B1'),$B2 = $SVG.find('#B2');;
TweenMax.set($B1, {fill:'white'});
TweenMax.set($B2, {fill:'white'});
TweenMax.set($B1, {drawSVG:0, stroke:"black",scale:5});
TweenMax.set($B2, {drawSVG:0, stroke:"black",scale:5});
TitleTimeline.to($B1, 4, {drawSVG:true, ease:ease});
TitleTimeline.to($B2, 8, {drawSVG:true, ease:ease});
*/
/*
                            var demo = document.getElementById("demo");
var tl = new TimelineMax({repeat:-1});

TweenMax.set(demo, {autoAlpha:1});
TweenMax.set("path", {drawSVG:0, stroke:"#42a6e0"});
TweenMax.set("ellipse", {autoAlpha:0, fill:"#42a6e0"});

tl.to("#hPipe", 0.35, {drawSVG:true, ease:ease});
tl.to("#hBody", 0.75, {drawSVG:true, ease:ease});
tl.to("#mainPath", 5, {drawSVG:true, ease:ease});
tl.to("#dot2", 0.15, {autoAlpha:1});
tl.to("#dot1", 0.15, {autoAlpha:1});
tl.to("#tCross", 0.25, {drawSVG:true, ease:ease});
tl.to("path, ellipse", 0.75, {autoAlpha:0}, "+=1"); 
             */
          
         }
     });
       

        
    });
})();