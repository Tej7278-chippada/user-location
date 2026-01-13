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

  // const gradientHover = 'linear-gradient(135deg, #3a56d4 0%, #2d0a8c 50%, #5c0b9b 100%)';

  useEffect(() => {
    // window.scrollTo(0, 0);
    setTimeout(() => {
      handleRegister();
    }, 1500);
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
