/**
 * Created by 11459 on 2019/2/27.
 */
import ajax from './ajax'
import jsonp from 'jsonp';

// const prefix = 'http://localhost:5000'
const prefix = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000'

export const reqLogin = (username,password) => ajax(prefix+'/login', {username, password}, 'POST');

export const reqAddUser = user => ajax(prefix+'/manage/user/add', user, 'POST');

export const reqCategory = parentId => ajax(prefix + '/manage/category/list' , {parentId})

export const reqWeather = city => {

     return new Promise((resolve,reject) =>{
        jsonp(
           `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
           ,{},
           (err, data) => {
             if (!err) {
               //请求成功
               resolve(data.results[0].weather_data[0])
             } else {
               //请求失败
               console.log('天气请求失败：', err);
               reject('天气请求失败~');
             }
           })
     })
}