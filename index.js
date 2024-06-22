require('browser-env')();

const DB_VCB = require('./db')
const REQUEST_VCB = require('./vietcombank-request')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
app.use(bodyParser.json({limit: "1024mb"}));
app.use(bodyParser.urlencoded({limit: "1024mb", extended: true, parameterLimit:50000}));
app.use(morgan('combined'))
const hp = require('./helper-functions')
const encrypt = require('./encrypt.js')
const encrypt_ex = require('./encrypt_eximbank.js')
const encrypt_biz = require('./encrypt_biz.js')
const ecbblowfish = require('./ecbblowfish.js')
const rsa_lib = require('./rsa.js')
var CryptoJS = require("crypto-js");
const { CRYPT_VCB } = encrypt
const { CRYPT_EXB } = encrypt_ex
const { CRYPT_VCB_BIZ } = encrypt_biz
const { ecbbl } = ecbblowfish
const { rsa } = rsa_lib

const sh = require("./sha256");
var base64js = require('base64-js')
const port = 27120

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
app.use(function (req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
  });


app.post('/vietcombank/techcombank/', function(req, res){

    let string = req.body.string ? req.body.string  : "";
    let json_response = {}
    if(string == "" || !string){
        json_response = {
            status : 500 ,
            message : 'missing param' ,
        }
    }else{
        let arr = new Uint8Array(sh.arrayBuffer(string));
        let encryString = base64js.fromByteArray(arr).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
        json_response = {
            status : 200 ,
            result : encryString,
            message : 'succssful' ,
        }
    }
    res.json(json_response);
})

app.post('/vietcombank/hd/', (req, res) => {
    let password = req.body.password;
	let SymmetricKey = ecbbl.generateKey('168');
	ecbbl.setCryptoKeyLength('168');
	ecbbl.setSymKey(SymmetricKey);
	let EncryptedKey = ecbbl.ecb_key.encrypt(SymmetricKey);
	password = ecbbl.encrypt(password);
	rsa.setPublic("be856e8c156f7f0c35aeefaab32d7a957b6afae78c692d8b96b30b8edb577dbb38b2100d6e02ff2bd76922625199e49a080c07c3eb463423e88e084951afdac15b2877cd3adc0fd01fc6c50b0de34b7a5952e4a10dbcbd791deef70f9a8011804ca668062aa74fc5f7caf3322085ba43a75b0b934090a12bcd05857aad4fc73d08864da15820e178d4cff60b10fa8a9f369e376b271b2aca35885b44b5c36eaaa92112e870d3b1aed853084f895f2e437e422449bc575c99fa196b9b149bf1ebedf26c72fed6f4e3e69d377e113e108eceb6b1ecde7d93766830f1ed98f80a5b7e336bcd1120934ee65718acd48f1409f191ef619db0404482847e78ad2dd793", '10001');
    password = rsa.encrypt(password);
	let result = {
	    "password":password,
	    "private_key":EncryptedKey,
	}
    

    res.send(result)
})

