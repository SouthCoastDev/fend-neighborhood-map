import React, { Component } from "react"
import { withScriptjs, google , withGoogleMap, GoogleMap, Marker , InfoWindow , InfoWindowContent} from "react-google-maps"

class Map extends Component {

  state = {
    map : null
  }

  mapLoaded(map) {    
    //if map not null then no need to set it again.
    if(this.state.map != null){
      return
    }
      this.setState({
        map : map
      })
  }
 
  mapLocation = () =>{
    var mapNewCenter = this.state.map.getCenter()
    let newMapCenterLat = mapNewCenter.lat()
    let newMapCenterLng = mapNewCenter.lng()   
    this.props.mapLocationChanged(newMapCenterLat,newMapCenterLng)
    console.log(`newLat: ${newMapCenterLat} and newLng ${newMapCenterLng}`)
  }

 render() {

    return (
      
      <GoogleMap
        ref={this.mapLoaded.bind(this)}
        onDragEnd={this.mapLocation.bind(this)}
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.mapCenter}
        options={{streetViewControl:false, mapTypeControl: false}}
      >

      {
        this.props.locations.map((location, index) => (
          <Marker 
            key={index}   
            position = { { lat: location.venueLat, lng: location.venueLng } } 
            title = {location.venueName} 
            onClick = {(e) => {
              this.props.markerClicked( e, { lat: location.venueLat, lng: location.venueLng }, { index } ) 
            }}
            //animation = {this.props.locationInfoWindowIdToShow === location.venueId? google.maps.Animation.BOUNCE : google.maps.Animation.DROP } 
          >
          {

            (this.props.locationInfoWindowIdToShow === location.venueId) && 
            <InfoWindow  
              key={index}
              onCloseClick = {(e) => {
                this.props.toggleInfoWindow(e, { lat: location.venueLat, lng: location.venueLng }, { index }) 
              }}
            >
              <InfoWindowContent 
              key={index}           
                title = {location.venueName} 
                latlng = {{lat: location.venueLat, Lng: location.venueLng}}
                venueId = {location.venueId}
              />
            </InfoWindow>
          }
                  }
              }
          </Marker>
        ))
      }

      </GoogleMap>
    )
  }
}

export default withGoogleMap(Map)





