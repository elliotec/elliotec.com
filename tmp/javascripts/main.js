(function() {
  $(function() {
    var menu, menuToggle;
    menu = $("#navigation-menu");
    menuToggle = $("#js-mobile-menu");
    return $(menuToggle).on("click", function(e) {
      e.preventDefault();
      menu.slideToggle(function() {
        if (menu.is(":hidden")) {
          menu.removeAttr("style");
        }
      });
    });
  });

}).call(this);
