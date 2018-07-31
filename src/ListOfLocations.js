import React , { Component } from 'react'

class ListOfLocations extends Component {

    render (){


        return (
            <div>
                <ul>
                {
                    this.props.locations.map((venue)=>(
                        <li key={venue.venueId}>{venue.venueName}</li>
                    ))
                        
                    
                }
                </ul>
            </div>
        )
    }


}

export default ListOfLocations