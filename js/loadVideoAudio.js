
function loadYoutubeIFrame(div_id, video_id, loop, autoplay){


  e.onclick = function() {
      r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING ? (r.pauseVideo(), o(!1)) : (r.playVideo(), o(!0))
  };

  var r = new YT.Player("youtube-player", {
      height: "0",
      width: "0",
      videoId: e.dataset.video,
      playerVars: {
          autoplay: e.dataset.autoplay,
          loop: e.dataset.loop
      },
      events: {
          onReady: function(e) {
              r.setPlaybackQuality("small"), o(r.getPlayerState() !== YT.PlayerState.CUED)
          },
          onStateChange: function(e) {
              e.data === YT.PlayerState.ENDED && o(!1)
          }
      }
  })
}
