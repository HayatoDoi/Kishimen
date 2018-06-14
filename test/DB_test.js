
const DB = require('../module/DB');

let db = new DB;

s = db.newSession();
s = db.newSession();
s = db.newSession();
db.set(s, 'key', 'val');

console.log(db.get(s, 'key'));
console.log(db.showAllSesstions());
