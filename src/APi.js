async function post(task) {
  const respuesta = await fetch("http://localhost:3000/api/task", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const postDate = await respuesta.json();
  return postDate;
}
async function getTask() {
  const response = await fetch("http://localhost:3000/api/task", {
    method: "GET",
  });
  const postGet = await response.json();
  return postGet;
}

async function deleteTask(id) {
  const response = await fetch("http://localhost:3000/api/task/" + id, {
    method: "DELETE",
  });
  const postDelete = await response.json();
  return postDelete;
}
export { post, deleteTask, getTask };


