"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var fs = require('fs');
var FileCache = /*#__PURE__*/function () {
  function FileCache() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.';
    _classCallCheck(this, FileCache);
    this.path = path;
  }
  _createClass(FileCache, [{
    key: "remember",
    value: function remember(key, ttl, cb) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        fs.readFile("".concat(_this.path, "/file-cache-").concat(key), 'utf8', function (err, contents) {
          if (typeof contents === 'string') {
            try {
              var obj = JSON.parse(contents);
              if (+new Date() <= obj.expiration) {
                return resolve(obj.data);
              }
            } catch (err) {
              console.log(err);
            }
          }
          cb().then(function (data) {
            fs.writeFile("".concat(_this.path, "/file-cache-").concat(key), JSON.stringify({
              data: data,
              expiration: +new Date() + ttl * 1000
            }), function () {
              resolve(data);
            });
          });
        });
      });
    }
  }]);
  return FileCache;
}();
module.exports = FileCache;