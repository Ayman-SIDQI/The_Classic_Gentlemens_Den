// form.js
import { validateAppointmentData } from '../utils/validation.js';

export async function handleFormSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    // Validate form data
    const { isValid, errors } = validateAppointmentData(formData);
    if (!isValid) {
        console.error('Validation errors:', errors);
        alert(Object.values(errors)[0]); // Show first error to user
        return;
    }

    try {
        // Update button state
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Log the submission
        console.log('Form submitted successfully with data:', formData);
        
        // Clear form
        form.reset();
        
        // Show success message
        alert('Appointment request submitted successfully!');

    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}