import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';
import { SourceContext } from './context/SourceContext';
import { DestinationContext } from './context/DestinationContext';

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    type === 'source'
      ? setPlaceholder('Pickup Location')
      : setPlaceholder('Dropoff Location');
  }, []);

  const getLatandLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId }, (place, status) => {
      if (status === 'OK' && place.geometry && place.geometry.location) {
        if (type === 'source') {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      }
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#00ffff00', // Control background color (not the dropdown)
      border: 'none',
    }),
    dropdown: (provided) => ({
      ...provided,
      backgroundColor: '#000000', // Dropdown background color (black)
      zIndex: 1000,
    }),
    suggestion: (provided) => ({
      ...provided,
      color: '#333', // Default color of suggestion text
    }),
    suggestionHighlighted: (provided) => ({
      ...provided,
      backgroundColor: '#f0f0f0', // Background color of the highlighted suggestion
    }),
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={type === 'source' ? '/sourceblack.png' : '/destinationicon.png'}
        width={15}
        height={15}
      />

      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: (place) => {
            getLatandLng(place, type);
            setValue(place);
          },
          placeholder: placeholder,
          isClearable: true,
          className: 'w-full',
          components: {
            DropdownIndicator: false,
          },
          styles: customStyles, // Apply custom styles to GooglePlacesAutocomplete
        }}
      />
    </div>
  );
}

export default InputItem;
