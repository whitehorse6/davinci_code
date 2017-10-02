let RESULT = function (return_code, return_type, return_message, return_result){
	this.return_code = return_code;
	this.return_type = return_type;
	this.return_message = return_message;
	this.return_result = return_result;
	
	this.set_result = function(return_code, return_type, return_message, return_result){
		this.return_code = return_code;
		this.return_type = return_type;
		this.return_message = return_message;
		this.return_result = return_result;
	};
	
	this.get_result = function(){
		return {
			return_code : this.return_code,
			return_type : this.return_type,
			return_message : this.return_message,
			return_result : this.return_result
		}
	};
}
exports.RESULT = RESULT;