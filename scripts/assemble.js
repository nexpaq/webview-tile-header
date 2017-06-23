var fs = require("fs");
var replace = require("replace");

// Getting file to work with
var source = process.argv[2];
if(source == null) throw "No file specified";

// Getting resulting file name
var output = process.argv[3];
output = output || source.replace('.js', '_result.js');

// Defining templates
var replaceData = {
  'html/markup.min.html'    : '%%header_html%%', 
  'css/style.min.css'       : '%%header_styles%%', 
  'lib/svg-injector.min.js' : '%%svg_injector%%'  
}

// Getting target file content
var source_content = fs.readFileSync(source,'utf8');

// And replacing templates in this file
for (var key in replaceData) {
  var data = fs.readFileSync(key, 'utf8');
  // cleaning file from empty line
  data = data.replace(/(\r\n|\n|\r)/gm,"");
  var encoded_data = new Buffer(data).toString('base64');
  // replacing template
  source_content = source_content.replace(replaceData[key], encoded_data);
}

// Saving to resulting file
fs.writeFileSync(output, source_content);
