import React , { Component } from 'react'

class LocationListItem extends Component {


    venueClicked = () => {
        this.props.venueClicked(this.props.venueId)
    }

    render (){

        return (
            <li
                className = "venueItem"
                onClick = {this.venueClicked}
                onKeyPress = {this.venueClicked}
                key = {this.props.venue.venueId}
                aria-labelledby='venue list item'
                role='list-item button'> 
            >
            {this.props.venue.venueName}
            </li>
        )
    }


}

export default LocationListItem