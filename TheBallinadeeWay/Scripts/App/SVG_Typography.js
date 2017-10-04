var _SVG_Typography = _SVG_Typography || {}
_SVG_Typography = function(Container, options) {
    try {
        var that = this;
        this.$this = $(Container);
        this.$SVG = {};
        this.Alphabet = new Array();
        this.Options = {
            OnInitialised: function(Alphabet) {}
        }
        this.Options = $.extend({}, this.Options, options);
        this.$this.find('object')[0].addEventListener('load', function() {
            try {
                var doc = this.contentDocument;
                that.$SVG = $(doc).children('svg');
                if (that.$SVG.length > 0) {
                    for (var i = 0; i < 26; i++) {
                        var Letter = String.fromCharCode(65 + i)
                          , $SVGElement = that.$SVG.find('g#Letter' + Letter)
                          , exists = $SVGElement.length > 0;
                        if (exists) {
                            var Element = {
                                Letter: Letter,
                                $Element: $SVGElement,
                                Path: $SVGElement.find('path.parts'),
                                DrawParts:  $SVGElement.find('g.draw-parts path'),
                            };
                            that.Alphabet.push(Element);
                            console.log('loaded Letter'+Letter,Element )
                        }
                    }
                    that.Options.OnInitialised.call(that, that.Alphabet, that.$SVG);
                }
            } catch (e) {
                console.error(e);
            }
        }, true);
    } catch (e) {
        console.error(e);
    }
}
_SVG_Typography.prototype.Get = function(Letter) {
    var that = this;
    try {
        return _.findWhere(this.Alphabet, {
            Letter: Letter
        });
    } catch (e) {
        console.error(e);
    }
}


_SVG_Typography.prototype.Draw = function(Letter) {
    var that = this;
    try {
        
         var DrawParts = that.Get(Letter).DrawParts || new array();
      //  var Parts = that.Get(Letter).Path || new array();
       
         var TitleTimeline = new TimelineMax({repeat:-1});
           var ease = Linear.easeNone;
           TweenMax.set(DrawParts, {drawSVG:0});
     //      TweenMax.set(Parts, {opacity:0});
            DrawParts = DrawParts.filter('.draw');
           TweenMax.to(DrawParts, 3, {opacity:1,drawSVG:true}, 5);

    } catch (e) {
        console.error(e);
    }
}

_SVG_Typography.prototype.Exists = function(Letter) {
    var that = this;
    try {
        return _.findWhere(this.Alphabet, {
            Letter: Letter
        }) != undefined;
    } catch (e) {
        console.error(e);
    }
}
