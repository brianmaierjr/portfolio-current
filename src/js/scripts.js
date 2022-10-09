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

  data.forEach(function (shot) {
    const target = document.getElementById('shots');
    const div = document.createElement('div');
    div.classList.add('shot');
    div.innerHTML =
      '<a href="' + shot.html_url + '" target="_blank"><img src="' + shot.images.hidpi + '" alt="' + shot.title + '" loading="lazy"></a>';
    target.append(div)
  });

}

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

// Color Mode Toggle
if (window.CSS && CSS.supports("color", "var(--primary)")) {
  var toggleColorMode = function toggleColorMode(e) {
    // Switch to Light Mode
    if (e.currentTarget.classList.contains("light--hidden")) {
      // Sets the custom html attribute
      document.documentElement.setAttribute("color-mode", "light"); // Sets the user's preference in local storage

      localStorage.setItem("color-mode", "light");
      return;
    }
    /* Switch to Dark Mode
    Sets the custom html attribute */
    document.documentElement.setAttribute("color-mode", "dark"); // Sets the user's preference in local storage

    localStorage.setItem("color-mode", "dark");
  }; // Get the buttons in the DOM

  var toggleColorButtons = document.querySelectorAll(".color-mode__btn"); // Set up event listeners

  toggleColorButtons.forEach(function (btn) {
    btn.addEventListener("click", toggleColorMode);
  });
} else {
  // If the feature isn't supported, then we hide the toggle buttons
  var btnContainer = document.querySelector(".color-mode__header");
  btnContainer.style.display = "none";
}