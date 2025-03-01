 // State Variables
 let loggedIn = false;
 let userData = {};

 // Auth Form Toggle
 document.getElementById('register-form').classList.remove('hidden');
 document.getElementById('login-form').classList.add('hidden');
 document.getElementById('booking-section').classList.add('hidden');

 // Register user
 document.getElementById('register').addEventListener('submit', function(event) {
     event.preventDefault();
     const username = document.getElementById('username').value;
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;

     // Save user data in localStorage
     localStorage.setItem('username', username);
     localStorage.setItem('email', email);
     localStorage.setItem('password', password);

     alert("Registration Successful! You can now login.");
     document.getElementById('register-form').classList.add('hidden');
     document.getElementById('login-form').classList.remove('hidden');
 });

 // Login user
 document.getElementById('login').addEventListener('submit', function(event) {
     event.preventDefault();
     const username = document.getElementById('login-username').value;
     const password = document.getElementById('login-password').value;

     // Check if user exists in localStorage
     const storedUsername = localStorage.getItem('username');
     const storedPassword = localStorage.getItem('password');

     if (username === storedUsername && password === storedPassword) {
         alert("Login Successful!");
         loggedIn = true;
         document.getElementById('login-form').classList.add('hidden');
         document.getElementById('booking-section').classList.remove('hidden');
     } else {
         alert("Invalid credentials. Please try again.");
     }
 });

 // Booking ticket
 document.getElementById('ticket-booking-form').addEventListener('submit', function(event) {
     event.preventDefault();

     const from = document.getElementById('from-location').value;
     const to = document.getElementById('to-location').value;
     const transportMode = document.getElementById('transport-mode').value;
     const travelDate = document.getElementById('travel-date').value;

     // Simple price calculation based on transport mode
     let price = 0;
     switch (transportMode) {
         case 'bus':
             price = 50;
             break;
         case 'train':
             price = 100;
             break;
         case 'airplane':
             price = 200;
             break;
     }

     // Show booking confirmation
     document.getElementById('confirmation').classList.remove('hidden');
     document.getElementById('confirmation-details').innerHTML = `
         <strong>Booking Details:</strong><br>
         From: ${from}<br>
         To: ${to}<br>
         Transport: ${transportMode.charAt(0).toUpperCase() + transportMode.slice(1)}<br>
         Travel Date: ${travelDate}<br>
         Amount: $${price}<br>
         <strong>Booking Confirmed!</strong>
     `;
 });