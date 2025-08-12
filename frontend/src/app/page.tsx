"use client"
import axios from "axios";
import { useState } from "react";


export default function Home() {

  const [longUrl,setLongUrl]=useState("");
  const [shortUrl,setShortUrl]=useState("");

  async function generateShortUrl(){
      longUrl.trim();
      if(longUrl.length===0){
        alert("Please enter a valid URL");
        return;
      }
      try{
         const response=await axios.post("http://localhost:3001/api/v1/shortener", { longUrl });  
         setShortUrl(response.data.data.shortUrl);
      }
      catch(e){
           alert("Error generating short URL");
      }
  }

  return (
    <div className="min-h-screen mt-40 bg-gray-950 text-gray-50 flex flex-col items-center justify- center p-4">
      <h1 className="text-3xl font-bold mb-8 font-sans">
        Welcome to the URL Shortener App!😊 
      </h1>

      <div className="w-full max-w-md bg-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
           Generate Short URL
        </h2>
        <input type="text" placeholder="Enter Url to be shorten" value={longUrl} onChange={(e)=>{
          setLongUrl(e.target.value);
        }} className="w-full p-3 rounded-lg bg-gray-600 text-gray-400"/>
        
        <button  className="w-full bg-600 rounded-lg hover:bg-blue-800 mt-4 text-white py-2"
        onClick={generateShortUrl} >
          Generate
        </button>


        {shortUrl &&(
           <p className="mt-4 text-indigo-400">
            {/* the shorturl is in the state itself */}
            Short URL: <a href={shortUrl} target="_blank"  rel="noopener noreferrer">{shortUrl}</a>
           </p>
        )}

      </div>
    </div>



  );
}
