module.exports = function(ngModule) {

	ngModule.controller("LoginCtrl",[
		"$rootScope",
		"$state",
		"$log",
		"$localStorage",
		"Constants",
		"AuthService",
		"ChannelService",
		"MtkHash",
		"PromiseFactory",
		"$q",
		"AUTHCODE",
		function($rootScope,$state,$log,$localStorage,Constants,AuthService,ChannelService,MtkHash,PromiseFactory,$q,AUTHCODE){

			var self = this;
			var logintype = "";

			self.isChannelAdmin = false;
			self.errorMessage = "";
			self.loginData = {
				account:"",
				pwd:""
			};

			var asyncLogin = function(_loginData){
				var dfd = PromiseFactory.defer();
				AuthService.doLogin(_loginData)
					.success(function(res){
						var state = "";
						var channelpkey = "";
						if(res.returncode === Constants.returncode.success){
							$localStorage.authdata = {
								accesstoken:res.accesstoken,
								logintype:res.logintype,
								name:res.name,
								account:self.loginData.account,
								accountpkey:res.accountpkey,
								channels:res.channels,
								modules:res.modules,
								issuper:res.issuper,
								hasagent:res.hasagent,
							};
							if(res.logintype === Constants.login.channeladmin.logintype){
								if(_.isEmpty(res.logindate)){
									state = "modify-pwd";
								}
								state = "main.cahome";
								channelpkey = _.first($localStorage.authdata.channels).pkey;
							}else{
								state = "main.sahome";
							}
							dfd.resolve({
								"state":state,
								"channelpkey":channelpkey
							});
						}else{
							self.handleLoginError(res.returnmsg);
							dfd.reject();
						}
					}).error(function(err){
						var errmsg  = (err.returnmsg) ? err.returnmsg :"系統連線異常";
						self.handleLoginError(errmsg);
						dfd.reject();
					});
				return dfd.promise;
			};

			var asyncGetChannel = function(_channelpkey){
				var dfd = PromiseFactory.defer();
	            ChannelService
	              .get(_channelpkey,true)
	              .success(function(res){
	                $localStorage.authdata.channel = res;
                    dfd.resolve();
	              })
	              .error(function(){
	              	dfd.reject(err);
	              });
	            return dfd.promise;
			};

			/* === 判斷有logintype時，Accesstoken是否有過期 === */
			var checkAccesstoken = function(){
				var authcode = (logintype === "CA")?AUTHCODE.CAROOT:AUTHCODE.SAROOT;
				AUTHCODE.CURRENT = (logintype === "CA")?AUTHCODE.CAROOT:AUTHCODE.SAROOT;
				$log.debug(authcode);
				AuthService.checkAuth(authcode)
					.success(function(res){
						if(res.returncode === Constants.returncode.success){
							$log.debug("Accesstoken沒有過期");
							if(logintype === "CA"){
								$state.go("main.cahome",{fromeLoginPage: true});
							}else{
								$state.go("main.sahome",{fromeLoginPage: true});
							}
						}else{
							$log.debug("Accesstoken有過期");
							self.getCaptcha();
						}
					}).
					error(function(error){
						self.getCaptcha();
					});
			};

			self.init = function(){
				$log.debug("$localStorage:",$localStorage);
				if($localStorage.authdata !== undefined){
					logintype = $localStorage.authdata.logintype;
					if (logintype === "CA"||logintype === "SA") {
						checkAccesstoken();
					}else{
						self.getCaptcha();
					}
				}else{
					self.getCaptcha();
				}
			};

			self.getCaptcha = function(){
				AuthService.getCaptcha()
					.success(function(data){
						self.captchaData = data;
						self.loginData.pkey = self.captchaData.captchaId;
					}).error(function(){
						self.errorMessage = "驗證碼取得失敗";
					});
			};

			self.handleLoginError = function(_msg){
				self.errorMessage = _msg;
				self.getCaptcha();
				self.loginData.account = "";
				self.loginData.pwd = "";
				self.loginData.key = "";
			};

			self.doLogin = function(){
				if(_.isEmpty(self.loginData.account)){
					self.errorMessage = "您還沒有輸入帳號!";
				}else if(_.isEmpty(self.loginData.pwd)){
					self.errorMessage = "您還沒有輸入密碼!";
				}else if(_.isEmpty(self.loginData.key)){
					self.errorMessage = "您還沒有輸入驗證碼!";
				}
				else{
					self.loginData.pwd = MtkHash.hash(self.loginData.pwd);
					var promiseLogin = asyncLogin(self.loginData);
					$q.when(promiseLogin).then(function(resolve){
						var state = resolve.state;
						var channelpkey = resolve.channelpkey;
						if ($localStorage.authdata.logintype === "CA") {
							asyncGetChannel(channelpkey)
								.success(function(res){
									$state.go(state);
								});
						}else{
							$state.go(state);
						}
					});
				}
			};

			self.goApplyTest = function(){
				$state.go("applytest.step1");
			};
	}]);
};

