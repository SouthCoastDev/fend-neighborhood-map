import React , { Component } from 'react'

class LocationListItem extends Component {


    venueClicked = () => {
        this.props.venueClicked(this.props.venue)
    }

    render (){

        return (
            <li onClick={this.onClick}
                onKeyPress={this.onClick}
                className='list-item'
                aria-labelledby='location'
                key={this.props.venue.id}
                tabIndex={0}
                role='location list button'>
                {this.props.venue.name}
            </li>
        )
    }


}

export default LocationListItem