(function BallinadeeWayInto() {
    $(document).ready(function () {
        console.log('Page loaded');

        var _SVG_Typography_Object = new _SVG_Typography('body', {
            SVGObject:'#ObjTitle',
            $Container:$('section.main-container'),
            OnInitialised: function (Alphabet, $SVG) {
                var that = this;
                that.Write('Ballinadee', {
                    Duration: 0.8,
                     scale: 35,
                     y:600
                })
                }
        });


   
  var _SVG_Map_Object = new _SVG_Map('body', {
            SVGObject:'#ObjMap',
            $Container:$('section.main-container'),
            OnInitialised: function (Alphabet, $SVG) {
               
            }
        });


                  
         
      



    }); //document on ready
})();