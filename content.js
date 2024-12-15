// Configuration object for easy updates
const CONFIG = {
    feedbackButtonSelector: 'button[name="GiveFeedback"]',
    radioButtonSelector: 'input[type="radio"]',
    stronglyAgreeText: 'Strongly Agree',
    feedbackTextareaSelector: 'textarea[name="FB_Text"]',
    feedbackText: "Yeah, it's cool and perfectly fine"
};
let isAutomationCompleted = false; 
let hasUserResponded = false; 

function showToast(message, duration = 3000) {

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;

    toast.style.position = 'fixed';
    toast.style.top = '20px'; 
    toast.style.right = '20px'; 
    toast.style.backgroundColor = '#f52a34'; 
    toast.style.fontWeight = '600';
    toast.style.color = 'white'; 
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.fontSize = '16px';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease-in-out';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

// Main automation function
function startAutomation() {
    if (isAutomationCompleted) {
        console.log('Automation already completed, skipping.');
        return; 
    }

    console.log('Course Feedback Automation Started');
    
    if (isInitialPage()) {
        console.log("Detected Initial Page: Moving to Feedback Form.");
        handleInitialPage(); 
    } else if (isFeedbackFormPage()) {
        console.log("Detected Feedback Form Page: Proceeding with Automation.");
        handleFeedbackFormPage(); 
    }

    isAutomationCompleted = true; 
}

function isInitialPage() {
    return !!document.querySelector('button[name="GiveFeedback"]');
}

function isFeedbackFormPage() {
    return document.querySelectorAll('input[type="radio"]').length > 0;
}

function handleInitialPage() {
    console.log('Handling initial page');
    const feedbackButton = document.querySelector('button[name="GiveFeedback"]');
    
    if (feedbackButton) {
        console.log('Found feedback button with value:', feedbackButton.value);
        // Add a small delay to ensure the page is ready
        setTimeout(() => {
            feedbackButton.click();
            console.log('Clicked feedback button');
            showToast('Navigating to the feedback form...', 3000);
        }, 1000);
    }
}

function setPermissionWithExpiry() {
    const expiryTime = 30 * 60 * 1000; 
    const currentTime = new Date().getTime(); 
    const expirationTime = currentTime + expiryTime; 
    
    const permissionData = {
        granted: true,
        expiresAt: expirationTime 
    };
    
    localStorage.setItem('permissionGranted', JSON.stringify(permissionData));
}

function checkPermissionWithExpiry() {
    const permissionData = JSON.parse(localStorage.getItem('permissionGranted'));
    
    if (!permissionData) {
        return false; 
    }
    
    const currentTime = new Date().getTime();
    
    if (currentTime > permissionData.expiresAt) {
        localStorage.removeItem('permissionGranted'); 
        return false; 
    }
    
    return permissionData.granted; 
}

function showPermissionPopup() {
    if (checkPermissionWithExpiry()) {
        startAutomation();
        return;
    }

    if (hasUserResponded) return;

    const popup = document.createElement('div');
    popup.className = 'permission-popup';

    const message = document.createElement('p');
    message.textContent = 'Am I allowed to start the magic?';
    message.style.fontSize = '20px';
    message.style.marginBottom = '20px'; 

    const yesButton = document.createElement('button');
    yesButton.textContent = 'Yes';
    yesButton.style.marginRight = '18px'; 
    yesButton.style.padding = '10px 40px';
    yesButton.style.cursor = 'pointer';
    yesButton.style.backgroundColor = 'green';
    yesButton.style.color = 'white';
    yesButton.style.border = 'none';
    yesButton.style.fontSize = '18px';  
    yesButton.style.borderRadius = '8px';
    yesButton.style.transition = 'background-color 0.3s ease'; 
    yesButton.addEventListener('click', () => {
        hasUserResponded = true; 
        setPermissionWithExpiry();
        popup.style.display = 'none'; 
        startAutomation(); 
    });
    
    yesButton.addEventListener('mouseover', () => {
        yesButton.style.backgroundColor = '#45a049';
    });
    yesButton.addEventListener('mouseout', () => {
        yesButton.style.backgroundColor = 'green';
    });

    const noButton = document.createElement('button');
    noButton.textContent = 'No';
    noButton.style.padding = '10px 40px';  // Larger button padding
    noButton.style.cursor = 'pointer';
    noButton.style.backgroundColor = 'red';
    noButton.style.color = 'white';
    noButton.style.border = 'none';
    noButton.style.fontSize = '18px';  
    noButton.style.borderRadius = '8px';
    noButton.style.transition = 'background-color 0.3s ease'; 
    noButton.addEventListener('click', () => {
        hasUserResponded = true; 
        popup.style.display = 'none'; 
        console.log('Automation not started'); 
    });
    
    noButton.addEventListener('mouseover', () => {
        noButton.style.backgroundColor = '#c12a27';
    });
    noButton.addEventListener('mouseout', () => {
        noButton.style.backgroundColor = 'red';
    });

    const linkedinContainer = document.createElement('div');
    linkedinContainer.style.marginTop = '20px'; // Space between buttons and LinkedIn link
    const linkedinLink = document.createElement('a');
    linkedinLink.href = 'https://linkedin.com/in/mhaiderbukhari'; 
    linkedinLink.target = '_blank'; 
    linkedinLink.textContent = 'Developed by Haider (Linkedin)'; 
    linkedinLink.style.fontSize = '13px'; 
    linkedinLink.style.color = '#000'; 
    linkedinLink.style.textDecoration = 'none'; 
    linkedinContainer.appendChild(linkedinLink);

    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '40px';  
    popup.style.borderRadius = '12px';  
    popup.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    popup.style.zIndex = '9999';
    popup.style.textAlign = 'center';
    popup.style.width = '400px'; 

    popup.appendChild(message);
    popup.appendChild(yesButton);
    popup.appendChild(noButton);
    popup.appendChild(linkedinContainer);

    document.body.appendChild(popup);
}

function handleFeedbackFormPage() {
    console.log('Handling feedback form page');
    
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    let selectedCount = 0;

    radioButtons.forEach((radio, index) => {
        const label = radio.closest('label');
        if (label && label.textContent.trim().includes('Strongly Agree')) {
            setTimeout(() => {
                radio.checked = true;
                radio.dispatchEvent(new Event('change', { bubbles: true }));
                selectedCount++;
                console.log(`Selected radio button group #${index + 1}`);
            }, 100 * selectedCount);
        }
    });

    console.log(`Found and will select ${selectedCount} 'Strongly Agree' options`);

    const feedbackTextareas = document.querySelectorAll('textarea[name="FB_Text"]');
    if (feedbackTextareas.length > 0) {
        const texts = [
            "Yeah, it's cool and perfectly fine",
            "absolutely amazing!",
            "Such a fantastic experience!",
            "Couldn't be happier with this.",
            "Truly impressive and delightful!",
            "This exceeds my expectations!",
            "Brilliant work, very satisfying!"
        ];

        feedbackTextareas.forEach((textarea, index) => {
            setTimeout(() => {
                const randomText = texts[Math.floor(Math.random() * texts.length)];
                textarea.value = randomText;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                textarea.dispatchEvent(new Event('change', { bubbles: true }));
                console.log(`Updated textarea #${index + 1}`);
            }, 100 * (selectedCount + index));
        });
    } else {
        console.log('No feedback textareas found');
    }

    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        setTimeout(() => {
            submitButton.click();
            console.log('Clicked submit button');
            showToast('Feedback submitted!', 3000);
        }, 1000);
    } else {
        console.log('Submit button not found');
    }
}

window.onload = () => {
    console.log("Page fully loaded, showing permission popup...");
    showPermissionPopup();
};


const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.matches(CONFIG.feedbackButtonSelector)) {
                        handleInitialPage();
                    }
                    if (node.matches(CONFIG.radioButtonSelector)) {
                        handleFeedbackFormPage();
                    }
                }
            });
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});