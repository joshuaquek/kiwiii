
const argv = require('argv');
const ejs = require("ejs");
const fs = require("fs");
const less = require('less');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify');
const minify = require('uglify-es').minify;


// Preamble
const json = JSON.parse(fs.readFileSync("package.json", "utf8"));
const preamble = `// ${json.homepage} Version ${json.version}. Copyright ${(new Date).getFullYear()} ${json.author}.`;


// Commandline option
argv.option({
  name: 'debug',
  type : 'boolean',
  description :'debug build',
  example: "'script --debug=true'"
});
const args = argv.run();
const isDebugBuild = args.options.debug;

const distDir = 'dist';
const buildDir = isDebugBuild ? './docs/_build': './docs/app';


// Bundle setting
const appBundles = [
  {name: 'dashboardApp', ejs: 'dashboard'},
  {name: 'datagridApp', ejs: 'datagrid'},
  {name: 'networkApp', ejs: 'network'},
  {name: 'profileApp', ejs: 'profile'},
  {name: 'tileApp', ejs: 'tile'}
];

const debugBundles = [
  {name: 'testAPI', ejs: 'testAPI'},
  {name: 'main', source: 'main.js'}
];

const deployBundles = [
  {name: 'datagrid', module: 'kw-datagrid', dist: true},
  {name: 'network', module: 'kw-network', dist: true},
  {name: 'tile', module: 'kw-tile', dist: true}
];

const bundles = appBundles.concat(isDebugBuild ? debugBundles : deployBundles);


// External JS libraries
const external = {
  d3: 'd3',
  jLouvain: 'jLouvain',
  pako: 'pako',
  vega: 'vega',
  lodash: '_'
};


// JS build
const jsBundled = bundles.map(bundle => {
  const plugins = [resolve({jsnext: true})];
  if (!isDebugBuild) {
    plugins.push(uglify({output: {beautify: false, preamble: preamble}}, minify));
  }
  const module = bundle.hasOwnProperty('module') ? bundle.module : bundle.name;
  return rollup.rollup({
    input: bundle.hasOwnProperty('source') ? bundle.source : `src/${bundle.name}.js`,
    plugins: plugins,
    external: Object.keys(external)
  }).then(b => {
    b.write({
      file: `${bundle.dist ? distDir : buildDir}/${module}.js`,
      format: 'umd',
      sourcemap: true,
      name: module,
      banner: preamble,
      intro: `const isDebugBuild = ${isDebugBuild}; const kwVersion = '${json.version}';`,
      globals: external
    });
  });
});


// EJS build
const htmlRendered = bundles
  .filter(bundle => bundle.hasOwnProperty('ejs'))
  .map(bundle => {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        `./raw/${bundle.ejs}.ejs`, {}, {},
        (err, str) => {
          if (err) {
            console.error(err);
            reject();
          }
          fs.writeFile(`${buildDir}/${bundle.ejs}.html`, str, () => {
            resolve();
          });
        }
      );
    });
  });


// LESS build
const cssRendered = new Promise(resolve => {
  fs.readFile('raw/default.less', 'utf8', (err, input) => {
    less.render(input).then(output => {
      fs.writeFile(`${buildDir}/default.css`, output.css, () => {
        resolve();
      });
    });
  });
});


// Run
Promise.all(jsBundled.concat(htmlRendered, cssRendered));
