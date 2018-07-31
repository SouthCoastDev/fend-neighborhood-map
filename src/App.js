import React, { Component } from 'react'
import './App.css';
import Header from './Header'
import ListOfLocations from './ListOfLocations'
import Footer from './Footer'
import Map from './Map';


class App extends Component {
 
  state = {
    //app defaults
    initialMapLatLng: {lat:40.5748434, lng:-73.9804504},
    initialZoom: 8,
    mapCenter: {lat:40.5748434, lng:-73.9804504},
    query : 'food',
    zoom: 14,
    selectedMarker: '',
    locations: [],
    menuHidden: false,
  }

  markerClicked = (latlng , marker , e) => {
    this.setState({
      selectedMarker : marker,
      mapCenter : latlng 
    })
  }

  toggleInfoWindow = (e) => {
    alert("toggleInfo window clicked")
    this.setState({
      selectedMarker: -1,
      mapCenter: this.state.initialMapLatLng,
      zoom: this.state.initialZoom
    })
  }

  toggleMenu = (e) => {
    document.querySelector('.sideBar').classList.toggle('sideBarOpen')
  }


  mapLocationChanged = (newLat,newLng) => {
    console.log(this.state.mapCenter)
    this.setState({
      mapCenter : {lat: newLat , lng : newLng},
      zoom: this.state.initialZoom
    })
    console.log(this.state.mapCenter)
    fetch(`https://api.foursquare.com/v2/venues/explore?ll=${this.state.mapCenter.lat},${this.state.mapCenter.lng}&query=${this.state.query}&v=20180728&limit=20&intent=browse&radius=700&client_id=3ZMMJ4ILVNNDS1JYMCECBINOWFVCV40STL0OU0XGTRRJ0QZC&client_secret=BLLQ4L2SUYCBZNZODXZRLRIPLMGNN34R5HQUZXHUDZ1VSBJG&X-RateLimit-Remaining`)
    .then(res => res.json())
    .then(data=>{
        let venueInfo = []
        data.response.groups[0].items.forEach(element => {
          venueInfo.push({
            venueId : element.venue.id,
            venueName : element.venue.name,
            venueAddress : element.venue.location.address,
            venueLat : element.venue.location.lat,
            venueLng : element.venue.location.lng
          })
        });

        this.setState(
          {//locations:data.response.groups[0].items,
            locations : venueInfo
          }
        )
      })
  }
   
  componentDidMount () {
    console.log("component did mount ran....")
    //When the app mounts then get the correct list of venues to show based off of what the user has selected.
    fetch(`https://api.foursquare.com/v2/venues/explore?ll=${this.state.mapCenter.lat},${this.state.mapCenter.lng}&query=${this.state.query}&v=20180728&limit=20&intent=browse&radius=700&client_id=3ZMMJ4ILVNNDS1JYMCECBINOWFVCV40STL0OU0XGTRRJ0QZC&client_secret=BLLQ4L2SUYCBZNZODXZRLRIPLMGNN34R5HQUZXHUDZ1VSBJG&X-RateLimit-Remaining`)
    .then(res => res.json())
    .then(data=>{
        let venueInfo = []
        data.response.groups[0].items.forEach(element => {
          venueInfo.push({
            venueId : element.venue.id,
            venueName : element.venue.name,
            venueAddress : element.venue.location.address,
            venueLat : element.venue.location.lat,
            venueLng : element.venue.location.lng
          })
        });

        this.setState(
          {//locations:data.response.groups[0].items,
            locations : venueInfo
          }
        )
      })

  }




  render() {
    
    return (
      
      <div className="App main" role="main" >

        <div tabIndex="0">
          <Header
            toggleMenu = {this.toggleMenu}
          />
        </div>

        <div className="sideBar">
          <ListOfLocations 
            markerClicked = {this.state.markerClicked}
            locations = {this.state.locations}
            currentSearch = {this.state.currentSearch}
            isHidden = {this.state.menuHidden}
            selectNewLocation = {this.selectNewLocation}
          />
        </div>
        
        <div id="map" className="map-container" role="application" tabIndex="2">
        <Map 
        
        markerClicked = {this.markerClicked}
        toggleInfoWindow = {this.toggleInfoWindow}
        locations = {this.state.locations}
        containerElement = {<div style={{height:100+'%'}}/>}
        mapElement = {<div style={{height:100+'%'}}/>}
        mapLocationChanged = {this.mapLocationChanged}
        zoom = {this.state.zoom}
        mapCenter = {this.state.mapCenter}
  
        />
        </div>

        <Footer/>
        
      </div>

    );
  }
}

export default App
