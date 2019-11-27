var myFullpage;

var iframePlayers = [];
var musicPosts = [];




function setup() {

  setUpMusicpostsData(myJson.post);
  generateAllMusicPost();
  setupFullPageJs();
  menu();

  requestAnimationFrame(animationUpdate);



}

window.onload = setup;
/////////////////////////////////////
function animationUpdate() {

  for (var i = 0; i < musicPosts.length; i++) {
    var m = musicPosts[i];

    if (m.play) {

      m.rotation += 0.7;
      $('#vynil_' + m.el_id).css('transform', 'rotate(' + m.rotation + 'deg)')
    }
  }


  requestAnimationFrame(animationUpdate);
}

function setUpMusicpostsData(posts) {

  for (var i = 0; i < posts.length; i++) {

    postData = {
      likes: posts[i].postReact,
      video_title: posts[i].urlName,
      post_title: posts[i].postComment,
      youtubeID: posts[i].youtubeID,
      iframe_player: null,
      rotation: 0,
      play: 0,
      el_id: i,
    };

    musicPosts.push(postData);

  }

}


function generateAllMusicPost() {

  var el = $("#collectionMusicPost_1");


  for (var i = 0; i < myJson.post.length; i++) {

    var p = musicPosts[i];

    var section = $('<div class="section fp-section fp-table row">');
    var postMessage = $(' <div class="col"></div>');
    var contentMessage = $(' <div class="postMessage"></div>');


    contentMessage.append('<h2>' + p.video_title + '</h2>');
    contentMessage.append('<p>' + p.post_title + '</p>');
    contentMessage.append('<h2 class="like">' + p.likes + ' ★</h2>');
    contentMessage.append('<h3><a href="https://www.youtube.com/watch?v=' + p.youtubeID + '" target="_blank">Source  </a></h3>');



    postMessage.append(contentMessage);
    section.append(postMessage);

    var player = $('<div class="col player" post_id_number="' + i + '"></div>');

    player.click(function() {
      var t = $(this);

      var el_id_num = $(this).attr('post_id_number');

      var mPost = musicPosts[el_id_num];

      mPost.play = !mPost.play;

      var iFrame = mPost.iframe_player;

      iFrame.getPlayerState() === YT.PlayerState.PLAYING || iFrame.getPlayerState() === YT.PlayerState.BUFFERING ? (iFrame.pauseVideo()) : (iFrame.playVideo())



    });

    var playButton = $('<div class="playButton" id="youtube_audio_' + i + '"></div>');
    var vinylThumbnail = $('<div class="vynilThumbnail" id="vynil_' + i + '" style="background: url(\'https://img.youtube.com/vi/' + p.youtubeID + '/maxresdefault.jpg\') center center no-repeat;"></div>');
    var youtube_player = $('<div class="invisible" id="youtube_player_' + i + '"></div>');


    player.append(playButton);
    player.append(vinylThumbnail);
    player.append(youtube_player);

    section.append(player);

    el.append(section);




    var new_iframe = new YT.Player("youtube_player_" + i, {
      height: "0",
      width: "0",
      videoId: p.youtubeID,
      playerVars: {
        autoplay: 0,
        loop: 1
      },
      events: {
        onReady: function(e) {
          e.target.setPlaybackQuality("small")
        },
        onStateChange: function(e) {}
      }
    });

    musicPosts[i].iframe_player = new_iframe;

  }

  var brokenLink = document.getElementsByClassName("vynilThumbnail")[23].style.backgroundImage =  "url('./img/brokenLink.png')";
  var replaceLink = document.getElementsByClassName("col player")[23];
  var inputForm = document.createElement("INPUT");
  inputForm.setAttribute('class', 'inputa');
  inputForm.setAttribute("type", "text");
  inputForm.setAttribute("value", "Add a new youtube link ...");
  var validButton = document.createElement("INPUT");
  validButton.setAttribute('class', 'inputaButton');
  validButton.setAttribute("type", "submit");
  validButton.setAttribute("value", "Let's try to find it!");
  replaceLink.appendChild(inputForm);
  replaceLink.appendChild(validButton);



console.log(replaceLink);




}


function setupFullPageJs() {
  myFullpage = new fullpage('#collectionMusicPost_1', {
    //sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
    //  anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
    //menu: '#menu',
    continuousVertical: true,
    afterLoad: function(anchorLink, index) {},
    onLeave: function(el, next_el, direction) {
      var i = el.index;
      var n_i = next_el.index;

      musicPosts[i].play = false;
      musicPosts[n_i].play = true;

      musicPosts[n_i].iframe_player.playVideo();
      //console.log(musicPosts[n_i].iframe_player);
    },
  });
}

function menu() {


  $(".logo").hover(function() {
    $(".col").css("transform", "translateX(-84px)");
  }, function() {
    $(".col").css("transform", "");
  });

  $(".logo").hover(function() {
    $(".col.player").css("transform", "translateX(80px)");
  }, function() {
    $(".col.player").css("transform", "");
  });

  $(".logo").click(function() {
    if ($(".logo_cdr").attr('data-click-state') == 1) {
      $(".logo_cdr").attr('data-click-state', 0)
      $(".logo_cdr").css("transform", "translateX(80px)");
      $(".logo_cdo").css("transform", "translateX(-80px)");
      $(".logo_cdt").css("transform", "translateX(-160px)");
      $(".logo_rb").css("transform", "translateX(163px)");
    } else {
      $(".logo_cdr").attr('data-click-state', 1)
      $(".logo_cdr").css("transform", "");
      $(".logo_cdo").css("transform", "");
      $(".logo_cdt").css("transform", "");
      $(".logo_rb").css("transform", "");
    }
  });

  $(".logo_cdr").click(function() {
    if ($(".logo_cdr").attr('data-click-state') == 1) {
      $(".logo_cdr").attr('data-click-state', 0)
      $(".gridView").css("display", "block");
    } else {
      $(".logo_cdr").attr('data-click-state', 1)
      $(".gridView").css("display", "none");
    }
  });





}
