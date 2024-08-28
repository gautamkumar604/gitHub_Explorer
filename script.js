const API_URL = "https://api.github.com/users/";

let mySearch = async () => {
  // Get the value from the input field
  const input = document.getElementById("input").value;

  if (!input) {
    alert("Please enter a repository name");
    return;
  }
  try {
    let myArray = input.split("/");
    const username = `${myArray[0]}`;
    const repoName = `${myArray[1]}`;
    getUser(username);
    getRepos(username, repoName);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    document.getElementById("result").innerHTML =
      "<p>Error occurred while fetching data</p>";
  }
};
const main = document.querySelector("#main");
const getUser = async (username) => {
  let response = await fetch(API_URL + username);
  let data = await response.json();
  const card = `<div class="card">
                    <div class="profile">
                        <a href="https://github.com/${data.login}" target="_blank"><img class="img" src="${data.avatar_url}" alt="#"/></a>
                        <div class="user">
                            <a href="https://github.com/${data.login}" target="_blank"><h3 class="userName">${data.name}</h3></a>
                            <a href="https://github.com/${data.login}" target="_blank"><h5 class="userId">${data.login}</h5></a>
                        </div>
                    </div>
                    <p class="bio">
                        ${data.bio}
                    </p>
                    <div class="connections">
                        <p class="followers">${data.followers}<strong>Followers</strong></p>
                        <p class="following">${data.following}<strong>Following</strong></p>                       
                    </div>
                    <p class="hr"></p>
                    </div>
                    <div class="repoInfo">
                        <a id="openRepo" href="" target="_blank"><h2 class="repoName">repository name</h2></a>
                        <p class="repoBio">This is repo description</p>
                    </div>
                </div>`;
  main.innerHTML = card;
  main.style.display = "block";
};

const getRepos = async (username, repoName) => {
  try {
    let response = await fetch(`${API_URL}${username}/repos`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let repos = await response.json();
    let repoFound = repos.find((repo) => repo.name === repoName);
    if (repoFound) {
      console.log("Repository found:", repoFound);
      document.querySelector(".repoName").innerHTML = repoFound.name;
      document.querySelector(".repoBio").innerHTML = repoFound.description;
      const link = document.getElementById("openRepo");
      link.href = `https://github.com/${username}/${repoFound.name}`;
    } else {
      console.log("Repository not found");
      document.querySelector(".repoName").innerHTML = "null";
      document.querySelector(".repoBio").innerHTML = "null";
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
