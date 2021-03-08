function loadLook() {
  var innerWidth = $(window).width();
  var innerHeight = $(window).height();
  function loadApp() {
    $(".flipbook").turn({
      width: innerWidth, //宽度
      height: innerHeight, //高度
      display: "single", //设置显示模式。值：单，双
      elevation: 50,
      pages: 5, //页数
      page: 1, //初始页面
      gradients: true,
      autoCenter: true,
      //when 设置事件监听
      when: {
        turning: function (e, page, view) {
          // var book = $(this),
          console.log(e);
          console.log(page);
          console.log(view);
          // currentPage = book.turn('page'),
        },
      },
    });
  }
  // Load the HTML4 version if there's not CSS transform
  yepnope({
    test: Modernizr.csstransforms,
    yep: ["libs/turn.js"],
    both: ["style/basic.css"],
    complete: loadApp,
  });
}

loadLook();

// 初始化烟花
$("#fireWork").fireworks({
  sound: false, // sound effect
  opacity: 0.9,
  width: "100%",
  height: "100%",
});

// 在pc端的音乐点击播放
$(".music-icon").one("click", function () {
  var myAudio = document.getElementById("myAudio");
  myAudio.play();
  $(this).addClass("self-rotate");
});

// 微信场景下的音乐播放
document.addEventListener(
  "WeixinJSBridgeReady",
  function () {
    var audi = document.getElementById("myAudio");
    audi.play();
    audi.volume = 1;
  },
  false
);

window.onload = function () {
  $("#testview").show();
};
