module.exports = function(ngModule) {

	ngModule.controller("modifyPWDCtrl",[
		"$state",
		"$log",
		"$localStorage",
		"AuthService",
		"MtkHash",
		"Constants",
		"ModalService",
		function($state,$log,$localStorage,AuthService,MtkHash,Constants,ModalService){
			var self = this;
			self.returnmsg = "";

			self.submit = function(){
				var submitData = _.transform(self.pwdData,function(result,n,key){
					result[key] = MtkHash.hash(n);
				});
		        var modalOptions = {
		            closeButtonText: '',
		            actionButtonText: '重新登入',
		            headerText: '密碼修改成功',
		            bodyText: '請使用新密碼重新登入系統'
		        };
				submitData.account = $localStorage.authdata.account;
				$log.debug(submitData);
				AuthService.modifyPassword(submitData)
					.success(function(res){
						$log.debug(res);
						if(res.returncode === Constants.returncode.success){
							$log.debug("密碼修改成功");
							ModalService.showModal({},modalOptions)
								.then(function (result) {
									$state.go("login");
        						});
						}else{
							self.returnmsg = res.returnmsg;
						}
					})
					.error(function(){
					});
			};
		}
	]);
};

