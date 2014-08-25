jQuery.fn.extend({
  coverVid: function(width, height) {
    $(document).ready(sizeVideo);
    $(window).resize(sizeVideo);
    var $this = this;

    function sizeVideo() {
      var parentHeight = $this.parent().height();
      var parentWidth = $this.parent().width();
      var nativeWidth = width;
      var nativeHeight = height;
      var heightScaleFactor = parentHeight / nativeHeight;
      var widthScaleFactor = parentWidth / nativeWidth;
      $this.css({
        position: "absolute",
        top: "50%",
        left: "50%",
        "-webkit-transform": "translate(-50%, -50%)",
        "-moz-transform": "translate(-50%, -50%)",
        "-ms-transform": "translate(-50%, -50%)",
        "-o-transform": "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)"
      });
      $this.parent().css("overflow", "hidden");
      if (widthScaleFactor > heightScaleFactor) {
        $this.css({
          height: "auto",
          width: parentWidth
        })
      } else {
        $this.css({
          height: parentHeight,
          width: "auto"
        })
      }
    }
  }
});
