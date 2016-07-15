window.odometerOptions = {
  auto: false, // Don't automatically initialize everything with class 'odometer'
  // selector: '.my-numbers', // Change the selector used to automatically find things to be animated
  format: 'd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
  duration: 1000, // Change how long the javascript expects the CSS animation to take
  theme: 'train-station' // Specify the theme (if you have more than one theme css file on the page)
  // animation: 'count' // Count is a simpler animation method which just increments the value,
                     // use it when you're looking for something more subtle.
};

$(function () {
  var pause = true;
  var seconds = 100;
  var slideNumber = 100;
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
    seconds = ((seconds - 99) % 15) +100;
    updateSlideNumber();
    $(".js-seconds").html(seconds);
    setTimeout(countSeconds, 1000);
  }

  function updateSlideNumber() {
    if (seconds == 100) {
      slideNumber += 1;
      $(".js-slide").html(slideNumber);
    }
  }

  function dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

  setBackground(1, "#preload");
  // var vid = document.getElementById("videomp4");
  // vid.currentTime = 9 ;
  // Enter: 13
  // SpaceBar: 32
  // Left: 37
  // Up: 38
  // Right: 39
  // Down: 40
  $('body').keydown(function(e) {
    if (e.which == 32) {
      pause = !pause;
      countSeconds();
    }
    console.log( e.which );
  });
});

function setBackground(slideNumber, of) {
  if (of == null) {of = "#content";}
  $(of).css("backgroundImage", "url(img/"+slideNumber+".jpg)")
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

function setColor(slideNumber) {
  var color = ""
  switch(slideNumber) {
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

function animateSlide(slideNumber) {
  switch(slideNumber) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4444:
      setTimeout(function(){
        $('.slide4volume').removeClass("fa-volume-up").addClass("fa-volume-down");
        setTimeout(function(){
          $('.slide4volume').removeClass("fa-volume-down").addClass("fa-volume-off");
        }, 1000);
      }, 8000);
      break;
    case 5:
      break;
    case 6:
      setTimeout(function(){
          $('.change-color').css("color", "rgba(123,10,123,0.7)")
          $('.progress-bar').css("background-color", "rgba(123,10,123,0.7)")
        }, 10000);
      break;
    case 7:
      break;
    case 8:
      break;
    case 9:
      break;
    case 10:
      setTimeout(function(){
        $('.sitetree').append("<br><i class='fa fa-sitemap'></i><i class='fa fa-sitemap'></i>")
        setTimeout(function(){
          $('.sitetree').append("<br><i class='fa fa-sitemap'></i><i class='fa fa-sitemap'></i><i class='fa fa-sitemap'></i><i class='fa fa-sitemap'></i>")
        }, 1000);
      }, 8000);
      break;
    case 11:
      setTimeout(function(){
        $('.duplicate').append(
          '<br><i style="color: rgba(10,60,123,0.7); transition: color 1s;" class="dup1 fa fa-square-o"></i> ' +
          '<i style="color: rgba(10,123,10,0.7); transition: color 1s;" class="dup2 fa fa-square-o"></i> ' +
          '<i class="fa fa-arrow-right"></i> ' +
          '<i style="color: rgba(20,133,133,0.7)" class="fa fa-square"></i> '
        );
        setTimeout(function(){
          $('.dup1').css("color", "rgba(10,0,183,0.7)");
          $('.dup2').css("color", "rgba(10,183,0,0.7)");
        }, 1000)
      }, 8000);
      break;
    case 12:
      break;
    case 13:
      break;
    case 14:
      break;
    case 15:
      break;
    case 16:
      wikiSlide()
      break;
    case 17:
      break;
    case 18:
      break;
    case 19:
      setTimeout(function(){
        $('.battery').removeClass("fa-battery-0").addClass("fa-battery-1");
        setTimeout(function(){
          $('.battery').removeClass("fa-battery-1").addClass("fa-battery-2");
          setTimeout(function(){
            $('.battery').removeClass("fa-battery-2").addClass("fa-battery-3");
            setTimeout(function(){
              $('.battery').removeClass("fa-battery-3").addClass("fa-battery-4");
            }, 1000);
          }, 1000);
        }, 1000);
      }, 10000);
      break;
    case 20:
      break;
    case 21:
      break;
  }
}

function wikiSlide() {
  var content = ""
  for (i=0;i<3;i++){
    for (j=0;j<3;j++){
      if ((i==1 && j==2)  ) {
        content += "<i class='alternate-yellow fa fa-pencil' style='color: rgba(123,123,10,0.7); transition: color 0.5s ease;'></i> "
      } else if ( i>0 && i<2 && j>0 && j<2 ) {
        content += "<i class='fa fa-eye' style='opacity: 0;'></i> "
      } else {
        content += "<i class='fa fa-eye'></i> "
      }
    }
    content += "<br>"
  }

  $('.wikislide').append(content);
  alternateYellow1();
}

function wikiSlide2() {
  var content = ""
  for (i=0;i<20;i++){
    for (j=0;j<20;j++){
      if ((i==17 && j==6) || (i==16 && j==18) || (i==10 && j==4)) {
        content += "<i class='alternate-yellow fa fa-pencil' style='color: rgba(123,123,10,0.7); transition: color 0.5s ease;'></i> "
      } else if ( i>7 && i<12 && j>6 && j<13 ) {
        content += "<i class='fa fa-eye' style='opacity: 0;'></i> "
      } else {
        content += "<i class='fa fa-eye'></i> "
      }
    }
    content += "<br>"
  }

  $('.wikislide').append(content);
  alternateYellow1();
}

function alternateYellow1 () {
  $('.alternate-yellow').css('color', 'rgba(123,123,10,0.7)');
  setTimeout(function(){
    if($('.alternate-yellow').length > 3) {
      alternateYellow2();
    }
  }, 500)
}

function alternateYellow2 () {
  $('.alternate-yellow').css('color', 'rgba(163,163,10,0.7)')
  setTimeout(function(){
    if($('.alternate-yellow').length > 3) {
      alternateYellow1();
    }
  }, 500)
}

function alternateFlame1 () {
  $('#flame').css('color', 'rgba(255,83,13,0.6)')
  setTimeout(function(){
    alternateFlame2();
  }, 1000)
}

function alternateFlame2 () {
  $('#flame').css('color', 'rgba(255,83,13,1)')
  setTimeout(function(){
    alternateFlame1();
  }, 200)
}
