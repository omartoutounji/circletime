import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 export default function Edit() {
 const [form, setForm] = useState({
    name: "",
    addr: "",
    tel: "",
    lat: "",
    lng: "",
    url: "",
 });
 const params = useParams();
 const navigate = useNavigate();
  useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     console.log(id)
     const response = await fetch(`https://circletime.onrender.com/record/${params.id.toString()}`);
      if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     console.log(response)
      const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
      console.log(record)
      setForm(record);
   }
    fetchData();
    return;
 }, [params.id, navigate]);
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
    name: form.name,
    addr: form.addr,
    tel: form.tel,
    lat: form.lat,
    lng: form.lng,
    url: form.url,
   };
    // This will send a post request to update the data in the database.
   await fetch(`https://circletime.onrender.com/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
    navigate("/");
 }
  // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update {form.name}</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="address">Address: </label>
         <input
           type="text"
           className="form-control"
           id="address"
           value={form.addr}
           onChange={(e) => updateForm({ addr: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="number">Number: </label>
         <input
           type="text"
           className="form-control"
           id="number"
           value={form.tel}
           onChange={(e) => updateForm({ tel: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="latitude">Latitude: </label>
         <input
           type="text"
           className="form-control"
           id="latitude"
           value={form.lat}
           onChange={(e) => updateForm({ lat: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="longtitude">Longitude: </label>
         <input
           type="text"
           className="form-control"
           id="longtitude"
           value={form.lng}
           onChange={(e) => updateForm({ lng: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="url">Website URL: </label>
         <input
           type="text"
           className="form-control"
           id="url"
           value={form.url}
           onChange={(e) => updateForm({ url: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update EarlyON"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}