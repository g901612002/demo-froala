module.exports = function(ngModule) {

  /* FunctionPage.FieldName.FlagName */
  ngModule.value('Constants',{
    // url:"http://10.99.0.51:80/channel/",
    // baseurl:"http://10.99.0.51:80/channel/rest/",
    // TEST
    //url:"http://220.128.150.80/channel/",
    //baseurl:"http://220.128.150.80/channel/rest/",
    // UAT
    //url:"https://interactiveuat.mitake.com.tw/channel/",
  	//baseurl:"https://interactiveuat.mitake.com.tw/channel/rest/",
    // 正式機
    url:"https://interactive.mitake.com.tw/channel/",
    baseurl:"https://interactive.mitake.com.tw/channel/rest/",
    returncode:{
      success:"C0000",             // 成功
      dataabnormal:"C9999",        // 資料異常，請稍後再試
      emptyresult:"D0000",         // 查無資料
      modifyfail:"D0010",          // 該筆資料狀態已無法修改
      dataexist:"D0100",           // 資料已存在
      accountexist:"D0110",        // 帳號已存在
      ennameexist:"D0120",         // 英文代號已存在
      paramerror:"D1000",          // 參數有誤
      serverabnormal:"D9999",      // 資料庫資料異常，請稍候再使用
      captchaerror:"V0010",        // 欄位驗證錯誤
      verificationerror:"V0020",   // 驗證碼輸入錯誤
      loginerror:"V0030",          // 帳號或密碼輸入錯誤
      captchaovertime:"V0040",     // 驗證碼已逾時，請重新取得
      channelinvalid:"V0050",      // 官方帳號被停用
      accountinvalid:"V0060",      // 此帳號已停用
      accesstokenfail:"V0100",     // 授權有誤，請再試一次
      accesstokenempty:"V0110",     // AccessToken 參數有誤
      apinoauthority:"A0010"       //API權限不足
    },
    login:{
      sysadmin:{
        logintype:"SA"
      },
      channeladmin:{
        logintype:"CA"
      }
    },
    channel:{
      action:{
      	add:{
      		key:"add",
      		name:"新增"
      	},
      	edit:{
      		key:"edit",
      		name:"修改"
      	},
        appmapping:{
          key:"appmapping",
          name:"APP對應設定"
        }
      },
      state:{
        on:"00",
        off:"99"
      },
      testChannel:{
        no:"00",
        yes:"01"
      }
    },
    appinfo:{
      action:{
        add:{
          key:"add",
          name:"新增"
        },
        edit:{
          key:"edit",
          name:"修改"
        },
        detail:{
          key:"detail",
          name:"詳細"
        }
      },
      state:{
        on:"00",
        off:"99"
      },
      ostype:{
        ios:"I",
        android:"A"
      }
    },
    autoreply:{
      action:{
        addMessageNewItem:{
          key:"add",
          name:"新增"
        },
        addMessageOriginalItem:{
          key:"add",
          name:"新增"
        },
        editMessageNewItem:{
          key:"edit",
          name:"修改"
        },
        editMessageOriginalItem:{
          key:"edit",
          name:"修改"
        },
        addKeywordNewItem:{
          key:"add",
          name:"新增"
        },
        addKeywordOriginalItem:{
          key:"add",
          name:"新增"
        },
        editKeywordNewItem:{
          key:"edit",
          name:"修改"
        },
        editKeywordOriginalItem:{
          key:"edit",
          name:"修改"
        }
      },
      state:{
        on:"00",
        off:"99"
      }
    },
    selfmenu:{
      state:{
        on:"00",
        off:"99"
      },
      lv1total:3,
      lv2total:5
    },
    push:{
      state:{
        state00:"00",
        state91:"91",
        state92:"92",
        state93:"93",
        state94:"94",
        state95:"95",
        state96:"96",
        state99:"99"
      },
      sex:{
        M:"M",
        F:"F"
      }
    }
  });

};