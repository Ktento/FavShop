import { supabase } from './supabase';

// お気に入りの店舗の削除をするための非同期関数
export const DeleteFavShop = async (user_id:number,place_id:string):Promise<boolean> => {
// entry_shopから行を削除
let {status,statusText} = await supabase.from("entry_shop").delete().eq('user_id',user_id).
eq('place_id',place_id);
if (status==201||status === 204) {
    return true;
  }else{
    console.log("ERROR")
    console.log(status,statusText);
    return false;
  } 
};
    /*テスト用のプログラム*/
    /*
    const user="5";
    const pass="passss"
    InsertShop(user,pass);*/
