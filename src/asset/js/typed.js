var typed;
typed = {
  init: function() {
    this.form = $("form");
    console.log(this.form);
    return this.form.on("submit", function(_this) {
      return function(event) {
        event.preventDefault();
        return _this.send()
      }
    }(this))
  },
  send: function() {
    var button, button_orig, data, email_address, list_id_el, name, _self;
    _self = this;
    if (!this.validate()) {
      return false
    }
    button = this.form.find("button");
    email_address = this.form.find("#email")[0].value || "";
    name = this.form.find("#name")[0].value || "";
    data = {};
    button_orig = button.html();
    list_id_el = this.form.find('[name="list_id"]');
    $.each(this.form.find('[name="apps[]"]'), function(i, item) {
      return apps.push(item.value)
    });
    $.each(this.form.find('[name="emails[]"]'), function(i, item) {
      return emails.push(item.value)
    });
    data = {
      email_address: email_address,
      name: name,
      _method: "PUT",
      source: zhuqingting.cookie.get("source")
    };
    if (list_id_el.length) {
      data.list_id = list_id_el[0].value
    }
    return $.ajax({
      url: this.form.attr("action"),
      type: "GET",
      data: data,
      beforeSend: function() {
        return button.html("发送邮件中&hellip;")
      },
      success: function(a, b, c) {
        return _self.doSuccess()
      },
      error: function(a, b, c) {
        return _self.doSuccess()
        // button.html(button_orig);
        // return alert("Sorry, there was a problem signing up. Please try again.")
      },
      complete: function(_this) {
        return function() {
          button.html(button_orig);
          return _self.form.find("#name, #email").val("")
        }
      }(this)
    })
  },
  validate: function() {
    var email, filter, name;
    this.form.find("input").removeClass("is-error");
    name = this.form.find("#name")[0];
    if (name.value === "") {
      name.classList.add("is-error");
      name.focus();
      return false
    }
    email = this.form.find("#email")[0];
    filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.value === "" || !filter.test(email.value)) {
      email.classList.add("is-error");
      email.focus();
      return false
    }
    return true
  },
  doSuccess: function() {
    var success_html;
    success_html = $("#tpl-signup-success").html().trim();
    return typed.popover.show(success_html)
  }
};
typed.popover = {
  defaults: {
    "class": "pop-wrapper"
  },
  init: function(options) {
    $.extend(this.defaults, options);
    this.popWrapper = $("<div>").attr({
      "class": "pop-wrapper is-hidden",
      style: "display:none;"
    });
    this.pop = $("<div>").attr({
      "class": "pop"
    }).appendTo(this.popWrapper);
    this.popOverlay = $("<div>").attr({
      "class": "overlay"
    }).appendTo(this.popWrapper);
    this.popWrapper.appendTo("body");
    return this.popWrapper.on("click", function(_this) {
      return function(event) {
        return _this.hide()
      }
    }(this))
  },
  show: function(content) {
    $(".typed").addClass("blur");
    if (!!content) {
      this.pop.html(content)
    }
    this.popWrapper.show();
    return setTimeout(function(_this) {
      return function() {
        return _this.popWrapper.removeClass("is-hidden")
      }
    }(this), 0)
  },
  hide: function() {
    $(".typed").removeClass("blur");
    return this.popWrapper.addClass("is-hidden").one("transitionend transitionEnd webkitTransitionEnd moztransitionend", function(_this) {
      return function(event) {
        _this.popWrapper.hide();
        return _this.pop.empty()
      }
    }(this))
  }
};
typed.init();
typed.popover.init();
