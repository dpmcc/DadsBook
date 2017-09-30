(function BallinadeeWayMap() {
    $(document).ready(function () {
        console.log('Page loaded');
       // var _SVG_Map_Object = new _SVG_Map('.map-container');
     var _SVG_Typography_Object = new _SVG_Typography('.title-container',{
         OnInitialised:function(Alphabet){
             var that = this;
             _.each(Alphabet, function(item){
                 
                    TweenMax.to(that.Get('B').$Element, 1, {rotation:360, x:30,y:200,fill:'#ff0000',scale:2}, 2.5);
                  TweenMax.to(that.Get('B').$Element, 3, {fill:'#0000ff',scale:2}, 2.5);
                 
             })
             
          
         }
     });
       
        
        
    });
})();