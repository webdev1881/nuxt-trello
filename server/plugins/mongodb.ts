import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();
  const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nrello';

  try {
    await mongoose.connect(mongodbUri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.warn('⚠️  Server will continue without database connection');
    // Don't throw error - allow server to start without DB
  }
});
