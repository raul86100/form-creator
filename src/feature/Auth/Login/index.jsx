import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate=useNavigate();
    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
  
            // Call a reverse geocoding API here (e.g., Google Maps API or OpenCage API)
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=bb8aa9e06cc5434ba08489762194084a`)
              .then((response) => response.json())
              .then((data) => {
                const country = data.results[0].annotations.callingcode;
                console.log(country)
                setCountryCode(""+country);
              })
              .catch((error) => console.log('Error fetching country data:', error));
          },
          (error) => {
            console.log('Error getting location:', error);
          }
        );
      }
    }, []);
  return (
    <div onClick={()=>navigate("/user")}>Login {countryCode}</div>
  )
 

}

export default Login