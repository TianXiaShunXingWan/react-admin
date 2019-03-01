/**
 * Created by 11459 on 2019/2/28.
 */

let store = require('store')
export const setItem = (value) => {
  if(value && typeof value !== Function){
    store.set('user', value);
  }else{
    console.log('保存失败')
  }
}

export const getItem = () =>{
  const value = store.get('user')
  return value || ''
}

export const removeItem = () =>{
  store.remove('user')
}
