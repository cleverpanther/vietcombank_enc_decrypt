const _ = require('lodash');
const knex = require('knex')({
  client: 'mysql',
  debug: false,
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'apigatev_admin',
    password : 'xAJP3YmEXZVe7kD',
    database : 'apigatev_momo'
  }
});

const { attachPaginate } = require('knex-paginate');
attachPaginate();



const VCB_Users = () => knex('vietcombanks')

const insertOrUpdateUser = async (data) => {
	let user =  VCB_Users()
	const existUser = await user.where('username', data.username).first()
	if(!existUser){
		await knex('vietcombanks').insert(data).then(x => x)
	}
	else{
		await knex('vietcombanks').update(data).where('id', existUser.id).then(x => x)
	}
}


const getUsers = async (filters = {}, page = 1, perPage = 10) => {
	let user =  VCB_Users()
	
	if(_.keys(filters)){
		if(_.has(filters, 'username'))
			user = user.where('username', filters.username)
	}
	console.log(await user.paginate({perPage: perPage, currentPage: page}));
}

const getUser = async (username) => {
	return  await VCB_Users().where('username', username).first()

}


// insertOrUpdateUser({username: '24658418S0111', password: 'haha', publicKey: '', privateKey: '', cookies: '{}', accounts: '{}'})


module.exports = {
	insertOrUpdateUser,
	getUsers,
	getUser
}