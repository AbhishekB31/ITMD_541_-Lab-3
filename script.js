// Selectors for elements
const sliders = document.querySelectorAll("input[type='range']");
const billInput = document.getElementById("bill");
const currencySelect = document.getElementById("currency");
const emojis = document.querySelectorAll('.emoji');
let selectedEmoji = null;

// Modal Elements for invalid input
const warningModal = document.getElementById("invalid-input-modal");
const closeWarningBtn = document.getElementById("close-warning-btn");

// Add event listeners for sliders, bill input, and currency select to calculate the tip
sliders.forEach(function(slider) {
    slider.addEventListener("input", calculateTip);
});
billInput.addEventListener("change", calculateTip);
currencySelect.addEventListener("change", calculateTip);

// Currency conversion rates
const conversionRates = {
    INR: 84.13, // 1 USD = 84.13 INR on 02 Nov 2024
    USD: 1,     // 1 USD = 1 USD
    JPY: 152.95 // 1 USD = 152.95 JPY 02 Nov 2024
};

// Function to calculate tip based on input values
function calculateTip() {
    let bill = parseFloat(billInput.value);

    // Ensure the bill is non-negative and a valid number
    if (isNaN(bill) || bill < 0) {
        showWarning(); 
        bill = 0; 
        billInput.value = bill.toFixed(2); 
        return; 
    }

    let tipPercent = document.getElementById("tip").value;
    let currency = currencySelect.value;
    let rate = conversionRates[currency];

    // Calculate total tip and total bill
    let totalTip = parseFloat((bill * (tipPercent / 100)).toFixed(2));
    let total = parseFloat((bill + totalTip).toFixed(2));

    // Convert to selected currency
    totalTip = (totalTip * rate).toFixed(2);
    total = (total * rate).toFixed(2);

    // Update display elements with calculated values
    document.getElementById("tip-amount").textContent = `${currencySymbol(currency)} ${totalTip}`;
    document.getElementById("total-amount").textContent = `${currencySymbol(currency)} ${total}`;
    document.getElementById("tip-percent").textContent = `${tipPercent}%`;
}

// Function to return the appropriate currency symbol
function currencySymbol(currency) {
    switch (currency) {
        case 'INR': return '₹';
        case 'USD': return '$';
        case 'JPY': return '¥';
        default: return '$';
    }
}

// Emoji selection functionality
emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
        if (selectedEmoji) {
            selectedEmoji.classList.remove('selected');
        }
        emoji.classList.add('selected');
        selectedEmoji = emoji;
    });
});

// Show warning modal for invalid input
function showWarning() {
    warningModal.style.display = 'flex';  l
    warningModal.style.opacity = '1';     
}

// Event listener for the close button to hide the warning modal
closeWarningBtn.addEventListener('click', function() {
    warningModal.style.display = 'none'; 
});

// Hide thank you modal completely on page load to prevent any flashes
window.addEventListener('load', function() {
    const thankYouModal = document.getElementById('thankYouModal');
    thankYouModal.style.display = 'none';
    thankYouModal.style.opacity = '0';  
}); 

// Event listener for the submit button to show the thank-you modal
document.getElementById('submit-btn').addEventListener('click', function() {
    const thankYouModal = document.getElementById('thankYouModal');
    thankYouModal.style.display = 'flex';  
    thankYouModal.style.opacity = '1';    
});

// Event listener for the close button to hide the thank-you modal and show the fade-out effect
document.getElementById('close-btn').addEventListener('click', function() {
    const thankYouModal = document.getElementById('thankYouModal');
    thankYouModal.style.opacity = '0';   
    setTimeout(() => {
        thankYouModal.style.display = 'none';
        showMessages();
    }, 2000);  
});

// Function to handle the black background and display messages
function showMessages() {
    // Create a black background div
    const fadeScreen = document.createElement('div');
    fadeScreen.classList.add('fade-screen');
    fadeScreen.style.position = 'fixed';
    fadeScreen.style.top = '0';
    fadeScreen.style.left = '0';
    fadeScreen.style.width = '100%';
    fadeScreen.style.height = '100%';
    fadeScreen.style.backgroundColor = 'black';
    fadeScreen.style.color = 'white';
    fadeScreen.style.display = 'flex';
    fadeScreen.style.justifyContent = 'center';
    fadeScreen.style.alignItems = 'center';
    fadeScreen.style.textAlign = 'center';
    fadeScreen.style.opacity = '1'; 
    document.body.innerHTML = ''; // Clear the current content
    document.body.appendChild(fadeScreen);

    const messages = [
        "Thankyou for checking out my Tip Calculator.",
        "How did you like it ?.",
        "I know right , It was Good!.",
        "Well Happy Diwali.✨",
        "And",
        "Happy New Year.🥳",
        "Website closing in",
        "3",
        "2",
        "1",
    ];

    let messageIndex = 0;

    function showNextMessage() {
        if (messageIndex < messages.length) {
            fadeScreen.textContent = messages[messageIndex];
            fadeScreen.style.opacity = '1'; 
            setTimeout(() => {
                messageIndex++;
                setTimeout(showNextMessage, 500); 
            }, 1200); 
        } else {
            setTimeout(() => {
                // Redirect to the index HTML page after 1 second
                window.location.href = 'index.html'; 
            }, 50);
        }
    }

    showNextMessage(); // Start showing messages
}
