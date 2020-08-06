import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import './Map.css'
import { showDataOnMap } from "../utils";

function Map({ center, zoom, countries, cases }) {
    console.log(countries)
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">
                    OpenStreetLeaflet</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countries, cases)}
            </LeafletMap>
        </div>
    )
}

export default Map
