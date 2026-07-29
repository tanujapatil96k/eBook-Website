import mongoose from 'mongoose'; // ✅ CommonJS चा require ऐवजी import वापरा

// डेटाबेसमध्ये डेटा कसा सेव्ह होणार त्याचा साचा (Schema)
const ContactSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    country: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// ✅ मॉडेल तयार करा आणि फक्त एकाच पद्धतीने (export default) एक्स्पोर्ट करा
const Contact = mongoose.model('Contact', ContactSchema);
export default Contact;