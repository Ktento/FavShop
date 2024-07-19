import { supabase } from './supabase';

// ログインできるかを取得するための非同期関数
export const Login = async (user_name:string,pass:string):Promise<boolean> => {
// todoテーブルからすべてのカラムを取得し、todosに代入します。
let {data:userinfo,error} = await supabase.from("users").select('*').eq('user_name', user_name).eq('user_pass', pass);
if (error) {
    console.log(error)
  }
  if(userinfo==null){
    return false;
  }else if(userinfo.length<=0){
    return false;
  }else{
    return true;
  }

};
/*テスト用のコード
const user="Ktento";
const pass="Kento0721";
console.log(Login(user,pass))*/