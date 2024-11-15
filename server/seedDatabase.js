const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Zorg ervoor dat je User model correct is geïmporteerd
const Buyer = require('./models/Buyer'); // Zorg ervoor dat je BuyerProfile model correct is geïmporteerd
const Seller = require('./models/Seller'); // Zorg ervoor dat je SellerProfile model correct is geïmporteerd

// MongoDB verbinding URI
const MONGO_URI = 'mongodb+srv://guusvrv:tmtldCEk4mv5oUuC@setdb.fonny.mongodb.net/SETDB?retryWrites=true&w=majority&appName=SETDB';

// Verbinden met de MongoDB database
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Pad naar de profielfoto's
const profilePicturesDir = path.join(__dirname, 'profile_pictures');
const uploadsDir = path.join(__dirname, 'uploads');

// Functie om een willekeurige profielfoto op te halen
const getRandomProfilePicture = () => {
  const files = fs.readdirSync(profilePicturesDir);
  if (!files.length) throw new Error('Geen profielfoto\'s gevonden in de map profile_pictures');
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const sourcePath = path.join(profilePicturesDir, randomFile);
  const destPath = path.join(uploadsDir, randomFile);

  fs.copyFileSync(sourcePath, destPath);

  return `/uploads/${randomFile}`;
};

// Gebruikers aanmaken (3 buyers, 3 sellers)
const users = [
  {
    name: 'Rik', lastName: 'van der Linde', email: 'rik.vanderlinde@example.com', password: 'password123', role: 'buyer', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Karin', lastName: 'Bakker', email: 'karin.bakker@example.com', password: 'password123', role: 'buyer', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Jan', lastName: 'Hendriks', email: 'jan.hendriks@example.com', password: 'password123', role: 'buyer', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Henk', lastName: 'Janssen', email: 'henk.janssen@example.com', password: 'password123', role: 'seller', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Anja', lastName: 'de Boer', email: 'anja.deboer@example.com', password: 'password123', role: 'seller', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Ria', lastName: 'Koster', email: 'ria.koster@example.com', password: 'password123', role: 'seller', brokerId: '6708f0c20184bb56bb59a29c'
  }
];

// Wachtwoorden hashen
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Gebruikers aanmaken
async function createUsers() {
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      return { ...user, password: hashedPassword };
    })
  );

  const createdUsers = await User.insertMany(hashedUsers);
  return createdUsers;
}

// Profielen voor buyers aanmaken
async function createBuyerProfiles(users) {
  const buyers = [
    {
      user: users[0]._id, // De juiste userId voor de buyer
      profilePicture: getRandomProfilePicture(),
      name: 'Maarten', lastName: 'Vermeer', age: 70, location: 'Drenthe', nationality: 'Dutch',
      introduceYourself: 'I am Maarten, the owner of a sustainable organic herb farm. I am looking for a buyer to continue our commitment to organic herb production.',
      accomplishments: 'Created a successful business in the organic herb industry, focusing on high-quality, sustainable farming.',
      backgroundExperience: 'I’ve been farming herbs for over 40 years, transitioning to organic farming 15 years ago.',
      leadershipStyle: 'I’m a hands-on leader, ensuring that the business stays true to its values of quality, sustainability, and innovation.',
      interests: 'Sustainable farming, herbal medicine, and organic cooking.',
      vision: 'I want the farm to continue thriving and growing its market while upholding the highest standards of sustainability.',
      personalValues: 'Sustainability, innovation, and transparency guide my business decisions.',
      goals: 'I am looking for a buyer who will maintain the integrity of the business and continue to innovate.',
      reasonForBuying: 'I am retiring and want to pass the business to someone who shares my vision.',
      freeTimeActivities: 'Reading, herbal gardening, and traveling.',
      postSaleInvolvement: 'I would like to stay involved in an advisory capacity for a few months after the sale.',
      timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
      typeOfSale: 'Share Sale',
      buyerIndustry: 'Agriculture',
      buyerLocation: 'Drenthe, Netherlands',
      descriptionOfIdealMatch: 'A buyer who shares a passion for organic farming and is committed to growing the business while respecting the environment.',
      filters: [],
      completedPages: []
    },
    {
      user: users[1]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Karin', lastName: 'Bakker', age: 58, location: 'Zeeland', nationality: 'Dutch',
      introduceYourself: 'I am Karin, and I am seeking a business with strong potential in organic farming.',
      accomplishments: 'Experienced in growing and scaling businesses in agriculture.',
      backgroundExperience: 'Worked in sustainable agricultural solutions for over 30 years.',
      leadershipStyle: 'My leadership is based on collaboration and empowering my team to innovate.',
      interests: 'Sustainable agriculture, food systems, and environmental conservation.',
      vision: 'To find and scale sustainable farms that serve the community and the planet.',
      personalValues: 'Environmental stewardship, community, and innovation.',
      goals: 'To expand the reach of sustainable farming practices and help businesses grow in ethical ways.',
      reasonForBuying: 'Looking for the right opportunity to invest in the future of food production.',
      freeTimeActivities: 'Gardening, hiking, and reading environmental books.',
      postSaleInvolvement: 'Would prefer a transition period but open to advice afterward.',
      timeFrame: '6 months',
      typeOfSale: 'Asset Sale',
      buyerIndustry: 'Agriculture',
      buyerLocation: 'Zeeland, Netherlands',
      descriptionOfIdealMatch: 'A company with a deep commitment to sustainability and scalable growth.',
      filters: [],
      completedPages: []
    },
    {
      user: users[2]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Jan', lastName: 'Hendriks', age: 67, location: 'Limburg', nationality: 'Dutch',
      introduceYourself: 'I am Jan, and I am looking for a profitable agriculture business to invest in.',
      accomplishments: 'Managed multiple successful organic farms and agricultural businesses.',
      backgroundExperience: 'Over 40 years in agriculture and organic farming.',
      leadershipStyle: 'Focused on operational efficiency, sustainability, and profit margins.',
      interests: 'Sustainable farming, profit optimization, and community-driven agriculture.',
      vision: 'I aim to increase the profitability and sustainability of the farms I invest in.',
      personalValues: 'Efficiency, profitability, and sustainability.',
      goals: 'To take over a business that can be expanded into new markets.',
      reasonForBuying: 'Retirement savings and a passion for organic farming.',
      freeTimeActivities: 'Fishing, woodwork, and volunteering in the local community.',
      postSaleInvolvement: 'Willing to stay on as a consultant to help with the transition.',
      timeFrame: '12 months',
      typeOfSale: 'Share Sale',
      buyerIndustry: 'Agriculture',
      buyerLocation: 'Limburg, Netherlands',
      descriptionOfIdealMatch: 'A scalable organic farm with opportunities for growth.',
      filters: [],
      completedPages: []
    }
  ];

  await Buyer.insertMany(buyers);
}

