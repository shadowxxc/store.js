storage = {
    set: function(key, val, way) {
        var form = localStorage;
        if(way=="session"){
            form = sessionStorage;
        }
        if (key && !isJSON(key)) {
            form.setItem(key, val);
        } else if (key && isJSON(key)) {
            if(arguments[arguments.length-1] == "session"){
                for (var a in key) {
                    storage.set(a, key[a],"session");
                }
            }else{
                for (var a in key) {
                    storage.set(a, key[a]);
                }
            }
        }
        return true;
    },
    get:function(key, way){
        var form = localStorage;
        if(way=="session"){
            form = sessionStorage;
        }
        if (arguments.length==0) {
            var res = showStorage();
            return res;
        }else if(arguments.length==1&&arguments[0]=="session"){
            res = showStorage("session");
            return res;
        }
        return deserialize(form.getItem(key));
    },
    del:function(key,way) {
        var form = localStorage;
        var val;
        if (way == "session") {
            val = storage.get(key, "session");
            form = sessionStorage;
        } else {
            val = storage.get(key);
        }
        if (arguments.length == 0) {
            var res = showStorage();
            form.clear();
            return res;
        } else if (arguments.length == 1 && arguments[0] == "session") {
            res = showStorage("session");
            sessionStorage.clear();
            return res;
        }
        form.removeItem(key);
        return val;
    },
    forEach:function(way){
        if(way=="session"){
            var res = showStorage(way);
            return res;
        }
        res = showStorage();
        return res;
    },
    size: function(way) {
        if(way=="session"){
            var res = sessionStorage.length;
        }else{
            res = localStorage.length;
        }
        return res;
    }
}
function isJSON(obj) {
    return typeof obj === "object" && Object.prototype.toString.call(obj).toLowerCase() && !obj.length;
}
function stringify(val) {
    return val === undefined || typeof val === "function" ? val + "" : JSON.stringify(val);
}
function isFunction(value) {
    return {}.toString.call(value) === "[object Function]";
}
function isArray(value) {
    return value instanceof Array;
}
function deserialize(value) {
    if (typeof value !== "string") {
        return undefined;
    }
    try {
        return JSON.parse(value);
    } catch (e) {
        return value || undefined;
    }
}
function showStorage(way) {
    var form = localStorage;
    if(arguments.length==1){
        form = sessionStorage;
    }
    var ret = "";
    for (var i = 0; i < form.length-1; i++) {
        var key = form.key(i);
        ret+= key + ":" + form.getItem(key)+",\n";
    }
    key = form.key(i);
    ret+= key + ":" + form.getItem(key);
    return ret;
}
