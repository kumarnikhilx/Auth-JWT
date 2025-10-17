import mongoose from 'mongoose';
const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGOURI);
        console.log('Database Connected Successfully !')
    }
    catch(err){
        console.log('Error Found Databse not Connected!',err)
    }
}

export default dbConnect;