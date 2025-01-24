const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // for user authentication and generating tokens
const bcrypt = require('bcryptjs'); // hashing passwords
const User = require('../models/User'); // Import User model
const Buyer = require('../models/Buyer'); // Import Buyer model
const Seller = require('../models/Seller'); // Import Seller model
const GroupChat = require('../models/GroupChat');
const authMiddleware = require('../middleware/auth'); // Import your middleware
const { Connection, SkippedProfile, SavedProfile } = require('../models/Message'); // Assume these models exist and are imported properly
const { check, validationResult } = require('express-validator');

router.get('/broker-connected-group-chats', authMiddleware, async (req, res) => {
  try {
      const brokerId = req.userId;

      const groupChats = await GroupChat.find({ participants: brokerId });
    
      const profilesWithDetails = await Promise.all(groupChats.map(async (chat) => {
        
        
      const participants = await Promise.all(chat.participants.map(async (participant) => {
    
      
        const user = await User.findById(participant).exec();
    
        if (!user) {
            console.error('Invalid user for participant ID:', participant);
            return null; // Skip invalid users
          }
    
            //console.log('USER', user);
    
          const profileData = {
            userId: participant,
            userDetails: user, // Include user details
          };
      
          let profile;
      
            // Fetch Buyer or Seller profile based on user role
          if (user.role === 'buyer') {
              profile = await Buyer.findOne({ user: user._id }).exec();
      
          } if (user.role === 'seller') {
              profile = await Seller.findOne({ user: user._id }).exec();
            }
      
          profileData.profile = profile ? profile : ''; // Add seller profile to response
            
          return profileData;
    
          }));
    
          // Filter out any null participants
          const validParticipants = participants.filter((participant) => participant !== null);
    
          return {
            chatId: chat._id,
            participants: validParticipants,
          };
        }));
    
        // Filter out any null chats
        const validChats = profilesWithDetails.filter((chat) => chat !== null);
       
    
        res.status(200).json(validChats);

  } catch (error) {
      console.error('Error retrieving profile:', error);
      res.status(500).json({ message: 'Server error while retrieving profile' });
  }
});

// GET REQUEST TO GET PROFILES AND GROUPCHATS WHERE BROKER IS CONNECTED TO
router.get('/broker-connected-users', authMiddleware, async (req, res) => {
  try {
      const brokerId = req.userId;

      // Validate the userId format if necessary
      if (!brokerId.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ message: 'Invalid userId format' });
      }

      // krijg users die verbonden zijn aan broker
      const users = await User.find({brokerId: brokerId});

      const profiles = await Promise.all(users.map(async (user) => { 

        const profileData = {
          userId: user._id,
          userDetails: user, // Include user details
        };
  
        let profile;
        
        if (user.role === 'buyer') {
          profile = await Buyer.findOne({ user: user._id }).exec();
  
        } if (user.role === 'seller') {
          profile = await Seller.findOne({ user: user._id }).exec();
        }

        profileData.profile = profile ? profile : ''; // Add seller profile to response
        
        return profileData;
      
      }));

      console.log(profiles);

      if (!profiles) {
          return res.status(404).json({ message: 'No profiles found for the given brokerId' });
      }

      // Send the profile data as a response
      res.status(200).json({profiles: profiles });

  } catch (error) {
      console.error('Error retrieving profile:', error);
      res.status(500).json({ message: 'Server error while retrieving profile' });
  }
});

// POST endpoint to save profile data
router.post('/', async (req, res) => {
    try {
        const id = req.userId;
        const { ...formData } = req.body; // Get username from request body

        // Find the user by username (or any other field)
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new Profile instance
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating profile' });
    }
});

