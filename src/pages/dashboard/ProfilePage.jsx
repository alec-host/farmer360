import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

import { getSession } from "../../session/appSession";
import { PROFILE_SESSION } from "../../session/constant";

const Profile = () => {

  const [storeData, setStoreData] = useState([]);

  const refIframe = React.useRef(null);

  const defaultUrl = "/dashboard/edit-profile/contact";

  const [iframeUrl, setIframeUrl] = useState(defaultUrl);
  
  useEffect(() =>{
    const stored_data = getSession(PROFILE_SESSION);
    if (stored_data) {
      setStoreData(stored_data);
    }
  },[]);

  const handleOnClick = (e,page) => {
    e.preventDefault();
    setIframeUrl(page);
  };  

  return (
    <>
      <div className="container-fluid" style={{marginTop:"0px",background:"#F9F9F9",height:"auto"}}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="nav flex-column" style={{paddingTop:"10px",paddingLeft:"20px",paddingBottom:"10px"}}>
                <Avatar 
                    colors={['#FCCF0A', '#0B51C1', '#3A6024','#B3003C','#7E3794','#F2855C']}
                    name={storeData[0]?.email} 
                    size={85}
                    round={true} 
                />
              </div>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <h5 style={{paddingLeft:"18px"}}><strong>{ storeData[0]?.first_name === "N/A" && storeData[0]?.last_name === "N/A" ? storeData[0]?.business_name : storeData[0]?.first_name + ' ' + storeData[0]?.last_name}</strong></h5>
                </li>
                <li className="nav-item">
                  <span>&nbsp;</span>
                </li>                
                <li className="nav-item">
                    <Link className="nav-link d-flex align-items-center gap-3" onClick={(e)=>handleOnClick(e,"/dashboard/edit-profile/contact")} style={{color:"#0B51C1"}} to="#">
                      Basic Info
                    </Link>
                </li>  
                {   
                  storeData[0]?.first_name === "N/A" && storeData[0]?.last_name === "N/A"  ? 
                  null:         
                  <li className="nav-item">
                      <Link className="nav-link d-flex align-items-center gap-3" onClick={(e)=>handleOnClick(e,"/dashboard/edit-profile/demographic")} style={{color:"#0B51C1"}} to="#">
                        Demographic Info
                      </Link>
                  </li> 
                }
                <li className="nav-item">
                    <Link className="nav-link d-flex align-items-center gap-3" onClick={(e)=>handleOnClick(e,"/dashboard/connect-share-stories")} style={{color:"#0B51C1"}} to="#">
                      Connect & Share Stories
                    </Link>
                </li>  
                <li className="nav-item">
                    <Link className="nav-link d-flex align-items-center gap-3" onClick={(e)=>handleOnClick(e,"/dashboard/wallet/wallet")} style={{color:"#0B51C1"}} to="#">
                      Wallet
                    </Link>
                </li>              
                <li className="nav-item">
                    <Link className="nav-link d-flex align-items-center gap-3" onClick={(e)=>handleOnClick(e,"/dashboard/edit-profile/upgrade")} style={{color:"#0B51C1"}} to="#">
                      Subscription Info
                    </Link>
                </li>                                            
                <li className="nav-item">
                    <Link className="nav-link d-flex align-items-center gap-3" onClick={(e)=>handleOnClick(e,"/dashboard/edit-profile/security")} style={{color:"#0B51C1"}} to="#">
                      Sign-in and Security
                    </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-9">
              <div className="row col-md-15">
                  <div className="section">
                      <div style={{position:"relative",paddingBottom:"170%",width:"100%",height:"auto"}}>
                            <iframe 
                            title="profile"
                            src={iframeUrl}
                            style={{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"}}
                            allowFullScreen={true}
                            ref={refIframe}
                            >no iframe</iframe>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
