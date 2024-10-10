import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // Import the CSS file

const ImageGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const UNSPLASH_ACCESS_KEY = 'kQRg505Kf9s6OLZ_CJYcSTBGqXkIn6JAXSvnHx4Gnn0'; // Replace with your Unsplash Access Key

  const generateImage = async () => {
    setLoading(true);
    setError('');
    setImageUrl(null); // Clear previous image

    const endpoint = `https://api.unsplash.com/search/photos?query=${inputText}&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
      const response = await axios.get(endpoint);
      
      if (response.data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        setImageUrl(response.data.results[randomIndex].urls.regular); // Get a random image URL
      } else {
        setError('No images found. Please try a different search term.');
      }
    } catch (err) {
      console.error('Error fetching image:', err);
      setError('Failed to fetch image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Colorful Image Generator</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a search term"
        className="input"
      />
      <button onClick={generateImage} className="generate-button">Generate Image</button>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" className="image" />}
    </div>
  );
};

export default ImageGenerator;
