Ext.Loader.setPath({
    'Ext': 'sdk/src'
});

//Ext.Loader.setConfig({enabled: false});


//(function() {
//    function write(content) {
//        document.write(content);
//    }
//
//    var xhr = new XMLHttpRequest();
//    xhr.open('GET', 'app.json', false);
//    xhr.send(null);
//
//    var options = eval("(" + xhr.responseText + ")"),
//        scripts = options.js || [],
//        i, ln, path;
//
//    for (i = 0,ln = scripts.length; i < ln; i++) {
//        path = scripts[i];
//
//        if (typeof path != 'string') {
//            path = path.path;
//        }
//
//        write('<script src="'+path+'"></'+'script>');
//    }
//
//})();


(function(){

    var currentWindowOnload = window.onload;
    window.onload = function(){

    };

    var oldApplication = Ext.application;

    Ext.application = function(){
        oldApplication({
            name: arguments[0].name,
            models: arguments[0].models,
            launch: function(){
                currentWindowOnload();
            }
        });

        //restore the hack;
        Ext.application = oldApplication;

    };
})();