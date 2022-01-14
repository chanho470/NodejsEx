function Member(userId,userName){
    this.userId = userId;
    this.userName=userName;
}
Member.prototype.printMember = function(){
    console.log("아이디 %s 이름 %s",this.userId,this.userName);
}
module.exports =Member;