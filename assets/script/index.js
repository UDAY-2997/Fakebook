"use strict";
const postBtn = document.querySelector("#post");
const grid = document.querySelector(".grid");
const iconInfo = document.querySelector(".revert");
const textArea = document.querySelector(".text");
const postFile = document.querySelector("#postFile");
const inputName = document.querySelector(".inputName");
const icon = document.querySelector(".icon-1");

class User {
  #id;
  #name;
  #userName;
  #email;
  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get userName() {
    return this.#userName;
  }
  get email() {
    return this.#email;
  }

  getInfo() {
    let info = `Id: ${this.#id} 
                    Name: ${this.#name}
                    User Name: ${this.#userName}
                    Email: ${this.#email}`;
    return info;
  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;
  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() {
    return this.#pages;
  }
  get groups() {
    return this.#groups;
  }
  get canMonetize() {
    return this.#canMonetize;
  }

  getInfo() {
    let info = `${super.getInfo()}
                    Pages: ${this.#pages}
                    Groups: ${this.#groups} 
                    Can Monetize: ${this.#canMonetize}`;
    return info;
  }
}

const mainUser = new Subscriber(
  "1",
  "Uday",
  "Astaad",
  "uv@gmail.com",
  ["AI", "AR"],
  ["MITT"],
  true
);

iconInfo.innerText = mainUser.getInfo();

icon.addEventListener("mouseover", () => {
  iconInfo.style.display = "block";
});

icon.addEventListener("mouseout", () => {
  iconInfo.style.display = "none";
});

postFile.addEventListener("input", function () {
  const imageFile = postFile.files;
  for (let file of imageFile) {
    inputName.innerHTML = `${file.name}`;
  }
});

postBtn.addEventListener("focus", function () {
  const imageFile = postFile.files;
  const textFile = textArea.value;

  if (textFile.length <= 0 && imageFile.length <= 0) {
    return;
  } else {
    const newDiv = document.createElement("div");
    newDiv.classList.add("post");
    console.log("hey there");
    addContent(newDiv);

    grid.insertBefore(newDiv, grid.firstChild);
  }
});

function addContent(newdiv) {
  const postHead = document.createElement("div");
  postHead.classList.add("postHead");

  const date = new Date();
  const format = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", format);

  postHead.innerHTML = `<div>
                          <img class='img' src="./assets/images/logo.png" 
                          alt="user-icon"><span>UdayHere</span></div>
                          <p>${formattedDate}</p>`;

  newdiv.append(postHead);

  const postBody = document.createElement("div");
  postBody.classList.add("postBody");
  postBody.innerText = textArea.value;

  newdiv.append(postBody);

  if (postFile.files.length > 0) {
    const file = postFile.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener("load", function () {
      const image = document.createElement("img");
      image.src = reader.result;
      newdiv.append(image);
    });
  }

  textArea.value = "";
  inputName.innerHTML = ``;
  postFile.value = "";
}
