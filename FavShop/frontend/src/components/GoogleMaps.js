export const GoogleMap = (lat,lng) => {
    const mapStyles = {
    height: "100%",
    width: "100%"
};

const defaultCenter = {
    cen_lat: lat, cen_lng:lng 
}

return (
    <LoadScript
        googleMapsApiKey='YOUR_API_KEY'>
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
        />
    </LoadScript>
)
}
