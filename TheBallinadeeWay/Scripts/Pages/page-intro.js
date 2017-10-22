(function BallinadeeWayInto() {
    $(document).ready(function () {
        console.log('Page loaded');
        var _SVG_Typography_Object = new _SVG_Typography('.title-container', {
            OnInitialised: function (Alphabet, $SVG) {
                var that = this;
                that.Write('Ba', {
                    Duration: 2,
                     scale: 8
                });
            }
        });
    }); //document on readyj
})();