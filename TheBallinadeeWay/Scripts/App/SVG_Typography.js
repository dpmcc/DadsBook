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
                                DrawParts: $SVGElement.find('g.draw-parts path.draw'),
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
            Duration: 1,
            scale:15,
            DrawSettings: {
                opacity: 1,
                drawSVG: true
            }
        }
        LocalOptions = $.extend({}, LocalOptions, options);

        //Set scale
        var ThisLetter = that.Get(Letter);
        TweenMax.to(ThisLetter.$Element, 0, {scale:LocalOptions.scale});

        //Start draw
        var DrawParts = that.Get(Letter).DrawParts || new array();
        var MainDrawPart =  that.Get(Letter).DrawParts.filter('.draw.main');
        var Marker =  that.Get(Letter).DrawParts.filter('.draw.marker');
        TweenMax.set(Marker[0], {xPercent:-730, yPercent:-1400});
        TweenMax.set(DrawParts, {drawSVG:0});

        var TitleTimeline = new TimelineMax({ paused: true});
        var ease = Linear.easeNone;
       
        DrawParts = DrawParts.filter('.draw');
        TitleTimeline.to(DrawParts, LocalOptions.Duration, LocalOptions.DrawSettings);
        
         var array = that.ConvertToCubicBezier(MainDrawPart[0]);
 
         TitleTimeline.to(Marker[0],  (LocalOptions.Duration * 0.9),{bezier:{values:array, type:"cubic"}}, 0);
         TitleTimeline.to(Marker[0],  (LocalOptions.Duration * 0.5), {autoAlpha:0});
       
         TitleTimeline.play(0);
        
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
        throw e;
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
