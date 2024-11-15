const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
const fs = require('fs');
const Seller = require('./models/Seller');
const Buyer = require('./models/Buyer');

// Verbind met de MongoDB database
mongoose.connect('mongodb+srv://guusvrv:tmtldCEk4mv5oUuC@setdb.fonny.mongodb.net/SETDB?retryWrites=true&w=majority&appName=SETDB', { useNewUrlParser: true, useUnifiedTopology: true });

const profilePicturesDir = path.join(__dirname, 'profile_pictures');
const uploadsDir = path.join(__dirname, 'uploads');


const getRandomProfilePicture = () => {
  const files = fs.readdirSync(profilePicturesDir);
  if (!files.length) throw new Error('Geen profielfoto\'s gevonden in de map profile_pictures');
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const sourcePath = path.join(profilePicturesDir, randomFile);
  const destPath = path.join(uploadsDir, randomFile);

  fs.copyFileSync(sourcePath, destPath);

  return `/uploads/${randomFile}`;
};


(async () => {
  // 3 Brokers met hardcoded gegevens
  const brokersData = [
    { firstName: 'Jan', lastName: 'Van Meer', role: 'broker' },
    { firstName: 'Kees', lastName: 'Van Steen', role: 'broker' },
    { firstName: 'Henk', lastName: 'Van Dijk', role: 'broker' }
  ];

  // Maak Brokers aan
  const brokers = [];
  for (const brokerData of brokersData) {
    const broker = new User({
      name: `${brokerData.firstName} ${brokerData.lastName}`,
      email: `${brokerData.firstName.toLowerCase()}.${brokerData.lastName.toLowerCase()}@example.com`,
      password: 'hashed_password',  // Voeg hier een echte gehashte wachtwoord toe
      role: brokerData.role
    });
    await broker.save();
    brokers.push(broker);
  }

  // 10 Sellers met unieke informatie
  const sellersData = [
    {
      name: 'Willem', lastName: 'van den Berg', age: 67, location: 'Rotterdam', nationality: 'Dutch',
      introduceYourself: 'I am Willem, the proud owner of Van den Berg Greenhouses. My goal is to pass the torch to a buyer who values sustainable farming.',
      accomplishments: 'Expanded my greenhouse business by 50%, incorporating green technologies, and securing contracts with top supermarkets.',
      backgroundExperience: 'I have over 40 years of experience in farming, specializing in sustainable agricultural practices. I took over the business from my father in the early 80s.',
      leadershipStyle: 'I lead with a hands-on approach, focusing on employee development and creating a culture of sustainability.',
      interests: 'Outside of farming, I enjoy reading about new farming technologies and spending time in nature.',
      vision: 'I see the business growing with a focus on cutting-edge green technology, allowing it to expand internationally.',
      businessModelCanvas: 'Sustainable greenhouse farming, direct B2B sales, and retail partnerships.',
      personalValues: 'Sustainability, transparency, and a deep respect for nature are core to my values.',
      goals: 'I want to ensure a smooth transition to a buyer who can keep the business sustainable and profitable.',
      reasonForSelling: 'I am approaching retirement and want to hand over the business to someone who shares my values.',
      freeTimeActivities: 'I enjoy cycling through the countryside and spending time with my grandchildren.',
      postSaleInvolvement: 'I am happy to stay involved for 6 months to ensure a smooth transition.',
      timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
      typeOfSale: 'Asset Sale',
      sellerIndustry: 'Agriculture',
      sellerLocation: 'Rotterdam, Netherlands',
      descriptionOfIdealMatch: 'Someone who values sustainability and can bring new ideas for growth.',
      filters: [],
      completedPages: []
    },
    {
      name: 'Hans', lastName: 'Jansen', age: 55, location: 'Amsterdam', nationality: 'Dutch',
      introduceYourself: 'I am Hans Jansen, and I’ve been managing a family-owned mushroom farm for over 30 years. I’m looking to pass it on to the right buyer.',
      accomplishments: 'Increased production by 60%, developed new product lines, and secured contracts with large grocery chains in the Netherlands.',
      backgroundExperience: 'I grew up in farming, took over the family mushroom farm at 30, and turned it into one of the largest producers in the region.',
      leadershipStyle: 'I am a results-driven leader who focuses on innovation and efficiency. My leadership is characterized by setting clear goals and mentoring employees.',
      interests: 'In my spare time, I enjoy hiking and reading about new farming technologies. I am also involved in community projects promoting sustainable agriculture.',
      vision: 'My vision is for the mushroom farm to expand internationally while maintaining our high-quality standards.',
      businessModelCanvas: 'Farming',
      personalValues: 'Integrity, sustainability, and hard work are core to my values. I believe in giving back to the community.',
      goals: 'I am looking for someone who can carry on the business while improving its profitability and market reach.',
      reasonForSelling: 'I have no heirs interested in continuing the business and would like to retire and focus on personal projects.',
      freeTimeActivities: 'Hiking, reading, community work',
      postSaleInvolvement: 'None',
      timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
      typeOfSale: 'Asset Sale',
      sellerIndustry: 'Agriculture',
      sellerLocation: 'Amsterdam, Netherlands',
      descriptionOfIdealMatch: 'The ideal buyer should have experience in farming, be willing to invest in growth, and value long-term sustainability.',
      filters: [],
      completedPages: []
    },
    {
      name: 'Sophie', lastName: 'de Vries', age: 62, location: 'Groningen', nationality: 'Dutch',
      introduceYourself: 'I am Sophie, the owner of a family-run organic dairy farm in the heart of Friesland. I’m looking for a buyer who shares my vision for high-quality dairy production.',
      accomplishments: 'Introduced organic farming methods and built a loyal customer base among local markets and high-end restaurants.',
      backgroundExperience: 'I have worked in the dairy farming business for over 40 years and transitioned my family farm to an organic model 15 years ago.',
      leadershipStyle: 'My leadership focuses on ethical business practices, transparency, and community involvement.',
      interests: 'I am passionate about sustainable agriculture and enjoy attending farming conferences and workshops.',
      vision: 'I hope to see the farm grow while maintaining our high standards of sustainability and product quality.',
      businessModelCanvas: 'Organic dairy farming, direct-to-consumer sales, and wholesale to premium markets.',
      personalValues: 'Integrity, sustainability, and a commitment to the environment guide my decisions.',
      goals: 'I want to find a buyer who can continue to operate the farm while expanding the market reach of our organic products.',
      reasonForSelling: 'I am looking to retire and spend more time with my family.',
      freeTimeActivities: 'I love gardening and spending time in nature.',
      postSaleInvolvement: 'I would like to stay involved in the business for the first few months to help with the transition.',
      timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
      typeOfSale: 'Share Sale',
      sellerIndustry: 'Agriculture',
      sellerLocation: 'Groningen, Netherlands',
      descriptionOfIdealMatch: 'Someone passionate about organic farming and dedicated to growing the business responsibly.',
      filters: [],
      completedPages: []
    },
    // Voeg hier de overige 7 sellers toe met unieke gegevens
    // ...

    {
         name: 'Henk', lastName: 'Janssen', age: 64, location: 'Friesland', nationality: 'Dutch',
        introduceYourself: 'I am Henk, the owner of a family-run organic vegetable farm in Friesland. I’m seeking a buyer who can continue to uphold our high standards in organic farming.',
        accomplishments: 'Started the transition to organic farming 20 years ago and built strong relationships with local retailers and restaurants.',
        backgroundExperience: 'I have over 40 years of experience in vegetable farming, with the last 20 years dedicated to organic practices.',
        leadershipStyle: 'I value teamwork, fairness, and transparency in all business decisions. My leadership is built on trust and long-term relationships.',
        interests: 'I am passionate about sustainable farming and enjoy mentoring young farmers in the organic agriculture field.',
        vision: 'I want to see the farm continue to grow and supply high-quality organic produce to both local and international markets.',
        businessModelCanvas: 'Organic vegetable farming, direct-to-consumer sales, and partnerships with local retailers.',
        personalValues: 'Sustainability, community, and quality of life for our workers are the core values of my business.',
        goals: 'I’m looking for a buyer who can take over and grow the farm while preserving our focus on sustainability and quality.',
        reasonForSelling: 'I want to retire and pass on the legacy of the farm to someone who shares my values.',
        freeTimeActivities: 'I enjoy fishing, gardening, and spending time with my grandchildren.',
        postSaleInvolvement: 'I would like to stay involved in the farm for a few months to ensure a smooth transition.',
        timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
        typeOfSale: 'Share Sale',
        sellerIndustry: 'Agriculture',
        sellerLocation: 'Friesland, Netherlands',
        descriptionOfIdealMatch: 'A buyer who is committed to organic farming and has a long-term vision for growth.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Karin', lastName: 'Bakker', age: 58, location: 'Zeeland', nationality: 'Dutch',
        introduceYourself: 'I am Karin, the owner of a well-established organic flower farm. I am looking for a buyer to help expand the farm into new markets and take it to the next level.',
        accomplishments: 'Built a successful flower business from the ground up with a focus on sustainability and ethical practices.',
        backgroundExperience: 'I have been growing flowers for over 35 years, transitioning to organic practices 10 years ago to meet growing market demand.',
        leadershipStyle: 'My leadership is hands-on, collaborative, and focused on creating a positive work environment for everyone on the farm.',
        interests: 'I’m deeply interested in the environmental impact of the flower industry and passionate about developing eco-friendly farming techniques.',
        vision: 'I hope to see the farm grow by expanding into new markets and offering our high-quality organic flowers to more people.',
        businessModelCanvas: 'Organic flower farming, wholesale distribution to florists and events, direct-to-consumer sales.',
        personalValues: 'Integrity, environmental responsibility, and quality craftsmanship are my guiding principles.',
        goals: 'I would like to find a buyer who can continue my work and help grow the farm while staying true to the values of sustainability and quality.',
        reasonForSelling: 'I want to retire and spend more time on my personal interests, but I want to ensure the farm’s legacy continues.',
        freeTimeActivities: 'Gardening, attending flower shows, and volunteering in my community.',
        postSaleInvolvement: 'I am happy to assist with the transition for a few months to ensure continuity in operations.',
        timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
        typeOfSale: 'Share Sale',
        sellerIndustry: 'Agriculture',
        sellerLocation: 'Zeeland, Netherlands',
        descriptionOfIdealMatch: 'Someone who understands the challenges and rewards of organic farming and is committed to sustainability.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Jan', lastName: 'Hendriks', age: 67, location: 'Limburg', nationality: 'Dutch',
        introduceYourself: 'I am Jan, the owner of a mixed organic farm producing both crops and livestock. I’m looking for a buyer who values sustainable farming and can continue my legacy.',
        accomplishments: 'Over 40 years of farming experience, transitioning to organic methods 15 years ago and building a loyal customer base.',
        backgroundExperience: 'I’ve been farming for more than 40 years, and my focus has been on integrating crops with livestock in a sustainable and organic way.',
        leadershipStyle: 'I lead with integrity, believing in transparency and ethical practices across all areas of the business.',
        interests: 'Sustainable agriculture, wildlife conservation, and participating in local farming associations.',
        vision: 'I aim to see the farm grow into a more diverse operation with a stronger market presence both locally and internationally.',
        businessModelCanvas: 'Organic crop and livestock farming, direct sales, and partnerships with organic grocery stores.',
        personalValues: 'Sustainability, responsibility, and fairness guide all of my business decisions.',
        goals: 'I want to find a buyer who shares my passion for sustainable farming and will continue to develop the farm for future generations.',
        reasonForSelling: 'I am retiring and want to pass on the farm to someone who shares my values and can carry it forward.',
        freeTimeActivities: 'Traveling, fishing, and attending farming conferences.',
        postSaleInvolvement: 'I would be happy to offer my expertise and advice for the first few months after the sale.',
        timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
        typeOfSale: 'Share Sale',
        sellerIndustry: 'Agriculture',
        sellerLocation: 'Limburg, Netherlands',
        descriptionOfIdealMatch: 'A buyer who understands both crop and livestock farming, with a commitment to sustainability and long-term growth.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Anja', lastName: 'de Boer', age: 55, location: 'Drenthe', nationality: 'Dutch',
        introduceYourself: 'I am Anja, a third-generation farmer transitioning my farm to organic practices. I’m looking for a buyer who can take over and continue the growth of the business.',
        accomplishments: 'Successfully transitioned my farm to organic practices and created a strong reputation in the local organic market.',
        backgroundExperience: 'I’ve worked in farming for over 30 years, transitioning to organic farming practices 5 years ago.',
        leadershipStyle: 'I believe in fair and transparent leadership and have created a strong, supportive team that works well together.',
        interests: 'I am passionate about sustainable farming practices and enjoy mentoring young farmers.',
        vision: 'I want the farm to continue growing, expanding its market share in organic products while maintaining the highest sustainability standards.',
        businessModelCanvas: 'Organic vegetable and fruit farming, direct-to-consumer sales, and local wholesale distribution.',
        personalValues: 'Sustainability, family, and ethical practices are at the heart of everything I do.',
        goals: 'I’m looking for a buyer who can take over and expand the farm while staying committed to sustainable farming practices.',
        reasonForSelling: 'I’m looking to retire and want to find someone who shares my values to continue my work.',
        freeTimeActivities: 'Spending time with my family, gardening, and attending organic farming workshops.',
        postSaleInvolvement: 'I would like to stay involved for a few months to ensure a smooth transition.',
        timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
        typeOfSale: 'Share Sale',
        sellerIndustry: 'Agriculture',
        sellerLocation: 'Drenthe, Netherlands',
        descriptionOfIdealMatch: 'Someone who is passionate about organic farming and committed to sustainable practices.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Ria', lastName: 'Koster', age: 61, location: 'North Brabant', nationality: 'Dutch',
        introduceYourself: 'I am Ria, the owner of a sustainable fishery. I’m looking for a buyer who can carry on the operations and maintain our high standards of quality.',
        accomplishments: 'Built a sustainable fishery from the ground up, focusing on responsible sourcing and high-quality produce.',
        backgroundExperience: 'With 35 years of experience in the fishery industry, I have worked to create a business that values sustainability and quality.',
        leadershipStyle: 'My leadership is focused on ethical decision-making and fostering long-term partnerships with local suppliers.',
        interests: 'Sustainable fisheries, marine conservation, and culinary arts.',
        vision: 'I hope to see the fishery grow and expand while staying true to our commitment to sustainability and ethical fishing practices.',
        businessModelCanvas: 'Sustainable fishery, direct-to-consumer sales, and partnerships with local restaurants.',
        personalValues: 'Sustainability, responsibility, and quality are the cornerstones of my business.',
        goals: 'I’m looking for a buyer who understands the importance of sustainability and is interested in continuing the fishery’s legacy.',
        reasonForSelling: 'I am looking to retire and spend more time with my family.',
        freeTimeActivities: 'Cooking, boating, and participating in local environmental advocacy groups.',
        postSaleInvolvement: 'I would like to stay involved in the business for the first few months to assist with the transition.',
        timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
        typeOfSale: 'Share Sale',
        sellerIndustry: 'Agriculture',
        sellerLocation: 'North Brabant, Netherlands',
        descriptionOfIdealMatch: 'A buyer who values sustainability and responsible fishing practices.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Maarten', lastName: 'Vermeer', age: 70, location: 'Drenthe', nationality: 'Dutch',
        introduceYourself: 'I am Maarten, the owner of a sustainable organic herb farm. I am looking for a buyer to continue our commitment to organic herb production.',
        accomplishments: 'Created a successful business in the organic herb industry, focusing on high-quality, sustainable farming.',
        backgroundExperience: 'I’ve been farming herbs for over 40 years, transitioning to organic farming 15 years ago.',
        leadershipStyle: 'I’m a hands-on leader, ensuring that the business stays true to its values of quality, sustainability, and innovation.',
        interests: 'Sustainable farming, herbal medicine, and organic cooking.',
        vision: 'I want the farm to continue thriving and growing its market while upholding the highest standards of sustainability.',
        businessModelCanvas: 'Organic herb farming, direct-to-consumer sales, and partnerships with health food stores.',
        personalValues: 'Sustainability, innovation, and transparency guide my business decisions.',
        goals: 'I am looking for a buyer who will maintain the integrity of the business and continue to innovate.',
        reasonForSelling: 'I am retiring and want to pass the business to someone who shares my vision.',
        freeTimeActivities: 'Reading, herbal gardening, and traveling.',
        postSaleInvolvement: 'I would like to stay involved in an advisory capacity for a few months after the sale.',
        timeFrame: ['3 months', '6 months', '12 months', '2 years', '3 years'][Math.floor(Math.random() * 5)],
        typeOfSale: 'Share Sale',
        sellerIndustry: 'Agriculture',
        sellerLocation: 'Drenthe, Netherlands',
        descriptionOfIdealMatch: 'A buyer who shares a passion for organic farming and is committed to growing the business while respecting the environment.',
        filters: [],
        completedPages: []
      }


  ];

  // Maak Sellers aan met de gegevens
  const sellers = [];
  for (const sellerData of sellersData) {
    const broker = brokers[Math.floor(Math.random() * brokers.length)];
    const seller = new Seller({
      user: broker._id,
      profilePicture: getRandomProfilePicture(),
      ...sellerData
    });
    await seller.save();
    sellers.push(seller);
  }

  // 10 Buyers met unieke informatie
  const buyersData = [
    {
      name: 'Rik', lastName: 'van der Linde', age: 45, location: 'Utrecht', nationality: 'Dutch',
      introduceYourself: 'I’m Rik, a seasoned entrepreneur looking to acquire businesses with strong growth potential. I’m particularly interested in sustainable agriculture.',
      accomplishments: 'Successfully acquired and grew multiple tech startups, focusing on data-driven business models and long-term growth strategies.',
      backgroundExperience: 'I have a background in business development and have worked with various companies across Europe. My expertise is in scaling operations efficiently.',
      leadershipStyle: 'My leadership is data-driven, focusing on clear KPIs and a growth mindset. I empower teams by focusing on results and long-term vision.',
      interests: 'Technology, business development, sustainability, and hiking.',
      vision: 'I see vast potential in the sustainable agriculture sector, and I plan to expand the business internationally while improving production processes.',
      personalValues: 'I believe in integrity, transparency, and sustainable growth.',
      goals: 'My goal is to help businesses scale, invest in innovation, and bring about significant positive change.',
      reasonForBuying: 'I am looking for a profitable business in the agriculture sector with high scalability potential.',
      freeTimeActivities: 'Hiking, reading about business innovations, and volunteering.',
      filters: [],
      completedPages: []
    },
      {
        name: 'Tom', lastName: 'Jansen', age: 40, location: 'Rotterdam', nationality: 'Dutch',
        introduceYourself: 'I’m Tom, a serial entrepreneur with a passion for technology and sustainable businesses. I’m actively seeking opportunities in the agriculture sector.',
        accomplishments: 'Successfully built and sold several tech startups, now focusing on investing in agriculture with a focus on sustainability.',
        backgroundExperience: 'I have 15 years of experience in scaling startups in Europe, focusing on innovative solutions in tech and sustainable business models.',
        leadershipStyle: 'My leadership approach is data-driven, with a focus on operational efficiency and a growth-oriented mindset.',
        interests: 'Sustainability, technology, startups, and traveling.',
        vision: 'I see a huge opportunity in integrating technology into the sustainable agriculture space to drive international expansion.',
        personalValues: 'Integrity, transparency, and a focus on scalability.',
        goals: 'My goal is to scale businesses internationally while implementing new technologies to increase efficiency and sustainability.',
        reasonForBuying: 'I’m looking for businesses that have strong growth potential and can scale internationally, particularly in sustainable agriculture.',
        freeTimeActivities: 'Traveling, attending tech conferences, and exploring nature.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Eva', lastName: 'de Wit', age: 42, location: 'Amsterdam', nationality: 'Dutch',
        introduceYourself: 'I’m Eva, a business investor with a strong focus on eco-friendly and sustainable business practices. I’m looking to acquire companies in the agriculture sector with potential for high returns.',
        accomplishments: 'Invested in and scaled several sustainable businesses in tech, focusing on renewable energy and sustainable food production.',
        backgroundExperience: 'I have a background in finance and investment management, with over 18 years of experience in scaling businesses in the sustainability space.',
        leadershipStyle: 'I am a hands-on leader, focusing on long-term value creation and innovation, with a clear vision for the future.',
        interests: 'Eco-friendly innovations, sustainability, entrepreneurship, and reading.',
        vision: 'I want to grow businesses that have a positive environmental impact while ensuring profitability and international expansion.',
        personalValues: 'Sustainability, ethics, and long-term impact are key values I prioritize in every business I invest in.',
        goals: 'My goal is to help businesses reach their full potential by driving innovation and growth while maintaining strong sustainability practices.',
        reasonForBuying: 'I’m looking to acquire businesses that are well-positioned for growth and align with my values in sustainability.',
        freeTimeActivities: 'Yoga, reading, and traveling.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Lucas', lastName: 'Mulder', age: 47, location: 'Den Haag', nationality: 'Dutch',
        introduceYourself: 'I’m Lucas, a business developer focused on sustainable industries. I’m looking to invest in businesses within the agriculture sector that have a strong international expansion potential.',
        accomplishments: 'Successfully scaled several businesses in the renewable energy and food industries, increasing profitability while staying true to sustainable practices.',
        backgroundExperience: 'With a background in both business development and sustainability, I have over 20 years of experience in growing international businesses.',
        leadershipStyle: 'I focus on creating data-driven strategies and empowering teams to innovate while keeping an eye on sustainable growth.',
        interests: 'Sustainability, business strategy, traveling, and cycling.',
        vision: 'I believe in the future of sustainable agriculture, and I’m committed to helping businesses grow on a global scale.',
        personalValues: 'Sustainability, innovation, and transparency guide my decision-making process.',
        goals: 'My goal is to acquire businesses that have scalability and can expand into new markets while maintaining their sustainable practices.',
        reasonForBuying: 'I am interested in businesses that are committed to innovation and growth in the sustainable agriculture sector.',
        freeTimeActivities: 'Cycling, reading about innovation, and spending time with my family.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Fleur', lastName: 'Bakker', age: 38, location: 'Utrecht', nationality: 'Dutch',
        introduceYourself: 'I’m Fleur, a strategic investor in businesses that focus on both sustainability and profitability. I’m interested in the agriculture sector, particularly businesses that are well-positioned for international growth.',
        accomplishments: 'I have built and grown several successful businesses in the tech and sustainability sectors, with a focus on renewable resources and eco-friendly production.',
        backgroundExperience: 'With 15 years of experience in business management and development, I have been at the forefront of scaling sustainable businesses in Europe.',
        leadershipStyle: 'I am a hands-on leader who focuses on efficiency, growth, and fostering innovation within teams.',
        interests: 'Sustainability, global business strategy, hiking, and reading.',
        vision: 'I aim to grow sustainable agriculture businesses that can become global leaders in their industries.',
        personalValues: 'I value transparency, integrity, and ethical practices in every business venture.',
        goals: 'I’m looking to expand my portfolio in sustainable agriculture and help businesses scale in international markets.',
        reasonForBuying: 'I’m seeking opportunities to invest in scalable businesses with strong growth potential, especially in sustainable sectors.',
        freeTimeActivities: 'Hiking, reading, and exploring new technologies.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Mia', lastName: 'Hendriks', age: 50, location: 'Rotterdam', nationality: 'Dutch',
        introduceYourself: 'I’m Mia, a business strategist with a focus on sustainable industries. I’m looking for opportunities in the agriculture sector that offer scalability and innovation.',
        accomplishments: 'Built and sold multiple businesses in the renewable energy sector and now looking to invest in sustainable farming businesses.',
        backgroundExperience: 'I have 25 years of experience in business development and management, focusing on renewable energy and now expanding into agriculture.',
        leadershipStyle: 'My leadership style focuses on efficiency, fostering innovation, and creating long-term sustainable growth.',
        interests: 'Sustainability, renewable energy, business scaling, and cooking.',
        vision: 'I believe sustainable agriculture is a critical part of the future, and I’m dedicated to helping businesses grow responsibly.',
        personalValues: 'Sustainability, responsibility, and ethical leadership are key to my business approach.',
        goals: 'My goal is to help businesses scale internationally while implementing sustainable practices and driving growth.',
        reasonForBuying: 'I want to acquire a business in the agriculture sector that has high potential for international scaling.',
        freeTimeActivities: 'Cooking, cycling, and attending sustainability events.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Jan', lastName: 'Haas', age: 46, location: 'Groningen', nationality: 'Dutch',
        introduceYourself: 'I’m Jan, a seasoned investor focused on growing sustainable businesses. I’m actively looking for acquisition opportunities in the agriculture sector with strong growth potential.',
        accomplishments: 'Successfully acquired and managed a diverse range of businesses in the tech and sustainability sectors.',
        backgroundExperience: 'With over 20 years in business management, I specialize in scaling companies in high-growth industries.',
        leadershipStyle: 'I am a strategic leader who emphasizes innovation, data-driven decision-making, and long-term vision.',
        interests: 'Technology, sustainability, international business, and photography.',
        vision: 'I see agriculture as a booming sector and want to acquire businesses that are set to expand globally.',
        personalValues: 'Innovation, sustainability, and integrity are my guiding principles.',
        goals: 'I’m looking for businesses that are sustainable, profitable, and scalable on a global level.',
        reasonForBuying: 'I am interested in investing in businesses that show potential for growth, especially in the agriculture sector.',
        freeTimeActivities: 'Photography, traveling, and exploring new technologies.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Chantal', lastName: 'Wouters', age: 39, location: 'Leiden', nationality: 'Dutch',
        introduceYourself: 'I’m Chantal, an experienced investor in the sustainability space. I’m actively seeking to acquire businesses within the agriculture sector that align with my vision for sustainable growth.',
        accomplishments: 'Built and scaled multiple eco-conscious brands and am now focusing on investing in sustainable agriculture ventures.',
        backgroundExperience: 'With a background in both business development and sustainability, I have been involved in scaling companies for over 15 years.',
        leadershipStyle: 'I believe in empowering teams, driving innovation, and focusing on long-term success while keeping sustainability at the core.',
        interests: 'Sustainability, entrepreneurship, global business, and wellness.',
        vision: 'I believe the agriculture sector can benefit greatly from sustainable practices, and I want to help businesses expand globally while staying environmentally conscious.',
        personalValues: 'Sustainability, responsibility, and ethical business practices are key to my approach.',
        goals: 'My goal is to acquire businesses that focus on sustainable farming and help them scale to new heights.',
        reasonForBuying: 'I’m looking for businesses with a strong growth potential and an unwavering commitment to sustainability.',
        freeTimeActivities: 'Traveling, reading, and practicing mindfulness.',
        filters: [],
        completedPages: []
      },
      {
        name: 'Arjen', lastName: 'de Lange', age: 48, location: 'Eindhoven', nationality: 'Dutch',
        introduceYourself: 'I’m Arjen, an entrepreneur with a passion for sustainable business models. I’m looking for acquisition opportunities in the agriculture sector that combine innovation with strong scalability.',
        accomplishments: 'Successfully invested in and scaled a variety of businesses in the tech and renewable energy sectors.',
        backgroundExperience: 'I have 20 years of experience in scaling companies, with a focus on data-driven strategies and sustainable practices.',
        leadershipStyle: 'My leadership approach focuses on fostering innovation, transparency, and long-term vision.',
        interests: 'Sustainability, technology, international business, and outdoor sports.',
        vision: 'I believe sustainable agriculture has immense potential for growth, and I’m interested in scaling these businesses globally.',
        personalValues: 'Transparency, innovation, and ethical leadership guide my business decisions.',
        goals: 'I aim to help businesses scale internationally and expand their market presence while staying committed to sustainability.',
        reasonForBuying: 'I am seeking profitable businesses in the agriculture sector that can scale effectively.',
        freeTimeActivities: 'Outdoor sports, reading about business innovation, and traveling.',
        filters: [],
        completedPages: []
      }
  
    
    // Voeg hier de overige 9 buyers toe met unieke gegevens
    // ...
  ];

  // Maak Buyers aan met de gegevens
  const buyers = [];
  for (const buyerData of buyersData) {
    const broker = brokers[Math.floor(Math.random() * brokers.length)];
    const buyer = new Buyer({
      user: broker._id,
      profilePicture: getRandomProfilePicture(),
      ...buyerData
    });
    await buyer.save();
    buyers.push(buyer);
  }

  console.log('Data seeded successfully!');
})();
