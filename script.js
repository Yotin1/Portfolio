const main = document.getElementsByTagName("main")[0];
const header = document.getElementsByTagName("header")[0];
const footer = document.getElementsByTagName("footer")[0];
const projectsContainer = document.getElementById("projects").children[0];

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

async function loadProjects(file) {
  let projects = [];
  await fetch(file)
    .then((res) => res.json())
    .then((data) => (projects = data));
  console.log(projects);
  for (let [title, project] of Object.entries(projects)) {
    console.log(title, project);
    let projectContainer = document.createElement("div");
    projectContainer.className = "project";

    projectContainer.innerHTML = `<h4 class="projectTitle">${title}</h4>
            <img
              class="projectImage"
              src="${project["image"]}"
              alt="${title}"
            />
            <p class="projectDesc">${project["desc"] == "" ? "Description" : project["desc"]}</p>`;
    if (project["demo"] != "") {
      projectContainer.innerHTML += `<a class="projectDemo" href="${project["demo"][1]}" target="_blank">${project["demo"][0]}</a>
            <a class="projectGithub" href="${project["github"]}" target="_blank">Github</a>`;
    } else {
      projectContainer.innerHTML += `<a class="projectGithub projectDemo" href="${project["github"]}" target="_blank">Github</a>`;
    }

    projectsContainer.append(projectContainer);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  loadProjects("assets/projects.json");
  createStars();
  updateStars();

  window.addEventListener("resize", updateStars);
});
