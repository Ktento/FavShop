import { supabase } from './supabase';

// ログインできるかを取得するための非同期関数
export const Login = async (user_name:string,pass:string):Promise<{ success: boolean; user_id?: number }> => {
// todoテーブルからすべてのカラムを取得し、todosに代入します。
let {data:userinfo,error} = await supabase.from("users").select('user_id').eq('user_name', user_name).
eq('user_pass', pass).single();;
if (error) {
    console.log(error)
  }
  // 認証成功時の処理
  if (userinfo) {
    return { success: true, user_id: userinfo.user_id };
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