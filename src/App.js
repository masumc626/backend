import './App.css';
import { useState } from 'react';
import { idContext } from './components/context/id_context';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BasicInfoForm from './components/addProperty/Basic/basic';
import GeneralFormInfo from './components/addProperty/General/general';
import LocationFormInfo from './components/addProperty/Location/location';
import PropertyFormInfo from './components/addProperty/Property/property';


import Protected from './components/Routes/routes';


function App() {
  const [basicid, setbasicid] = useState("");
  const [propertyid, setpropertyid] = useState("");
  const [generalid, setgeneralid] = useState("");
  const [locationid, setlocationid] = useState("");

  return (
    <>
      <idContext.Provider value={{ basicid, setbasicid, propertyid, setpropertyid, generalid, setgeneralid, locationid, setlocationid }}>
        <BrowserRouter>
          <Routes>
            <Route path='/basicinfo' element={<Protected><BasicInfoForm /></Protected>} />
            <Route path='/propertyinfo' element={<Protected><PropertyFormInfo /></Protected>} />
            <Route path='/generalinfo' element={<Protected><GeneralFormInfo /></Protected>} />
            <Route path='/locationinfo' element={<Protected> <LocationFormInfo /></Protected>} />
            <Route path="*" element={<center style={{ color: "red", fontSize: "45px" }}>' 404 Page not found'</center>} />
          </Routes>
        </BrowserRouter>
      </idContext.Provider>
    </>

  );
}

export default App;
