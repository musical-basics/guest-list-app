document.addEventListener('DOMContentLoaded', function() {
 
 // Get the form element
  var form = document.getElementById('guestListForm');

  // Add form submission event listener
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get the current timestamp in PST
    var now = new Date();
    var timestamp = now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    var firstName = document.getElementById('firstName').value;
    var secondName = document.getElementById('secondName').value;
    var maleCount = document.getElementById('maleCount').value;
    var femaleCount = document.getElementById('femaleCount').value;
    var partySize = maleCount + 'm ' + femaleCount + 'f';
    var phone1 = document.getElementById('phone1').value;
    var phone2 = document.getElementById('phone2').value;
    var tonightClubs = Array.from(document.querySelectorAll('input[name="tonightClubs"]:checked')).map(function (checkbox) {
      return checkbox.value;
    });
    var tomorrowPools = Array.from(document.querySelectorAll('input[name="tomorrowPools"]:checked')).map(function (checkbox) {
      return checkbox.value;
    });

    var tomorrowNightClubs = Array.from(document.querySelectorAll('input[name="tomorrowNightClubs"]:checked')).map(function (checkbox) {
      return checkbox.value;
    });

    var hotel = document.getElementById('hotel').value;
    var otherHotel = document.getElementById('otherHotel').value.trim();
    var dateLeaving = document.getElementById('dateLeaving').value;

    // Save the form data to Firebase


    var formData = {
      timestamp: timestamp
    };
    if (firstName !== '') formData.firstName = firstName;
    if (secondName !== '') formData.secondName = secondName;
    if (maleCount !== '0' || femaleCount !== '0') formData.partySize = partySize;
    if (phone1 !== '') formData.phone1 = phone1;
    if (phone2 !== '') formData.phone2 = phone2;
    if (tonightClubs.length > 0) formData.tonightClubs = tonightClubs;
    if (tomorrowPools.length > 0) formData.tomorrowPools = tomorrowPools;
    if (tomorrowNightClubs !== '') formData.tomorrowNightClubs = tomorrowNightClubs;
    if (hotel !== '') {
      formData.hotel = hotel;
      if (hotel === 'Other' && otherHotel !== '') {
        formData.otherHotel = otherHotel;
      }
    }
    if (dateLeaving !== '') formData.dateLeaving = dateLeaving;

    // Save the form data to Firebase
    firebase.database().ref('guestList').push(formData)
      .then(function () {
        console.log('Data saved successfully!');
        form.reset(); // Reset the form
      })
      .catch(function (error) {
        console.error('Error saving data:', error);
      });

  });

});