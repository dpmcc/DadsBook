(function fnBallinadeeWayMap(){

var BallinadeeWayMap = BallinadeeWayMap || {}

BallinadeeWayMap = function(Container){

    try{
    this.$MapContainer = $(Container);
    this.$SVGMapContainer = this.$MapContainer.find('svg.map');
    this.$Road = this.$MapContainer.find('.road');
   
    this.fnInit  = function(){
    //   var tween = TweenMax.to( this.Road , 1, {css:{fill:"#ff0000"}, delay:5});
        this.$SVGMapContainer.attr({height: this.$SVGMapContainer.height(), width:this.$SVGMapContainer.width() });
        this.$MapContainer.addClass('slowly-introduce');
        //this.$Road.addClass('svg-slowly-introduce');
    }

    this.fnInit();
    }
    catch(e){
        console.error(e);
    }
   
}


BallinadeeWayMap.prototype.Init  = function(){
     //   var tween = TweenMax.to(this.Road, 2, {scale:200, height:150});
  
    }

    
    

$(document).ready(function(){
    console.log('Page loaded');
    var BallinadeeWayMapObj = new BallinadeeWayMap('.map-container');
    
   // BallinadeeWayMapObj.Init();
   
});
    
    
    
})();
