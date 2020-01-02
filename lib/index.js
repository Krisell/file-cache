"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require('fs');

var FileCache =
/*#__PURE__*/
function () {
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

          var data = cb();
          fs.writeFile("".concat(_this.path, "/file-cache-").concat(key), JSON.stringify({
            data: data,
            expiration: +new Date() + ttl * 1000
          }), function () {
            resolve(data);
          });
        });
      });
    }
  }]);

  return FileCache;
}();

var _default = FileCache;
exports["default"] = _default;