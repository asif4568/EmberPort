document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formPopup = document.getElementById('formSubmissionPopup');
    const popupMessageText = document.getElementById('popupMessageText');
    const closePopupButton = document.getElementById('closePopupButton');

    const successMessage = "Message has been sent. Thank you for your message!";
    const errorMessage = "Something went wrong on our end. This is not your fault, this is our fault. Please email us directly at <a href='mailto:contact@emberport.com' style='color: var(--primary-color);'>contact@emberport.com</a>.";

    function showPopup(messageContent) {
        if (popupMessageText && formPopup) {
            popupMessageText.innerHTML = messageContent; // Use innerHTML for the link in error message
            formPopup.style.display = 'flex';
            // Timeout to allow display property to take effect before adding class for transition
            setTimeout(() => {
                formPopup.classList.add('is-visible');
            }, 10);
        }
    }

    function hidePopup() {
        if (formPopup) {
            formPopup.classList.remove('is-visible');
            // Listen for the end of the transition to set display to none
            // This ensures the fade-out animation completes
            const transitionEndHandler = () => {
                if (!formPopup.classList.contains('is-visible')) {
                    formPopup.style.display = 'none';
                }
                formPopup.removeEventListener('transitionend', transitionEndHandler);
            };
            formPopup.addEventListener('transitionend', transitionEndHandler);
            
            // Fallback if transitionend doesn't fire (e.g. if transitions are disabled or very short)
            setTimeout(() => {
                 if (!formPopup.classList.contains('is-visible')) {
                    formPopup.style.display = 'none';
                }
            }, 350); // Slightly longer than the CSS transition duration
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // First, check if the form passes HTML5 validation
            if (!contactForm.checkValidity()) {
                // If the form is not valid, stop here.
                // The browser will automatically show validation messages
                // for the invalid fields because we haven't called event.preventDefault() yet
                // for this case.
                // contactForm.reportValidity(); // Usually not needed
                return;
            }

            // If the form IS valid, then we prevent default and show our pop-up
            event.preventDefault(); 

            showPopup('Sending your message, please wait...');

            // Simulate form submission delay and random success/failure
            setTimeout(() => {
                const isSuccess = Math.random() > 0.3; // 70% chance of success for demo purposes

                if (isSuccess) {
                    showPopup(successMessage);
                    contactForm.reset(); // Clear the form fields on successful submission
                } else {
                    showPopup(errorMessage);
                }

                // Clean the history state to prevent resubmission warnings
                if (history.replaceState) {
                    history.replaceState(null, null, window.location.href);
                }

            }, 1500); // Simulate 1.5 seconds network delay
        });
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', hidePopup);
    }

    if (formPopup) {
        // Allow closing the popup by clicking on the overlay background
        formPopup.addEventListener('click', function(event) {
            if (event.target === formPopup) { // Ensures click is on the overlay, not its content
                hidePopup();
            }
        });
    }
});
