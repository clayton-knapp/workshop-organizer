export function renderParticipant(participant) {
    const participantEl = document.createElement('div');
    const participantName = document.createElement('p');
            
    participantName.textContent = participant.name;
    participantEl.classList.add('participant');

    participantEl.append(participantName);

    return participantEl;
}