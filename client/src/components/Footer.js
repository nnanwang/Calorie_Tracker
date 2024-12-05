// In src/components/Footer.js
import React from 'react';
import '../css/Footer.css'; // Adjust the path if necessary

function Footer() {
    return (
        <footer className="footer">
            <p>© 2024 Calorie Tracker App</p>
            <p>Contact us at: support@calorietracker.com</p>
            <div>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">Facebook</a>
                {' | '}
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter profile">Twitter</a>
                {' | '}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile">Instagram</a>
            </div>
        </footer>
    );
}

export default Footer;


