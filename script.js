const main = document.getElementsByTagName("main")[0];
const header = document.getElementsByTagName("header")[0];

let number_of_star = Math.round((150 * (main.offsetHeight + screen.width)) / 2000);

let random_number = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let createStars = function () {
  let star_rotation = "move_right;";
  for (let i = 0; i < number_of_star; i++) {
    rot = star_rotation == "move_right;" ? "move_left;" : "move_right;";
    let star_top = random_number(0, main.offsetHeight) + header.offsetHeight;
    let star_left = random_number(0, screen.width);
    let star_radius = random_number(0, 4);
    let star_duration = random_number(6, 16);

    main.innerHTML +=
      "<div class='star' style='top: " +
      star_top +
      "px; left: " +
      star_left +
      "px; width: " +
      star_radius +
      "px; height: " +
      star_radius +
      "px; " +
      "animation-name:" +
      star_rotation +
      "; animation-duration: " +
      star_duration +
      "s;'></div>";
  }
};

createStars();
