import React, { useEffect, useState } from "react";
import axios from "axios";
import "./testimonials.css";
import { useNavigate, useParams } from "react-router-dom";
import imageInfo from "./imageLink";
import { MdOutlineArrowRight } from "react-icons/md";

const Testimonials = () => {
  const [fetchData, setFetchData] = useState({ text: "", sourceList: [] });
  const { disease,title1,title2 } = useParams();
  const [matchedImageLink, setMatchedImageLink] = useState("");
  const [selectedSummary, setSelectedSummary] = useState("");
  const navigate = useNavigate();
  // console.log(title1);
  // console.log(title2);
  
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          
          `${process.env.REACT_APP_BACKEND_IP}/disease/${disease}/${title1}/${title2}`
          // `${process.env.REACT_APP_BACKEND_IP}/disease/migraine/Homopathy/books/`
        );
        setFetchData(response.data);
        // console.log(fetchData);
      } catch (error) { 
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromAPI();

    const matchedImage = imageInfo.find((info) => info.title === title2);
    if (matchedImage) {
      setMatchedImageLink(matchedImage.imageLink);
    }
    // eslint-disable-next-line
  }, [title2]);

  const handleSummaryClick = (summary) => {
    // setSelectedSummary(summary === selectedSummary ? "" : summary);
    window.open(summary, '_blank');
  };

  // console.log(fetchData);
  
  return (
    <div className="testimonials-main" >
      <p className="testimonials-link-topleft" style={{fontWeight:"bold",marginLeft:50}}>
        &lt; <span onClick={() => navigate(-2) }>{disease.charAt(0).toUpperCase()}{disease.slice(1)}</span>
        <span onClick={() => navigate(-1)} >/{title1.charAt(0).toUpperCase()}{title1.slice(1)}</span>
        /{title2.charAt(0).toUpperCase()}{title2.slice(1)}
      </p>
      <div className="testimonials-container" >
        <div className="t-row1" >
          {matchedImageLink && (
            <img style={{height:55,width:80}} src={matchedImageLink} alt={title2} className="t-image" />
          )}
          <h1 style={{color:"#053B3F"}} className="t-row1 heading">{title2.charAt(0).toUpperCase()}{title2.slice(1)}</h1>
        </div>
        {/* {title2==="directCase"?(<div className="t-row2">CASES</div>):(<div className="t-row2">TESTIMONIALS</div>)} */}
        {/* // <div className="t-row2">TESTIMONIALS</div> */}
        {/* {title2==="directCase"?(<div className="t-row2">CASES</div>):(<div className="t-row2">TESTIMONIALS</div>)} */}
        {/* // <div className="t-row2">TESTIMONIALS</div> */}
        <div className="t-row3">{fetchData.text}</div>
        <div className="t-row4">
          {/* <> */}
          {fetchData.sourceList.map((item) => (
            <div key={item.id} className="t-card">
              <h3 className="t-title">{item.title.charAt(0).toUpperCase()}{item.title.slice(1)}</h3>
              
              {/* {title2 === "website" ? (
      <a href={item.link} target="_blank" rel="noreferrer">
        Click here to visit the website
      </a>
    ) : title2 === "youtube" ? (
      <a href={item.link} target="_blank" rel="noreferrer">
        Click here to see the video
      </a>
    ) : (
     ""
    )} */}
              
              {title2 === "website" ? (
      <a href={item.link} target="_blank" rel="noreferrer">
        Click here to visit the website
      </a>
    ) : title2 === "youtube" ? (
      <a href={item.link} target="_blank" rel="noreferrer">
        Click here to see the video
      </a>
    ) : (
     ""
    )}
              <span className="t-summary">
                {/* short-summary */}
                {title2 === "directCase"?(
                  <p id="casedetail" >Case Detail</p>
                ):(
                  <p id="casedetail">short-summary</p>
                )}
               
                {selectedSummary === item.summary ? (
                  <div>
                    <p className="t-backend-summary">{item.summary}</p>
                    <button
                      className="t-button"
                      onClick={() => handleSummaryClick(item.summary)}
                    >
                      Close &larr;
                    </button>
                  </div>
                ) : (
                  <button
                  style={{display:"flex",alignItems:"center"}}
                    className="t-button"
                    onClick={() => {
                      if (title2 === "directCase") {
                        // Navigate to case details page using useNavigate
                        navigate(`/disease/${disease}/${title1}/${title2}/${item.caseId}`); // Replace with the actual path
                      } else {
                        handleSummaryClick(item.summary);
                      }
                    }}
                    >
                    Click here 
                    <MdOutlineArrowRight style={{marginLeft:"-3px"}} size={20} /> 
                  </button>
                )}
              </span>
              <span className="t-rating">
                <p1>Our Rating for this data </p1>
                <p2>{item.rating}/10</p2>
              </span>
              <span className="t-comment">
                <p1>Comments</p1>
                <p2>{item.comment}</p2>
              </span>
              <img
                className="t-rb-img2"
                src="/Images/Vector6.png"
                alt="sorry"
              />
              <img
                className={`t-rb-img1 ${
                  selectedSummary === item.summary
                    ? "selected-summary-img1"
                    : ""
                }`}
                src="/Images/Vector7.png"
                alt="sorry"
              />
              <span className="t-id">
                <p1>ID:</p1>
                {title2 === "directCase"?(
                  <p2>{item.caseId}</p2>
                ):(
                  <p2>{item.id}</p2>
                )}
                
              </span>
            </div>
          ))}
          {/* </> */}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
