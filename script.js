(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();

const messages = [
    "Are you sure?",
    "Really sure??",
    "Think about it for a second...",
    "Pretty please? 🥺",
    "Just consider it!",
    "You're breaking my heart here...",
    "I promise it'll be worth it!",
    "Come on, don't leave me hanging...",
    "Okay, okay... but what if you said yes?",
    "Just kidding! Please say yes! ❤️",
    "But why though? 🤔",
    "That's a bold choice...",
    "Are you absolutely certain?",
    "Last chance to reconsider!",
    "What if I said magic word?",
    "This is your final answer?",
    "I respect your choice... BUT",
    "You know you want to say yes..."
];

let messageIndex = 0;
let yesButtonScale = 1;
let clickCount = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    
    // Increment click count and scale factor
    clickCount++;
    
    // Change the no button text
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // Dramatically increase the yes button size
    // Start with moderate growth, then accelerate
    let growthFactor;
    if (clickCount <= 3) {
        growthFactor = 1.4; // 40% growth for first 3 clicks
    } else if (clickCount <= 6) {
        growthFactor = 1.6; // 60% growth for clicks 4-6
    } else if (clickCount <= 10) {
        growthFactor = 1.8; // 80% growth for clicks 7-10
    } else {
        growthFactor = 2.2; // 120% growth for clicks 11+
    }
    
    yesButtonScale *= growthFactor;
    
    // Apply the scale using CSS custom properties - this handles both size and font scaling
    yesButton.style.setProperty('--scale-factor', yesButtonScale);
    
    // Remove any manually set font size to let CSS handle it consistently
    yesButton.style.fontSize = '';
    
    // Update button text based on scale for better readability and more drama
    if (yesButtonScale <= 2) {
        const earlyTexts = ['Yes! 💕', 'Yes Please!', 'YES! ✨', 'Of course!'];
        yesButton.textContent = earlyTexts[clickCount % earlyTexts.length] || 'Yes';
    } else if (yesButtonScale <= 4) {
        yesButton.textContent = 'YES!! 💖';
    } else if (yesButtonScale <= 8) {
        yesButton.textContent = 'YES!!! 💕';
    } else if (yesButtonScale <= 15) {
        yesButton.textContent = 'YESSSS! 💖';
    } else if (yesButtonScale <= 25) {
        yesButton.textContent = '💖 YES! 💖';
    } else {
        yesButton.textContent = '💖�� YES! 💖💖';
    }
    
    // Add special handling for very large buttons
    if (yesButtonScale > 5) {
        yesButton.setAttribute('data-mega-size', 'true');
        
        // At extreme sizes, make it impossible to miss
        if (yesButtonScale > 20) {
            // Add pulsing animation for attention
            yesButton.style.animation = 'pulse 1s infinite';
        }
    }
    
    // Ensure the No button stays absolutely fixed
    noButton.style.setProperty('--scale-factor', '1', 'important');
    
    // Add some screen shake effect for fun
    if (clickCount > 5) {
        document.body.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }
    
    // Log for debugging
    console.log(`Click ${clickCount}: Yes button scale is now ${yesButtonScale.toFixed(2)}`);
}

function handleYesClick() {
    // Add a little celebration before redirecting
    const yesButton = document.querySelector('.yes-button');
    
    // Scale the celebration based on current button size
    const currentScale = yesButtonScale || 1;
    
    // Change text and apply celebration styling
    if (currentScale > 5) {
        yesButton.textContent = '💖 YAY! 💖';
        yesButton.style.fontWeight = '800';
        // Add extra celebration effects for mega buttons
        yesButton.style.animation = 'celebration 0.6s ease-in-out';
    } else {
        yesButton.textContent = 'Yay! 🎉💕';
    }
    
    // Let CSS handle the font size consistently with the scale factor
    yesButton.style.fontSize = '';
    yesButton.style.setProperty('--scale-factor', currentScale * 1.1);
    
    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 800); // Give more time to see the celebration
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(var(--scale-factor)); }
        50% { transform: scale(calc(var(--scale-factor) * 1.05)); }
        100% { transform: scale(var(--scale-factor)); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes celebration {
        0% { transform: scale(var(--scale-factor)); }
        25% { transform: scale(calc(var(--scale-factor) * 1.2)); }
        50% { transform: scale(calc(var(--scale-factor) * 0.9)); }
        75% { transform: scale(calc(var(--scale-factor) * 1.15)); }
        100% { transform: scale(calc(var(--scale-factor) * 1.1)); }
    }
    
    .yes-button {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.3s ease-in-out !important;
    }
`;
document.head.appendChild(style);

// Initialize the button scale
document.addEventListener('DOMContentLoaded', function() {
    const yesButton = document.querySelector('.yes-button');
    if (yesButton) {
        yesButton.style.setProperty('--scale-factor', '1');
    }
});