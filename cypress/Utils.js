export default class Utils{
	static getMaskedPhone(number){
		const localPhone = number.replace( /\D+/g, '').match(/(\d{3})(\d{3})(\d{4})/)
  		return '(' + localPhone[1] + ') ' + localPhone[2] + '-' + localPhone[3]
	}
}