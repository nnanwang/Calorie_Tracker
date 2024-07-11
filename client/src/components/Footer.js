// In src/components/Footer.js
import React from 'react';

function Footer() {
    return (
        <footer style={{ marginTop: '20px', padding: '20px 0', backgroundColor: '#E6E6FA', textAlign: 'center', }}>
            <p>© 2024 Calorie Tracker App</p>
            <p>Contact us at: support@calorietracker.com</p>
            <div>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
        </footer>
    );
}

export default Footer;
