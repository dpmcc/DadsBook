var _SVG_Map = _SVG_Map || {}
_SVG_Map = function(Container, options) {
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
                that.$SVG = $(doc).children('svg').clone().attr('id','SVGCopied');
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
_SVG_Map.prototype.Get = function(Letter) {
    var that = this
      , ReturnLetter = {};
    try {
        return ReturnLetter;
    } catch (e) {
        console.error(e);
    }
}

_SVG_Map.prototype.Write = function(Word, options) {
    var that = this;
    try {

    } catch (e) {
        console.error(e);
    }
}

_SVG_Map.prototype.WriteProcess = function(Letter, Word, counter, options) {
    var that = this;
    try {


    } catch (e) {
        console.error(e);
    }
}




_SVG_Map.prototype.Store = function(name,data) {
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


_SVG_Map.prototype.Retrieve = function(name) {
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



  

