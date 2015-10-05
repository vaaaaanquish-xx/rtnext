//------------------------------------------------
//	リツイート直後のツイートを表示するやつへ飛ぶやつ
//	Author: @vaaaaanquish
//  リツイート直後のツイートを表示するやつの製作者にも感謝
//------------------------------------------------

(function($, jn){

	// プラグイン情報初期化
	if(!jn.pluginInfo)
		jn.pluginInfo = {};
	// プラグイン情報本体
	jn.pluginInfo['rtnext'] = {
		'name' : {
			'ja' : 'リツイート直後のツイートを表示するやつへ飛ぶやつ',
			'en' : 'rtnext'
		},
		'author' : {
			'en' : '@vaaaaanquish'
		},
		"version" : "1.0",
		'file' : 'rtnext.js',
		'language' : ['ja'],
		"last_update" : "2015/10/04",
		'update_timezone' : '9',
		'jnVersion' : '4.0.0.0',
		'description' : {
			'ja' : 'RT後のツイート',
			'en' : 'RT next tweet'
		},
		'updateinfo' : 'vaaaaanquish.jp'
	};
	// プラグイン情報
	
	// メニューに追加
	var rtnext_all = jn.onContextMemuAllBuildStarted,
		rtnext_gear = jn.onContextMemuGearBuildStarted;
	
	//顔メニューとギアメニューに登録
	jn.onContextMemuAllBuildStarted = function() {
		rtnext_all && rtnext_all.apply(this, arguments);
		var all = $("#contextmenu-all");
		if(all.children("[action='rtnext-jump']").length == 0)
			all.children("[action='retweet']")
				.after("<li action='rtnext-jump'>RT後のツイート</li>");
	};
	jn.onContextMemuGearBuildStarted = function() {
		rtnext_gear && rtnext_gear.apply(this, arguments);
		var tweet = $("#contextmenu-tweet");
		if(tweet.children("[action='rtnext-jump']").length == 0)
			tweet.children("[action='retweet']")
				.after("<li action='rtnext-jump'>RT後のツイート</li>");
	};


	function rtnext_jump(elm) {
		// URL取得
		var item = elm.item;
		var tweet_url = jn.TWITTER_TWEET.format(
			item.main_user.screen_name,
			item.isRetweet ? item.retweeted_status.id_str : item.id_str
		);
		//RT後のサービスへ飛ぶ
		jn.execUrl("https://retweets.azurewebsites.net/?lang=ja&q=" + tweet_url);
	}
	
	// rtnext-jump アクションを定義
	var action = jn.action;
	jn.action = function(options) {
		var act = options.act,
			elm = options.element,
			event = options.event;
		
		action(options);
		if(act == "rtnext-jump")
			rtnext_jump(elm[0]);
	}
	
})(jQuery, janet);
