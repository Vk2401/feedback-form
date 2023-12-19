document.addEventListener('DOMContentLoaded', function () {

    // const variables
    const notifyEl = document.querySelector('#enotify');
    const notifyMessEl = document.querySelector('#en-mesage');
    const notifyMessCloseEl = document.querySelector('#notify-close-icon');

    // email JS code to send mail
    emailjs.init("g70KoS0-DpI52h-6O");
    var form = document.getElementById('feedback-form');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = new FormData(form);
      var sendForm = true;

      // Convert form data to object
      var formDataObject = {};
      formData.forEach(function (value, key) {
        formDataObject[key] = value;
        if(!value){
            showNotification('All field are required',true)
            sendForm = false;
        }
      });
      console.log(formDataObject)

      if(sendForm){
              // Use EmailJS to send the email
      emailjs.send("service_gsv7lo4", "template_fushnce", formDataObject)
      .then(function (response) {
        // Handle the success response
        showNotification('Email sent successfully', false);

        console.log('Email sent successfully');
        form.reset(); // Reset the form after successful submission
      }, function (error) {
        // Handle the error response
        showNotification('Something went wrong', true);
        console.error('Error sending email:', error);
      });
  
      }
    });






    // handle events
    notifyMessCloseEl.addEventListener('click',()=>{
        notifyEl.style.display = 'none';
    })

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
    
        setTimeout(() => {
            notifyEl.style.display = 'none';
            notifyEl.classList.remove('bounce');
        }, 5000);
    }
    


  });