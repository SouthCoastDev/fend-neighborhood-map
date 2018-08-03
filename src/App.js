import React, { Component } from 'react'
import './App.css';
import Header from './Header'
import SideBar from './SideBar'
import Footer from './Footer'
import Map from './Map';


class App extends Component {
 
  state = {
    //app defaults
    initialMapLatLng: {lat:40.5748434, lng:-73.9804504},
    mapCenter: {lat:40.5748434, lng:-73.9804504},
    query : 'food',
    zoom: 14,
    selectedMarker: '',
	  chosenVenue: null,
    locations: [],
  	filteredLocations : [],
    menuHidden: false,
    googleAPIKey: "AIzaSyB-9uIpr6zMqh5ivdYUzll0aiPrejC31D0"
  }


  setChosenVenue = (chosenVenue) => {
	  this.setState({ chosenVenue : chosenVenue})
  }
  
  resetChosenVenue = () => {
	  this.setState({ chosenVenue : null})
  }
  
  toggleSideBar = () => {
    if(this.state.sideBarOpen){
      this.setState({ sideBarOpen: false })
    } else {
      this.setState({ sideBarOpen: true })
    }
  }

  setFilteredVenues = (venues) => {
    console.log(venues)
    this.setState({
       filteredLocations 
    })
  }


  mapLocationChanged = (newLat,newLng) => {
	 console.log(`app BEFORE state for map center: ${this.state.mapCenter.lat} , ${this.state.mapCenter.lng}`) 
	
	this.setState({
		mapCenter : {lat:newLat , lng:newLng}
	})

    console.log(`app state for map center: ${this.state.mapCenter.lat} , ${this.state.mapCenter.lng}`)
	console.log(this.state.locations)
    fetch(`https://api.foursquare.com/v2/venues/explore?ll=${this.state.mapCenter.lat},${this.state.mapCenter.lng}&query=${this.state.query}&v=20180728&limit=20&intent=browse&radius=700&client_id=HL2DKKQVAF2R03TLS5GNWB4WXDTV1FGEZHNRNIN4VTD1V44S&client_secret=GA2DERTJQTIC1ZBE3G3I2UPNRE4I00OS0DR2GYJPE14IGCSJ&X-RateLimit-Remaining`)
    .then(res => res.json())
	.catch((e) => alert(`Oh no! Something went wrong No places can be found. This is a problem with the Foursquare API Key! The error is: ${e}`))
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
      }).catch((e) => alert(`Oh no! Something went wrong No places can be found. This is a problem with the Foursquare Data! The error is: ${e}`))
  }
   
  componentDidMount () {
    console.log("component did mount ran....")
    //When the app mounts then get the correct list of venues to show based off of what the user has selected.
    fetch(`https://api.foursquare.com/v2/venues/explore?ll=${this.state.mapCenter.lat},${this.state.mapCenter.lng}&query=${this.state.query}&v=20180728&limit=20&intent=browse&radius=700&client_id=HL2DKKQVAF2R03TLS5GNWB4WXDTV1FGEZHNRNIN4VTD1V44S&client_secret=GA2DERTJQTIC1ZBE3G3I2UPNRE4I00OS0DR2GYJPE14IGCSJ&X-RateLimit-Remaining`)
    .then(res => res.json())
	.catch((e) => alert(`Oh no! Something went wrong No places can be found. This is a problem with the Foursquare API Key! The error is: ${e}`))
    .then(data=>{
        let venueInfo = []
        data.response.groups[0].items.forEach(element => {
          venueInfo.push({
            venueId : element.venue.id,
            venueName : element.venue.name,
            venueAddress : element.venue.location.address,
            venueLat : element.venue.location.lat,
            venueLng : element.venue.location.lng,
			venuePosition : {lat:element.venue.location.lat,lng:element.venue.location.lng}
          })
        });

        this.setState(
          {//locations:data.response.groups[0].items,
            locations : venueInfo
          }
        )
      }).catch((e) => alert(`Oh no! Something went wrong No places can be found. This is a problem with the Foursquare Data! The error is: ${e}`))

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
          <SideBar
              onClick = { this.setChosenVenue }
              onChange = { this.setFilteredVenues }
              venues = { this.state.locations }
              toggleSideBar = { this.toggleSideBar }
              menuHidden = { this.state.menuHidden }         
          />
        </div>
        
        <div id="map" className="map-container" role="application" tabIndex="2">
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.state.googleAPIKey}&v=3`}
              loadingElement = {<div style={{ height: `100%` }} />}
              containerElement = {<div style={{ height: `100%` }} />}
              mapElement = {<div style={{ height: `100%` }} />}
              mapCenter = { this.state.mapCenter }
              zoom = { this.state.zoom}
              locations = { this.state.locations }
              selectedMarker = { this.state.chosenVenue }
              openWindow = { this.setChosenVenue }
              closeWindow = { this.resetChosenVenue }
			        mapLocationChanged = { this.mapLocationChanged }
              />
        </div>

        <Footer/>
        
      </div>

    );
  }
}

export default App
