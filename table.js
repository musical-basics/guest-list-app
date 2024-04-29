import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


// Get a reference to the database
var database = firebase.database();

// Get a reference to the table body
var tableBody = document.querySelector('#guestTable tbody');

// Retrieve data from Firebase and populate the table
database.ref('guestList').on('value', function(snapshot) {
  // Clear the table body
  tableBody.innerHTML = '';

  // Loop through the data and append rows to the table
  snapshot.forEach(function(childSnapshot) {
    var data = childSnapshot.val();
    var row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.timestamp}</td>
      <td>${data.firstName}</td>
      <td>${data.secondName}</td>
      <td>${data.partySize}</td>
      <td>${data.phone1}</td>
      <td>${data.phone2}</td>
      <td>${data.tonightClubs ? data.tonightClubs.join(', ') : ''}</td>
      <td>${data.tomorrowPools ? data.tomorrowPools.join(', ') : ''}</td>
      <td>${data.tomorrowNightClubs}</td>
      <td>${data.hotel}</td>
      <td>${data.dateLeaving}</td>
    `;
    tableBody.appendChild(row);
  });
});