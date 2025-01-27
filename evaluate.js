const fs = require('fs');
const assert = require('assert');

// Check if the cards.json file exists
if (!fs.existsSync('cards.json')) {
  console.error('cards.json file is missing.');
  process.exit(1);  // Exit with error if cards.json is missing
} else {
  console.log('cards.json file exists.');
}

// Read the contents of the cards.json file
const cardsData = JSON.parse(fs.readFileSync('cards.json', 'utf-8'));

// Validate the structure of the JSON data
try {
  assert(Array.isArray(cardsData), 'cards.json must be an array');
  console.log('cards.json is an array.');

  cardsData.forEach(card => {
    assert(card.hasOwnProperty('id'), 'Each card must have an "id" property');
    assert(card.hasOwnProperty('pair'), 'Each card must have a "pair" property');
    assert(card.hasOwnProperty('img'), 'Each card must have an "img" property');
    assert(typeof card.id === 'number', 'The "id" property must be a number');
    assert(typeof card.pair === 'string', 'The "pair" property must be a string');
    assert(typeof card.img === 'string', 'The "img" property must be a string');
    assert(fs.existsSync(card.img), `Image file ${card.img} does not exist`);
  });

  console.log('All cards in cards.json are valid.');
} catch (error) {
  console.error('Validation error:', error.message);
  process.exit(1);  // Exit with error if validation fails
}

// End the script
process.exit(0);  // Success
