import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader
} from '@react-google-maps/api';
import { useRef } from 'react';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY || '';

const MapWithAutocomplete = ({
  lat,
  lng,
  handleChange
}: {
  lat: number;
  lng: number;
  // @ts-ignore
  handleChange: (place) => void;
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyByv76QcVPFq33cHOQbC493SDY9muUEm3w',
    libraries: ['places']
  });
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const containerStyle = {
    width: '100%',
    height: '360px'
  };

  const center = {
    lat,
    lng
  };

  // @ts-ignore
  const onLoadMap = (map) => {
    mapRef.current = map;
  };

  // @ts-ignore
  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      // @ts-ignore
      const place = autocompleteRef.current.getPlace();
      const { geometry } = place;
      const bounds = new window.google.maps.LatLngBounds();
      if (geometry.viewport) {
        bounds.union(geometry.viewport);
      } else {
        bounds.extend(geometry.location);
      }
      // @ts-ignore
      mapRef.current!.fitBounds(bounds);

      const field = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
        name: place.name,
        _type: 'location' as 'location'
      };
      handleChange(field);
    }
  };

  // @ts-ignore
  const handleDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const place = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}&result_type=street_address`
    )
      .then((res) => res.json())
      .then((res) => res.results[0]);
    const field = {
      lat,
      lng,
      address: place?.formatted_address || 'Sem endereço',
      name: place?.name || 'Sem nome',
      _type: 'location' as 'location'
    };
    handleChange(field);
  };

  return (
    <div className="relative  w-full">
      {isLoaded && (
        <>
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Busque o lugar"
              className="w-full bg-white border border-[rgb(221,221,221)]  mb-2 rounded p-3"
            />
          </Autocomplete>
          <p className="mb-3  opacity-60">
            Busque o lugar no campo acima ou mova o marcador no mapa.
          </p>
          <div className="relative rounded overflow-hidden border border-slate-200 h-90">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              onLoad={onLoadMap}
              zoom={10}
            >
              <Marker
                position={{ lat, lng }}
                draggable
                onDragEnd={handleDragEnd}
              />
            </GoogleMap>
          </div>
        </>
      )}
    </div>
  );
};

export default MapWithAutocomplete;
