import { supabase } from './supabase';

// ログインできるかを取得するための非同期関数
export const InsertShop = async (user_id:string,place_id:string):Promise<boolean> => {
// entry_shopにINSERT
let {status,statusText} = await supabase.from("entry_shop").insert({user_id:user_id,place_id:place_id});
if (status==201) {
    console.log(status,statusText);
    return true;
  }else{
    console.log("ERROR")
    console.log(status,statusText);
    return false;
  } 
};
    /*テスト用のプログラム
    const user="user";
    const pass="pass"
    InsertUser(user,pass);*/
