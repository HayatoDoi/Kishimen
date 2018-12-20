
module.exports = class Match {
	constructor(signatures=[]){
		this.signatures = signatures;
	}
	secho(){
		console.log(this.signatures);
	}
	match(log){
		return (this.signatures.find((signature)=>{
			return log[signature.pattern_point].match(signature.pattern_regexp);
		}) || '').name;
	}
}
