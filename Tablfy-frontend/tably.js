document.addEventListener('DOMContentLoaded', function(event){
  getReservations()
  addResSubmitListener()
  addSearchListener()
  getTables()
})

//fetch requests////////////////////////////////////////////
function getTables() {
  fetch('http://localhost:3000/tables')
  .then(r => r.json())
  .then(tables => {
    tables.forEach(table => renderTable(table))
  })
}

function getReservations() {
  fetch('http://localhost:3000/reservations')
  .then(r => r.json())
  .then(reservations => {
    reservations.forEach(res => renderReservation(res))
  })
}
function updateTable(data, id) {
  fetch(`http://localhost:3000/tables/${id}`,{
    method: "PATCH",
    headers:{
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify(data)
  }).then(r => r.json()).then(data => {console.log(data)})
}
function addSearchListener() {
  document.getElementById("search-bar").addEventListener('keyup', searchBar)
}
//fetch requests////////////////////////////////////////////
function searchBar(event) {
  console.log(`${event.key}`);
  let input = document.getElementById("search-bar")
  let filter = input.value.toUpperCase()
  let resSection = document.getElementById("reservation-container")
  let cards = resSection.getElementsByClassName("card text-white bg-info mb-3")
  for (var i = 0; i < cards.length; i++) {
    let card = cards[i].getElementsByClassName("card-header")[0]
    if (card) {
      if(card.innerHTML.toUpperCase().indexOf(filter) > -1){
        cards[i].style.display = ""
      } else {
        cards[i].style.display = "none"
      }
    }
  }
}
//rendering//////////////////////////////////////////////////

function renderTable(table) {
  let tableSection = document.getElementById("table-section")
  let tableCard = document.createElement('div')
  tableCard.id = `table-${table.id}`
  tableCard.innerHTML =`
  <div class="row container card-columns col-md-10">
    <div class="card bg-info mb-3" id="table-card-status">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Table#${table.id}</h5>
          <p class="card-text">Table Size: ${table.size}</p>
          <p class="card-text" id="table-reservations"></p>
          <a href="#" class="btn btn-info" id="assign-table-${table.id}">Assign Table</a>
          <div class="btn-group">
            <button type="button" class="btn btn-success">Reservations</button>
            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu" id="table-dropdown-${table.id}">
            </div>
          </div>
        </div>
      </div>

      </div>
  </div>`
  tableSection.appendChild(tableCard)
  table.reservations.forEach(res => {
    let dropdownMenu = document.getElementById(`table-dropdown-${table.id}`)
    let item = document.createElement('a')
    item.href = "#"
    item.classList.add("dropdown-item")
    item.innerText = res.time
    dropdownMenu.appendChild(item)
  })
  let assignBtn = document.getElementById(`assign-table-${table.id}`)
  let btnStatus = document.getElementById("table-card-status")
  assignBtn.addEventListener('click', function(event){
    let btn = event.target
    if (btn.className == "btn btn-info") {
      btn.innerText = "Close out table"
      btn.className = "btn btn-warning"
      let data = {occupied: true}
      let id = table.id
      updateTable(data, id)
    }
    else if (btn.className == "btn btn-warning") {
      btn.innerText = "Assign Table"
      btn.className = "btn btn-info"
      let data = {occupied: false}
      let id = table.id
      updateTable(data, id)
    }
  })
}








function renderReservation(res) {
  let resSection = document.getElementById("reservation-container")
  let resCard = document.createElement('div')
  resCard.id = `reservation-${res.id}`
  resCard.innerHTML = `<div class="card text-white bg-info mb-3">
  <h5 class="card-header">${res.name}</h5>
  <div class="card-body">
    <h5 class="card-title">${res.telephone_number}</h5>
    <p class="card-text">Party Size:${res.num_of_people}</p>
    <p class="card-text">Date of Reservation: ${res.date_of_reservation}</p>
    <p class="card-text">Time of Reservation: ${res.time}</p>
    <p class="card-text">Table:${res.table_id}</p>
    <a href="#" class="btn btn-primary" id="update-${res.id}" data-toggle="modal" data-target="#resEditFormModal"  >Update Reservation</a>
    <a href="#" class="btn btn-warning" id= ${res.id}> Delete Reservation </a>
  </div>
</div>`
  resSection.appendChild(resCard)

  let deleteButton = document.getElementById(`${res.id}`)
  deleteButton.addEventListener('click', function(event){
    deleteReservation(res)
  })

  let updateButton = document.getElementById(`update-${res.id}`)
  updateButton.addEventListener('click', function(event){
    console.log(`you clicked reservation ${res.id}`)
    fillReservationForm(res)
    let editSubmitBtn = document.getElementById("edit-reservation-submit")
    editSubmitBtn.dataset.id = `${res.id}`
    editSubmitBtn.addEventListener('click', editReservation)
  })
}
//rendering//////////////////////////////////////////////////
function editReservation(event) {
  console.log(`You clicked the editsubmit btn for ${event.target.dataset.id}`)
  let editTelNum =document.getElementById("edit-phone-num").value
  let editResName = document.getElementById("edit-res-name").value
  let editDate = document.getElementById("edit-date").value
  let editParty = document.getElementById("edit-party-size").value
  let editTable = document.getElementById("edit-table-num").value
  let editTime = document.getElementById("edit-res-time").value
  let data = {name: editResName, telephone_number: editTelNum, date_of_reservation: editDate, num_of_people: editParty, table_id: editTable, time: editTime}
  fetch(`http://localhost:3000/reservations/${event.target.dataset.id}`,{
    method: "PATCH",
    headers:{
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify(data)
  }).then(r => r.json()).then(reservations => {
    let resSection = document.getElementById("reservation-container")
    resSection.innerHTML = ``
    getReservations()
  })
  document.getElementById("edit-reservation-submit").removeEventListener('click', editReservation)
}
function fillReservationForm(res) {
  document.getElementById("edit-phone-num").value = res.telephone_number
  document.getElementById("edit-res-name").value = res.name
  document.getElementById("edit-date").value = res.date_of_reservation
  document.getElementById("edit-party-size").value = res.num_of_people
  document.getElementById("edit-table-num").value = res.table_id
  document.getElementById("edit-res-time").value = res.time
}


//delete///////////////////////////////////////////////////////////
function deleteReservation(res) {
  console.log(`You clicked ${res.id}`)
  fetch(`http://localhost:3000/reservations/${res.id}`, {
    method: "DELETE"
  }).then(response => response.json())
  .then(data => {
    console.log(data)
  })
  let resCard = document.getElementById(`reservation-${res.id}`)
  resCard.remove()
}
//delete///////////////////////////////////////////////////////////

//create/////////////////////////////////////////////////////
function addResSubmitListener() {
  let submitButton = document.getElementById("reservation-submit")
  submitButton.addEventListener('click', function(event){
    console.log("you clicked submit")
    submitNewReservation(event)
  })
}

function submitNewReservation(event){
  let phoneNum = document.getElementById("phone-num").value
  let resName = document.getElementById("res-name").value
  let resDate = document.getElementById("date").value
  let resParty = document.getElementById("party-size").value
  let resTable = document.getElementById("table-num").value
  let resTime = document.getElementById("res-time").value
  let data = {
    name: resName,
    telephone_number: phoneNum,
    date_of_reservation: resDate,
    num_of_people: resParty,
    table_id: resTable,
    time: resTime
  }
  fetch('http://localhost:3000/reservations', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify(data)
  }).then(r => r.json()).then(reservations => renderReservation(reservations))
}
//create////////////////////////////////////////////////////////////////////
