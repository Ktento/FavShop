import { supabase } from './supabase';

// すべてのTodoを取得するための非同期関数
export const getAllTodos = async () => {
// todoテーブルからすべてのカラムを取得し、todosに代入します。
const todos = await supabase.from("User").select('*');
// todosのデータをログに出力します。
console.log(todos.data);
};

getAllTodos();