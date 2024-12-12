import { bookAppointment } from './services/api.js';

export function handleFormSubmission(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
  };

  // Disable form and show loading state
  form.querySelectorAll('input, button').forEach(el => el.disabled = true);
  submitButton.textContent = 'Booking...';

  // Submit appointment
  bookAppointment(formData)
    .then(response => {
      alert('Appointment booked successfully! We will confirm your appointment shortly.');
      form.reset();
    })
    .catch(error => {
      alert(`Failed to book appointment: ${error.message}`);
    })
    .finally(() => {
      // Re-enable form and restore button text
      form.querySelectorAll('input, button').forEach(el => el.disabled = false);
      submitButton.textContent = originalButtonText;
    });
}