router.get('/email', authMiddleware, async (req, res) => {
  const id = req.userId;
  try
  {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ email: user.email, name: user.name, role: user.role });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

router.get('/my-clients', authMiddleware, async (req, res) => {
    const id = req.userId;
    const role = req.query.role;
    const filters = req.query;
    let profiles = null;

    try {
        // Fetch user IDs for the current 

        const users = await User.find({ brokerId: id, role: role}).select('_id');

        let profileQuery = {
            user: { $in: users }, // Only fetch profiles for these users
        };
        
        // Apply buyer filters if role is 'buyer'
        if (role === 'buyer') {
            if (filters.capital) {
                profileQuery.capital = { $gte: filters.capital[0] };
            }
            if (filters.accessToFinance) {
                profileQuery.accessToFinance = { $in: filters.accessToFinance };
            }
            if (filters.timeframe) {
                profileQuery.timeframe = { $in: filters.timeframe };
            }
            if (filters.vision) {
                profileQuery.vision = { $gte: filters.vision[0] };
            }

            profiles = await Buyer.find(profileQuery);
        }

        if (role === 'seller') {
          if (filters.annualRevenue) {
              profileQuery.annualRevenue = { $gte: filters.annualRevenue[0] };
          }
          if (filters.valuation) {
              profileQuery.valuation = { $gte: filters.valuation[0] };
          }
          if (filters.industryFocus) {
              profileQuery.industry = { $in: filters.industryFocus };
          }
          if (filters.location) {
              profileQuery.location = { $in: filters.location };
          }
          if (filters.assets) {
              profileQuery.assets = { $gte: filters.assets[0] };
          }
          if (filters.liabilities) {
              profileQuery.liabilities = { $gte: filters.liabilities[0] };
          }
          if (filters.typeOfSale) {
              profileQuery.typeOfSale = { $in: filters.typeOfSale };
          }
          if (filters.companySize) {
              profileQuery.companySize = { $gte: filters.companySize[0] };
          }
          if (filters.employees) {
              profileQuery.employees = { $gte: filters.employees[0] };
          }
          if (filters.annualTurnover) {
              profileQuery.annualTurnover = { $gte: filters.annualTurnover[0] };
          }
          if (filters.balanceSheetTotal) {
              profileQuery.balanceSheetTotal = { $gte: filters.balanceSheetTotal[0] };
          }
          if (filters.keyProductService) {
              profileQuery.keyProductsServices = { $gte: filters.keyProductService[0] };
          }

          profiles = await Seller.find(profileQuery);
      }

        const names = await User.find({ _id: profileQuery.user}).select('name');

        res.status(200).json(profiles);

    } catch (error) {
        console.error('Error fetching client profiles:', error);
        res.status(500).json({ message: 'Error fetching client profiles' });
    }
});

router.post('/delete-filter', authMiddleware, async (req, res) => {

  const {filter} = req.body;

  try {

  const id = req.userId;

      // Validate the userId format if necessary
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ message: 'Invalid userId format' });
    }

    let user = await User.findOne({ _id: id });

    let profile = null;

    if (user.role === 'buyer')
    {
      profile = await Buyer.findOne({ user: id }).populate('user'); // Populates the user field if needed
    }
    else if (user.role === 'seller')
    {
      profile = await Seller.findOne({ user: id }).populate('user'); // Populates the user field if needed
    }

    if (!profile) {
          return res.status(404).json({ message: 'Profile not found for the given userId' });
    }

    profile.filters = profile.filters.filter( (f) => {
      return f.filter !== filter;
    });

    await profile.save();

    res.status(200).json({ message: 'Successfully deleted filter' });

} 

catch (error) {
    console.error('Error deleting filter:', error);
    res.status(500).json({ message: 'Server error while deleting filter' });
}

});

router.post('/filter', authMiddleware, async (req, res) => {

  const {filter, priority, value} = req.body;

  try {

  const id = req.userId;

      // Validate the userId format if necessary
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ message: 'Invalid userId format' });
    }

    let user = await User.findOne({ _id: id });

    let profile = null;

    if (user.role === 'buyer')
    {
      profile = await Buyer.findOne({ user: id }).populate('user'); // Populates the user field if needed
    }
    else if (user.role === 'seller')
    {
      profile = await Seller.findOne({ user: id }).populate('user'); // Populates the user field if needed
    }

    if (!profile) {
          return res.status(404).json({ message: 'Profile not found for the given userId' });
    }

    // vervang als hij al bestaat
    profile.filters = profile.filters ? [...profile.filters] : [];

    const filterExists = profile.filters.some(f => f.filter === filter);

    if (filterExists) {
        profile.filters = profile.filters.map(f => 
            f.filter === filter ? { filter, priority, value } : f
        );
    } else {
        profile.filters.push({ filter: filter, priority: priority, value: value });
    }

    await profile.save();

    res.status(200).json({ message: 'Successfully saved filter' });

} 

