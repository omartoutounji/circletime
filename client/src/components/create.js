import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   addr: "",
   tel: "",
   lat: "",
   lng: "",
   url: "",
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
    await fetch("https://circletime.onrender.com/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
    setForm({ name: "", position: "", level: "" });
   navigate("/");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Add EarlyON</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="address">Address</label>
         <input
           type="text"
           className="form-control"
           id="address"
           value={form.addr}
           onChange={(e) => updateForm({ addr: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="number">Number</label>
         <input
           type="text"
           className="form-control"
           id="number"
           value={form.tel}
           onChange={(e) => updateForm({ tel: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="latitude">Latitude</label>
         <input
           type="text"
           className="form-control"
           id="latitude"
           value={form.lat}
           onChange={(e) => updateForm({ lat: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="longtitude">Longitude</label>
         <input
           type="text"
           className="form-control"
           id="longtitude"
           value={form.lng}
           onChange={(e) => updateForm({ lng: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="url">Website URL</label>
         <input
           type="text"
           className="form-control"
           id="url"
           value={form.url}
           onChange={(e) => updateForm({ url: e.target.value })}
         />
       </div>
       {/* <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionIntern"
             value="Intern"
             checked={form.level === "Intern"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Intern</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionJunior"
             value="Junior"
             checked={form.level === "Junior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Junior</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionSenior"
             value="Senior"
             checked={form.level === "Senior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionSenior" className="form-check-label">Senior</label>
         </div>
       </div> */}
       <div className="form-group">
         <input
           type="submit"
           value="Add EarlyON"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}