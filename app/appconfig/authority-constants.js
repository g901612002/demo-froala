module.exports = function(ngModule) {

  ngModule.value('AUTHCODE',{

    "CURRENT":"",
    "EMPTY":"",

    /* === SA AUTH START === */
    "SAROOT":"1000:0", //SA主頁管理
    "CHANNEL_001":"1101:1", //channel查詢
    "CHANNEL_002":"1101:2", //channel管理
    "CHANNELACCOUNT_001":"1102:1", //網站帳號查詢
    "CHANNELACCOUNT_002":"1102:2", //網站帳號管理
    "APPINFO_001":"1103:1", //APPINFO查詢
    "APPINFO_002":"1103:2", //APPINFO管理
    "SYSTEMACCOUNT_001":"1104:1", //系統帳號查詢
    "SYSTEMACCOUNT_002":"1104:2", //系統帳號管理
    "CHANNELCATEGORY_001":"1105:1", //channel分類管理
    "SYSTEMANNOUNCE_001":"1106:1", //系統公告查詢
    "SYSTEMANNOUNCE_002":"1106:2", //系統公告管理
    /* === SA AUTH END   === */

    /* === CA AUTH START === */
    "CAROOT":"2000:0", //CA主頁管理
    "CA_CHANNEL_001":"2101:1", //頻道管理
    "CA_AUTOREPLY_001":"2102:1", //首次訊息
    "CA_AUTOREPLY_002":"2102:2", //自動回覆
    "CA_AUTOREPLY_003":"2102:3", //關鍵字自動回覆
    "CA_CHANNELACCOUNT_001":"2103:1", //網站帳號查詢
    "CA_CHANNELACCOUNT_002":"2103:2", //網站帳號管理
    "CA_SELFMENU_001":"2104:1", //網站帳號管理
    "CA_PUSH_Management":"2105:1", //群發管理
    "CA_PUSH_AddPush":"2105:2", //可群發
    "CA_PUSH_Review":"2105:3", //需被審核
    "CA_PUSH_DeleteMe":"2105:4", //可刪除自己
    "CA_PUSH_DeleteOther":"2105:5", //可刪除別人
    "CA_ANNOUNCE_001":"2106:1", //頻道公告管理
    "CA_MESSAGE_List":"2201:1", //可瀏覽
    "CA_MESSAGE_Reply":"2201:2", //可回覆
    "CA_MEDIA_001":"2202:1", //素材管理
    "CA_FANSINFO_001":"2203:1", //關注者管理
    "CA_CHANNELANNOUNCE_001":"2106:1", //系統公告查詢
    "CA_CHANNELANNOUNCE_002":"2106:2", //系統公告管理
	/* === CA AUTH END   === */
  });

};