(function BallinadeeWayInto() {
    $(document).ready(function () {
        console.log('Page loaded');
        var _SVG_Typography_Object = new _SVG_Typography('.title-container', {
            OnInitialised: function (Alphabet, $SVG) {
                var that = this;
                that.Write('B', {
                    Duration: 1
                });
            }
        });
    }); //document on readyj
})();