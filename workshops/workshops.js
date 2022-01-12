import { 
    checkAuth, 
    logout,
    fetchWorkshops,
    deleteParticipant
} from '../fetch-utils.js';

import { renderParticipant } from './render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const workshopsListEl = document.querySelector('.workshops-list');

logoutButton.addEventListener('click', () => {
    logout();
});


async function fetchAndDisplayWorkshops() {
    workshopsListEl.textContent = '';
    const workshops = await fetchWorkshops();
    
    for (let workshop of workshops) {
        const workshopEl = document.createElement('div');
        const workshopNameEl = document.createElement('h3');
        const participantsListEl = document.createElement('div');

        workshopEl.classList.add('workshop');
        workshopNameEl.textContent = workshop.name;
        
        for (let participant of workshop.workshop_participants) {
            const participantEl = renderParticipant(participant);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';

            deleteButton.addEventListener('click', async() => {
                await deleteParticipant(participant.id);

                await fetchAndDisplayWorkshops();
            });

            participantEl.append(deleteButton);
            
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

