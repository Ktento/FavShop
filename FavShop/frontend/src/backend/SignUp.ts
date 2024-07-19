import { supabase } from './supabase';

// ログインできるかを取得するための非同期関数
export const InsertUser = async (name:string,pass:string):Promise<boolean> => {
// todoテーブルからすべてのカラムを取得し、todosに代入します。
let {status,statusText} = await supabase.from("users").insert({user_name:name,user_pass:pass});
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
