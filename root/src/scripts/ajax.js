(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define('ajax', function(exports){
			return factory(root, exports);
		});
	} else {
		root.ajax = factory(root, {});
	}
}(this, function(root, ajax) {
	'use strict';

	var loading = {
		enabled : 0,
		show: function(text) {
			if(!loading.enabled){
				return false;
			}
			console.info('[AJAX LOADING SHOW]', text);
		},
		hide: function() {
			if(!loading.enabled){
				return false;
			}
			console.info('[AJAX LOADING HIDE] 隐藏loading');
		}
	};

	var protect = {};

	ajax = function(option) {
		var xhr = new XMLHttpRequest();
		
		var loadingText = option.loadingText || 'loading...';
		loading.show(loadingText);

		if(option.protect){
			if(protect[option.url]){
				console.warn('[AJAX PROTECT]', option.url + ' in processing.');
				return;
			}else{
				console.info('[AJAX PROTECT]', option.url + ' will be requested.');
				protect[option.url] = 1;
			}
		}
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					loading.hide();

					if(option.protect){
						protect[option.url] = 0;
					}

					option.success.call(xhr, eval('(' + xhr.responseText + ')'));
				} else {
					option.error && option.error.call(xhr, {
						'r' : 0,
						'code' : xhr.status,
						'msg' : xhr.responseText
					});
				}
			}
		};

		xhr.ontimeout = function() {
			option.timeout && option.timeout();
		};

		var params = '';
		if (option.data) {
			params = '?';
			var i = 0;
			for (var k in option.data) {
				params += k;
				params += '=';
				params += option.data[k];
				params += '&';
				i++;
			}
			if (i === 0) {
				params = '';
			} else {
				params = params.substring(0, params.length - 1);
			}
		}

		if (option.method && option.method !== 'GET') {
			xhr.open(option.method, option.url, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.send(params);
		} else {
			xhr.open('GET', option.url + params, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.send();
		}
	};

	return ajax;
}));