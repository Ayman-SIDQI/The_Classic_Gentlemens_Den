/**
 * Validates appointment form data
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Validation result
 */
export function validateAppointmentData(formData) {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  }

  if (!formData.date) {
    errors.date = 'Date is required';
  }

  if (!formData.time) {
    errors.time = 'Time is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}