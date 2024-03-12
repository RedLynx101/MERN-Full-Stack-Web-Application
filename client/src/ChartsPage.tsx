// ChartsPage.js

import React from 'react';

function ChartsPage() {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}> {/* Adjusted for padding and centering */}
            <h2 style={{ fontWeight: 'bold' }}>Charts for MongoDB</h2>
            <iframe
                title="MongoDB Charts"
                style={{
                    background: '#21313C',
                    border: '1px solid #000',
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                    width: '80%', // Use percentage to maintain responsiveness
                    height: '460px', // Fixed height or based on viewport height (e.g., '80vh')
                    margin: '0 auto', // Centers the iframe horizontally
                }}
                src="https://charts.mongodb.com/charts-project-0-noegq/embed/charts?id=65f07a76-1d0c-432f-8059-06afb883bbea&maxDataAge=3600&theme=dark&autoRefresh=true">
            </iframe>
        </div>
    );
}


export default ChartsPage;
