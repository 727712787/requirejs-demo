require.config({
	waitSeconds: 0,
	paths: {
		"jquery": "libs/jquery-1.11.2.min"
	}
});
requirejs(['jquery','app/a','app/b'],function($,a,b){
	a.alert();
	alert(b.name);
});
requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }
    throw err;
};
