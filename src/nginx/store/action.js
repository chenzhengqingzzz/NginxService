import request from "../../utils/request"
import { message } from 'antd';
import * as ActionTypes from './actionTypes';

export const getAllPhoto = () =>{
    return (dispatch) =>{
        request('POST', "http://180.76.112.178:8080/demo/nginx/getAllPhoto", {
            'cmd': 'getTemplates',
            'type': 'request',
            'request': {

            }
          }).then(obj => {
            // debugger
            const res = obj;
            if (res.res) {
              const message = res.message;
             console.log(message)
             dispatch(getAllPhotoRequest(message))
            } else {
              message('获取模版文件失败', 3);
            }
          }).catch(e =>console.log(e))
        }
    }


    const getAllPhotoRequest = (data) =>({
        type: ActionTypes.GETTEMPLATEFILE,
        data
      })