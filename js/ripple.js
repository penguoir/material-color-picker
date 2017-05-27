!function(t,e,i,n){function r(e,i){this.$element=t(e),this.options=t.extend({},r.Defaults,this._getOptionsFromElementAttributes(),i),this._prepare(),this._bind()}r.prototype._bind=function(){var r,o,a,s,p,c=this.$element,l=this.options;s="ontouchend"in e||e.DocumentTouch&&i instanceof DocumentTouch,p=1==s?"touchend.rippleria":"click.rippleria",this.$element.bind(p,function(e){var i=t("<div class='rippleria-ink'/>");c.append(i),l.color!=n&&i.css("background-color",l.color);var p="rippleria "+l.duration/1e3+"s "+l.easing;if(i.css("animation",p),i.css("-webkit-animation",p),setTimeout(function(){i.remove()},parseFloat(l.duration)),i.height()||i.width()||(r=Math.max(c.outerWidth(),c.outerHeight()),i.css({height:r,width:r})),1==s){var h=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];o=h.pageX-c.offset().left-i.width()/2,a=h.pageY-c.offset().top-i.height()/2}else o=e.pageX-c.offset().left-i.width()/2,a=e.pageY-c.offset().top-i.height()/2;i.css({top:a+"px",left:o+"px"})})},r.prototype._prepare=function(){var t=this.$element;if("static"==t.css("position")&&t.css("position","relative"),t.css("overflow","hidden"),t.find("img")[0]!=n&&t.on("dragstart",function(t){t.preventDefault()}),this.options.detectBrightness){var e,i,r,o,a=this.$element.css("background-color");if("transparent"==a){var s=function(t){var e=t.css("background-color");return 0!=t.length&&"transparent"==e?s(t.parent()):e};a=s(this.$element.parent())}a.match(/^rgba/)?(a=a.match(/rgba\(([^)]+)\)/)[1],a=a.split(/ *, */).map(Number),e=a[0],i=a[1],r=a[2]):a.match(/^rgb/)?(a=a.match(/rgb\(([^)]+)\)/)[1],a=a.split(/ *, */).map(Number),e=a[0],i=a[1],r=a[2]):"#"==a[0]&&7==a.length?(e=parseInt(a.slice(1,3),16),i=parseInt(a.slice(3,5),16),r=parseInt(a.slice(5,7),16)):"#"==a[0]&&4==a.length&&(e=parseInt(a[1]+a[1],16),i=parseInt(a[2]+a[2],16),r=parseInt(a[3]+a[3],16)),o=(299*e+587*i+114*r)/1e3,o>150&&this.$element.addClass("rippleria-dark")}},r.prototype._getOptionsFromElementAttributes=function(){var e=this;return attrs={},t.each(r.Defaults,function(t,i){var n=e.$element.attr("data-rippleria-"+t);null!=n&&(attrs[t]=n)}),attrs},r.prototype.changeColor=function(t){this.options.color=t},r.prototype.changeEasing=function(t){this.options.easing=t},r.prototype.changeDuration=function(t){this.options.duration=t},r.Defaults={duration:750,easing:"linear",color:n,detectBrightness:!0},t.fn.rippleria=function(e){var i=Array.prototype.slice.call(arguments,1);return this.each(function(){var n=t(this),o=n.data("rippleria");o||(o=new r(this,"object"==typeof e&&e),n.data("rippleria",o)),"string"==typeof e&&"_"!==e.charAt(0)&&o[e].apply(o,i)})},t(function(){t("[data-rippleria]").rippleria()})}(window.jQuery,window,document);