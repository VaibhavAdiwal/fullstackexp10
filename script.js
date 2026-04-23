function show(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo() {
  let text = document.getElementById("todoInput").value;
  if (!text) return;

  todos.push({ id: Date.now(), text, done: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function renderTodos() {
  let div = document.getElementById("todoList");
  div.innerHTML = "";

  todos.forEach(t => {
    div.innerHTML += `
      <div class="card">
        <span style="text-decoration:${t.done ? 'line-through' : 'none'}">
          ${t.text}
        </span>
        <button onclick="toggleTodo(${t.id})">✔</button>
        <button onclick="deleteTodo(${t.id})">❌</button>
      </div>
    `;
  });
}

renderTodos();
let posts = [];

function addPost() {
  let text = document.getElementById("postInput").value;
  if (!text) return;

  posts.push({ id: Date.now(), text, comments: [] });
  renderPosts();
}

function addComment(id) {
  let comment = prompt("Enter comment:");
  posts = posts.map(p =>
    p.id === id ? { ...p, comments: [...p.comments, comment] } : p
  );
  renderPosts();
}

function renderPosts() {
  let div = document.getElementById("posts");
  div.innerHTML = "";

  posts.forEach(p => {
    div.innerHTML += `
      <div class="card">
        <p>${p.text}</p>
        <button onclick="addComment(${p.id})">Comment</button>
        ${p.comments.map(c => `<p>💬 ${c}</p>`).join("")}
      </div>
    `;
  });
}
let feed = [];

function addFeed() {
  let text = document.getElementById("feedInput").value;
  if (!text) return;

  feed.push({ id: Date.now(), text, likes: 0 });
  renderFeed();
}

function likePost(id) {
  feed = feed.map(f =>
    f.id === id ? { ...f, likes: f.likes + 1 } : f
  );
  renderFeed();
}

function renderFeed() {
  let div = document.getElementById("feed");
  div.innerHTML = "";

  feed.forEach(f => {
    div.innerHTML += `
      <div class="card">
        <p>${f.text}</p>
        <button onclick="likePost(${f.id})">❤️ ${f.likes}</button>
      </div>
    `;
  });
}