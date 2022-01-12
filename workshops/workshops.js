import { 
    checkAuth, 
    logout,
    fetchWorkshops 
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const workshopsListEl = document.querySelector('.workshops-list');

logoutButton.addEventListener('click', () => {
    logout();
});

async function fetchAndDisplayWorkshops() {
    const workshops = await fetchWorkshops();
    
    for (let workshop of workshops) {
        const workshopEl = document.createElement('div');
        const workshopNameEl = document.createElement('h3');
        const participantsListEl = document.createElement('div');

        workshopEl.classList.add('workshop');
        workshopNameEl.textContent = workshop.name;
        
        for (let participant of workshop.workshop_participants) {
            const participantEl = document.createElement('div');
            const participantName = document.createElement('p');
            const deleteButton = document.createElement('button');
            
            participantName.textContent = participant.name;
            participantEl.classList.add('participant');

            deleteButton.textContent = 'Delete';

            deleteButton.addEventListener('click', async() => {
                
            })

            participantEl.append(participantName, deleteButton);
            
            participantsListEl.append(participantEl);
        }
        
        workshopEl.append(workshopNameEl, participantsListEl);

        workshopsListEl.append(workshopEl);
    }
    
}

// EVENT LISTENERS

window.addEventListener('load', async() => {
    // - fetch and display workshops and participants from supabase
    await fetchAndDisplayWorkshops();

});

