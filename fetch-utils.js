const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTk0MzkyNSwiZXhwIjoxOTU3NTE5OTI1fQ.dMDJyeCZHko9Vr6qrLp-UfzKQF3xQowPC6N4NhcuHMA';
const SUPABASE_URL = 'https://dndlkewbungoynpztwzf.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// FETCH WORKSHOPS
export async function fetchWorkshops() {
    const response = await client
        .from('workshops')
        .select('*, workshop_participants (*)');

    return checkError(response);
}

// CREATE PARTICIPANT
export async function createParticipant(participant) {
    const response = await client
        .from('workshop_participants')
        .insert(participant);

    return checkError(response);
}

// DELETE PARTICIPANT
export async function deleteParticipant(id) {
    const response = await client
        .from('workshop_participants')
        .delete()
        .match({ id: id });

    return checkError(response);
}


// TEMPLATE AUTH FUNCTIONS
export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
