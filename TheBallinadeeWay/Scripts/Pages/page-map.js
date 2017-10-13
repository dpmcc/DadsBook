(function BallinadeeWayMap() {
    $(document).ready(function () {
     console.log('Page loaded');

//var greenPath = MorphSVGPlugin.pathDataToBezier("#pathDenis", {offsetX:-50});
var redPath = MorphSVGPlugin.pathDataToBezier("#pathDenis", {offsetX:0}); 
//var bluePath = MorphSVGPlugin.pathDataToBezier("#pathDenis", {offsetX:50});   
var theButton = document.getElementById("divAnimControl");
theButton.addEventListener("click", doAnim);
TweenMax.set("circle", {xPercent:-50, yPercent:-50});


var tl = new TimelineMax({paused:true}); 

tl.to("#red", 2, {bezier:{values:redPath, type:"cubic"}}, 0);
//tl.to("#green", 2, {bezier:{values:greenPath, type:"cubic"}}, 0);
//tl.to("#blue", 2, {bezier:{values:bluePath, type:"cubic"}}, 0);

function doAnim() {
  tl.play(0);
 }


  //   var _SVG_Map_Object = new _SVG_Map('.map-container');



    var _SVG_Typography_Object = new _SVG_Typography('.title-container',{
        OnInitialised:function(Alphabet,$SVG){
            var that = this;
             
              
        that.Write('B',{Duration:20});



       }
     
    });
       

        
    });//document on ready
})();