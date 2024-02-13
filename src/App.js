import './App.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState, useRef } from 'react';

function App() {
  const [name, setName] = useState("")
  const [date , setDate] = useState("")

  const mainDiv = useRef()

  const handleInput = (e) => {
    setName(e.target.value);
    // let dt = new Date();

    // let year = dt.getFullYear()
    // let month = dt.getMonth()
    // let day = dt.getDate()

    // let today = `${day}/${month}/${year}`
    setDate(new Date().toUTCString())
  }

  const generatePdf = (e) => {
    // console.log(mainDiv.current.innerText);
    e.preventDefault();
    

    if (!mainDiv.current.innerText) {
      return
    }
    html2canvas(mainDiv.current, { useCORS: true })
      .then((canvas) => {
        console.log(canvas)
        if (!canvas || !canvas.getContext) {
          console.error('Error: Failed to capture canvas data.');
          return;
        }

        const imgData = canvas.toDataURL('image/png'); // Use PNG format
        // console.log(imgData)

        const pdf = new jsPDF({
          orientation: "landscape"
        });

        pdf.addImage(imgData, "PNG", 0, 0, 300, 210); // Use appropriate coordinates
        pdf.save('certificate.pdf');
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <>
      <div className='form'>
        <form  onSubmit={(e) => { generatePdf(e) }}>
          <input
            value={name}
            name="name"
            className='name'
            onChange={(e) => { handleInput(e) }}
            placeholder="Enter your full name"
            required
            maxLength={30}
          />
          <button className='generateBtn btn btn-primary' type="submit"> Generate Pdf </button>
        </form>

      </div>
      <div className="main" ref={mainDiv}>
        
        <h3 id='name'>{name}</h3>
        {/* <p id='date'>{date}</p> */}
      </div>

    </>
  );
}

export default App;
