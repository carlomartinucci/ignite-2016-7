window.odometerOptions = {
  auto: false, // Don't automatically initialize everything with class 'odometer'
  // selector: '.my-numbers', // Change the selector used to automatically find things to be animated
  format: 'd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
  duration: 1000, // Change how long the javascript expects the CSS animation to take
  theme: 'train-station' // Specify the theme (if you have more than one theme css file on the page)
  // animation: 'count' // Count is a simpler animation method which just increments the value,
                     // use it when you're looking for something more subtle.
};
var slideNumber = 100;

$(function () {
  var pause = true;
  var seconds = 100;
  var el = document.querySelector(".js-seconds");
  var odSeconds = new Odometer({
    el: el,
    format: 'd',
    value: 100
  })
  var el = document.querySelector(".js-slide");
  var odSlide = new Odometer({
    el: el,
    format: 'd',
    value: 100
  })

  function countSeconds() {
    if (pause) {return}
    else if (slideNumber <= 100) {
      nextSlide()
    }
    seconds = ((seconds - 99) % 15) +100;
    if (seconds == 100) {
      setTimeout(nextSlide,1000);
    }
    $(".js-seconds").html(seconds);
    if (slideNumber < 121) {
      setTimeout(countSeconds, 1000);
    } else if (slideNumber >= 121) {
      return
    }
  }

  function nextSlide() {
    updateSlideNumber(1);
  }

  function updateSlideNumber(delta) {
    slideNumber += delta;
    if (slideNumber == 121) {
      $(".js-slide").html(100);
    } else if (slideNumber > 121) {
      slideNumber = 100;
      $(".js-slide").html(slideNumber);
    } else {
      $(".js-slide").html(slideNumber);
    }
    setSlide(slideNumber);
  }

  function setSlide(number) {
    var content = $(".c-slides__"+(number-100)).html();
    $(".js-actual-content").html(content);
    //$(".js-actual-content").find(".js-slide-content").css("backgroundImage", "url(img/"+(number-100)+".jpg)");
    animateSlide(number-100);
  }

  setSlide(100);
  setBackground(1, "#preload");
  // var vid = document.getElementById("videomp4");
  // vid.currentTime = 9 ;
  // Up: 38
  // Down: 40
  $('body').keydown(function(e) {
  // SpaceBar: 32
    if (e.which == 32) {
      pause = !pause;
      countSeconds();
    }
  // Enter: 13
    if (e.which == 13) {
      // demoMode = true;
      $(".js-slide-description").toggleClass("is-hidden");
      $(".js-slide-content").toggleClass("is-hidden");
    }
  // Left: 37
    if (e.which == 37) {
      // go back;
      seconds = 100;
      if (slideNumber > 101) {
        updateSlideNumber(-1);
      }
    }
  // Right: 39
    if (e.which == 39) {
      // go forward;
      seconds = 100;
      nextSlide();
    }
    console.log( e.which );
  });
});

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function setBackground(number, of) {
  if (of == null) {of = "#content";}
  $(of).css("backgroundImage", "url(img/"+number+".jpg)")
}

function startIgnite() {
  pause = false;
  $('.progress').show();
  $('#actual-slide').html("" + 1 );
  setBackground(1);
  setBackground(2, "#preload");
  content = $("#"+1).html();
  $("#change-content").html(content);
  progressBar(15000, 200);
  $('#content').css("cursor", "none");
  // var vid = document.getElementById("videomp4");
  // vid.play();
  // $("#videodiv").show();
  // $('#content').css("width", "50vw");
  // $('#content').css("height", "50vh");
  // $('#content').css("bottom", "1vh");
  // $('#content').css("right", "1vh");
  // $('#content p').css("font-size", "10vh");
  // $('#content p').css("padding", "0 3vh");

  // $("#videodiv").fadeIn();
}

function endIgnite() {
  $('.progress').hide();
  $('#actual-slide').html('<span style="color: white">Carlo Martinucci</span> <i id="flame" class="fa fa-fire" style="color: rgba(255,83,13,0.8); transition: color 0.5s ease"></i>');
  alternateFlame1();
  $('#actual-slide').css('padding', "1vh 2vh");
  setBackground(21);
  content = $("#tnx").html();
  $('#content').css("background-color", setColor('asd'));
  $("#content").html(content);
  setTimeout(function(){
    $('#content').animate({
        opacity: 0,
      }, 5000, function() {
        $('#content').css("cursor", "auto");
         // Animation complete.
      });
  }, 2000)
}

