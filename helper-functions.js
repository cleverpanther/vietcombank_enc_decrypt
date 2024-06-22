const generateRandomString = (length) => {
	    var result           = '';
	    var characters       = '0123456789abcdef';
	    var charactersLength = characters.length;
	    for ( var i = 0; i < length; i++ ) {
	        result += characters.charAt(Math.floor(Math.random() * charactersLength));
	    }
	    return result;
}

exports.sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

exports.generateImei = () => {
	return generateRandomString(8) + '-' + generateRandomString(4) + '-' + generateRandomString(4) + '-' + generateRandomString(4) + '-' + generateRandomString(12)
}
exports.generateRandomString = generateRandomString