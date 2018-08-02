import React, {Component} from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

class CustomMarker extends Component {

   
    render() {
        const {i, id, position, title, animation, isOpen, openwindow, closewindow} = this.props
        
        return (
            
            <Marker
                key={i}
                id={id}
                position={position}
                title={title}
                animation={animation}
                onClick={openwindow}>
		        {isOpen &&
                    <InfoWindow onCloseClick={closewindow}>
                        <div>{title}
                            <div className='attribution'>Location Data from : FourSquare API</div>
                        </div>
                    </InfoWindow>
	 	        }
		    </Marker>
        )
    }
}

export default CustomMarker