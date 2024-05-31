import {useState , useEffect} from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';

function App() {
  const [quizes,setQuizes]=useState([]);
  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const Requestresponse = await axios.get(`http://192.168.103.136:3000/student/getQuizes/major?major=scientific`); 
        setQuizes(Requestresponse.data.gerQuizes);
        console.log("start fetching the data");
        console.log(Requestresponse.data.gerQuizes);
      } catch (error) {
        console.error(" server error occuring when  fetching quizzes:", error);
      }
    };
    fetchQuizes();
  }, []);

  const exportQuizesToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(quizes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'students.xlsx');
  };


  return (
    <div className="App">
      <button 
        className="export-button" 
        onClick={exportQuizesToExcel}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          margin: '20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        التصدير كاكسل شيت
      </button>
    </div>
  );
}

export default App;
