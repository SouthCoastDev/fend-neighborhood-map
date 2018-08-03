import React , { Component } from 'react'
import LocationListItem from './LocationListItem'

class SideBar extends Component {

    state = {
        currentFilter : ""
    }

    filter = (e) => {
        this.setState({
             currentFilter: e.target.value
        });
        this.props.onChange(this.filterVenues(this.props.venues, e.target.value));
    }

    filterVenues = (venues, filterBy) => venues.filter(venue => {
        venue = venue.venueName.toLowerCase()
        venue.includes(filterBy.toLowerCase())
        
    })


    componentDidMount() {
        this.props.onChange(this.props.venues);
    }
    



    render () {

        console.log(`this props venues: ${this.props.venues}`)

        const venueItemsToShow = this.filterVenues(this.props.venues, this.state.filterBy).map((venue) => {
            return (
                <LocationListItem
                    venue={venue.venueName}
                    key={venue.venueId} 
                    onClick={this.props.onClick}
                    onKeyPress={this.props.onClick}
                />
            )
        })



        return (
            <div className='search'>

            <input 
                className='search-text'
                placeholder='Search for a venue here' 
                type="text"  
                role='search'            
                onChange={this.filterVenues} 
                value={this.state.currentFilter} 
                aria-labelledby='search'              
            />

            <button 
                className='filter-button'
                role='button hide-search'
                onClick={this.props.toggleSideBar}
            >
            Search                            
            </button>

            <ul className ='search-list-items'>
                {this.props.menuHidden &&
                    venueItemsToShow
                }
            </ul>

        </div>
            
        )
    }


}

export default SideBar

