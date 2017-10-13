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
                                DrawParts: $SVGElement.find('g.draw-parts path'),
                            };
                            that.Alphabet.push(Element);
                            console.log('loaded Letter' + Letter, Element)
                        }
                    }
                    that.Options.OnInitialised.call(that, that.Alphabet, that.$SVG);
                }
            } catch (e) {j
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

_SVG_Typography.prototype.Write = function(Letter, options) {
    var that = this;
    try {

        var LocalOptions = {
            Duration: 5,
            DrawSettings: {
                opacity: 1,
                drawSVG: true
            }
        }
        LocalOptions = $.extend({}, LocalOptions, options);

        // var DrawParts = that.Get(Letter).DrawParts || new array();

        //  var TitleTimeline = new TimelineMax({repeat:-1});
        //    var ease = Linear.easeNone;
        // TweenMax.set(DrawParts, {drawSVG:0});
        // //    DrawParts = DrawParts.filter('.draw');
        //  TweenMax.to(DrawParts, LocalOptions.Duration, LocalOptions.DrawSettings);
        /*
TweenMax.to(".circle", 3, {
  bezier: DrawParts[0]
});
*/
        //$(DrawParts[1]).attr('d')

        /*
 var array = that.ConvertToCubicBezier($('pathDenis')[0]);

        TweenMax.to('#circle', 3, {
          bezier:{type:"cubic", autoRotate:true, values:array}, force3D:true, ease:Power0.easeNone
        });
*/

       

        that.$SVG.find('#red1').click(function() {

            var redPath = MorphSVGPlugin.pathDataToBezier(that.$SVG.find('#pathDenis1').attr('d'), {
                offsetX: 0
            });
           
            TweenMax.set(that.$SVG.find('circle'), {
                xPercent: -100,
                yPercent: -100
            });

            var tl = new TimelineMax({
                paused: true
            });




            tl.to(that.$SVG.find('#red1'), 2, {
                bezier: {
                    values: redPath,
                    type: "cubic"
                }
            }, 0);
         
         tl.play(0);
        });

    } catch (e) {
        console.error(e);
    }
}

_SVG_Typography.prototype.ConvertToCubicBezier = function(path) {
    var that = this;
    try {
        var data = Snap.path.toCubic(path.getAttribute('d'))
        dataLength = data.length,
        points = [],
        //holds our series of x/y values for anchors and control points,
        pointsString = data.toString();

        // convert cubic data to GSAP bezier
        for (var i = 0; i < dataLength; i++) {
            var seg = data[i];
            if (seg[0] === "M") {
                // move (starts the path)
                var point = {};
                point.x = seg[1];
                point.y = seg[2];
                points.push(point);
            } else {
                // seg[0] === "C" (Snap.path.toCubic should return only curves after first point)
                for (var j = 1; j < 6; j += 2) {
                    var point = {};
                    point.x = seg[j];
                    point.y = seg[j + 1];
                    points.push(point);
                }
            }
        }

        //position box's center around line:
        //TweenMax.set("#redBox", {xPercent:-50, yPercent:-50})

        //make the tween
        // var tween = TweenMax.to("#redBox", 3, {bezier:{type:"cubic", autoRotate:true, values:points}, force3D:true, ease:Power0.easeNone});

        console.log(points);

        return points;

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

_SVG_Typography.prototype.PathStringToArray = function(d) {
    var that = this;
    try {

        var commands = d.toUpperCase().split(/(?=[LMC])/);

        var ReturnPointArrays = commands.map(function(dItem) {
            var pointsArray = dItem.slice(1, dItem.length).trim().replace(/[ ,]+/g, ",").split(',');
            var pairsArray = [];
            for (var i = 0; i < pointsArray.length; i += 2) {
                pairsArray.push([+pointsArray[i], +pointsArray[i + 1]]);
            }
            return pairsArray;
        });
        console.log('PathStringToArray', ReturnPointArrays);
        return ReturnPointArrays;

    } catch (e) {
        console.error(e);
    }
}
