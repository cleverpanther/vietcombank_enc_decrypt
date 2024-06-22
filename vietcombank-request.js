const hp = require('./helper-functions')
const moment = require('moment')
const encrypt = require('./encrypt.js')
const _ = require('lodash')
const { CRYPT_VCB } = encrypt

const axios = require('axios')
const clientKey = 'ebdce29658904e708797f274a25fcf5f' // Key anycaptcha





const getCaptchaAny = async () => {
	const captcha_id = hp.generateImei()
	let res = await axios('https://digiapp.vietcombank.com.vn/utility-service/v1/captcha/' + captcha_id, {responseType: 'arraybuffer'})

	res = Buffer.from(res.data,'binary').toString('base64')
	let data = {
	  clientKey,
	  "task": {
	    "type": "ImageToTextTask",
	    "body": res
	  }
	}
	res = await axios({
			method: 'post',
			url: 'https://api.anycaptcha.com/createTask',
			headers: { 
			    'Content-Type': 'application/json'
			},
			data: JSON.stringify(data) 
	})
	
	const {errorId, taskId} = res.data
	if(errorId == 0){
		await hp.sleep(1500)

		data = {
		  clientKey,
		  "taskId": taskId
		}

		res =  await axios({
				method: 'post',
				url: 'https://api.anycaptcha.com/getTaskResult',
				headers: { 
				    'Content-Type': 'application/json'
				},
				data: JSON.stringify(data) 
		})
		if(res.data.errorId == 0)
			return {captcha_id, captcha_text: res.data.solution.text}
	}

}




const get_otp = async (username, browserId, browserToken) => {
	const data = {
		user: username,
		mid: 3008,
		browserId,
		browserToken,
		"DT": "Windows",
	    "PM": "Chrome 111.0.0.0",
	    "OV": "10",
		
	}
	console.log(data);

	res = await axios({
		method: 'post',
		url: 'https://digiapp.vietcombank.com.vn/authen-service/v1/api-3008',
		headers: { 
		    'Content-Type': 'application/json',
		    "Accept": "application/json",
		    "Accept-Encoding": "gzip, deflate, br",
		    "Accept-Language": "vi",
		    "Connection": "keep-alive",
		    "Content-Type": "application/json",
		    "Host": "digiapp.vietcombank.com.vn",
		    "Origin": "https =>//vcbdigibank.vietcombank.com.vn",
		    "Referer": "https =>//vcbdigibank.vietcombank.com.vn/",
		    "sec-ch-ua-mobile": '?0',
		    "sec-ch-ua-platform": "macOS",
		    "Sec-Fetch-Dest": 'empty',
		    "Sec-Fetch-Mode": 'cors',
		    "Sec-Fetch-Site": 'same-site',
		    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
		    "X-Channel": 'Web',
		    "X-Request-ID": 166119240983848
	    },
	    data: CRYPT_VCB.encryptRequest(data)


	})


	res =  JSON.parse(CRYPT_VCB.decryptResponse(res.data))
	return res


}

const get_otp_3010 = async (username, browserId, browserToken, tranId) => {
	const data = {
		user: username,
		mid: 3010,
		browserId,
		browserToken,
		type: 1,
		tranId,
		"DT": "Windows",
	    "PM": "Chrome 111.0.0.0",
	    "OV": "10",
		
	}
	console.log(data);

	res = await axios({
		method: 'post',
		url: 'https://digiapp.vietcombank.com.vn/authen-service/v1/api-3010',
		headers: { 
		    'Content-Type': 'application/json',
		    "Accept": "application/json",
		    "Accept-Encoding": "gzip, deflate, br",
		    "Accept-Language": "vi",
		    "Connection": "keep-alive",
		    "Content-Type": "application/json",
		    "Host": "digiapp.vietcombank.com.vn",
		    "Origin": "https =>//vcbdigibank.vietcombank.com.vn",
		    "Referer": "https =>//vcbdigibank.vietcombank.com.vn/",
		    "sec-ch-ua-mobile": '?0',
		    "sec-ch-ua-platform": "macOS",
		    "Sec-Fetch-Dest": 'empty',
		    "Sec-Fetch-Mode": 'cors',
		    "Sec-Fetch-Site": 'same-site',
		    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
		    "X-Channel": 'Web',
		    "X-Request-ID": 166119240983848
	    },
	    data: CRYPT_VCB.encryptRequest(data)


	})

	res =  JSON.parse(CRYPT_VCB.decryptResponse(res.data))
	return res


}

