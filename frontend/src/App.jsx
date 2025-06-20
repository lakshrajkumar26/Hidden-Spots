import { useState, useEffect } from 'react'
import './App.css'
import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import { format } from "timeago.js"
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import 'mapbox-gl/dist/mapbox-gl.css';
import Register from './components/Register';
import Login from './components/login';

function App() {
  const myStorage = window.localStorage;
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser,setCurrentUser] = useState(myStorage.getItem("user"));
  //title /desc / rating 
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [rating, setRating] = useState(0)
  //pins
  const [pins, setPins] = useState([])
  //state
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  //add new place
  const [newPlace, setNewPlace] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 26.2313,
    longitude: 78.1695,
    zoom: 14,
  });

  //to fetch all pins in starting    => not need to write localhost/..  used proxy
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/api/pins");
        setPins(res.data);
        console.log(res.data)
      }
      catch (err) {
        console.log("error occrured in fetching pins", err)
      }
    }

    //calling
    getPins();
  }, [])
  // const [showPopup, setShowPopup] = useState<boolean>(true);

  //3 
  // const handleMarkerClick = (id,lat ,long) => {
  //   setCurrentPlaceId(id);
  //   setViewState({...viewState,latitude : lat, longitude:long})
  //   console.log(id,lat,long);
  // }
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState((prev) => ({
      ...prev,
      latitude: lat,
      longitude: long,
    }));
  };

  const handleAddClick = (e) => {
    //  const [long,lat]= e.lngLat;
    setNewPlace({
      lat: e.lngLat.lat, long: e.lngLat.lng
    })
    console.log(e.lngLat)
  }

  const apiUrl = import.meta.env.VITE_MAPBOX;
  const handleSumbit = async (e) => {

    e.preventDefault();
    const newPin = {
      username: currentUser,
      title: title,
      desc: desc,
      rating: rating,
      lat: newPlace.lat,
      long: newPlace.long,
    }
    try {
      const res = await axios.post("/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
<>
    <Map
      mapboxAccessToken={apiUrl}
      viewState={viewState}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onDblClick={handleAddClick}
      onMove={evt => setViewState(evt.viewState)}
      transitionDuration="200"
    >
      {pins.map(p => (


        <React.Fragment key={p._id}>
          <Marker
            longitude={p.long}
            latitude={p.lat}
            offsetLeft={-20}
            offsetTop={-10}
            anchor="bottom" >
            <div>you are here</div>

            <RoomIcon
              //2 id passed
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              style={{
                fontSize: Math.min(viewState.zoom * 5, 40),
                color: p.username === currentUser ? "tomato" : "slateblue",
                cursor: "pointer"
              }} />

          </Marker>

          {p._id === currentPlaceId && (
            <Popup longitude={p.long} latitude={p.lat}
              anchor="left"
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className='card'>
                <label>Place</label>
                <h4 className='place'>{p.title}</h4>
                <label>Review</label>
                <p className='desc'> {p.desc}</p>
                <label>Rating</label>
                <div className='stars'>
                  {Array(p.rating).fill(<StarIcon className='star' />)}

                </div>


                <label>Information</label>
                <span className='username'>Created by <b>{p.username}</b></span>
                <span className='date'>{format(p.createdAt)}</span>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
      {newPlace && (
        <Popup longitude={newPlace.long} latitude={newPlace.lat}
          anchor="left"
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
        >

          <div><form onSubmit={handleSumbit}>
            <label >Title</label>
            <input type="text" placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="Review">
              <textarea placeholder="give review" onChange={(e) => setDesc(e.target.value)} />
              <label htmlFor="">Rating</label>
              <select onChange={(e) => setRating(Number(e.target.value))}>
                <option value="1">⭐ 1</option>
                <option value="2">⭐ 2</option>
                <option value="3">⭐ 3</option>
                <option value="4">⭐ 4</option>
                <option value="5">⭐ 5</option>
              </select>
              <button className='submitButton' type='submit'>Submit</button>
            </label>
          </form>
          </div>
        </Popup>
      )}
      {currentUser ? (<button className='button logout' onClick={handleLogout}>Log out</button>) : (<div className="button-container">
        <button className='button login' onClick={ ()=> setShowLogin(true)}>Login</button>
        <button className='button register' onClick={ ()=> setShowRegister(true)}>Register</button>
        </div>
      )} 
      
    </Map>
    {showRegister && <Register setShowRegister={setShowRegister}/>}
    {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage}  setCurrentUser={setCurrentUser}/> }

</>

  )
}

export default App
