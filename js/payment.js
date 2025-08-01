// payment.js
// This file handles PayPal payment integration for the website.

// Load PayPal SDK dynamically if not already loaded
function loadPayPalSDK(clientId = 'sb', currency = 'USD') {
    if (!document.getElementById('paypal-sdk')) {
        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
        script.onload = function() {
            renderPayPalButton();
        };
        document.body.appendChild(script);
    } else {
        renderPayPalButton();
    }
}

// Render PayPal button
function renderPayPalButton() {
    if (typeof paypal !== 'undefined') {
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color:  'blue',
                shape:  'rect',
                label:  'paypal'
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '10.00' // Set your amount here
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Transaction completed by ' + details.payer.name.given_name + '!');
                });
            }
        }).render('#paypal-button-container');
    }
}

// Initialize payment platform
function initPaymentPlatform() {
    loadPayPalSDK();
}

// You can call initPaymentPlatform() from your HTML to activate the payment button.