const import_otp = async (username, browserId, browserToken, tranId, otp) => {
	const data = {
		user: username,
		mid: 3011,
		browserId,
		browserToken,
		type: 1,
		tranId,
		otp,
		"DT": "Windows",
	    "PM": "Chrome 111.0.0.0",
	    "OV": "10",
		
	}
	console.log(data);

	res = await axios({
		method: 'post',
		url: 'https://digiapp.vietcombank.com.vn/authen-service/v1/api-3011',
		headers: { 
		    'Content-Type': 'application/json',
		    "Accept": "application/json",
		    "Accept-Encoding": "gzip, deflate, br",
		    "Accept-Language": "vi",
		    "Connection": "keep-alive",
		    "Content-Type": "application/json",
		    "Host": "digiapp.vietcombank.com.vn",
		    "Origin": "https =>//vcbdigibank.vietcombank.com.vn",
		    "Referer": "https =>//vcbdigibank.vietcombank.com.vn/",
		    "sec-ch-ua-mobile": '?0',
		    "sec-ch-ua-platform": "macOS",
		    "Sec-Fetch-Dest": 'empty',
		    "Sec-Fetch-Mode": 'cors',
		    "Sec-Fetch-Site": 'same-site',
		    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
		    "X-Channel": 'Web',
		    "X-Request-ID": 166119240983848
	    },
	    data: CRYPT_VCB.encryptRequest(data)


	})

	let cookies = _.has(res.headers, 'set-cookie') ? res.headers['set-cookie'][0] : '{}'
	
	if(cookies){
		const cookies_obj = {}
		cookies = cookies.split(';')
		cookies.forEach(el => {
			el = el.split('=')
			cookies_obj[el[0].trim()] = el[1]
		})
		cookies = cookies_obj
	}

	res =  JSON.parse(CRYPT_VCB.decryptResponse(res.data))
	return {
		data: res,
		cookies
	}


}

const save_browser = async (username, browserId, loginRes ) => {
	const data = {
		user: username,
		mid: 3009,
		mobileId: loginRes.userInfo.mobileId,
		cif: loginRes.userInfo.cif,
		browserId,
		clientId: loginRes.userInfo.clientId,
		browserName: "Chrome 111.0.0.0",
		sessionId: loginRes.userInfo.sessionId,
		"DT": "Windows",
	    "PM": "Chrome 111.0.0.0",
	    "OV": "10",
		
	}
	console.log(data);


	res = await axios({
		method: 'post',
		url: 'https://digiapp.vietcombank.com.vn/authen-service/v1/api-3009',
		headers: { 
		    'Content-Type': 'application/json',
		    "Accept": "application/json",
		    "Accept-Encoding": "gzip, deflate, br",
		    "Accept-Language": "vi",
		    "Connection": "keep-alive",
		    "Content-Type": "application/json",
		    "Host": "digiapp.vietcombank.com.vn",
		    "Origin": "https =>//vcbdigibank.vietcombank.com.vn",
		    "Referer": "https =>//vcbdigibank.vietcombank.com.vn/",
		    "sec-ch-ua-mobile": '?0',
		    "sec-ch-ua-platform": "macOS",
		    "Sec-Fetch-Dest": 'empty',
		    "Sec-Fetch-Mode": 'cors',
		    "Sec-Fetch-Site": 'same-site',
		    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
		    "X-Channel": 'Web',
		    "X-Request-ID": 166119240983848
	    },
	    data: CRYPT_VCB.encryptRequest(data)


	})

	res =  JSON.parse(CRYPT_VCB.decryptResponse(res.data))
	console.log('rq save browser');
	console.log(res);
	return res


}


