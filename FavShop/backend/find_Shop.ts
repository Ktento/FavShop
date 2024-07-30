import axios from "axios";
require('dotenv').config();
interface Place {
    name: string;
    address: string;
    location: {
      lat: number;
      lng: number;
    };
}


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
