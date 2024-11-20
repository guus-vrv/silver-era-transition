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

const users = [
  {
    name: 'Laura', lastName: 'Jansen', email: 'laura.jansen@example.com', password: 'password123', role: 'buyer', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Tom', lastName: 'Smit', email: 'tom.smit@example.com', password: 'password123', role: 'buyer', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Eva', lastName: 'Visser', email: 'eva.visser@example.com', password: 'password123', role: 'buyer', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Daan', lastName: 'de Vries', email: 'daan.devries@example.com', password: 'password123', role: 'seller', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Isabel', lastName: 'Schouten', email: 'isabel.schouten@example.com', password: 'password123', role: 'seller', brokerId: '6708f0c20184bb56bb59a29c'
  },
  {
    name: 'Pieter', lastName: 'Meijer', email: 'pieter.meijer@example.com', password: 'password123', role: 'seller', brokerId: '6708f0c20184bb56bb59a29c'
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
      user: users[0]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Laura', lastName: 'Jansen', age: 38, location: 'Rotterdam', nationality: 'Dutch',
      businessType: 'Buyer',
      businessInterest: 'Retail Expansion',
      transactionBackground: 'Looking for profitable businesses in the retail sector to acquire.',
      keyGoals: 'Seeking businesses with strong local brand presence and potential for scalability.',
      desiredMarketFit: 'Companies with a proven customer base in the Netherlands, preferably with high-profit margins.',
      previousExperience: '10 years of experience managing retail businesses and scaling brands.',
      industryFocus: 'Retail, especially in lifestyle and consumer goods.',
      idealBusinessCharacteristics: 'Businesses with a recognizable brand, efficient operations, and high revenue potential.',
      investmentBudgetEUR: '2000000',
      buyerType: 'Strategic Buyer',
      reasonForAcquisition: 'Looking to expand my portfolio of businesses and take them to the next level.',
      postAcquisitionInvolvement: 'Willing to stay involved as CEO or in a leadership role.',
      idealPartner: 'I am looking for businesses with strong brand recognition and a solid customer base.',
      timeFrame: '12 months'
    },
    {
      user: users[1]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Tom', lastName: 'Smit', age: 45, location: 'Amsterdam', nationality: 'Dutch',
      businessType: 'Buyer',
      businessInterest: 'Tech Startups',
      transactionBackground: 'Looking to acquire innovative tech startups in need of funding.',
      keyGoals: 'Focus on businesses that are already product-market fit and ready for scaling.',
      desiredMarketFit: 'Strong demand for innovative tech solutions with global expansion potential.',
      previousExperience: '15 years in venture capital, investing in and scaling tech startups.',
      industryFocus: 'Technology, especially in AI, software development, and SaaS.',
      idealBusinessCharacteristics: 'Startups with a working prototype, initial user base, and potential for global growth.',
      investmentBudgetEUR: '5000000',
      buyerType: 'Financial Buyer',
      reasonForAcquisition: 'Seeking to expand my investment portfolio by acquiring high-potential startups.',
      postAcquisitionInvolvement: 'I prefer to remain hands-off but will be available for strategic guidance.',
      idealPartner: 'Looking for tech startups that are ready to scale with the right investment and resources.',
      timeFrame: '6-12 months'
    },
    {
      user: users[2]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Eva', lastName: 'Visser', age: 50, location: 'The Hague', nationality: 'Dutch',
      businessType: 'Buyer',
      businessInterest: 'Sustainability',
      transactionBackground: 'Seeking sustainable businesses to align with my personal values.',
      keyGoals: 'Invest in companies focused on environmental sustainability, circular economy, and green technologies.',
      desiredMarketFit: 'Strong potential for growth in both B2B and B2C markets.',
      previousExperience: 'Over 20 years in sustainable business practices and corporate responsibility roles.',
      industryFocus: 'Sustainability, renewable energy, and eco-friendly products.',
      idealBusinessCharacteristics: 'Businesses with a proven track record of eco-friendly products or services, and a loyal customer base.',
      investmentBudgetEUR: '3000000',
      buyerType: 'Impact Investor',
      reasonForAcquisition: 'Looking to align investments with sustainability and long-term environmental goals.',
      postAcquisitionInvolvement: 'Interested in staying involved as an advisor or board member to help grow the business.',
      idealPartner: 'Looking for businesses that can scale while maintaining environmental integrity.',
      timeFrame: '9-12 months'
    },
  ];

  await Buyer.insertMany(buyers);
}


