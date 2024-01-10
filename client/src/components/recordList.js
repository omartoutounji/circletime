import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DirectionsIcon from '@mui/icons-material/Directions';
import Grid from '@mui/material/Unstable_Grid2';
import CallIcon from '@mui/icons-material/Call';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import { getDistance, getBoundsOfDistance } from 'geolib';
const Record = (props) => (
  <Card sx={{ maxWidth: 345}}>
  <CardContent>
    <Typography variant="h5" component="div">
      {props.record.name}
    </Typography>
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
    {props.distance/1000} kms away from you
    </Typography>
    <Typography variant="body2">
    <Button href={props.record.url} variant="outlined" startIcon={<LinkIcon />}>
  Website
</Button>
      <br />
      <Button href={"tel:" + props.record.tel} variant="outlined" startIcon={<CallIcon />}>
  Call
</Button>
    </Typography>
  </CardContent>
  <CardActions>
  <Button href={"https://www.google.com/maps/search/?api=1&query=" + props.record.lat + "," + props.record.lng} variant="contained" endIcon={<DirectionsIcon />}>
  Directions
</Button>
  </CardActions>
  </Card>
//  <tr>
//    <td>{props.record.name}</td>
//    <td>{props.distance/1000} kms away</td>
//    <td><Link to={"https://www.google.com/maps/search/?api=1&query=" + props.record.lat + "," + props.record.lng}>{props.record.addr}</Link></td>
//    <td>{props.record.url}</td>
//    <td>{props.record.tel}</td>
//    {/* <td>
//      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
//      <button className="btn btn-link"
//        onClick={() => {
//          props.deleteRecord(props.record._id);
//        }}
//      >
//        Delete
//      </button>
//    </td> */}
//  </tr>
);
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const [position, setPosition] = useState({ latitude: 45.178588, longitude: -77.295185 });
  // This method fetches the records from the database.
 useEffect(() => {
    const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    
        // setPosition({
        //     latitude: pos.coords.latitude,
        //     longitude: pos.coords.longitude,
        // });
    };
   async function getRecords() {
     const boundingBox = getBoundsOfDistance(position, 50000);
     const response = await fetch(`https://circletime.onrender.com/record/${boundingBox[0].latitude}/${boundingBox[1].latitude}/${boundingBox[0].longitude}/${boundingBox[1].longitude}`);
      if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     const records = await response.json();
     setRecords(records);
   }
    getCoords();
    getRecords();
    console.log(position)
    console.log(getBoundsOfDistance(position, 10000))
    return;
 }, [records.length, position]);
  // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`https://circletime.onrender.com/${id}`, {
     method: "DELETE"
   });
    const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
  // This method will sort the records by distance and map out the records on the table
 function recordList() {
   return records.sort((a, b) => getDistance(position, {latitude: a.lat, longitude: a.lng}) > getDistance(position, {latitude: b.lat, longitude: b.lng}) ? 1 : -1).map((record) => {
     return (
      <Grid xs={2} sm={4} md={4}>
      <Box
      component="section"
      sx={{mx: '2px', transform: 'scale(0.8)'}}
    >
      <Record
         record={record}
         distance={getDistance(position, {latitude: record.lat, longitude: record.lng})}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
    </Box>
    </Grid>
     );
   });
 }
  // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>EarlyONs near you</h3>
     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {recordList()}
      </Grid>
   </div>
 );
}