// eslint-disable-next-line import/no-extraneous-dependencies
const sh = require('shelljs');

sh.set('-e');

sh.cp('-r', './thirds', './dist/');
sh.cd('./dist');
sh.exec('git init');
sh.exec('git remote add origin https://github.com/wuchu/aircraft.gi');
sh.exec('git checkout -B demo');
sh.exec('git add .');
sh.exec('git commit -m "init demo"');
sh.exec('git push origin demo -f');
sh.popd();
