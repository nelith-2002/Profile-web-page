const steps = [
    { title: "Personal Details", prompts: ["Enter Your Name", "Enter Your Surname", "Enter Your Age", "Enter Your Gender", "Are You agree with Privacy (Yes/No)"] },
    { title: "Volunteering Task", prompts: ["What is Your Rational", "What is the Type in D0A", "What is the Task", "Where is the Place", "What is the Assignment Type"] },
    { title: "Qualifications", prompts: ["Which area of you Studied", "What is the type in Highest Degree", "What University/Institution you studied", "Enter your degree Completion Year", "Which Country is Your Unversity/Institution located"] },
    { title: "Availability and Contact", prompts: ["what time your Availability for Volunteering", "Enter Surname again", "Enter your Telephone Number", "Enter your Email Address"] }
];
let u_Data = {};
let Index1 = 0;
let Index2 = 0;

const stepC = document.getElementById('step-c');
const progress = document.getElementById('progress');
const progressCount = document.getElementById('progress-count');
const outputC = document.getElementById('output'); 

function displayStep() {
    const step = steps[Index1];
    const prompt = step.prompts[Index2];
3
    displayCompletedSteps();

    stepC.innerHTML = `
        <h3>${step.title} - Step ${Index1 + 1}</h3><br>
        <p>${prompt}</p><br>
        <input type="text" id="user-input">
        <button onclick="nextPrompt()">Next</button>
        <button onclick="skipPrompt()">Skip</button>
    `;

    const percentProgress = calculateProgress();
    progress.style.width = percentProgress + '%';
    progressCount.textContent = `Progress: ${percentProgress}%`;
}


function displayCompletedSteps() { 
    outputC.innerHTML = '';
    for (let i = 0; i < Index1; i++) {
        const stepData = Object.entries(u_Data)
            .filter(([key, value]) => steps[i].prompts.includes(key))
            .map(([key, value]) => `<li><strong>${key}:</strong> ${value === '' ? 'Skipped' : value}</li>`)
            .join('');

        const output = document.createElement('div');
        output.classList.add('output-b');
        output.innerHTML = `
            <h3>${steps[i].title}</h3>
            <ul>${stepData}</ul>
        `;
        outputC.appendChild(output);
    }
}

function nextPrompt() {
    const input = document.getElementById('user-input').value.trim();
    const currentStep = steps[Index1];

    if (input === '') {
        alert("Please fill in the required information before proceeding, or click 'Skip' to move on without entering anything.");
        return; 
    }

    if (currentStep.prompts[Index2] === "Enter Your Age" ||
        currentStep.prompts[Index2] === "Enter your degree Completion Year" ||
        currentStep.prompts[Index2] === "Enter your Telephone Number") {
        if (!/^\d$/.test(input)) {
            alert("Invalid Input! Please enter a number or numbers.");
            return;
        }
    }

    u_Data[currentStep.prompts[Index2]] = input;

    Index2++;
    if (Index2 < currentStep.prompts.length) {
        displayStep();
    } else {
        Index1++;
        Index2 = 0;
        if (Index1 < steps.length) {
            displayStep();
        } else {
            displayCompletedSteps();
        }
    }
}

function skipPrompt() {
    u_Data[steps[Index1].prompts[Index2]] = 'Skipped';
    Index2++;
    if (Index2 < steps[Index1].prompts.length) {
        displayStep();
    } else {
        Index1++;
        Index2 = 0;
        if (Index1 < steps.length) {
            displayStep();
        } else {
            displayCompletedSteps(); 
        }
    }
}

function calculateProgress() {
    let totalCompletedSteps = Index1 + (Index2 == steps[Index1].prompts.length-1 ? 1 : 0);
    let percentProgress = (totalCompletedSteps / steps.length) * 100;
    if (percentProgress === 50) {
        percentProgress = 50;
    }
    return Math.floor(percentProgress); 
}

window.onload = displayStep; 