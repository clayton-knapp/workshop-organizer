import { 
    checkAuth, 
    fetchWorkshops, 
    logout,
    createParticipant
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const participantForm = document.querySelector('#participant-form');
const workshopDropdown = document.querySelector('#workshop-dropdown');
const confirmationEl = document.querySelector('#confirmation');

logoutButton.addEventListener('click', () => {
    logout();
});

// EVENT LISTENERS

//LOAD
window.addEventListener('load', async() => {
    // - dynamically render dropdown for workshops - fetch workshops
    const workshops = await fetchWorkshops();

    for (let workshop of workshops) {
        const optionEl = document.createElement('option');
        optionEl.textContent = workshop.name;
        //make sure to assign option's value as workshop's id
        optionEl.value = workshop.id;
        workshopDropdown.append(optionEl);
    }
});

// SUBMIT FORM
participantForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    // - grab participant name and value from dropdown
    const data = new FormData(participantForm);
    const participantName = data.get('name');
    const workshopID = data.get('workshop-dropdown');

    // - insert in supabase
    const participant = await createParticipant({ name: participantName, workshop_id: workshopID });

    // - send user back to workshops or show confirmation?
    confirmationEl.textContent = `${participant[0].name} has been successfully signed up!`;
    
    
    //reset form
    participantForm.reset();
});
