import React, {Component} from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

class CustomMarker extends Component {
    render() {
        return (

            <Marker
                key = { this.props.index }
                id = { this.props.venueId }
                position = { this.props.position }
                title = { this.props.title }
                animation = { this.props.animation }
                onClick = { this.props.openwindow }
            >
		        {this.props.isOpen &&
                    <InfoWindow
                    onCloseClick = { this.props.closewindow }
                    >
                        <div>
                            <h4 className = "venue">{this.props.title}</h4>
                            <div className = "address"><p>{this.props.address}</p></div>
                            <div className = "attribution"><p>Location Data from : FourSquare API</p></div>
                        </div>
                    </InfoWindow>
	 	        }
		    </Marker>
        )
    }
}

export default CustomMarker
