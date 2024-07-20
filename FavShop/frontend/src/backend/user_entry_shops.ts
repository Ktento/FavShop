import { supabase } from './supabase';

// 登録されている店舗を取得するための非同期関数
export const user_entry_shops = async (user_id:Number):Promise<{ success: boolean; place_ids?:string[]}> => {
// entry_shopテーブルからuser_idが一致するplace_idカラムを取得し、userinfoに代入します。
let {data:userinfo,error} = await supabase
.from("entry_shop")
.select('place_id')
.eq('user_id', user_id);
//エラーが出たときの処理
if (error) {
    console.log(error);
    return {success:false};
  }
  // 成功時の処理
  if (userinfo&& userinfo.length > 0) {
    const place_ids = userinfo.map(entry => entry.place_id);
    return { success: true, place_ids };
  }

  // 失敗時の処理
  return { success: false };

};

/*テスト用のコード*/
/*
const user_id=5;
user_entry_shops(user_id).then(result => {
  console.log(result);
})*/