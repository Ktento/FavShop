import { supabase } from './supabase';

// ログインできるかを取得するための非同期関数
export const Login = async (id:string,pass:string):Promise<boolean> => {
// todoテーブルからすべてのカラムを取得し、todosに代入します。
let {data:userinfo,error} = await supabase.from("User").select('*').eq('user_id', id).eq('password', pass);
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
