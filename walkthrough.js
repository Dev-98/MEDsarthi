const onboardingBtn = document.querySelector(".onboarding-btn");
const onboardingContainer = document.querySelector(".onboarding-container");
const onboardingOverlay = document.querySelector(".onboarding-overlay");
const skipBtn = document.querySelector(".onboarding-container .skip-btn");
const steps = document.querySelectorAll(".onboarding-container .step");
const stepsContainer = document.querySelector(".onboarding-container .steps");
const nextBtn = document.querySelector(".onboarding-container .next-btn");
const dots = document.querySelectorAll(".onboarding-container .dot");

let stepPosition = 0;
let currentStep = 0;

const init = () => {
    stepsContainer.style.transition = "unset";
    onboardingContainer.classList.add("active");
    onboardingOverlay.classList.add("active");
    currentStep = 0;
    stepPosition = 0;
    stepsContainer.style.transform = `translateX(-${stepPosition}px)`;

    dots.forEach((d) => {
        d.classList.remove("active");
    });

    dots[currentStep].classList.add("active");

    nextBtn.innerHTML = "Next";
};

// Trigger the onboarding process when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//     init();
// });

onboardingBtn.addEventListener("click", () => {
    init();
});

skipBtn.addEventListener("click", () => {
    onboardingContainer.classList.remove("active");
    onboardingOverlay.classList.remove("active");
});

nextBtn.addEventListener("click", () => {
    stepsContainer.style.transition = "all 400ms ease";
    currentStep++;

    if (currentStep >= steps.length) {
        stepsContainer.style.transition = "unset";
        onboardingContainer.classList.remove("active");
        onboardingOverlay.classList.remove("active");
        currentStep = 0;
    }

    stepPosition += steps[0].offsetWidth;

    stepsContainer.style.transform = `translateX(-${stepPosition}px)`;

    dots.forEach((d) => {
        d.classList.remove("active");
    });

    dots[currentStep].classList.add("active");

    if (currentStep == steps.length - 1) {
        nextBtn.innerHTML = "Finish";
    }
});


// ----X------X------X------X------X------X------
// ----X------X------X------X------X------X------
// ----X------X------X------X------X------X------
// ----X------X------X------X------X------X------
// ----X------X------X------X------X------X------


// Select elemetns
const video = document.querySelector('.video');
const captureButton = document.getElementById('capture');

async function sendImageToAPI(base64Image) {
    try {

        const apiUrl = 'https://testing-5wz7dep6ya-uc.a.run.app/predict';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('API Response:', result);

            sessionStorage.setItem('apiResponse', JSON.stringify(result));
            
            // Log specific information from the API response, adjust accordingly
            if (result && result.uses) {
                console.log('Predictions:', result.predictions);
            }
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Navigator video stream
async function videoStream() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });

        // Set video source
        video.srcObject = stream;

        // Take a picture on button click
        captureButton.addEventListener('click', async () => {
            // Create a Canvas
            // Save data
            cam.style.display = 'none';
            const canvas = document.createElement('canvas');
            // Set canvas width and height
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            // Draw a new image
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            // Take a shot
            const img = canvas.toDataURL('image/png');
            // Log base64 string
            console.log('Base64 Image:', img);
            
            // Send the base64 image to the API
            await sendImageToAPI(img);
            console.log('redirecting to results page');

            window.location.href = 'result.html';
            
    
            // Retrieve da
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

// Run function
videoStream();
