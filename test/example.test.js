// IMPORT MODULES under test here:

import { renderParticipant } from '../workshops/render-utils.js';

// import { example } from '../example.js';

const test = QUnit.test;

test('test renderParticipant to see if it returns DOM node', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<div class="participant"><p>Clayton Knapp</p></div>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const participant = { name: 'Clayton Knapp' };
    const actual = renderParticipant(participant);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected, 'given object with name: "Clayton Knapp", successfully returns "<div class="participant"><p>Clayton Knapp</p></div>"');
});
