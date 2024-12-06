const main = document.getElementsByTagName("main")[0];
const header = document.getElementsByTagName("header")[0];
const footer = document.getElementsByTagName("footer")[0];

let number_of_star = Math.round((150 * (main.offsetHeight + screen.width)) / 1500);

let random_number = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let stars = [];
let createStars = function () {
  let star_rotation = "move_right";
  for (let i = 0; i < number_of_star; i++) {
    rot = star_rotation == "move_right" ? "move_left" : "move_right";
    let star_radius = random_number(0, 4);
    const star = document.createElement("div");
    star.className = "star";
    star.style.top =
      random_number(header.offsetHeight - 8, document.body.scrollHeight - footer.offsetHeight + 8).toString() + "px";
    star.style.left = random_number(0, screen.width).toString() + "px";
    star.style.height = star_radius.toString() + "px";
    star.style.width = star_radius.toString() + "px";
    star.style.animation = star_rotation + " " + random_number(6, 16).toString() + "s linear 0s infinite";
    document.body.append(star);
    stars.push(star);
  }
};

let updateStars = function () {
  for (let star of stars) {
    if (
      parseInt(star.style.top) < main.offsetHeight + header.offsetHeight + 16 &&
      parseInt(star.style.left) < window.innerWidth + 12
    ) {
      star.style.display = "initial";
    } else {
      star.style.display = "none";
    }
  }
};

console.log(main.offsetHeight);
createStars();
updateStars();

window.addEventListener("resize", updateStars);
