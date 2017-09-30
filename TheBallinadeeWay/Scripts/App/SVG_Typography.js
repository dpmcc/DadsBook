var _SVG_Typography = _SVG_Typography || {}
_SVG_Typography = function (Container, options) {
    try {
        var that = this;
        this.$this = $(Container);
        this.$SVG = {};
        this.Alphabet = new Array();
        this.Options = {
            OnInitialised: function (Alphabet) {}
        }
        this.Options = $.extend({}, this.Options, options);
        this.$this.find('object')[0].addEventListener('load', function () {
            try {
                var doc = this.contentDocument;
                that.$SVG = $(doc).children('svg');
                if (that.$SVG.length > 0) {
                    for (var i = 0; i < 26; i++) {
                        var Letter = String.fromCharCode(65 + i)
                            , $SVGElement = that.$SVG.find('path#Letter' + Letter)
                            , exists = $SVGElement.length > 0;
                        if (exists) {
                            that.Alphabet.push({
                                Letter: Letter
                                , $Element: $SVGElement
                                , Path: $SVGElement.attr('d')
                            });
                        }
                    }
                    that.Options.OnInitialised.call(that, that.Alphabet);
                }
            }
            catch (e) {
                console.error(e);
            }
        }, true);
    }
    catch (e) {
        console.error(e);
    }
}
_SVG_Typography.prototype.Get = function (Letter) {
     var that = this;
    try {
        return _.findWhere( this.Alphabet,{ Letter: Letter});
    }
    catch (e) {
        console.error(e);
    }
}