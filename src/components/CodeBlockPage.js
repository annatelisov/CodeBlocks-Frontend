import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

//Use this http://localhost:5000 for localhost
const socket = io('https://backendcodeblocksapp-02d7e23a5120.herokuapp.com', { transports: ['websocket'] });


function CodeBlockPage() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [solution, setSolution] = useState('');
  const [isMentor, setIsMentor] = useState();
  const [students, setStudents] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    //Fetch data from the server and db, localhost:5000 for localhost
    axios.get(`https://backendcodeblocksapp-02d7e23a5120.herokuapp.com/api/codeblocks/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setCode(response.data.code);
        setSolution(response.data.solution);
      })
      .catch(error => console.error('Error fetching code block:', error));
      
    //Join the block room via socket
    socket.emit('joinBlock', id);
    

    //Listen for role assignment and set true if this is the mentor or false if this is a student
    socket.on('roleAssignment', (role) => {
      setIsMentor(role === 'mentor');
    });

    //Students count updates
    socket.on('studentsCount', (count) => {
      setStudents(count);
    });

    //Code updates
    socket.on('updateCode', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.emit('leaveBlock', id);
      socket.disconnect();
    };
  }, [id]);
  

  //Updating code changes in the textarea
  const handleCodeChange = (e) => {
    const updatedCode = e.target.value;
    setCode(updatedCode);
    socket.emit('codeChange', { blockId: id, code: updatedCode });
    if (updatedCode.trim() === solution.trim()) {
      alert('😊');
    }
  };

  //Students out of the room if the mentor leaving
  const handleMentorLeave = () => {
    if (isMentor) {
      navigate('/');
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <h2>{isMentor ? 'Mentor' : 'Student'}</h2>
      <h3>Students in room: {students}</h3>
      <SyntaxHighlighter language="javascript">
        {code}
      </SyntaxHighlighter>
      {!isMentor && (
        <textarea value={code} onChange={handleCodeChange} />
      )}
      {isMentor && (
        <button onClick={handleMentorLeave}>Leave Room</button>
      )}
    </div>
  );
}

export default CodeBlockPage;