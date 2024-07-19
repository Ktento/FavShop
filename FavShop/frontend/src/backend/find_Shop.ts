import axios from "axios";
interface Place {
    name: string;
    address: string;
    location: {
      lat: number;
      lng: number;
    };
}
let BASE_URL=process.env.REACT_APP_GOOGLE_PLACES_API_URL;
let API_KEY=process.env.REACT_APP_GOOGLE_PLACES_API_KEY;


export const searchPlaceByName = async (Shopname:string):Promise<Place[]> => {
    const response=await axios.get(BASE_URL,{
        params:{
            key:API_KEY,
            query:Shopname,
        },
    });
    return response.data.results.map((place: any) => ({
        name: place.name,
        address: place.formatted_address,
        location: place.geometry.location,
      }));
}


/*
const placeName = 'セブンイレブン'; // 検索したい店の名前
searchPlaceByName(placeName).then(places => {
  console.log('Found places:', places);
});

*/