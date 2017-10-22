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
                    for (var i = 0; i < 60; i++) {
                        var Letter = String.fromCharCode(65 + i)
                          , $SVGElement = that.$SVG.find('g#Letter' + Letter.replace(/\W/g, ''))
                          , exists = $SVGElement.length > 0;
                        if (exists) {
                            var Element = {
                                Letter: Letter,
                                $Element: $SVGElement,
                                Path: $SVGElement.find('path.parts'),
                                DrawParts: $SVGElement.find('g.draw-parts'),
                            };
                            that.Alphabet.push(Element);
                            console.log('loaded Letter' + Letter, Element)
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
    var that = this
      , ReturnLetter = {};
    try {
        ReturnLetter = _.findWhere(this.Alphabet, {
            Letter: Letter
        });
        ReturnLetter.$Element = that.$SVG.find('g#Letter' + Letter).clone().removeAttr('id');
        ReturnLetter.Path = ReturnLetter.$Element.find('path.parts');
        ReturnLetter.DrawParts = ReturnLetter.$Element.find('g.draw-parts');
        return ReturnLetter;
    } catch (e) {
        console.error(e);
    }
}

_SVG_Typography.prototype.Write = function(Word, options) {
    var that = this;
    try {

        if (Word.length > 0)
            // option.y +=  option.y+100;

            that.WriteProcess(Word[0], Word, 0, options);

    } catch (e) {
        console.error(e);
    }
}

_SVG_Typography.prototype.WriteProcess = function(Letter, Word, counter, options) {
    var that = this;
    try {

        if (Letter === undefined) {
            return
        }

        var LocalDuration = 0
          , LocalOptions = {
            Duration: 1,
            scale: 1,
            x: 100,
            y: function() {
                return 100
            },
            DrawSettings: {
                opacity: 1,
                drawSVG: true
            }
        }
        LocalOptions = $.extend({}, LocalOptions, options);

        //Set scale
        var ThisLetter = that.Get(Letter);
        that.$SVG.append(ThisLetter.$Element);

        TweenMax.to(ThisLetter.$Element, 0, {
            scale: LocalOptions.scale,
            x: ((typeof LocalOptions.x === 'function') ? LocalOptions.x.call(that) : LocalOptions.x),
            y: ((typeof LocalOptions.y === 'function') ? LocalOptions.y.call(that) : LocalOptions.y)
        });

        //Start draw
        var DrawPartGroups = ThisLetter.DrawParts || new array();

        that.ShowCompleteParts(ThisLetter, false);

       LocalDuration  = LocalOptions.Duration / ThisLetter.Path.length;

        var TitleTimeline = new TimelineMax({
            paused: true,
            onComplete: function() {
                that.ShowCompleteParts(ThisLetter, true);
                counter++;
                var BoundingBox = ThisLetter.$Element[0].getBBox();

                LocalOptions.x = ((typeof LocalOptions.x === 'function') ? LocalOptions.x.call(that) : LocalOptions.x) + (BoundingBox.width * LocalOptions.scale) + 10;

                // LocalOptions.y = ((typeof LocalOptions.y === 'function') ? LocalOptions.y.call(that) : LocalOptions.y) + BoundingBox.height;
                that.WriteProcess(Word[counter], Word, counter, LocalOptions);
                if (typeof LocalOptions.onComplete === 'function') {
                    onComplete.call(that)
                }
            }
        });

        TweenMax.set(DrawPartGroups.find('path.end'), {
            opacity: 0
        });

        DrawPartGroups.each(function(i, ThisPart) {

            var DrawParts = $(ThisPart).find('path.draw');
            var MainDrawPart = DrawParts.filter('.draw.main');
            var EndParts = DrawParts.filter('.end');

            var Marker = DrawParts.filter('.draw.marker');
            if (Marker.length > 0)
                TweenMax.set(Marker[0], {
                    xPercent: -730,
                    yPercent: -1400
                });

            TweenMax.set(DrawParts, {
                drawSVG: 0
            });

            var ease = Linear.easeNone;

            DrawParts = DrawParts.filter('.draw');
            TitleTimeline.to(DrawParts, LocalDuration, LocalOptions.DrawSettings);

            if (Marker.length > 0) {

                var array = MorphSVGPlugin.pathDataToBezier(MainDrawPart[0], {
                    offsetX: 0
                });
                TitleTimeline.to(Marker[0], (LocalDuration * 0.8), {
                    bezier: {
                        values: array,
                        type: "cubic"
                    }
                }, 0);
                TitleTimeline.to(Marker[0], 0, {
                    autoAlpha: 0
                });
            }

            if (EndParts.length > 0)
                TitleTimeline.to(EndParts, {
                    opacity: 1
                });

            TitleTimeline.play(0);

        });

        return {
            BBox: ThisLetter.$Element[0].getBBox(),
            x: ((typeof LocalOptions.x === 'function') ? LocalOptions.x.call(that) : LocalOptions.x),
            y: ((typeof LocalOptions.y === 'function') ? LocalOptions.y.call(that) : LocalOptions.y)
        }

    } catch (e) {
        console.error(e);
    }
}

_SVG_Typography.prototype.ShowCompleteParts = function(Letter, show) {
    var that = this;
    try {
        show == undefined ? true : false;
        Letter.Path.each(function(i, ThisPart) {
            (show == true) ? $(ThisPart).show() : $(ThisPart).hide();

        });

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
