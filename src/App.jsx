import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const HUGGING_FACE_API_KEY = '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';
  
  
  const generateImage = async () => {
    setLoading(true);
    setError('');
    setImageUrl(null); // Clear previous image
  
    const modelName = 'stabilityai/stable-diffusion-2-1';
    const endpoint = `https://api-inference.huggingface.co/models/${modelName}`;
  
    try {
      const response = await axios.post(
        endpoint,
        { inputs: inputText }, // Make sure inputText is defined and contains your prompt
        {
          headers: {
            Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Important: Set response type to blob for image
        }
      );
  
      // Create a URL for the image blob
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl); // Set imageUrl to the created URL
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>AI Image Generator</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to generate an image"
          style={{
            padding: '10px',
            width: '300px',
            fontSize: '16px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={generateImage}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: loading ? 'gray' : 'blue',
            color: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Loading...' : 'Generate Image'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <img src={imageUrl} alt="Generated AI Art" style={{ width: '400px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}

export default App;
