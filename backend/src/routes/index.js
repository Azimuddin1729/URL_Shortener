const express=require('express')
const cors=require('cors')
const {convertToBase62}=require("../../lib/base_62");
const {createClient} = require("redis");

const router=express.Router()

const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

redisClient.on('connect',()=>{
    console.log('Connected to Redis');
})

redisClient.on('ready',()=>{
    console.log('Redis is ready to use');
})
redisClient.on('end',()=>{
    console.log('Redis connection closed');
})


async function connectRedis(){
    try{
      await redisClient.connect();
    }
    catch(e){
        console.log('Error connecting to Redis:', e);
    }
}

connectRedis();

router.get("/:shortUrlId",async(req,res)=>{
    const shortUrlId = req.params.shortUrlId;
    try {
    const longUrl = await redisClient.hGet("url_list", shortUrlId)

    if (!longUrl) {
      // not found
      return res.status(404).send("Short URL not found")
    }
    const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(longUrl)
    const target = hasScheme ? longUrl : `https://${longUrl}`
    return res.redirect(302, target)
  } catch (e) {
    console.error('Error fetching long URL or redirecting:', e)
    return res.status(500).send("Internal Server Error")
  }
})

router.post("/shortener",async(req,res)=>{
    const {longUrl} = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: "URL is required" });
    }
    // Here you would typically call a service to shorten the URL
    // else{
        try{
            const id=await redisClient.incr("gcounter");
            console.log('Generated ID:', id);
            const shortUrlId = convertToBase62(id);
            await redisClient.hSet('url_list',shortUrlId, longUrl);

            res.status(200).json({
                data:{
                    shortUrl: `http://localhost:3001/api/v1/${shortUrlId}`
                }
            })
        }

        catch(e){
            console.error('Error generating short URL:', e);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    // }
})



module.exports=router