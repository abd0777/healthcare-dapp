import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDoctorProfiles = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "fullname email phone specialization licenseNumber clinicAddress profilePic"
    );
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};
