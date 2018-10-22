document.addEventListener('DOMContentLoaded', function(event){
  getReservations()
  addNewResEventListener()
})

function getReservations() {
  fetch('http://localhost:3000/reservations')
  .then(r => r.json())
  .then(reservations => {
    reservations.forEach(res => renderReservation(res))
  })
}

function addNewResEventListener() {
  let newResBtn = document.getElementById("new-res-button")
  newResBtn.addEventListener("click", function(event){
    console.log("you clicked the new res form")
    renderReservationForm();
  })
}

function renderReservationForm() {
  let formBox = document.getElementById("reservation-form-box")
  formBox.innerHTML = `<form class="form-horizontal">
<fieldset>

<!-- Form Name -->
<legend>Create a New Reservation</legend>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Reservation Name</label>
  <div class="col-md-4">
  <input id="textinput" name="textinput" type="text" placeholder="name" class="form-control input-md">

  </div>
</div>

<!-- Prepended text-->
<div class="form-group">
  <label class="col-md-4 control-label" for="prependedtext">Tel. Number</label>
  <div class="col-md-4">
    <div class="input-group">
      <span class="input-group-addon">cell</span>
      <input id="prependedtext" name="prependedtext" class="form-control" placeholder="(###)###-####" type="text">
    </div>

  </div>
</div>

<!-- Select Basic -->
<div class="form-group">
  <label class="col-md-4 control-label" for="selectbasic">Party Size</label>
  <div class="col-md-4">
    <select id="selectbasic" name="selectbasic" class="form-control">
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
      <option value="4">Four</option>
      <option value="5">Five</option>
      <option value="6">Six</option>
      <option value="7">Seven</option>
      <option value="8">Eight</option>
    </select>
  </div>
</div>

<!-- Select Multiple -->
<div class="form-group">
  <label class="col-md-4 control-label" for="selectmultiple">Select Multiple</label>
  <div class="col-md-4">
    <select id="selectmultiple" name="selectmultiple" class="form-control" multiple="multiple">
      <option value="1">Table 1</option>
      <option value="2">Table  2</option>
      <option value="3">Table  3</option>
      <option value="4">Table  4</option>
      <option value="5">Table  5</option>
      <option value="6">Table  6</option>
      <option value="7">Table  7</option>
      <option value="8">Table  8</option>
      <option value="9">Table  9</option>
    </select>
  </div>
</div>`

}

function submitNewReservation(event) {
  let name = document.getElementById("name").value
  let size = document.getElementById("party-size").value
  let telNumber = document.getElementById("tel").value
  let tableNum = document.getElementById("table").value
  let data = {name: name, telephone_number: telNumber, num_of_people: size, table_id: tableNum }
  fetch('http://localhost:3000/reservations', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify(data)
  }).then(r => r.json()).then(console.log)
}


function renderReservation(res) {
  let resSection = document.getElementById("reservation-box")
  let resCard = document.createElement('div')
  let timeOfRes = document.createElement('p')
  let nameOfRes = document.createElement('h3')
  let phoneOfRes = document.createElement('p')
  let sizeOfRes = document.createElement('p')

  let updateButtons = document.createElement('div')
  updateButtons.className = "button-toolbar"
  let buttonGroup = document.createElement('div')
  let deleteButton = document.createElement('button')
  deleteButton.classList.add("btn")
  deleteButton.classList.add("btn-primary")
  deleteButton.innerText = "Delete reservation"
  let editButton = document.createElement('button')
  editButton.classList.add("btn")
  editButton.classList.add("btn-secondary")
  editButton.innerText = "Update reservation"
  buttonGroup.appendChild(editButton)
  buttonGroup.appendChild(deleteButton)
  updateButtons.appendChild(buttonGroup)

  resCard.className = "card"
  resCard.style = "width: 18rem;"
  timeOfRes.innerText = `time: ${res.date_of_reservation}`
  timeOfRes.classList.add("card-text")
  nameOfRes.innerText = `Name: ${res.name}`
  nameOfRes.classList.add("card-header")
  phoneOfRes.innerText = `number: ${res.telephone_number}`
  phoneOfRes.classList.add("card-text")
  sizeOfRes.innerText = `party size: ${res.num_of_people}`
  sizeOfRes.classList.add("card-text")

  resCard.appendChild(nameOfRes)
  resCard.appendChild(sizeOfRes)
  resCard.appendChild(timeOfRes)
  resCard.appendChild(phoneOfRes)
  resCard.appendChild(updateButtons)

  resSection.appendChild(resCard)
}