app.post('/vietcombank/', (req, res) => {
    
    let e = req.body.e;
    let t =req.body.t;
    const n = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex)
              , r = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex)
              , i = function(e, t) {
                return CryptoJS.PBKDF2(t, CryptoJS.enc.Hex.parse(e), {
                    keySize: 8,
                    iterations: 2e3
                })
            }(r, e);
            var resp = {
                iv: n,
                salt: r,
                data: CryptoJS.AES.encrypt(t, i, {
                    iv: CryptoJS.enc.Hex.parse(n)
                }).ciphertext.toString(CryptoJS.enc.Base64)
            }
    res.send(resp)
})
app.post('/vietcombank/', async (req, res, next) => {
	try {
		const { username, password, begin, end, accountNumber } = req.body

		let user = await DB_VCB.getUser(username)
		console.log(user);
		if(user){
			const data_ = await REQUEST_VCB.getTransactions({begin, end, accountNumber, account: user, browserId: user.browserId})
			console.log(data_);
			if(data_.code == '00')
				return res.status(200).send({results: data_.transactions, success: true})


			const { data, cookies } = await REQUEST_VCB.login({username, password, browserId: user.browserId}) 

			if(data.code == '00'){
				DB_VCB.insertOrUpdateUser({
					data: JSON.stringify(data),
					username,
					password,
					publicKey: '',
					privateKey: '',
					cookies: JSON.stringify(cookies),
					accounts: JSON.stringify(data.userInfo),
					time_login: Math.ceil(Date.now()/1000),
					sessionId: data.sessionId
				})
			}
			else
				return res.status(200).send({...data, success: false})

			await sleep(500); 
			user = await DB_VCB.getUser(username)
			if(user){
				const data = await REQUEST_VCB.getTransactions({begin, end, accountNumber, account: user})
				if(data.code == '00')
					return res.status(200).send({results: data.transactions, success: true})

			}
			return res.status(200).send({...data, success: false})
		}
		
	} catch (err) {
	  return res.status(500).send(err)
	}


})
app.post('/vietcombank/encrypt', async (req, res, next) => {
	try {

		return res.status(200).send(CRYPT_VCB.encryptRequest(req.body))
		
	} catch (err) {
	  return res.status(500).send(err)
	}


})
app.post('/vietcombank/decrypt', async (req, res, next) => {
	try {
		
		return res.status(200).send(CRYPT_VCB.decryptResponse(req.body))
		
	} catch (err) {
	  return res.status(500).send(err)
	}


})
app.post('/vietcombank/encrypt_biz', async (req, res, next) => {
	try {

		return res.status(200).send(CRYPT_VCB_BIZ.encryptRequest(req.body))
		
	} catch (err) {
	  return res.status(500).send(err)
	}


})
app.post('/vietcombank/decrypt_biz', async (req, res, next) => {
	try {
		
		return res.status(200).send(CRYPT_VCB_BIZ.decryptResponse(req.body))
		
	} catch (err) {
	  return res.status(500).send(err)
	}


})
app.post('/eximbank/encrypt', async (req, res, next) => {
	try {

		return res.status(200).send(CRYPT_EXB.encryptRequest(req.body))

	} catch (err) {
		return res.status(500).send(err)
	}


})
app.post('/eximbank/decrypt', async (req, res, next) => {
	try {

		return res.status(200).send(CRYPT_EXB.decryptResponse(req.body))

	} catch (err) {
		return res.status(500).send(err)
	}


})
app.post('/vietcombank/get_otp', async (req, res, next) => {
	try {
		const { username, password, begin, end, accountNumber } = req.body
		let browserId = hp.generateRandomString(32)
		let user = await DB_VCB.getUser(username)
		if(user && user.browserId)
			browserId = user.browserId
		
		req.body.browserId  = browserId

		const { data, cookies } = await REQUEST_VCB.login(req.body) 
		return res.status(300).send({...data, success: false})
		if(data.code == 20231){
			const data_1 = await REQUEST_VCB.get_otp(username, browserId, data.browserToken)
			
			await DB_VCB.insertOrUpdateUser({
				username,
				password,
				browserId,
				publicKey: '',
				privateKey: '',
				cookies: '{}',
				accounts: '{}',
				browserToken: data.browserToken,
				tranId: data_1.transaction.tranId,
				
			})
			//await hp.sleep(400)

			const data_2 = await REQUEST_VCB.get_otp_3010(username, browserId, data.browserToken, data_1.transaction.tranId)
			return res.status(200).send({...data_2, success: false})




	
		}
		return res.status(200).send({...data, success: false})
		
		
	} catch (err) {
	  return res.status(200).send(err)
	}


})

app.post('/vietcombank/import_otp', async (req, res, next) => {
	try {
		const { username, password, begin, end, accountNumber, otp } = req.body

		let user = await DB_VCB.getUser(username)

		const { data, cookies } = await REQUEST_VCB.import_otp(username, user.browserId, user.browserToken, user.tranId, otp) 
		return res.status(200).send({...data, success: false})
		if(data.code == '00'){
			await DB_VCB.insertOrUpdateUser({
				data: JSON.stringify(data),
				username,
				password,
				publicKey: '',
				privateKey: '',
				cookies: JSON.stringify(cookies),
				accounts: JSON.stringify(data.userInfo),
				time_login: Math.ceil(Date.now()/1000),
				sessionId: data.sessionId
			})

			await REQUEST_VCB.save_browser(username, user.browserId, data)

		}


		return res.status(200).send({...data, success: false})
		
	} catch (err) {
	  return res.status(200).send(err)
	}


})





app.get('/dnt/:username/:password/:accountNumber', async (req, res, next) => {
	try {
		
		const { username, password, begin, end, accountNumber } = req.params

		let user = await DB_VCB.getUser(username)
		if(user){
			const data = await REQUEST_VCB.getTransactions({begin, end, accountNumber, account: user})
			if(data.code == '00')
				return res.status(200).send({transactions: data.transactions, status: true})
		}

		const { data, cookies } = await REQUEST_VCB.login(req.params) 
		
		if(data.code == '00'){
			await DB_VCB.insertOrUpdateUser({
				data: JSON.stringify(data),
				username,
				password,
				publicKey: '',
				privateKey: '',
				cookies: JSON.stringify(cookies),
				accounts: JSON.stringify(data.userInfo),
				time_login: Math.ceil(Date.now()/1000),
				sessionId: data.sessionId
			})
		}
		else
			return res.status(200).send({...data, status: false})

		user = await DB_VCB.getUser(username)
		if(user){
			const data = await REQUEST_VCB.getTransactions({begin, end, accountNumber, account: user})
			if(data.code == '00')
				return res.status(200).send({transactions: data.transactions, status: true})

		}
		
		return res.status(200).send({...data, status: false})
	} catch (err) {
	  return res.status(200).send(err)
	}


})






app.listen( () => {
  console.log(`Example app listening at http://localhost:${port}`)
})