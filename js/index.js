document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");
  const form = document.getElementById("github-form");
  const userList = document.getElementById("user-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchInput = search.value;
    fetchUsers(searchInput);
  });

  fetchUsers();

  function fetchUsers(search) {
    const searchUrl = `https://api.github.com/search/users?q=${search}`;

    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        userList.replaceChildren();

        data.items.forEach((user) => {
          const card = document.createElement("div");
          card.className = "user-card";
          card.dataset.username = user.login;

          const username = document.createElement("h2");
          const id = document.createElement("p");
          const nodeId = document.createElement("p");
          const avatar = document.createElement("img");
          const profileLink = document.createElement("a");
          const repoButton = document.createElement("button");

          repoButton.textContent = "Repo-List";

          repoButton.addEventListener("click", () => {
            fetchRepos(user.login);
          });
          profileLink.textContent = "View Profile";
          profileLink.href = user.html_url;
          profileLink.target = "_blank";

          username.textContent = user.login;
          id.textContent = `ID: ${user.id}`;
          nodeId.textContent = `Node ID: ${user.node_id}`;

          avatar.src = user.avatar_url;
          avatar.alt = `${user.login}'s avatar`;
          avatar.width = 100;

          card.append(username);
          card.append(avatar);
          card.append(profileLink);
          card.append(repoButton);

          userList.append(card);
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function fetchRepos(username) {
    const reposList = document.getElementById("repos-list");

    reposList.replaceChildren();

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        repos.forEach((repo) => {
          const repoItem = document.createElement("li");
          repoItem.textContent = repo.name;

          reposList.append(repoItem);
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
});
