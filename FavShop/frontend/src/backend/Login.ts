import { supabase } from './supabase';

// ログインできるかを取得するための非同期関数
export const Login = async (user_name:string,pass:string):Promise<{ success: boolean; user_id?: number;username?:string}> => {
// todoテーブルからすべてのカラムを取得し、todosに代入します。
let {data:userinfo,error} = await supabase.from("users").select('user_id,user_name').eq('user_name', user_name).
eq('user_pass', pass);
if (error) {
    console.log(error)
  }
  // 認証成功時の処理
  if (userinfo&& userinfo.length > 0) {
    return { success: true, user_id: userinfo[0].user_id, username: userinfo[0].user_name };
  }

  // 認証失敗時の処理
  return { success: false };

};

/*テスト用のコード*/
/*
const user="Ktento";
const pass="Kento0s721";
Login(user, pass).then(result => {
  console.log(result.success);
});*/