catch (error) {
    console.error('Error saving filter:', error);
    res.status(500).json({ message: 'Server error while saving filter' });
}

});


router.get('/filters', authMiddleware, async (req, res) => {

  try {

    const id = req.userId;
  
        // Validate the userId format if necessary
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid userId format' });
      }
  
      let user = await User.findOne({ _id: id });
  
      let profile = null;
  
      if (user.role === 'buyer')
      {
        profile = await Buyer.findOne({ user: id }).populate('user'); // Populates the user field if needed
      }
      else if (user.role === 'seller')
      {
        profile = await Seller.findOne({ user: id }).populate('user'); // Populates the user field if needed
      }
  
      if (!profile) {
            return res.status(404).json({ message: 'Profile not found for the given userId' });
      }
  
      res.status(200).json({filters: profile.filters});
  
  } 
   catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({ message: 'Server error while fetching filters' });
}

});


router.get('/discover', authMiddleware, async (req, res) => {
  try {
      const id = req.userId;

      // Validate the userId format if necessary
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ message: 'Invalid userId format' });
      }

      let user = await User.findOne({ _id: id });
  
      let filters = null;
      let user_profile = null;
  
      if (user.role === 'buyer')
      {
        user_profile = await Buyer.findOne({ user: id }); // Populates the user field if needed
        filters = user_profile.filters;
      }
      else if (user.role === 'seller')
      {
        user_profile = await Seller.findOne({ user: id }); // Populates the user field if needed
        filters = user_profile.filters;
      }
  
      if (!filters) {
            return res.status(404).json({ message: 'Profile not found for the given userId' });
      }

      let skippedProfiles = await SkippedProfile.find({userId: id});
      let savedProfiles = await SavedProfile.find({userId: id});
      // also exclude users that have already connected

      let savedIds = savedProfiles.map(profile => profile.savedProfileId);
      let skippedIds = skippedProfiles.map(profile => profile.skippedProfileId);

      let connections = await Connection.find({sender: id});
      let connectionsIds = connections.map(connection => connection.receiver);

      let excludeIds = connectionsIds.concat(savedIds, skippedIds);

      // remove or exclude filters where priority is low
      filters = filters.filter((f) => {
        return f.priority !== "Low";
      });

      let filterConditions = {};

      // for filters where priority is medium or high, include in result

      filters.map((f) => {
        if (f.filter === "Age")
        {
          filterConditions.age = {$gte: parseInt(f.value[0]), $lte: parseInt(f.value[1])};
        }
        if (f.filter === "Nationality")
        {
          filterConditions.nationality = {$in: f.value};
        }
        if (f.filter === "Generic location")
        {
          filterConditions.location = {$in: f.value};
        }
        if (f.filter === "Post Sale Involvement")
        {
            filterConditions.postSaleInvolvement = {$in: f.value};
        }
        if (f.filter === "Timeframe")
        {
              filterConditions.timeFrame = {$in: f.value};
        }
        if (f.filter === "Type Of Sale")
        {
            filterConditions.typeOfSale = {$in: f.value};
        }
        if (f.filter === "Industry") {
          if (user.role === 'buyer')
          {
            filterConditions.industry = {$in: f.value};
          }
          if (user.role === 'seller')
            {
              filterConditions.buyerIndustry = {$in: f.value};
            }
        }

        // seller filters for buyers

        if (f.filter === "Sales Volume")
          {
            filterConditions.salesVolumeEUR = {$gte: parseInt(f.value[0]), $lte: parseInt(f.value[1])};
            console.log('filterConditions', filterConditions);
          }

          if (f.filter === "Share To Be Transferred") {
            // Split the value at the "-" to get minValue and maxValue
            const [minValue, maxValue] = f.value[0].split('-');
          
            // Remove the "%" symbol and parse the values as integers
            filterConditions.shareToBeTransferred = {
              $gte: parseInt(minValue), // minValue (without %)
              $lte: parseInt(maxValue.replace('%', '')) // maxValue (remove % and parse)
            };
          }

        if (f.filter === "Result")
        {
          filterConditions.resultEUR = {$gte: parseInt(f.value[0]), $lte: parseInt(f.value[1])};
        }
        if (f.filter === "Employees")
        {
          filterConditions.employees = {$gte: parseInt(f.value[0]), $lte: parseInt(f.value[1])};
        }

        if (f.filter === "Profit Margin") {
          // Split the value at the "-" to get minValue and maxValue
          const [minValue, maxValue] = f.value[0].split('-');
        
          // Remove the "%" symbol and parse the values as integers
          filterConditions.profitMargin = {
            $gte: parseInt(minValue), // minValue (without %)
            $lte: parseInt(maxValue.replace('%', '')) // maxValue (remove % and parse)
          };
        }

        if (f.filter === "Revenue")
        {
          filterConditions.revenueEUR = {$gte: parseInt(f.value[0]), $lte: parseInt(f.value[1])};
        }
        if (f.filter === "Cash Flow")
        {
          filterConditions.cashflowEUR = {$gte: parseInt(f.value[0]), $lte: parseInt(f.value[1])};
        }
      });

      // next - filter profiles based on given filters
      
      let profile = null;

      if (user.role === 'buyer')
      {
        profile = await Seller.aggregate([
          { $match: { user: { $nin: excludeIds }, ...filterConditions } }, // Exclude skipped profiles
          { $sample: { size: 1 } } // Randomly select one profile
        ]);

      }
      else if (user.role === 'seller')
      {
        profile = await Buyer.aggregate([
          { $match: { user: { $nin: excludeIds  }, ...filterConditions } }, // Exclude skipped profiles
          { $sample: { size: 1 } } // Randomly select one profile
        ]);
      }

      // If no profile was found, return a 404 error
      if (!profile || profile.length === 0) {
        
        return res.status(404).json({ message: 'No profiles available' });
      }

      

    // Send the selected profile data as a response
      res.status(200).json(profile[0]);
  } catch (error) {
      console.error('Error retrieving profile:', error);
      res.status(500).json({ message: 'Server error while retrieving profile' });
  }
});

