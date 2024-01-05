import React,{ useState, useEffect } from "react";

import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import API_END_POINT from "../../../../endpoint/apiRoute";
import { getSession, setSession } from "../../../../session/appSession";
import { PROFILE_SESSION } from "../../../../session/constant";

const UpgradeBusinessSubscriptionPage = () => {

  const [storeData, setStoreData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [trackDataChange,setTrackDataChange] = useState(false);

  useEffect(() => {
    const stored_data = getSession(PROFILE_SESSION);
    if(stored_data){
      setStoreData(stored_data);
    }
  },[]);
  
  const handleSubmit = (event) => {

    let formData = {};

    event.preventDefault();

    setButtonDisabled(!buttonDisabled);

    Loading.standard({
        backgroundColor: 'rgba(0,0,0,0)',
    });

    formData.email = storeData[0]?.email || "";
    formData.owner_reference_number = storeData[0]?.reference_number || "";
    formData.subscription = storeData[0]?.subscription === "basic" ? "advance" : "basic";
    formData.account_type = storeData[0]?.account_type || "";
    formData.database_id = storeData[0]?.$databaseId || "";
    formData.table_id = storeData[0]?.$collectionId || "";
    formData.record_id = storeData[0]?.$id || "";

    fetch(`${API_END_POINT}/api/v1/switchSubscription`,{
        method:'PATCH',
        body: JSON.stringify(formData),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(async(response) => {
        await response.json().then(data=>{
            if(data?.success){
                setStoreData([data?.data]);
                Notiflix.Notify.info('Subscription switch successful',{
                    ID:'SWA',
                    timeout:2950,
                    showOnlyTheLastOne:true                      
                }); 
                setTrackDataChange(!trackDataChange); 
                setTimeout(() => {
                    window.location.reload();
                }, 2000);                
            }else{
                Notiflix.Notify.warning('Subscription switch has Failed',{
                    ID:'FWA',
                    timeout:2950,
                    showOnlyTheLastOne:true
                }); 
            }
            setButtonDisabled(buttonDisabled);
            Loading.remove(1523);
        });
    })
    .catch(async(error) => {
        console.error(await error);
    });
  };

  if(trackDataChange === true){
    setSession(PROFILE_SESSION,storeData);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container" style={{marginTop:"15px"}}>
          <div className="row">
                <table style={{width:"100%"}}>
                  <thead><tr><th/></tr></thead>
                    <tbody>
                      <tr><td><h5><strong>Subscription Information</strong></h5></td></tr>
                      <tr><td colSpan={2}><hr /></td></tr>
                      <tr>
                          <td>
                              <form onSubmit={handleSubmit}>
                                  <table style={{width:"100%"}}>
                                    <thead><tr><th/></tr></thead>
                                      <tbody>
                                        <tr>
                                            <td><h6><strong>Active package</strong></h6></td>
                                            <td style={{textAlign:"end"}}>
                                                <button className={storeData[0]?.subscription  === "free" || storeData[0]?.subscription  === "basic" ? "btn btn-success m-2" : "btn btn-danger m-2"} type="button"><i></i> {storeData[0]?.subscription  === "basic" || storeData[0]?.subscription  === "advance" ? "Downgrade" : "Upgrade"}</button>
                                            </td>                    
                                        </tr>
                                        <tr><td colSpan={2}><span style={{color:"#008000",fontSize:"18px",textTransform:"uppercase"}}><strong>{storeData[0]?.subscription}</strong></span></td></tr>
                                        <tr><td colSpan={2}><hr /></td></tr>
                                      </tbody>
                                  </table>
                              </form>
                          </td> 
                      </tr>
                    </tbody> 
                </table>    
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradeBusinessSubscriptionPage;
