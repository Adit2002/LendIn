import './css/home.css';
import { useNavigate } from 'react-router-dom';
// import DocViewer, { PDFRenderer, PNGRenderer } from "react-doc-viewer";

const Home = () => {
  const navigate = useNavigate();
//   const docs = [
//     { uri: "https://drive.google.com/uc?export=download&id=1oO5B1NfJjSJ06YtM9a2SeRw7ZkbjfzbB" }
//   ];

  const Goto = () => {
    window.open("https://www.linkedin.com/in/aditya-sharma-58b9501b8/");
  };

  return (
    <div className="page">
      <div className='image-prelogin'>
        <div className='container'>
            <h1 onClick={Goto}>Built by: Aditya Sharma</h1>
        </div>      
        
      </div>
    </div>
  );
};

export default Home;
