var Schema ={};
Schema.createSchema = function(mongoose){
    MemberSchema = mongoose.Schema({
                userId:{type:String ,require:true,unique:true},
                userPwd:{type:String ,require:true},
                userName:{type:String,index:'hashed'},
                age:{type:Number,"default":-1},
                regDate:{type:Date,index:{unique:false},'default':Date.now},
                updateDate:{type:Date,index:{unique:false},'default':Date.now}
            });
            MemberSchema.static('findById',function(userId,callback){
                return this.find({userId:userId},callback);
            });
            MemberSchema.static('findAll',function(callback){
                return this.find({},callback);
            });
            console.log("MemberSchema 정의함");
            MemberModel = mongoose.model("members2",MemberSchema);
            console.log("MemberModel 정의함");
};
module.exports = Schema;