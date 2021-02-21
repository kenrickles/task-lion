const jsSha = require('jssha');

// function to generate a hash for password
function getHash(input) {
  // environment variable to use as a secret word for hashing userId cookie
  // environment variable is currently stored in ~/.profile (see RA module 3.6.4)
  const myEnvVar = process.env.MY_ENV_VAR;

  // create new SHA object
  // eslint-disable-next-line new-cap
  const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });

  // create an unhashed cookie string based on user ID and myEnVar
  const unhashedString = `${input}-${myEnvVar}`;

  // generate a hashed cookie string using SHA object
  shaObj.update(unhashedString);

  return shaObj.getHash('HEX');
}

// creating an array for categories
// object template is { name: <categoryname> }
const categoriesList = [];

const categoriesNames = ['Furniture Assembly', 'Delivery', 'Electrical Repairs', 'Computer Repairs'];
// for loop to push into the array
for (let i = 0; i < categoriesNames.length; i += 1) {
  categoriesList.push({
    name: categoriesNames[i],
  });
}

// array of objects containing users data
const usersList = [
  {
    name: 'Jonny',
    email: 'johnny@gmail.com',
    password: getHash('12345678'),
    phone_number: 12345679,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Jenny',
    email: 'jennyy@gmail.com',
    password: getHash('12345678'),
    phone_number: 12345678,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Jane',
    email: 'jane@gmail.com',
    password: getHash('12345678'),
    phone_number: 91445175,
    created_at: new Date(),
    updated_at: new Date(),
  },

];

const taskersList = [
  {
    name: 'William W.',
    location: 'Singapore',
    description: 'My home is filled with IKEA furniture. I have every tool imaginable. I scored a 90 on my military ASVAB (multi aptitude test). I was handed a stack of jobs almost 2 inches thick when I received my results. I would say I am mechanically inclined.',
    rate: 39,
    vehicle: 'Car',
    num_of_completed_tasks: 30,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Michael Zane',
    location: 'Singapore',
    description: 'Looking forward to completing your project quickly, correctly and affordably. When you select me for your task, you will find that I bring my professional work ethic, enthusiasm & great attitude and skill & proficiency to every job. (Particularly skilled at IKEA assembly.) ',
    rate: 24,
    vehicle: 'Car',
    num_of_completed_tasks: 10,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Trinon C.',
    location: 'Singapore',
    description: 'I’m faster than the rest, I guarantee it. I also own a truck so I can pickup the furniture from the store if needed (ask for details)',
    rate: 45,
    vehicle: 'Pickup Truck',
    num_of_completed_tasks: 120,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Gary M',
    location: 'Singapore',
    description: 'I have 10+ years experience building and installing pool tabes and game room furniture. If it has instructions I can assemble it.',
    rate: 32,
    vehicle: 'Minivan',
    num_of_completed_tasks: 24,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Thomas T',
    location: 'Singapore',
    description: 'As a home owner I have built more furniture products than I can count. I have put together numerous beds, tables, lamps, shelving, chairs, basketball hoops, bicycles, toys; I am very adept at assembly, but I am also able to get done in a timely manner.',
    rate: 30,
    vehicle: 'Car',
    num_of_completed_tasks: 10,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'David H',
    location: 'Singapore',
    description: 'My focus is quality. I never cut corners even when it’s more expensive. Some of competitors are cheaper, but I will take the time to make sure you’re 100% happy',
    rate: 45,
    vehicle: 'Car',
    num_of_completed_tasks: 150,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Howard L.',
    location: 'Singapore',
    description: 'Wood working has always been a hobbie of mine; not only will I assemble and arrange your furniture, but I can also build custom furniture to order!',
    rate: 40,
    vehicle: 'Pickup Truck',
    num_of_completed_tasks: 10,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// export the seed data as a module
module.exports = {
  categoriesList,
  usersList,
  taskersList,
};
