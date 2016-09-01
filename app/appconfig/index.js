module.exports = function(ngModule) {

	require("./request-interceptor")(ngModule);

	//原生服務的Configuration
	require("./http-provider-config")(ngModule);
	require("./state-provider-config")(ngModule);
	require("./log-provider-config")(ngModule);
	require("./tooltip-provider-config")(ngModule);

	//plugin的Configuaration
	require("./toastr-config")(ngModule);
	require("./froala-config")(ngModule);

	//專案的常數定義
	require("./mtk-constants")(ngModule);
	require("./authority-constants")(ngModule);

	//專案自訂的服務的Configuration
	require("./mtk-hash-provider-config")(ngModule);

};