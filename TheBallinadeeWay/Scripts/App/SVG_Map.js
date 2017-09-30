(function SVG_Map(){


var _SVG_Map = _SVG_Map || {}

_SVG_Map = function(Container){

    try{
    var that = this;
    this.$MapContainer = $(Container);

     this.$SVGObject = this.$MapContainer.find('object.map');
    this.$SVGMap = this.$MapContainer.find('object.map');
    this.$SVGMapContainer = this.$MapContainer.find('svg.map');
    this.$Title = this.$MapContainer.find('svg.title');
    this.$Road = this.$MapContainer.find('.road');
   
    this.fnInit  = function(){
      var that = this;
    //   var tween = TweenMax.to( this.Road , 1, {css:{fill:"#ff0000"}, delay:5});
      //  this.$MapContainer.css({height: this.$SVGMapContainer.height(), width:this.$SVGMapContainer.width() });

this.$SVGMap.addClass('col-xs-12')
//this.$SVGMap.attr({height: this.$MapContainer.height(), width:this.$MapContainer.width() });

/*
this.$SVGMap[0].addEventListener('load', function(a,b,c,d) {
   $('svg.map').attr({viewBox:'0 0 '+that.$MapContainer.height()+' '+that.$MapContainer.width(), height: that.$MapContainer.height(), width:that.$MapContainer.width() });
 
}, true);
*/


var colors =["#FF0000","#FFFF00","#00FF00","#00FFFF","#0000FF","#FF00FF","#ED1C24","#FFF200","#00A651","#00AEEF","#2E3192","#EC008C","#FF0000"];

this.$SVGMap[0].addEventListener("load", function() {
   var doc = this.contentDocument;


   that.$SVGMap = $(doc).find('svg');

   //var hand = doc.getElementById("map"); 
   that.$SVGMap.addClass('col-xs-12');

   
   that.$SVGMap.removeAttr("id");

   that.$SVGMap.attr("viewBox","0 0 "+that.$SVGObject.outerWidth()+" "+that.$SVGObject.outerHeight() );

   
   var hand = that.$SVGMap.find('g#Tree path')
//


   tl = new TimelineMax({repeat:-1});
   for (j = 0; j < colors.length; j++) {
   tl.to(hand, 1, {fill:colors[j], ease:Linear.ease});
   };
  
});




$( window ).resize(function() {
  /*
//that.$SVGMap.attr("viewBox","0 0 "+that.$SVGObject.outerWidth()+" "+that.$SVGObject.outerHeight() );
 that.$SVGMap.attr("viewBox","0 0 "+(that.$SVGObject.outerWidth().replace(/\D+$/g, "")*2)+" "+(that.$SVGObject.outerHeight().replace(/\D+$/g, "")*2) );

console.log("Width",that.$SVGObject.outerWidth())
console.log("height",+that.$SVGObject.outerHeight())
*/
});

/*
this.$SVGMap.load('Images/map.svg',
    function (response, status, xhr) {
        if (status == 'success') {
            // yay the load is ok
            alert('loaded');
        }
    })
    */

       // this.$MapContainer.addClass('slowly-introduce');

     //   #region old code
        //this.$Road.addClass('svg-slowly-introduce');
//TweenMax.to(this.$MapContainer, 5, {x:100, y:100, scale:0.5, rotation:180, skewX:45});
//TweenMax.to(this.$MapContainer, 5, {scale:0.8,rotationX:70,   boxShadow:"8px 26px 0px 0px grey",  skewX:40,
  //      ease:Linear.easeNone});
/*rotation:"1.25rad", rotationX:60,
TweenMax.to(this.$MapContainer, 5, {bezier:[{left:100, top:250}, {left:300, top:0}, {left:500, top:400}], ease:Power1.easeInOut});
 

//tween the "left" and "top" css properties through the supplied values (notice we're passing the array directly to the bezier rather than creating an object with "values" because we're accepting the defaults)
TweenMax.to(this.$MapContainer, 5, {bezier:[{left:100, top:250}, {left:300, top:0}, {left:500, top:400}], ease:Power1.easeInOut});
 
//if we want to customize things, like the curviness and setting autoRotate:true, we need to define the bezier as an object instead, and pass our array as the "values" property
TweenMax.to(this.$MapContainer, 5, {bezier:{curviness:1.25, values:[{x:100, y:250}, {x:300, y:0}, {x:500, y:400}], autoRotate:true}, backgroundColor:"#f00", ease:Power1.easeInOut});
 
//let's define the type as "soft" instead of using the default "thru"
TweenMax.to(this.$MapContainer, 5, {bezier:{type:"soft", values:[{x:100, y:250}, {x:300, y:0}, {x:500, y:400}], autoRotate:true}, ease:Power1.easeInOut});
 
//now we'll do a cubic Bezier and make our target auto rotate but add 45 degrees to the rotation
TweenMax.to(this.$MapContainer, 5, {bezier:{type:"cubic", values:[{x:100, y:250}, {x:150, y:100}, {x:300, y:500}, {x:500, y:400}], autoRotate:["x","y","rotation",45,false]}, ease:Power1.easeInOut});
 
//NON-CSS, generic x/y property tween: animate obj through the points in the array (notice we're passing the array directly to the bezier rather than creating an object with "values" because we're accepting the defaults)
TweenMax.to(obj, 5, {bezier:[{x:100, y:250}, {x:300, y:0}, {x:500, y:400}], ease:Power1.easeInOut});
  */      

  //#endregion
    }

    this.fnInit();
    }
    catch(e){
        console.error(e);
    }
   
}

_SVG_Map.prototype.Create  = function(){
    try
      {

         
      }
      catch(e)
      {
       console.error(e);
      }
}


_SVG_Map.prototype.Destroy  = function(){
    try
      {

         
      }
      catch(e)
      {
       console.error(e);
      }
}


_SVG_Map.prototype.Open  = function(){
    try
      {

         
      }
      catch(e)
      {
       console.error(e);
      }
}


_SVG_Map.prototype.Close  = function(){
    try
      {

         
      }
      catch(e)
      {
       console.error(e);
      }
}

_SVG_Map.prototype.Add  = function(){
    try
      {

         
      }
      catch(e)
      {
       console.error(e);
      }
}


_SVG_Map.prototype.Remove  = function(){
    try
      {

         
      }
      catch(e)
      {
       console.error(e);
      }
}

_SVG_Map.prototype.MapFade  = function(hide, seconds){

      try
      {

         hide = (hide == undefined) ? true: hide;
         hide = (hide == true) ? 0: 1;
         seconds  = (seconds == undefined) ? 0: seconds;
         TweenMax.to(this.$MapContainer, seconds, {opacity: hide});
      }
      catch(e)
      {
       console.error(e);
      }
}



_SVG_Map.prototype.Events  = function(){
    try
      {

         
      }
      catch(e)
      {
       console.error(e);
      }
}


$(document).ready(function(){
    console.log('Page loaded');
    var _SVG_Map_Object = new _SVG_Map('.map-container');
   // BallinadeeWayMapObj.MapFade();
  
   // BallinadeeWayMapObj.Init();
   
});
    
    
    
})();
