document.documentElement.classList.remove('no-js');

// Dribbble Shots
// Set the Access Token
const accessToken = 'b98531775d248352b438142499ec464af36850fcf100ccf52c738c1ab21f3247';
const dribble_url = 'https://api.dribbble.com/v2/user/shots?access_token=' + accessToken;


getShots().catch(error => {
  console.log(error);
});;

async function getShots() {
  let response = await fetch(dribble_url);
  let data = await response.json();
  console.log(data);


  data.forEach(function (shot) {
    const target = document.getElementById('shots');
    console.log(shot.html_url);
    console.log(shot.images.hidpi);
    const div = document.createElement('div');
    div.classList.add('shot');
    div.innerHTML =
      '<a href="' + shot.html_url + '" target="_blank"><img src="' + shot.images.hidpi + '" alt="' + shot.title + '" loading="lazy"></a>';
    target.append(div)
  });

}

// Call Dribble v2 API
// $.ajax({
//   url: 'https://api.dribbble.com/v2/user/shots?access_token=' + accessToken,
//   dataType: 'json',
//   type: 'GET',
//   success: function (data) {
//     if (data.length > 0) {
//       $.each(data.reverse(), function (i, val) {
//         $('#shots').prepend(
//           '<a class="shot" target="_blank" href="' + val.html_url + '" title="' + val.title + '"><div class="title">' + val.title + '</div><img src="' + val.images.hidpi + '"/></a>'
//         )
//       })
//     }
//     else {
//       $('#shots').append('<p>No shots yet!</p>');
//     }
//   }
// });


// Animate box-shadow
(function () {
  const safeToAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  if (!safeToAnimate) return;

  let xPosition;
  let yPosition;

  let storedXPosition;
  let storedYPosition;

  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;

  function percentage(partialValue, totalValue) {
    return (30 * partialValue) / totalValue;
  }

  // update the CSS vars within request animation frame
  function movePointer() {
    window.requestAnimationFrame(movePointer);

    // important, only recalculating if the value changes
    if (storedXPosition === xPosition && storedYPosition === yPosition) return;

    // shift the range from 0 to 100 to -50 to 50 to keep the movement centralised
    x = percentage(xPosition, windowWidth) - 15;
    y = percentage(yPosition, windowHeight) - 15;

    // update the css vars
    document.documentElement.style.setProperty("--mouse-x", `${x}%`);
    document.documentElement.style.setProperty("--mouse-y", `${y}%`);

    // update the stored positions with the current positions
    storedXPosition = xPosition;
    storedYPosition = yPosition;
  }
  window.requestAnimationFrame(movePointer);

  // updating the mouse coordinates
  function updateMouseCoords(event) {
    xPosition = event.clientX;
    yPosition = event.clientY;
  }
  window.addEventListener("mousemove", updateMouseCoords);

  // update if browser resizes
  function updateWindowSize() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
  }
  window.addEventListener("resize", updateWindowSize);
})();