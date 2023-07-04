
function post (tarea){
    let tareaObj = {
        tarea : tarea,
        Id:1
      }
      
      fetch('http://localhost:3000/api/task', {
        method: "POST",
        body: JSON.stringify(tareaObj),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json))
      .catch(err => console.log(err));
    }

export {post}