router.get('/view/:profileId', authMiddleware, async (req, res) => {
  try {
      const id = req.params.profileId;

      // Validate the userId format if necessary
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ message: 'Invalid userId format' });
      }

      let user = await User.findOne({ _id: id });

      let profile = null;

      if (user.role === 'buyer')
      {
        profile = await Buyer.findOne({ user: id }).populate('user'); // Populates the user field if needed
      }
      else if (user.role === 'seller')
      {
        profile = await Seller.findOne({ user: id }).populate('user'); // Populates the user field if needed
      }

      if (!profile) {
          return res.status(404).json({ message: 'Profile not found for the given userId' });
      }

      // Send the profile data as a response
      res.status(200).json(profile);

  } catch (error) {
      console.error('Error retrieving profile:', error);
      res.status(500).json({ message: 'Server error while retrieving profile' });
  }
});

router.get('/saved', authMiddleware, async (req, res) => {

    try {
      const id = req.userId;

      // Validate the userId format if necessary
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ message: 'Invalid userId format' });
      }

      const savedProfiles = await SavedProfile.find({ userId: id });
    
      if (!savedProfiles) {
          return res.status(404).json({ message: 'SavedProfiles not found for the given userId' });
      }

      // Send the profile data as a response
      res.status(200).json(savedProfiles.length);

  } catch (error) {
      console.error('Error retrieving profile:', error);
      res.status(500).json({ message: 'Server error while retrieving profile' });
  }

});


