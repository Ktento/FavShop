import { supabase } from './supabase';

// User_idからuser_nameを取得するための非同期関数
export const find_username = async (user_id:Number):Promise<{ success: boolean; user_name?: string }> => {
// usersテーブルからuseridに紐づいたusernamを取得
let {data:userinfo,error} = 
await supabase.from("users").select('user_name').eq('user_id', user_id).single();
if (error) {
    console.log(error)
  }
  // 認証成功時の処理
  if (userinfo) {
    return { success: true, user_name: userinfo.user_name };
  }

  // 認証失敗時の処理
  return { success: false };

};

/*テスト用のコード*/
/*
const user_id=3;
findusername(user_id).then(result => {
  console.log(result.user_name);
});*/