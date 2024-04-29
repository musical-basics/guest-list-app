console.log("table.js: Script started");

// Get a reference to the database
console.log("table.js: Getting database reference");
const database = firebase.database();

// Get a reference to the table body
console.log("table.js: Getting table body reference");
const tableBody = document.querySelector('#guestTable tbody');

// Retrieve data from Firebase and populate the table
console.log("table.js: Retrieving data from Firebase");
database.ref('guestList').on('value', (snapshot) => {
  console.log("table.js: Data snapshot received");

  // Clear the table body
  tableBody.innerHTML = '';

  // Loop through the data and append rows to the table
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    console.log("table.js: Child data:", data);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.timestamp}</td>
      <td>${data.firstName}</td>
      <td>${data.secondName}</td>
      <td>${data.partySize}</td>
      <td>${data.phone1}</td>
      <td>${data.phone2}</td>
      <td>${Array.isArray(data.tonightClubs) ? data.tonightClubs.join(', ') : ''}</td>
      <td>${Array.isArray(data.tomorrowPools) ? data.tomorrowPools.join(', ') : ''}</td>
      <td>${data.tomorrowNightClubs}</td>
      <td>${data.hotel}</td>
      <td>${data.dateLeaving}</td>
    `;
    tableBody.appendChild(row);
    console.log("table.js: Row appended to table");
  });

  console.log("table.js: Data retrieval and table population completed");
});

console.log("table.js: Script execution completed");