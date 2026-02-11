/**
 * Google Apps Script Contact Form Handler
 * 
 * This module provides functionality for submitting contact forms to Google Apps Script Web App.
 * It sends JSON data with proper authentication and handles success/error responses.
 * 
 * SECURITY NOTE:
 * - The _token parameter uses a placeholder value from config
 * - In production, replace the placeholder with the actual MY_SECRET value from your Apps Script Properties
 * - Never commit real authentication tokens to public repositories
 */

import { WEB_APP_URL, GAS_TOKEN } from '../config/gas-config.js';

/**
 * Submit contact form data to Google Apps Script
 * @param {Object} formData - The form data to submit
 * @param {string} formData.name - Sender's name
 * @param {string} formData.email - Sender's email
 * @param {string} formData.subject - Email subject (optional)
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} Response from the server with success status and message
 */
export async function submitContactForm({ name, email, subject = '', message }) {
    try {
        // Prepare JSON payload
        const payload = {
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim() || 'הודעה מאתר חידון התנ"ך',
            message: message.trim(),
            _token: GAS_TOKEN // WARNING: This is a placeholder. Replace with real token in production.
        };

        // Send POST request with JSON content
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            mode: 'cors', // Enable CORS for cross-origin requests
        });

        // Parse JSON response
        const data = await response.json();

        // Return standardized response
        return {
            success: data.success || false,
            message: data.message || (data.success ? 'ההודעה נשלחה בהצלחה!' : 'שגיאה בשליחת ההודעה'),
            data: data
        };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        
        // Return error response
        return {
            success: false,
            message: 'שגיאת רשת: לא ניתן להתחבר לשרת. אנא נסה שוב.',
            error: error.message
        };
    }
}

/**
 * Validate contact form data
 * @param {Object} formData - The form data to validate
 * @returns {Object} Validation result with isValid flag and error message
 */
export function validateContactForm({ name, email, message }) {
    if (!name || name.trim().length === 0) {
        return { isValid: false, message: 'נא למלא את שדה השם' };
    }
    
    if (!email || email.trim().length === 0) {
        return { isValid: false, message: 'נא למלא את שדה הדוא"ל' };
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return { isValid: false, message: 'נא להזין כתובת דוא"ל תקינה' };
    }
    
    if (!message || message.trim().length === 0) {
        return { isValid: false, message: 'נא למלא את שדה ההודעה' };
    }
    
    return { isValid: true };
}
