const path = require("path");
const fs = require("fs");
const { getOptions, interpolateName } = require("loader-utils");

function TraversalJsonObject(obj, key, value) {
  for (var item in obj) {
    if (item === key) {
      obj[item] = value;
    }
    if (typeof obj[item] == "object") {
      TraversalJsonObject(obj[item], key, value);
    }
  }
  return obj;
}

module.exports = function(source) {
  if (this.cacheable) this.cacheable(); 

  const options = getOptions(this) || {};

  var value = typeof source === "string" ? JSON.parse(source) : source;

  if (options.key && options.value) {
    value = TraversalJsonObject(value, options.key, options.value);
  }
  
  value = JSON.stringify(value) //去掉行和段分隔符
    .replace(/\u2028/g, "\\u2028") // 行分隔符('\u2028')
    .replace(/\u2029/g, "\\u2029"); //一个分段符('\u2029)

  const cpath = path.join(process.cwd(), './dist/' + options.name + '.json')
  fs.writeFileSync(cpath, value);

  return `module.exports = ${value}`;
};
