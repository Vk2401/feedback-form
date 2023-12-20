document.addEventListener('DOMContentLoaded', function () {
  // Constants
  const notifyEl = document.querySelector('#enotify');
  const notifyMessEl = document.querySelector('#en-mesage');
  const notifyMessCloseEl = document.querySelector('#notify-close-icon');
  const form = document.getElementById('feedback-form');

  // email JS code to send mail
  emailjs.init("g70KoS0-DpI52h-6O");

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = new FormData(form);
      var sendForm = true;

      // Convert form data to object
      var formDataObject = {};
      formData.forEach(function (value, key) {
          formDataObject[key] = value;
          var reqField = document.getElementsByName(key)[0];
          var inputParent = reqField.parentElement;
          var inputErrMess = document.createElement('span');
          inputErrMess.classList.add('InputErrMess');
          inputErrMess.style.position = "absolute";
          inputErrMess.style.left = "2%";
          inputErrMess.style.bottom = "-4%";
          inputErrMess.style.fontSize = "14px";
          inputErrMess.style.color = "red";

          if (key !== 'uphone' && key !== 'uemail' && !value) {
              showNotification('All fields are required', true);
              reqField.style.border = '1px solid red';
              sendForm = false;
              inputErrMess.innerHTML = "Required Field";
              appendErrorMessage(inputParent, inputErrMess);
          }



          if (key === 'uphone') {
              if (value.length !== 10) {
                  inputErrMess.innerHTML = "Invalid phone number";
                  appendErrorMessage(inputParent, inputErrMess);
                  reqField.style.border = '1px solid red';
                  sendForm = false;
              }
          } else if (key === 'uemail') {
              var emailRegex = /^\S+@\S+\.\S+$/;
              if (!emailRegex.test(value)) {
                reqField.style.border = '1px solid red';
                  inputErrMess.innerHTML = "Check your email";
                  appendErrorMessage(inputParent, inputErrMess);
                  sendForm = false;
              }
          }
      });

      if (sendForm) {
          // Use EmailJS to send the email
          emailjs.send("service_gsv7lo4", "template_fushnce", formDataObject)
              .then(function (response) {
                  // Handle the success response
                  showNotification('Email sent successfully', false);
                  console.log('Email sent successfully');
                  form.reset(); // Reset the form after successful submission
              })
              .catch(function (error) {
                  // Handle the error response
                  showNotification('Something went wrong', true);
                  console.error('Error sending email:', error);
              });
      }
  });

  // Handle input events
  var inputFields = form.querySelectorAll('input, textarea, select');
  inputFields.forEach(function (field) {
      field.addEventListener('input', function () {
          if (this.value) {
            this.style.border = '1px solid transparent';

              removeErrorMessage(this);
          }
      });
  });

  // Close notification on icon click
  notifyMessCloseEl.addEventListener('click', function () {
      notifyEl.style.display = 'none';
  });

  // Show notification function
  function showNotification(message, isError = false) {
      notifyEl.style.display = 'flex';
      notifyMessEl.innerHTML = message;
      notifyEl.style.background = isError ? '#c40233' : '#9cda8a';

      if (isError) {
          notifyMessCloseEl.style.color = 'white';
          notifyMessEl.style.color = 'white';
      }

      // Add bounce animation class
      notifyEl.classList.add('bounce');

      // Remove bounce animation class after 5 seconds
      setTimeout(() => {
          notifyEl.style.display = 'none';
          notifyEl.classList.remove('bounce');
      }, 5000);
  }

  // Function to remove the error message on input change
  function removeErrorMessage(inputField) {
      var inputParent = inputField.parentElement;
      var errorSpan = inputParent.querySelector('.InputErrMess');

      if (errorSpan) {
          inputParent.removeChild(errorSpan);
      }
  }

      // Function to append the error message to the parent
      function appendErrorMessage(parent, errorMessage) {
        var existingErrorMessage = parent.querySelector('.InputErrMess');
        if (!existingErrorMessage) {
            parent.appendChild(errorMessage);
        }
    }
});
