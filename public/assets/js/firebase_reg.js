// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDzAsEDNah9IkKiTGgSIgTgQ6XH0ek9vVQ",
        authDomain: "wishes-of-love.firebaseapp.com",
        databaseURL: "https://wishes-of-love-default-rtdb.firebaseio.com",
        projectId: "wishes-of-love",
        storageBucket: "wishes-of-love.appspot.com",
        messagingSenderId: "426301042509",
        appId: "1:426301042509:web:a162182075d5a589441104",
        measurementId: "G-PT5MTLW1CN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()

  // Set up our register function
  personalemail.addEventListener('click',(e) => {
    // Get all our input fields
    First_Name = document.getElementById('fname').value
    Last_Name = document.getElementById('lname').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Please enter a valid email and password.')
      return
      // Don't continue running the code
    }
    if (validate_field(Last_Name) == false || validate_field(First_Name) == false) {
      alert('Please fill out all fields.')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        First_Name : First_Name,
        Last_Name : Last_Name,
        password : password,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      location.href = '../subscribed.html';
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  });

  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }