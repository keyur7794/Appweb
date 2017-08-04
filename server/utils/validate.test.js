const expect = require('expect');

const {isRealString}=require('./validate');
describe(
'isRealString',()=>{
it('should reject ',()=>{

var res=isRealString(98);
expect(res).toBe(false);

});

it('should rej str wid spaces',()=>{
var res=isRealString('  ');
expect(res).toBe(false);

});


it('should rej str wid non spaces chr',()=>{
var res=isRealString(' andrew ');
expect(res).toBe(true);

});

});