// Profielen voor verkopers aanmaken
async function createSellerProfiles(users) {
  const sellers = [
    {
      user: users[3]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Henk', lastName: 'Janssen', age: 64, location: 'Friesland', nationality: 'Dutch',
      introduceYourself: 'I am Henk, selling my dairy farm that has been in the family for generations.',
      accomplishments: 'Successfully ran a family-owned dairy farm for 40 years.',
      backgroundExperience: 'Expert in dairy farming and animal husbandry.',
      leadershipStyle: 'Hands-on, ensuring the team stays focused on quality and productivity.',
      interests: 'Animal welfare, dairy farming, and environmental sustainability.',
      vision: 'To find a buyer who will continue the legacy of quality dairy production.',
      personalValues: 'Hard work, tradition, and quality.',
      goals: 'Retirement and finding a successor to keep the farm running.',
      reasonForSelling: 'Retirement and passing on the farm to a new generation.',
      freeTimeActivities: 'Fishing, hiking, and reading.',
      postSaleInvolvement: 'Available to help with the transition and offer advice.',
      timeFrame: '12 months',
      typeOfSale: 'Asset Sale',
      sellerIndustry: 'Agriculture',
      sellerLocation: 'Friesland, Netherlands',
      descriptionOfIdealMatch: 'A buyer with a passion for dairy farming and a commitment to high-quality production.',
      filters: [],
      completedPages: []
    },
    {
      user: users[4]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Anja', lastName: 'de Boer', age: 55, location: 'Drenthe', nationality: 'Dutch',
      introduceYourself: 'I am Anja, and I am seeking a buyer for my organic vegetable farm.',
      accomplishments: 'Established a strong market presence in organic vegetables.',
      backgroundExperience: 'Over 20 years of experience running organic farms.',
      leadershipStyle: 'Strong team player with a focus on sustainable growth.',
      interests: 'Organic farming, environmental conservation, and holistic food production.',
      vision: 'I want my farm to continue thriving with a buyer who values organic food.',
      personalValues: 'Sustainability, health, and ethical practices.',
      goals: 'To transition my business to a buyer who can continue our mission.',
      reasonForSelling: 'Transition to retirement and new ventures.',
      freeTimeActivities: 'Yoga, sustainable gardening, and reading.',
      postSaleInvolvement: 'Would love to be involved in a limited capacity.',
      timeFrame: '12 months',
      typeOfSale: 'Asset Sale',
      sellerIndustry: 'Agriculture',
      sellerLocation: 'Drenthe, Netherlands',
      descriptionOfIdealMatch: 'A buyer committed to continuing organic farming practices.',
      filters: [],
      completedPages: []
    },
    {
      user: users[5]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Ria', lastName: 'Koster', age: 61, location: 'North Brabant', nationality: 'Dutch',
      introduceYourself: 'I am Ria, selling my farm with a focus on organic grains.',
      accomplishments: 'Ran a successful grain farm with organic certification.',
      backgroundExperience: 'Extensive experience in farming and sustainable practices.',
      leadershipStyle: 'Empowering my team to innovate while adhering to the highest quality standards.',
      interests: 'Sustainable agriculture, organic grains, and local food systems.',
      vision: 'To ensure the farm continues producing the highest-quality organic grains.',
      personalValues: 'Integrity, sustainability, and quality.',
      goals: 'Find a buyer who can grow the farm into a sustainable, thriving business.',
      reasonForSelling: 'I am looking to retire and hand over the farm.',
      freeTimeActivities: 'Cooking, traveling, and hiking.',
      postSaleInvolvement: 'Willing to offer advice and guidance to ensure a smooth transition.',
      timeFrame: '6 months',
      typeOfSale: 'Share Sale',
      sellerIndustry: 'Agriculture',
      sellerLocation: 'North Brabant, Netherlands',
      descriptionOfIdealMatch: 'A buyer with a strong background in agriculture and a commitment to sustainability.',
      filters: [],
      completedPages: []
    }
  ];

  await Seller.insertMany(sellers);
}

// Database creëren
async function createDatabase() {
  try {
    const createdUsers = await createUsers(); // Maak gebruikers aan
    await createBuyerProfiles(createdUsers); // Maak de buyer profielen aan
    await createSellerProfiles(createdUsers); // Maak de seller profielen aan
    console.log('Database successfully populated!');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    mongoose.connection.close();
  }
}

createDatabase();
