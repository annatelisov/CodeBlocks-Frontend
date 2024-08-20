import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LobbyPage() {
  const [codeblocks, setCodeblocks] = useState([]);

  //Get the data from db
  useEffect(() => {
    axios.get('http://localhost:5000/api/codeblocks')
      .then(response => {
        console.log('Data fetched:', response.data); 
        setCodeblocks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codeblocks.map(block => (
          <li key={block._id}>
            <Link to={`/codeblock/${block._id}`}>{block.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LobbyPage;
