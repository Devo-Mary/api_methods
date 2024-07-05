let tbody = document.querySelector("#tbody");
let userName = document.getElementById("name");
let surname = document.getElementById("surname");
let group = document.getElementById("group");
let editUserName = document.getElementById("editName");
let editSurname = document.getElementById("editSurname");
let editGroup = document.getElementById("editGroup");
let userArr = [];
let editUseringId = null;
async function getData() {
  let response = await fetch("http://localhost:3000/people");
  let data = await response.json();
  userArr = data;
  tbody.innerHTML = "";
  userArr.forEach((item) => {
    tbody.innerHTML += `<tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.surname}</td>
                            <td>${item.group}</td>
                            <td>
                                <button class="btn btn-success" onclick ="editInfo('${item.id}')" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                            </td>
                            <td>
                                <button class="btn btn-danger" onclick= "deleteInfo('${item.id}')" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                            </td>
                        </tr>
                        `;
  });
}
getData();
function add() {
  if (!userName.value || !surname.value || !group.value) {
    alert("Məlumatları doldurun");
  } else {
    const newUser = {
      name: userName.value,
      surname: surname.value,
      group: group.value,
    };

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
    fetch("http://localhost:3000/people", postOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("User added:", data);
        getData();
      })
      .catch((error) => console.error("Error:", error));
  }
}
function edit() {
  const updateUser = {
    name: editUserName.value,
    surname: editSurname.value,
    group: editGroup.value,
  };
  const putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUser),
  };
  fetch(`http://localhost:3000/people/${editingUserId}`, putOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("User uptadet:", data);
      getData();
    })
    .catch((error) => console.error("Error:", error));
}
function editInfo(id) {
  editingUserId = id;
  let findUser = userArr.find((item) => item.id == editingUserId);
  editUserName.value = findUser.name;
  editSurname.value = findUser.surname;
  editGroup.value = findUser.group;
}
function deleteFunk() {

    const deleteOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      fetch(`http://localhost:3000/people/${editingUserId}`, deleteOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Deleted:", data);
    })
    .catch((error) => console.error("Error:", error));
}
function deleteInfo(id) {
    editingUserId = id;
    let findUser = userArr.find((item) => item.id == editingUserId);
    let info = document.querySelector('.info')
    info.innerHTML = `${findUser.name} adlı istifadəçini silmək istəyirsinizmi?`
    
  }