function progressBar(T, t, startSlide, startPercentage) {
  if (startSlide == null) {startSlide = 1;}
  var actualSlide = startSlide;
  if (startPercentage == null) {startPercentage = 0;}
  var percentage = startPercentage;
  var color = 0;
  delta_percentage = t/T;
  function advanceProgressBar(dp){
    setTimeout(function(){
      percentage += dp;
      var newVal = 3.10 * percentage * $(window).width() / 10;
      $('.progress-bar').css("width", newVal);
      //$('.progress-bar').html("" + Math.round(percentage*T/1000) );
      if (percentage>=0.98){
        actualSlide += 1;
        $('#actual-slide').html("" + actualSlide );
        setBackground(actualSlide);
        setBackground(actualSlide+1, "#preload");
        content = $("#"+actualSlide).html();
        $("#change-content").html(content);
        $('#content p').css("font-size", "10vh");
        $('#content p').css("padding", "0 3vh");
        animateSlide(actualSlide);
        percentage = 0;
        color += 50505;
        $('.progress-bar').css("background-color", setColor(actualSlide));
      }
      if (pause) {
        startSlide = actualSlide;
        startPercentage = percentage;
      }
      else if (actualSlide <= 20 ) {
        advanceProgressBar(dp);
      }
      else {
        endIgnite();
      }
    }, t)
  }
  advanceProgressBar(delta_percentage);
}

function setColor(n) {
  var color = ""
  switch(n) {
    case 2:
      color = "rgba(255,0,0,0.7)"
      break;
    case 3:
      color = "rgba(255, 115, 132,0.7)"
      break;
    case 5:
      color = "rgba(255,0,0,0.7)"
      break;
    case 6:
      color = "rgba(10,10,123,0.7)"
      break
    case 7:
      color = "rgba(10,123,10,0.7)"
      break;
    case 11:
      color = "rgba(20,133,133,0.7)"
      break;
    case 13:
      color = "rgba(255,255,10,0.7)"
      break;
    case 14:
      color = "rgba(255,255,10,0.7)"
      break;
    case 15:
      color = "rgba(255,255,10,0.7)"
      break;
    case 18:
      color = "rgba(123,10,123,0.7)"
      break;
    case 20:
      color = "rgba(255,255,10,0.7)"
      break;
    default:
      color = "#333"
  }
  return color
}


