import React, { useEffect, useState } from "react";
import { getDistance } from 'geolib';
import { Link } from "react-router-dom";
const Record = (props) => (
 <tr>
   <td>{props.record.name}</td>
   <td>{props.distance/1000} kms away</td>
   <td><Link to={"https://www.google.com/maps/search/?api=1&query=" + props.record.lat + "," + props.record.lng}>{props.record.addr}</Link></td>
   <td>{props.record.url}</td>
   <td>{props.record.tel}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const [position, setPosition] = useState({ latitude: null, longitude: null });
  // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:1000/record/`);
      if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const records = await response.json();
     setRecords(records);
   }
    getRecords();
    navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        });
    });
    return;
 }, [records.length]);
  // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:1000/${id}`, {
     method: "DELETE"
   });
    const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
  // This method will sort the records by distance and map out the records on the table
 function recordList() {
   return records.sort((a, b) => getDistance(position, {latitude: a.lat, longitude: a.lng}) > getDistance(position, {latitude: b.lat, longitude: b.lng}) ? 1 : -1).map((record) => {
     return (
       <Record
         record={record}
         distance={getDistance(position, {latitude: record.lat, longitude: record.lng})}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
  // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>EarlyONs near you</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Distance</th>
           <th>Address</th>
           <th>Website</th>
           <th>Number</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}