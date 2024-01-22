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
document.addEventListener("DOMContentLoaded", () => {
    init();
});

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
const video = document.querySelector('video');
const picture = document.querySelector('.shot');

// Navigator video stream
async function videoStream (){
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            video:true,
            audio:false
        });
        // Set video source
        video.srcObject = stream;

        //Take a picture on K press
        document.addEventListener('keypress', e =>{
            // console.log(e.code);
            if(e.code !== 'KeyK') return;
            // Create a Canvas
            const canvas = document.createElement('canvas');
            // Set canvas width and height
            canvas.width = video.width;
            canvas.height = video.height;
            // Draw a new image
            canvas.getContext('2d').drawImage(video, 0,0, video.width, video.height);
            // Take a shot
            let img = canvas.toDataURL('image/png').replace('image/png', 1.0);
            // Set Image src
            picture.src = img;
            // Save image file
            const anchorTag = document.createElement('a');
            anchorTag.href = img;
            anchorTag.download = 'my-image.png';
            document.body.appendChild(anchorTag);
            anchorTag.click();
        });

    }catch(err){
        console.log(err);
    }
}
// Run function
videoStream();