router.get('/', authMiddleware, async (req, res) => {
  try {
      const id = req.userId;

      // Validate the userId format if necessary
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ message: 'Invalid userId format' });
      }

      let user = await User.findOne({ _id: id });

      let profile = null;

      if (user.role === 'buyer')
      {
        profile = await Buyer.findOne({ user: id }).populate('user'); // Populates the user field if needed
      }
      else if (user.role === 'seller')
      {
        profile = await Seller.findOne({ user: id }).populate('user'); // Populates the user field if needed
      }

      if (!profile) {
          return res.status(404).json({ message: 'Profile not found for the given userId' });
      }

      // Send the profile data as a response
      res.status(200).json(profile);

  } catch (error) {
      console.error('Error retrieving profile:', error);
      res.status(500).json({ message: 'Server error while retrieving profile' });
  }
});




router.put('/update-email', authMiddleware,
    [
      check('email', 'Please include a valid email').isEmail(),
    ],
    async (req, res) => {
      const { email } = req.body;
      const userId = req.userId; // Assuming authMiddleware sets req.userId
  
      // Validate input fields
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid email', errors: errors.array() });
      } 
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.email = email;
      await user.save();
  
      return res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
      console.error('Error updating email:', error);
      res.status(500).json({ message: 'Failed to update email' });
    }
  });

// Update password route
router.put('/update-password', authMiddleware,
    [
      check('oldPassword', 'Current password is required').not().isEmpty(),
      check('newPassword', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    ],
    async (req, res) => {
      const { oldPassword, newPassword } = req.body;
      const userId = req.userId; // Assuming authMiddleware sets req.userId
  
      // Validate input fields
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long', errors: errors.array() });
    }
    
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      await user.save();
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Failed to update password' });
    }
  });

// PUT endpoint to update profile data based on userId
router.put('/', authMiddleware, async (req, res) => {
    try {

        // Extract the new profile data from the request body
        const updatedData = req.body;

        let user = await User.findOne({ _id: req.userId });

        let updatedProfile = null;

        
        if (user.role === 'buyer')
        {

          console.log('Updated data', updatedData);

          updatedProfile = await Buyer.findOneAndUpdate(
            { user: req.userId },            // Find the profile based on the userId
            { $set: updatedData },        // Use $set to update fields with new data
            { new: true, runValidators: true } // Return the updated document and apply validation
          );
          console.log('Updated profile', updatedProfile);

        }
        else if (user.role === 'seller')
        {
          updatedProfile = await Seller.findOneAndUpdate(
            { user: req.userId },            // Find the profile based on the userId
            { $set: updatedData },        // Use $set to update fields with new data
            { new: true, runValidators: true } // Return the updated document and apply validation
          );
        }
        else
        {
          res.status(401).json({ message: 'Broker not allowed to access page' });
        }

        // Find the profile by userId and update it with new data
        
        // If no profile is found, return a 404 error
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found for the given userId' });
        }

        // Respond with the updated profile data
        res.status(200).json({ 
            message: 'Profile updated successfully!',
            profile: updatedProfile,
            role: user.role
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error while updating profile' });
    }
});

router.put('/update-count', authMiddleware, async (req, res) => {
  try {
      const id = req.userId;

      // Validate the userId format if necessary
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ message: 'Invalid userId format' });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let profileModel = user.role === 'buyer' ? Buyer : Seller;

      const profile = await profileModel.findOneAndUpdate(
        { user: id, reachCount: { $gt: 0 } }, // Ensure reachCount is greater than 0
        { $inc: { reachCount: -1 } }, // Decrement reachCount atomically
        { new: true } // Return the updated document
      ).populate('user');
  
      if (!profile) {
        return res.status(400).json({ message: 'Unable to update reachCount. Either profile not found or reachCount is already 0.' });
      }
      
      // Send the profile data as a response
      res.status(200).json(profile);

  } catch (error) {
      console.error('Error retrieving profile:', error);
      res.status(500).json({ message: 'Server error while retrieving profile' });
  }
});

module.exports = router;
