"use client"
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import SearchSection from "./components/Home/SearchSection";
import GoogleMapSection from "./components/Home/GoogleMapSection";
import { SourceContext } from "./components/Home/context/SourceContext";

import { DestinationContext } from "./components/Home/context/DestinationContext";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";

export default function Home() {
  const [source,setSource]=useState([])
  const [destination,setDestination]=useState([])
  
  return (
    
    <SourceContext.Provider value={{source,setSource}}>
      <DestinationContext.Provider value={{destination,setDestination}}>
      <LoadScript
      libraries={['places']}
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <SearchSection/>
      </div> 
      <div className="col-span-2">
        <GoogleMapSection/>
      </div>
    </div>
    </LoadScript>
    </DestinationContext.Provider>
    </SourceContext.Provider>
    
  )
}
