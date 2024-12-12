/**
 * Handles form state updates
 * @param {HTMLFormElement} form - The form element
 * @param {boolean} disabled - Whether to disable the form
 */
export function updateFormState(form, disabled) {
  const elements = form.querySelectorAll('input, button');
  elements.forEach(element => {
    element.disabled = disabled;
  });
}

/**
 * Resets form and shows success message
 * @param {HTMLFormElement} form - The form element
 * @param {string} message - Success message to display
 */
export function handleFormSuccess(form, message) {
  form.reset();
  alert(message);
}

/**
 * Shows error message to user
 * @param {string} error - Error message to display
 */
export function handleFormError(error) {
  alert(`Error: ${error}`);
}