const maxPostParser = 10;

const jsonData = [];

(function(console) {

  console.save = function(data, filename) {

    if (!data) {
      console.error('Console.save: No data')
      return;
    }

    if (!filename) filename = 'console.json'

    if (typeof data === "object") {
      data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {
        type: 'text/json'
      }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console)

/**
 * Simulate a key event.
 * @param {Number} keyCode The keyCode of the key to simulate
 * @param {String} type (optional) The type of event : down, up or press. The default is down
 * @param {Object} modifiers (optional) An object which contains modifiers keys { ctrlKey: true, altKey: false, ...}
 */
function simulateKey(keyCode, type, modifiers) {
  var evtName = (typeof(type) === "string") ? "key" + type : "keydown";
  var modifier = (typeof(modifiers) === "object") ? modifier : {};

  var event = document.createEvent("HTMLEvents");
  event.initEvent(evtName, true, false);
  event.keyCode = keyCode;
  for (var i in modifiers) {
    event[i] = modifiers[i];
  }
  document.dispatchEvent(event);
}

function saveFileDataToJSON() {
  console.save(jsonData, "jsonData.json");
}

// Setup some tests

let postParsedCounter = 0;

const postParserInterval = window.setInterval(function() {

  const postData = {};
  postData.postDate = {};

  var elements = document.querySelectorAll('.mtm, ._3n1k, .userContent, ._3dlh, ._5pcq');
  for (var i = 0; i < elements.length; i++) {
    var element_coordinate = elements[i].getBoundingClientRect();
  if (((element_coordinate.top < 800) && (element_coordinate.top > 0)) && (!elements[i].hasAttribute('dead'))) {





      elements[i].setAttribute('dead', 'true');

      // Get youtube ID

      if (elements[i].classList.contains('mtm')) {
        var a = elements[i].getElementsByTagName('a');
        var href = a[0].getAttribute('href');
        var youtubeBelgiumLinkDetection = href.includes(".be");

        if (youtubeBelgiumLinkDetection == true) {
        var id = href.match(/(?<=\%2F)(.{11}?)(?=\%3F)/)[0];
        }
        else {
        var id = href.match(/(?<=\%3D)(.*?)(?=\%26fbclid)/)[0];
        }
        console.log("URL = " + id);
        postData.youtubeID = id;
        a = [];
      }

      // Get Name Link

      if (elements[i].classList.contains('_3n1k')) {
        var nameLink = elements[i].getElementsByTagName('a')[0].textContent;
        console.log("Name video = " + nameLink);
        postData.urlName = nameLink;
        nameLink = [];
      }

      // Get Post Title

      if (elements[i].classList.contains('userContent')) {
        var postComment = elements[i].getElementsByTagName('p')[0].textContent;
        console.log("Post Comment = " + postComment);
        postData.postComment = postComment;
        postComment = [];
      }

      // Get Reaction

      if (elements[i].classList.contains('_3dlh')) {
        var reaction = elements[i].getElementsByClassName('_81hb')[0].textContent;
        console.log("React Number = " + reaction);
        postData.postReact = reaction;
        reaction = [];
      }

      // Get Post Date

      if (elements[i].classList.contains('_5pcq')) {
        var b = elements[i].getElementsByTagName('abbr');
        var date = b[0].getAttribute('title');
        var day = date.substring(0,2);
        var month = date.substring(3,5);
        var year = date.substring(6,10);
        var hour = date.substring(11,13);
        console.log(day+'/'+month+'/'+year);
        console.log('hour=' + hour);


        postData.postDate.day = day;
        postData.postDate.month = month;
        postData.postDate.year = year;
        postData.postDate.hour = hour;
        b = [];
      }




}

  }
  var onKeyEvent = function(event) {
    var state = "pressed";

    if (event.type !== "keypress") {
      state = event.type.replace("key", "");
    }
  };

  document.addEventListener("keypress", onKeyEvent, false);

  // Using the function
  simulateKey(74);

  /// call your function here

  postParsedCounter++;

  jsonData.push(postData);


  if (postParsedCounter >= maxPostParser) {
    window.clearInterval(postParserInterval);
    saveFileDataToJSON();
  }

}, 500);
