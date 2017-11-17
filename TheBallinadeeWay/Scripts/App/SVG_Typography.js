var _SVG_Typography = _SVG_Typography || {}
_SVG_Typography = function(Container, options) {
    try {
        var that = this;
        this.$this = $(Container);
        this.WindowWidth = $(window).width(); //retrieve current window width
        this.WindowHeight = $(window).height();
        this.$SVG = {};
        this.ObjectHTML = that.$this.find(options.SVGObject);
        this.Alphabet = new Array(), this.Positions = that.Retrieve('Positions') || new Array();
        this.Options = {
            OnInitialised: function(Alphabet) {}
        }
        this.Options = $.extend({}, this.Options, options);
        this.ObjectHTML[0].addEventListener('load', function() {
            try {
                var doc = this.contentDocument;
                that.$SVG = $(doc).children('svg').clone();
                that.ObjectHTML.addClass('hidden')
             
                if ((options.$Container != undefined) && (options.$Container.length > 0))
                {
                      var SVGDocContents = that.$SVG.children('g');
                      
                      options.$Container.find('svg').append(SVGDocContents);
                      that.$SVG = options.$Container.find('svg').attr('id',that.$SVG[0].id+"Copied");
                }
                else
                {
                  $('section.title-container').append(that.$SVG);      
                }

                that.$SVG.attr({width:that.WindowWidth, height:that.WindowHeight,viewBox:'0 0 '+that.WindowWidth+' '+that.WindowHeight});
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
        ReturnLetter.$Element = that.$SVG.find('g#Letter' + Letter).clone().attr({'id': 'Letter'+Letter,'data-letter': Letter });//+'_'+ Math.floor(Date.now() / 1000)
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
         that = this
        if (Word.length > 0)
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
                return 150
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
       var LetterID = ThisLetter.$Element.attr('id'),
           LetterIndex = ThisLetter.$Element.index();
       ThisLetter.$Element.attr('id',(LetterID+LetterIndex));

       var LocalPosition = that.GetPosition(LetterID+LetterIndex);  
        
        var Pos = {x:((typeof LocalOptions.x === 'function') ? LocalOptions.x.call(that) : LocalOptions.x)
                 , y:((typeof LocalOptions.y === 'function') ? LocalOptions.y.call(that) : LocalOptions.y)}
        if (LocalPosition)
        {
            Pos.x = LocalPosition.x;
            Pos.y= LocalPosition.y;
        }

       TweenMax.to(ThisLetter.$Element, 0, {
            scale: LocalOptions.scale,
            transformOrigin: '0% 100%',
            x: Pos.x,
            y: Pos.y
        });

        //Start draw
        var DrawPartGroups = ThisLetter.DrawParts || new array();

        that.ShowCompleteParts(ThisLetter, false);

        LocalDuration = LocalOptions.Duration / ThisLetter.Path.length;

        var TitleTimeline = new TimelineMax({
            paused: true,
            onComplete: function() {
               that.ShowCompleteParts(ThisLetter, true);
                
               var boundingBox = document.createElement("div");
               boundingBox.setAttribute("class", "boundingBox "+ThisLetter.$Element.attr('id'));
               document.body.appendChild(boundingBox);
               
               var BData =that.UpdateBounds(ThisLetter.$Element[0], boundingBox);
               Draggable.create(ThisLetter.$Element[0], { 
                            throwProps:true
                            ,onDragEnd: function(e) {
                               
                                var $Letter = $(event.target).closest('g[data-letter]'),
                                    Letter = $Letter.attr('id');

                                that.SetPosition(Letter,this.x,this.y)
                                  
                                 $(event.target).attr(             
                                  {'data-x':this.x,
                                    'data-y':this.y
                                  });
                                
                                var Positon = $Letter.position();
                                var $BoundingBox = $('.boundingBox.'+Letter)
                                TweenMax.to($BoundingBox, 1, {top:Positon.top, left:Positon.left});



                            }
               });
                              
                counter++;
                var BoundingBox = ThisLetter.$Element[0].getBBox();
                var nextX = ((typeof LocalOptions.x === 'function') ? LocalOptions.x.call(that) : LocalOptions.x) + BData.width-20;
                LocalOptions.x = nextX;
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
_SVG_Typography.prototype.GetPosition = function(Letter) {
  var that = this;
    try {
        return _.findWhere(that.Positions, {Letter: Letter});
         
    } catch (e) {
        console.error(e);
    }
}

_SVG_Typography.prototype.SetPosition = function(Letter,x,y) {
    var that = this;
    try {

        if (Letter === undefined) return;

        var ExistingRecord = _.findWhere(that.Positions, {Letter: Letter});
        if (ExistingRecord != undefined)
        {
           ExistingRecord.x = x;
           ExistingRecord.y = y;
        }
        else {
            that.Positions.push({
                Letter:Letter
                ,x:x
                ,y:y
            })
        }
        that.Store('Positions',that.Positions);
        
    } catch (e) {
        console.error(e);
    }
}


_SVG_Typography.prototype.Store = function(name,data) {
    var that = this;
    try {
       if (typeof(Storage) !== "undefined") {
         if ( typeof data == 'object')
        {
          localStorage.setItem(name, JSON.stringify(data));
        }
        else
        {
          localStorage.setItem(name, data);
        }
        } else {
           console.error("No  localStorage/sessionStorage")
        }
    } catch (e) {
        console.error(e);
    }
}


_SVG_Typography.prototype.Retrieve = function(name) {
    var that = this;
    try {
       if (typeof(Storage) !== "undefined") {
            try
            {
               return JSON.parse(localStorage[name]);
            }
            catch (e) {
               return localStorage[name];
            }
        } else {
           console.error("No  localStorage/sessionStorage")
        }
    } catch (e) {
        console.error(e);
    }
}


 
/*
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
*/

 _SVG_Typography.prototype.GetMousePosition = function(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }

  



_SVG_Typography.prototype.UpdateBounds = function(element, bb) {
    var that = this;
    try {

        var p1 = that.$SVG[0].createSVGPoint()
          , p2 = that.$SVG[0].createSVGPoint()
          , p3 = that.$SVG[0].createSVGPoint()
          , p4 = that.$SVG[0].createSVGPoint();

        var bbox = element.getBBox(), matrix = element.getCTM(), style = bb.style, left, top, BoundingData = {};
        //set the x/y of each corner
        p1.x = p4.x = bbox.x;
        p1.y = p2.y = bbox.y;
        p2.x = p3.x = bbox.x + bbox.width;
        p3.y = p4.y = bbox.y + bbox.height;
        //translate the points according to the transform matrix
        p1 = p1.matrixTransform(matrix);
        p2 = p2.matrixTransform(matrix);
        p3 = p3.matrixTransform(matrix);
        p4 = p4.matrixTransform(matrix);
        //figure out which ones are smallest (for top and left)
        top = Math.min(p1.y, p2.y, p3.y, p4.y);
        left = Math.min(p1.x, p2.x, p3.x, p4.x);
        //now set the style of the absolutely-positioned <div> elements to reflect the bounding box. 
        BoundingData = {
            top: top,
            left: left,
            width: (Math.max(p1.x, p2.x, p3.x, p4.x) - left),
            height: (Math.max(p1.y, p2.y, p3.y, p4.y) - top)
        }
        style.top = BoundingData.top + "px";
        style.left = BoundingData.left + "px";
        style.width = BoundingData.width + "px";
        style.height = BoundingData.height + "px";
        
        return BoundingData;
    } catch (e) {
        console.error(e);
    }
}