function animateSlide(n) {
  var odoNumb = 0
  setTimeout(fadeInContent, 100)
  if ([1,2,3,5,6,8,9,10,11,12,13,15,16,17,18,19].indexOf(n) != -1) {
    setTimeout(fadeOutContent, 14300)
  }
  setTimeout(fadeOutChosen, 14300)
  switch(n) {
    case 1:
    $(".js-author-name").css("font-size", "4vh");
      break;
    case 2:
      break;
    case 3:
      var el = document.querySelector(".js-dec-to-31");
      var decTo32 = new Odometer({
        el: el,
        format: 'd',
        value: 100
      })
      var el = document.querySelector(".js-bin-to-31");
      var binTo32 = new Odometer({
        el: el,
        format: 'd',
        value: 100000
      })
      function countBaseTo32() {
        $(".js-dec-to-31").html(odoNumb+100);
        $(".js-bin-to-31").html(dec2bin(odoNumb+32));
        odoNumb += 1;
        console.log(slideNumber)
        if (slideNumber == 103 && odoNumb < 32) {
          setTimeout(countBaseTo32, 400);
        } else {
          return
        }
      };
      countBaseTo32()
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      setTimeout(function(){
        $(".js-white").addClass("white-figure");
        setTimeout(function(){
          $(".js-red").addClass("red-figure");
          setTimeout(function(){
            $(".js-blue").addClass("blue-figure");
            setTimeout(function(){
            $(".js-green").addClass("green-figure");
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
      break;
    case 9:
      break;
    case 10:
      break;
    case 11:
      setTimeout(function(){
        $(".c-actual-slide__content").find("#abaco").addClass("is-opaque");
        }, 3000);
      break;
    case 12:
      var after9vals = [0,9,10,19,20,99,100];
      var index = 0
      var el = document.querySelector(".js-what-after-9");
      var whatAfter9 = new Odometer({
        el: el,
        format: 'd',
        value: after9vals[0]+1000
      })
      function countAfter9() {
        $(".js-what-after-9").html(after9vals[index]+1000);
        index += 1;
        console.log(slideNumber)
        if (slideNumber == 112 && index < 7) {
          setTimeout(countAfter9, 2000);
        } else {
          return
        }
      };
      countAfter9()
      break;
    case 13:
      var el = document.querySelector("#static-DEC");
      var staticDec = new Odometer({
        el: el,
        format: 'd',
        value: 122
      })
      var el = document.querySelector("#static-BIN");
      var staticBin = new Odometer({
        el: el,
        format: 'd',
        value: 110110
      })
      break;
    case 14:
      var after1val = 1;
      var el = document.querySelector(".js-what-after-1");
      var whatAfter1 = new Odometer({
        el: el,
        format: 'd',
        value: 100000
      })
      function countAfter1() {
        $(".js-what-after-1").html(dec2bin(after1val+32));
        after1val += 1;
        console.log(slideNumber)
        console.log(after1val)
        if (slideNumber == 114) {
          setTimeout(countAfter1, 2000);
        } else {
          return
        }
      };
      setTimeout(countAfter1, 1000);
      break;
    case 15:
      var aafter1val = 8;
      var el = document.querySelector(".js-what-aafter-1");
      var whatAafter1 = new Odometer({
        el: el,
        format: 'd',
        value: 100111
      })
      function countAafter1() {
        $(".js-what-aafter-1").html(dec2bin(aafter1val+32));
        aafter1val += 1;
        console.log(slideNumber)
        if (slideNumber == 115) {
          setTimeout(countAafter1, 600);
        } else {
          return
        }
      };
      countAafter1()
      break;
    case 16:
      $(".c-actual-slide__content").find("#binario").addClass("is-opaque");
        setTimeout(function(){
          $(".c-actual-slide__content").find("#decimale").addClass("is-opaque");
          setTimeout(function(){
            $(".c-actual-slide__content").find("#binario").removeClass("is-hidden");
          },600);
        }, 5000);
      break;
    case 17:
      break;
    case 18:
        setTimeout(function(){
          $(".c-actual-slide__content").find(".over-1").addClass("red-figure");
          setTimeout(function(){
            $(".c-actual-slide__content").find(".over-2").addClass("green-figure");
            setTimeout(function(){
              $(".c-actual-slide__content").find(".over-4").addClass("green-figure");
              setTimeout(function(){
                $(".c-actual-slide__content").find(".over-8").addClass("red-figure");
                setTimeout(function(){
                  $(".c-actual-slide__content").find(".over-16").addClass("green-figure");
                  setTimeout(function(){
                    $(".c-actual-slide__content").find(".red-figure").addClass("is-opaque");
                  }, 1500);
                }, 1500);
              }, 1500);
            }, 1500);
          }, 1500);
        }, 2000);
      break;
    case 19:
      break;
    case 20:
      setTimeout(function(){
        $(".c-actual-slide__content").find(".last-binary").addClass("is-opaque");
      }, 100);
      setTimeout(function(){
        $(".c-actual-slide__content").find(".last-binary-0").removeClass("is-opaque");
        setTimeout(function(){
          $(".c-actual-slide__content").find(".last-binary-1").removeClass("is-opaque");
        }, 3000);
      }, 6000);
      break;
    case 21:
      $(".c-actual-slide").css("background-color", "white")
      $(".js-author-name").css("font-size", "8vh");
      $(".js-author-name").css("color", "white")
      $(".js-slide-number").addClass("is-hidden")
      break;
  }
}

function fadeOutContent() {
  $(".c-actual-slide__content").find(".c-slide-content").addClass("is-opaque");
}

function fadeInContent() {
  $(".c-actual-slide__content").find(".c-slide-content").find(".is-opaque").removeClass("is-opaque");
}

function fadeOutChosen() {
  $(".c-actual-slide__content").find(".c-slide-content").find(".js-opaque-me").addClass("is-opaque");
}