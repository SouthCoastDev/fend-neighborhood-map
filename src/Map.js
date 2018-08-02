import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import CustomMarker from './CustomMarker'

 			  
class Map extends Component {
	

	
	mapLocation = (map) =>{
		
		var mapNewCenter = map.props.mapCenter
		console.log(mapNewCenter)
		let newMapCenterLat = mapNewCenter.lat
		let newMapCenterLng = mapNewCenter.lng  
		//this.props.mapLocationChanged(newMapCenterLat,newMapCenterLng)
		console.log(`newLat: ${newMapCenterLat} and newLng ${newMapCenterLng}`)
	
  }
	
    render() {
        const { mapCenter, locations, selectedMarker, openWindow, closeWindow , mapLocationChanged } = this.props

	
        return (
            GoogleMap ? (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={mapCenter}
                options = { {streetViewControl: false, mapTypeControl: false} }
				onPositionChanged ={ () => { this.mapLocation(this)}}

			>
				
                {/*This will iterate over all of the location venues and will populate the map with locations animation and infowindow state will change according to marker/itemlist onClick*/}
                {locations.map((venue, i) => (
                    <CustomMarker
                        key={i}
                        id={venue.venueId}
                        position={venue.venuePosition}
                        title={venue.venueName}
                        animation={!!selectedMarker && venue.id === selectedMarker.id ? 1 : 2}
                        openwindow={() => openWindow(venue)}
                        closewindow={closeWindow}
                        isOpen={!!selectedMarker && venue.id === selectedMarker.id}
                        >
                    </CustomMarker>
                    ))
                }
            </GoogleMap> 
            ) : (
                <div><p> Something went wrong! GoogleMaps didn't work! </p></div>
            )
        )
    }
}

export default withScriptjs(withGoogleMap((Map)))