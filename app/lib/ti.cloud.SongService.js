// This is a modified version of the bindings file generated by ACS.
// The modifications are noted below.
function InvokeService(path, method, data, cb) {
   if (typeof(data) == "function") {
      cb = data; data = null;
   }
   var xhr = Ti.Network.createHTTPClient();
   if (typeof(cb) == "function") {
        xhr.onload = function(e) {
           var r = this.responseText;
           if (xhr.getResponseHeader("content-type").indexOf("json") != -1) {
               try { r = JSON.parse(r); } catch (E) { }
           }
           cb(r, e);
        };
   }
   if(exports.URL.match('/$') == '/' && path.indexOf('/') == 0) {
       xhr.open(method, exports.URL + path.substring(1));
   } else {
       xhr.open(method, exports.URL + path);
   }
   // Added error callback and timeout
   xhr.onerror = function(e) {
       Ti.API.error(e.error);
   };
   xhr.timeout = 5000;
   xhr.send(data);
};

var url = Ti.App.Properties.getString("acs-service-baseurl-SongService");

if(url && url.replace(/^\s+|\s+$/g, "")) {
   exports.URL = url.replace(/^\s+|\s+$/g, "");
} else {
   exports.URL = "http://localhost:8080";
}

var route = "/song";

exports.song_songCreate = function (data, cb) {
   InvokeService(route, "POST", data, cb);
};

exports.song_songReadAll = function (data, cb) {
   InvokeService(route, "GET", data, cb);
};
// Added id param to handle route parameters to the following three entry points
exports.song_songRead = function (id, data, cb) {
   InvokeService(route + "/" + id, "GET", data, cb);
};

exports.song_songUpdate = function (id, data, cb) {
   InvokeService(route + "/" + id, "PUT", data, cb);
};

exports.song_songDelete = function (id, data, cb) {
   InvokeService(route + "/" + id, "DELETE", data, cb);
};