const express = require('express');
const router = express.Router();

// GET /api/instructions - Get driving test instructions
router.get('/', async (req, res) => {
  try {
    // Static instructions data - could be moved to database later
    const instructions = [
      {
        id: 1,
        title: "Before the Test",
        items: [
          "Bring a valid government-issued ID on test day",
          "Arrive at least 15 minutes before your scheduled time",
          "Ensure your vehicle meets the safety standards",
          "Have all required documents ready",
          "Get a good night's sleep before the test",
          "Review the driving manual one more time"
        ]
      },
      {
        id: 2,
        title: "During the Test",
        items: [
          "Listen carefully to the examiner's instructions",
          "Stay calm and focused throughout the test",
          "Follow all traffic rules and regulations",
          "Ask for clarification if you don't understand something",
          "Use proper signaling and mirror checking",
          "Maintain appropriate speed limits"
        ]
      },
      {
        id: 3,
        title: "Test Requirements",
        items: [
          "Valid learner's permit or license",
          "Proof of insurance for the test vehicle",
          "Vehicle registration documents",
          "Payment for test fees (if applicable)",
          "Completed application forms",
          "Medical certificate (if required)"
        ]
      },
      {
        id: 4,
        title: "Vehicle Safety Check",
        items: [
          "Working headlights and taillights",
          "Functional turn signals and hazard lights",
          "Proper tire condition and pressure",
          "Working brakes and parking brake",
          "Clean windshield and mirrors",
          "Valid vehicle registration and insurance"
        ]
      },
      {
        id: 5,
        title: "Common Test Areas",
        items: [
          "Parallel parking and three-point turns",
          "Highway merging and lane changes",
          "Intersection navigation and right-of-way",
          "School zones and pedestrian crossings",
          "Emergency stops and hazard response",
          "Backing up and parking maneuvers"
        ]
      }
    ];

    res.json({
      success: true,
      instructions: instructions
    });

  } catch (error) {
    console.error('Error fetching instructions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch instructions',
      error: error.message
    });
  }
});

// POST /api/instructions - Add new instruction (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, items } = req.body;

    if (!title || !items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Title and items array are required'
      });
    }

    // In a real application, you would save this to a database
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Instruction added successfully',
      instruction: {
        id: Date.now(),
        title,
        items
      }
    });

  } catch (error) {
    console.error('Error adding instruction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add instruction',
      error: error.message
    });
  }
});

module.exports = router;