const login = async ({ username, password, browserId }) => {
	const { captcha_id, captcha_text } = await getCaptchaAny()

	let res = await axios({
		method: 'post',
		url: 'https://digiapp.vietcombank.com.vn/authen-service/v1/login'
	})

	const data = {
		captchaToken: captcha_id,
		captchaValue: captcha_text,
		user: username,
		checkAcctPkg: 1, 
		password,
		mid: 6,
		browserId,
		
	}
	console.log(data);

	res = await axios({
		method: 'post',
		url: 'https://digiapp.vietcombank.com.vn/authen-service/v1/login',
		headers: { 
		    'Content-Type': 'application/json',
		    "Accept": "application/json",
		    "Accept-Encoding": "gzip, deflate, br",
		    "Accept-Language": "vi",
		    "Connection": "keep-alive",
		    "Content-Type": "application/json",
		    "Host": "digiapp.vietcombank.com.vn",
		    "Origin": "https =>//vcbdigibank.vietcombank.com.vn",
		    "Referer": "https =>//vcbdigibank.vietcombank.com.vn/",
		    "sec-ch-ua-mobile": '?0',
		    "sec-ch-ua-platform": "macOS",
		    "Sec-Fetch-Dest": 'empty',
		    "Sec-Fetch-Mode": 'cors',
		    "Sec-Fetch-Site": 'same-site',
		    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
		    "X-Channel": 'Web',
		    "X-Request-ID": 166119240983848
	    },
	    data: CRYPT_VCB.encryptRequest(data)


	})



	let cookies = _.has(res.headers, 'set-cookie') ? res.headers['set-cookie'][0] : '{}'
	
	if(cookies){
		const cookies_obj = {}
		cookies = cookies.split(';')
		cookies.forEach(el => {
			el = el.split('=')
			cookies_obj[el[0].trim()] = el[1]
		})
		cookies = cookies_obj
	}

	res =  JSON.parse(CRYPT_VCB.decryptResponse(res.data))
	return {
		data: res,
		cookies
	}


}





const getTransactions = async ({begin, end, accountNumber, account, browserId}) => {
	account.accounts = JSON.parse(account.accounts)
	account.data = JSON.parse(account.data)
	account.cookies = JSON.parse(account.cookies)

	const data = {
        'cif'           : account.data.userInfo.cif,
        'clientPubKey'  : 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQ+hfhDxeNO5KrcZ9z6LVZu7bqKXFskk2sV4ScGOzOT9TRTtq9SlATnIlc2VdRXakVl0tZ31dcFFdUKtLLTp2DCbzWQVN/EOkCPUSnDrhp/Bt1Fqz52Tujy+6swndsQ0DOpRrrsgW182CcdaTmmP2SEFcpPX6InK4cO4hRLtyfqQIDAQAB',
        'user'          : account.username,
        'sessionId'     : account.data.sessionId,
        'mobileId'      : account.data.userInfo.mobileId,
        'clientId'      : account.data.userInfo.clientId,
        'mid'           : 14,
        'lang'          : 'vi',
        'accountNo'     : accountNumber || account.data.userInfo.defaultAccount,
        'accountType'   : 'D',
        'fromDate'      : begin,
        'lengthInPage'  : 999999,
        'pageIndex'     : 0,
        'toDate'        : end,
        'stmtDate'      : '',
        'stmtType'      : '',
        browserId
	}


	let c = _.keys(account.cookies).map(key => {
		return `${key}=${account.cookies[key]}`
	})

	try {
		res = await axios({
			method: 'post',
			url: 'https://digiapp.vietcombank.com.vn/bank-service/v1/transaction-history',
			headers: { 
			    'Accept'            :  'application/json',
	            'Accept-Language'   :  'vi',
	            'Authorization'     :  'Bearer null',
	            'Connection'        :  'keep-alive',
	            'Content-Type'      :  'application/json',
	            'DNT'               :  '1',
	            'Host'              :  'digiapp.vietcombank.com.vn',
	            'Origin'            :  'https://vcbdigibank.vietcombank.com.vn',
	            'Referer'           :  'https://vcbdigibank.vietcombank.com.vn/',
	            'sec-ch-ua-mobile'  :  '?0',
	            'sec-ch-ua-platform':  '"Windows"',
	            'Sec-Fetch-Dest'    :  'empty',
	            'Sec-Fetch-Mode'    :  'cors',
	            'Sec-Fetch-Site'    :  'same-site',
	            'User-Agent'        :  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
	            'X-Channel'         :  'Web',
	            'X-Request-ID': '16722168551175',
	            'X-Lim-ID': '9e8a6116',
	            'Cookie': c.join(';')
		    },
		    data: CRYPT_VCB.encryptRequest(data),

		})
		// console.log(res.data);
		res =  JSON.parse(CRYPT_VCB.decryptResponse(res.data))
		return res
	}
	catch (error) {
	  console.error(error);
	  // Expected output: ReferenceError: nonExistentFunction is not defined
	  // (Note: the exact output may be browser-dependent)
	}


}

module.exports = {
	login,
	getTransactions,
	get_otp,
	get_otp_3010,
	import_otp,
	save_browser
}
