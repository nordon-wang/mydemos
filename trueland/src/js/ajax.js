
export default (type = 'GET', url = '', data = {}, async = true) => {
    return new Promise( (resolve, reject) => {
        // 将类型转为大写
        type = type.toUpperCase();

        // 获取xml对象
        let requestObj;
        if(window.XMLHttpRequest){
            requestObj = new XMLHttpRequest();
        }else{
            requestObj = ActiveXObject; 
        }

        if(type == 'GET'){
            // 数据拼接字符串
            let dataStr = '';
            Object.keys(data).forEach( key => {
                dataStr += key + '=' + data[key] + '&';
            });

            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));

            url = url + '?'  + dataStr;

			requestObj.open(type, url, async);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send();
        }else if(type == 'POST'){
			requestObj.open(type, url, async);
			requestObj.setRequestHeader("Content-type", "application/json");
			requestObj.send(JSON.stringify(data));
            
        }else{
            reject('error type');
        }

        // 状态更改
        requestObj.onreadystatechange = () => {
			if (requestObj.readyState == 4) {
				if (requestObj.status == 200) {
					let obj = requestObj.response
					if (typeof obj !== 'object') {
						obj = JSON.parse(obj);
                    }
					resolve(obj);
				} else {
					reject(requestObj);
				}
			}
        }
    })
}