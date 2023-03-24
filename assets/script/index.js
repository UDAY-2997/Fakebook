"use strict";

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
  "U-dev",
  "uv@gmail.com",
  ["AI", "AR"],
  ["MITT"],
  true
);

const fileName = document.querySelector("#file-name");
const uploadFile = document.querySelector("#upload-file");
const icon = document.querySelector(".icon-1");
const accountInfo = document.querySelector("#account-info");

accountInfo.innerText = mainUser.getInfo();

icon.addEventListener("click", () => {
  if (accountInfo.style.display === "block") {
    accountInfo.style.display = "none";
  } else {
    accountInfo.style.display = "block";
  }
});

uploadFile.addEventListener("input", function () {
  const imageFile = uploadFile.files;
  for (let file of imageFile) {
    fileName.innerHTML = `${file.name}`;
  }
});

const submitFile = document.querySelector("#submit-file");
const postArea = document.querySelector("#post-area");
const textArea = document.querySelector("#textarea");

submitFile.addEventListener("focus", function () {
  const imageFile = uploadFile.files;
  const textFile = textArea.value;

  if (textFile.length <= 0 && imageFile.length <= 0) {
    return;
  } else {
    const newDiv = document.createElement("div");
    newDiv.classList.add("post");
    console.log("hey there");
    addContent(newDiv);

    postArea.insertBefore(newDiv, postArea.firstChild);
  }
});

function addContent(newdiv) {
  // Create post header
  const postHead = document.createElement("div");
  postHead.classList.add("postHead");

  const logoImg = document.createElement("img");
  logoImg.classList.add("img");
  logoImg.src = "./assets/images/logo.png";

  const companyName = document.createElement("span");
  const companyNameText = document.createTextNode("U-dev");
  const companyNameStrong = document.createElement("strong");
  companyNameStrong.appendChild(companyNameText);
  companyName.appendChild(companyNameStrong);

  const logoAndCompanyName = document.createElement("span");
  logoAndCompanyName.appendChild(logoImg);
  logoAndCompanyName.appendChild(companyName);

  const date = document.createElement("p");
  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  date.textContent = formattedDate;

  postHead.append(logoImg, companyName, date);
  newdiv.append(postHead);

  // Create post body
  const postBody = document.createElement("div");
  postBody.classList.add("postBody");
  postBody.textContent = textArea.value;
  newdiv.append(postBody);

  // Add image if selected
  if (uploadFile.files.length > 0) {
    const file = uploadFile.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener("load", function () {
      const image = document.createElement("img");
      image.src = reader.result;
      newdiv.append(image);
    });
  }

  // Clear input fields
  textArea.value = "";
  fileName.innerHTML = ``;
  uploadFile.value = "";
}
