const globalUI = {};

//扩展globalUI.showLoading
(function ($, window) {
  //显示加载框
  $.showLoading = function (message, type) {
    var html = "";
    html += '<div class="globalUI-spinner"></div>';
    html += '<p class="text">' + (message || "数据加载中") + "</p>";

    //遮罩层
    var mask = document.getElementsByClassName("globalUI-show-loading-mask");
    if (mask.length == 0) {
      mask = document.createElement("div");
      mask.classList.add("globalUI-show-loading-mask");
      document.body.appendChild(mask);
      mask.addEventListener("touchmove", function (e) {
        e.stopPropagation();
        e.preventDefault();
      });
    } else {
      mask[0].classList.remove("globalUI-show-loading-mask-hidden");
    }
    //加载框
    var toast = document.getElementsByClassName("globalUI-show-loading");
    if (toast.length == 0) {
      toast = document.createElement("div");
      toast.classList.add("globalUI-show-loading");
      toast.classList.add("loading-visible");
      document.body.appendChild(toast);
      toast.innerHTML = html;
      toast.addEventListener("touchmove", function (e) {
        e.stopPropagation();
        e.preventDefault();
      });
    } else {
      toast[0].innerHTML = html;
      toast[0].classList.add("loading-visible");
    }
  };

  //隐藏加载框
  $.hideLoading = function (callback) {
    var mask = document.getElementsByClassName("globalUI-show-loading-mask");
    var toast = document.getElementsByClassName("globalUI-show-loading");
    if (mask.length > 0) {
      mask[0].classList.add("globalUI-show-loading-mask-hidden");
    }
    if (toast.length > 0) {
      toast[0].classList.remove("loading-visible");
      callback && callback();
    }
  };
})(globalUI, window);

globalUI.showLoading("正在加载..", "div");
