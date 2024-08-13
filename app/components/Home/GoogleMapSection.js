import React, { useContext, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from './context/SourceContext';
import { DestinationContext } from './context/DestinationContext';
function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth*0.45
  };
  
  const {source,setSource}=useContext(SourceContext);
  const {destination,setDestination}=useContext(DestinationContext);

  const [center,setCenter]=useState({
    lat: -3.745,
    lng: -38.523
  });

  const [map, setMap] = React.useState(null)
  const [directionRoutePoints,setDirectionRoutePoints]=useState([]);
  useEffect(()=>{
    if(source?.length!=[]&&map)
      {
        map.panTo(
        {
          lat:source.lat,
          lng:source.lng
        }
        )
        setCenter({
          lat:source.lat,
          lng:source.lng
        }); 
      }
      if(source.length!=[]&&destination.length!=[])
        {
            directionRoute();
        }
  },[source])

  useEffect(()=>{
    if(destination?.length!=[]&&map)
      {
        setCenter({
          lat:destination.lat,
          lng:destination.lng
        })
      }

      if(source.length!=[]&&destination.length!=[])
      {
          directionRoute();
      }
  },[destination])

  const directionRoute=()=>{
    const DirectionsService=new google.maps.DirectionsService();
    console.log('DIE')
    DirectionsService.route({
      origin:{lat:source.lat,lng:source.lng},
      destination:{lat:destination.lat,lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING
    },(result,status)=>{
      if(status===google.maps.DirectionsStatus.OK)
        {
          setDirectionRoutePoints(result)
        }
        else{
          console.error('Error');
        }
    })
  }

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return  (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{mapId:'c777799ed6784986'}}
      >
      {source.length!=[]? <MarkerF
        position={{lat:source.lat,lng:source.lng}}
        icon={{
          url:"/mapmarker.png",
          scaledSize:{
            width:35,
            height:35
          }
        }}
        >

          <OverlayViewF
          position={{lat:source.lat,lng:source.lng}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[18px]'>{source.label}</p>
            </div>
          </OverlayViewF>
          </MarkerF>:null}
        
      {destination.length!=[]? <MarkerF
        position={{lat:destination.lat,lng:destination.lng}}
        icon={{
          url:"/desticon.jpg",
          scaledSize:{
            width:25,
            height:25
          }
        }}
        >
          <OverlayViewF
          position={{lat:destination.lat,lng:destination.lng}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-black font-bold inline-block'>
              <p className='text-white text-[18px]'>{destination.label}</p>
            </div>
          </OverlayViewF>

          </MarkerF>:null}
          
        <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions:{
            strokeColor:'#000',
            strokeWeight:5
          },
          suppressMarkers:true
        }}
        />
      </GoogleMap>
  ) 
}

export default GoogleMapSection