// Profielen voor verkopers aanmaken
async function createSellerProfiles(users) {
  const sellers = [
    {
      user: users[3]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Daan', lastName: 'de Vries', age: 52, location: 'Groningen', nationality: 'Dutch',
      business: 'Daan’s Construction',
      businessLocation: 'Groningen, Netherlands',
      salesVolumeEUR: '4000000',
      resultEUR: '750000',
      employees: '40',
      shareToBeTransferred: '100%',
      transactionBackground: 'Seeking a buyer to continue growing the business regionally.',
      productMarketFit: 'Strong demand for construction services in the local and regional market.',
      valueProposition: 'Reputation for high-quality work, customer satisfaction, and reliability.',
      profitMargin: '18',
      revenue: '4000000',
      cashflow: '500000',
      customerBase: 'Local governments, commercial property developers, and residential customers.',
      companyCulture: 'Professional, client-focused, and safety-conscious.',
      introduceYourself: `I’m Daan, the owner of a well-established construction company based in Groningen. We specialize in both commercial and residential construction projects, and over the years, we’ve built a strong reputation for delivering projects on time and within budget. I’m looking for a buyer who can take over the business and continue its growth.`,
      accomplishments: `I’ve successfully led the company through significant expansion, establishing a loyal customer base and a robust network of suppliers. Our focus on high-quality work has earned us long-term contracts with key clients, including local governments and large real estate developers.`,
      backgroundExperience: `With over 25 years of experience in the construction industry, I have expertise in project management, site supervision, and team leadership. I’ve overseen projects ranging from residential housing to large commercial developments, ensuring that we meet all client expectations while adhering to industry standards.`,
      leadershipStyle: `I’m a hands-on leader who believes in leading by example. I foster an environment where quality work is expected, and safety is paramount. I encourage open communication and collaboration to ensure that all projects run smoothly from start to finish.`,
      descriptionOfIdealMatch: `I am looking for a buyer who is experienced in the construction industry and can bring fresh ideas to grow the business further. The ideal buyer should have strong financial backing, a commitment to high-quality work, and the ability to maintain our established customer relationships.`,
      interests: 'Construction innovation, architecture, and sustainable building practices.',
      vision: 'To see Daan’s Construction continue to thrive under new ownership.',
      personalValues: 'Integrity, reliability, and client satisfaction.',
      goals: 'Ensuring a smooth transition to new ownership.',
      reasonForSelling: 'Planning to retire and step away from the business.',
      freeTimeActivities: 'Fishing, reading, and traveling.',
      postSaleInvolvement: 'Willing to assist during the transition period.',
      timeFrame: '6 months',
      typeOfSale: 'Asset Sale',
      sellerIndustry: 'Construction',
      sellerLocation: 'Groningen, Netherlands'
    },
    {
      user: users[4]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Isabel', lastName: 'Schouten', age: 40, location: 'Utrecht', nationality: 'Dutch',
      business: 'GreenTech Solutions',
      businessLocation: 'Utrecht, Netherlands',
      salesVolumeEUR: '1500000',
      resultEUR: '300000',
      employees: '10',
      shareToBeTransferred: '60%',
      transactionBackground: 'Looking for a strategic partner to accelerate product development.',
      productMarketFit: 'High demand for clean-tech solutions in energy and sustainability.',
      valueProposition: 'Developing cutting-edge technology to reduce energy consumption.',
      profitMargin: '25',
      revenue: '1500000',
      cashflow: '350000',
      customerBase: 'Government contracts, sustainable companies, and eco-conscious consumers.',
      companyCulture: 'Innovative, forward-thinking, and sustainability-driven.',
      introduceYourself: `I’m Isabel, the founder of GreenTech Solutions, a company committed to creating sustainable energy solutions. Our flagship product has been adopted by numerous businesses and government entities looking to reduce their carbon footprint. We’re now seeking a strategic partner to help us scale and expand our product line.`,
      accomplishments: `I developed a groundbreaking energy-saving product that is making a real impact in both private and public sectors. Through partnerships and product adoption, we’ve built a solid base of customers who are passionate about sustainable energy solutions.`,
      backgroundExperience: `With a background in engineering and business, I’ve led GreenTech Solutions through its early stages of product development and market entry. My experience includes raising capital, managing product R&D, and overseeing a small team of engineers and sales professionals.`,
      leadershipStyle: `I lead with a strong vision for the future and foster a culture of collaboration and innovation. I believe in empowering my team to think outside the box and pursue new ideas that will help us create sustainable solutions that meet the needs of our customers.`,
      descriptionOfIdealMatch: `I’m looking for a partner who shares my passion for clean energy and sustainability. The ideal partner will have experience in scaling tech companies and bringing innovative products to market. Together, we can take GreenTech Solutions to the next level and make a significant impact in the global market.`,
      interests: 'Renewable energy, clean technology, and environmental activism.',
      vision: 'To expand GreenTech Solutions globally and revolutionize the energy sector.',
      personalValues: 'Sustainability, innovation, and integrity.',
      goals: 'To scale our product offerings and impact as many industries as possible.',
      reasonForSelling: 'Looking for a partner to accelerate growth and development.',
      freeTimeActivities: 'Cycling, cooking, and volunteering for environmental causes.',
      postSaleInvolvement: 'Willing to stay involved as a product development advisor.',
      timeFrame: '9 months',
      typeOfSale: 'Share Sale',
      sellerIndustry: 'CleanTech',
      sellerLocation: 'Utrecht, Netherlands'
    },
    {
      user: users[5]._id,
      profilePicture: getRandomProfilePicture(),
      name: 'Pieter', lastName: 'Meijer', age: 60, location: 'Leiden', nationality: 'Dutch',
      business: 'Pieter’s Logistics',
      businessLocation: 'Leiden, Netherlands',
      salesVolumeEUR: '6000000',
      resultEUR: '1200000',
      employees: '50',
      shareToBeTransferred: '80%',
      transactionBackground: 'Looking for a buyer to take over logistics operations.',
      productMarketFit: 'Strong demand for efficient logistics and supply chain solutions.',
      valueProposition: 'Offering efficient logistics with a customer-centric approach.',
      profitMargin: '15',
      revenue: '6000000',
      cashflow: '1200000',
      customerBase: 'Large retail chains, manufacturers, and wholesalers.',
      companyCulture: 'Reliable, service-oriented, and results-driven.',
      introduceYourself: `I’m Pieter, the founder of a logistics company offering transportation, warehousing, and distribution services. Over the years, we have built a reputation for being reliable and customer-focused. I’m looking for a buyer who can take over the business and continue its growth in the logistics sector.`,
      accomplishments: `I’ve built a trusted logistics company from the ground up, establishing strong relationships with key players in retail and manufacturing. Our network of warehouses and fleet of vehicles allows us to offer customized services to meet the needs of our clients.`,
      backgroundExperience: `With over 30 years of experience in the logistics industry, I have managed operations in transportation, warehousing, and supply chain management. My team and I have worked hard to build efficient processes and ensure that our customers receive the highest level of service.`,
      leadershipStyle: `My leadership style is hands-on and focused on delivering results. I value customer satisfaction and believe in leading by example. I encourage my team to be proactive and maintain high standards in everything we do.`,
      descriptionOfIdealMatch: `I am looking for a buyer with experience in logistics or supply chain management who can take the business to the next level. The ideal buyer will have strong management skills, financial resources, and a commitment to maintaining the high standards of customer service we’ve built.`,
      interests: 'Logistics innovation, transportation efficiency, and supply chain management.',
      vision: 'To see Pieter’s Logistics grow into a leading logistics provider in Europe.',
      personalValues: 'Reliability, efficiency, and customer satisfaction.',
      goals: 'To ensure a smooth transition and continued growth for the company.',
      reasonForSelling: 'Looking to retire and step away from the business.',
      freeTimeActivities: 'Golfing, reading, and spending time with family.',
      postSaleInvolvement: 'Willing to provide operational support during the transition.',
      timeFrame: '12 months',
      typeOfSale: 'Asset Sale',
      sellerIndustry: 'Logistics',
      sellerLocation: 'Leiden, Netherlands'
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
