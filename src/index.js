/**
 * Created by 11459 on 2019/2/26.
 */
import React from 'react'
import {render} from 'react-dom'
import App from './App'

import {getItem} from './utils/storeUtils';
import MemoryUtils from './utils/memoryUtils';

//将localStorage的值读取出来，保存在内存中
const user = getItem();
if (user && user._id) {
  MemoryUtils.user = user;
}

render(<App/>,document.getElementById('root'))
