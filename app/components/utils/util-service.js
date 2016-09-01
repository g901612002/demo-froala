module.exports = function(ngModule) {
    // 自組圖片網址
    ngModule.service('Util',[
    "Constants",
    "$localStorage",
    "$sce",
    function(Constants,$localStorage,$sce) {
        var self = this;
        self.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
        };
        self.getChannelPkey = function(){
            var channelpkey = "";
            if($localStorage.agentdata){
                channelpkey = $localStorage.agentdata.channel.pkey;
            }else{
                channelpkey = _.first($localStorage.authdata.channels).pkey;
            }
            return channelpkey;
        };
        self.getAssetUrl = function(_url) {
            if(_url){
                return Constants.url + _url;
            }else{
                return false;
            }
        };
        self.showPushState = function(_state){
            var stateName;
            switch(_state) {
                case Constants.push.state.state00:
                    stateName = '已發送';
                    break;
                case Constants.push.state.state91:
                    stateName = '待審查';
                    break;
                case Constants.push.state.state92:
                    stateName = '刪除';
                    break;
                case Constants.push.state.state93:
                    stateName = '退審';
                    break;
                case Constants.push.state.state94:
                    stateName = '預約發送中';
                    break;
                case Constants.push.state.state95:
                    stateName = '預約發送刪除';
                    break;
                case Constants.push.state.state96:
                    stateName = '預約逾時';
                    break;
                case Constants.push.state.state99:
                    stateName = '待處理';
                    break;
            }
            return stateName;
        };
        self.secChangeTimeFormat = function(_sec){
            var min = Math.floor(parseInt(_sec)/60);
            var sec = parseInt(_sec)%60;
            if( min > 10 ){
                if(sec >10){
                    return String(min) + " : " + String(sec);
                }else{
                    return String(min) + " : 0" + String(sec);
                }
            }else{
                if(sec >10){
                    return "0"+ String(min) + " : " + String(sec);
                }else{
                    return "0"+ String(min) + " : 0" + String(sec);
                }
            }
        };

        self.getUTCFormat = function(_time){
            if (_time instanceof Date) {
                return _time.toISOString();
            }else{
                return _time;
            }
        };

    }]);

};
