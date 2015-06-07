/*
The MIT License (MIT)

Copyright (c) 2015 Michel Petit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var vrn = require('./index.js');
var assert = require("assert")

var fr = new vrn({country: "fr"});

var assert = require('chai').assert;



describe('Testing general behavior', function(){
    describe('Checking loading country', function(){
        it('should success for fr', function(){
            assert(new vrn({country: "fr"}));
        });
    });

    describe('Checking basics', function(){
        it('should throw error if registration nnumber is void', function(){
            assert.throws(function(){fr.check('')});
        });
        it('should throw error if registration nnumber is not a string', function(){
            assert.throws(function(){fr.check(42)});
            assert.throws(function(){fr.check(null)});
            assert.throws(function(){fr.check({})});
            assert.throws(function(){fr.check([])});
        });
    });
});


describe('Testing FR module', function(){
    describe('Checking old french registration numbers', function(){
        
        it('should fail if its first group contains letters', function(){
            assert.isFalse(fr.check('25I CMN 36'));
            assert.isFalse(fr.check('2ZI CMN 36'));
            assert.isFalse(fr.check('ZZI CMN 36'));
            assert.isFalse(fr.check('25I-CMN-36'));
            assert.isFalse(fr.check('2ZI-CMN-36'));
            assert.isFalse(fr.check('ZZI-CMN-36'));
            assert.isFalse(fr.check('25I.CMN.36'));
            assert.isFalse(fr.check('2ZI.CMN.36'));
            assert.isFalse(fr.check('ZZI.CMN.36'));
        });
        
        it('should fail if its second group contains letters I, O or U', function(){
            assert.isFalse(fr.check('251 CMI 36'));
            assert.isFalse(fr.check('251 CMU 36'));
            assert.isFalse(fr.check('251 CMO 36'));
            assert.isFalse(fr.check('251-CMI-36'));
            assert.isFalse(fr.check('251-CMU-36'));
            assert.isFalse(fr.check('251-CMO-36'));
            assert.isFalse(fr.check('251.CMI.36'));
            assert.isFalse(fr.check('251.CMU.36'));
            assert.isFalse(fr.check('251.CMO.36'));
        });
        
        it('should fail if its second group contains digits', function(){
            assert.isFalse(fr.check('251 CM5 36'));
            assert.isFalse(fr.check('251 C45 36'));
            assert.isFalse(fr.check('251 245 36'));
            assert.isFalse(fr.check('251-CM5-36'));
            assert.isFalse(fr.check('251-C45-36'));
            assert.isFalse(fr.check('251-245-36'));
            assert.isFalse(fr.check('251.CM5.36'));
            assert.isFalse(fr.check('251.C45.36'));
            assert.isFalse(fr.check('251.245.36'));
        });


        it('should fail if its last group contains letters', function(){
            assert.isFalse(fr.check("251 CMN 3G"));
            assert.isFalse(fr.check("251 CMN EG"));
            assert.isFalse(fr.check("251 CMN 92I"));
            assert.isFalse(fr.check("251 CMN 9ZI"));
            assert.isFalse(fr.check("251 CMN GZI"));
            assert.isFalse(fr.check("251-CMN-3G"));
            assert.isFalse(fr.check("251-CMN-EG"));
            assert.isFalse(fr.check("251-CMN-92I"));
            assert.isFalse(fr.check("251-CMN-9ZI"));
            assert.isFalse(fr.check("251-CMN-GZI"));
            assert.isFalse(fr.check("251.CMN.3G"));
            assert.isFalse(fr.check("251.CMN.EG"));
            assert.isFalse(fr.check("251.CMN.92I"));
            assert.isFalse(fr.check("251.CMN.9ZI"));
            assert.isFalse(fr.check("251.CMN.GZI"));
        });
        

        it('should not fail if its last group is 2A or 2B, Corsica special code', function(){
            assert.isTrue(fr.check("251 CMN 2A"));
            assert.isTrue(fr.check("251 CMN 2B"));
            assert.isTrue(fr.check("251-CMN-2A"));
            assert.isTrue(fr.check("251-CMN-2B"));
            assert.isTrue(fr.check("251.CMN.2A"));
            assert.isTrue(fr.check("251.CMN.2B"));
        });


        it('should fail if its first group has more than 4 digits', function(){
            assert.isFalse(fr.check('12345 CMN 36'));
        });

        it('should fail if its second group has more than 3 letters', function(){
            assert.isFalse(fr.check('1234 ABCD 36'));
        });

        it('should fail if its second group has less than 2 letters', function(){
            assert.isFalse(fr.check('1234 A 36'));
        });
        
        it('should fail if last group has more than 2 digits', function(){
            assert.isFalse(fr.check('123 ABC 456'));
        });
        
        it('should fail if last group has less than 2 digits', function(){
            assert.isFalse(fr.check('123 ABC 4'));
        });
        
        
        it('should success if last group has more than 3 digits and is in [971,976] range', function(){
            assert.isTrue(fr.check('123 ABC 971'));
            assert.isTrue(fr.check('123 ABC 972'));
            assert.isTrue(fr.check('123 ABC 973'));
            assert.isTrue(fr.check('123 ABC 974'));
            assert.isTrue(fr.check('123 ABC 975'));
            assert.isTrue(fr.check('123 ABC 976'));
        });
        
        it('should fail if last group has 3 digits starting with 97 and higher than 976', function(){
            assert.isFalse(fr.check('123 ABC 977'));
            assert.isFalse(fr.check('123 ABC 978'));
            assert.isFalse(fr.check('123 ABC 979'));
        });

        it('should fail if last group is 90', function(){
            assert.isFalse(fr.check('123 ABC 90'));
        });

        it('should fail if last group has 2 digits and is higher then 95', function(){
            assert.isFalse(fr.check('123 ABC 96'));
            assert.isFalse(fr.check('123 ABC 97'));
            assert.isFalse(fr.check('123 ABC 98'));
            assert.isFalse(fr.check('123 ABC 99'));
        });

        it('should success if last group has 2 digits, starting with 9 in the range [91,95]', function(){
            assert.isTrue(fr.check('123 ABC 91'));
            assert.isTrue(fr.check('123 ABC 92'));
            assert.isTrue(fr.check('123 ABC 93'));
            assert.isTrue(fr.check('123 ABC 94'));
            assert.isTrue(fr.check('123 ABC 95'));
        });

        it('should success if last group has one meaning digit with leading 0', function(){
            assert.isTrue(fr.check('123 AB 01'));
            assert.isTrue(fr.check('123 AB 02'));
            assert.isTrue(fr.check('123 AB 03'));
            assert.isTrue(fr.check('123 AB 04'));
            assert.isTrue(fr.check('123 AB 05'));
            assert.isTrue(fr.check('123 AB 06'));
            assert.isTrue(fr.check('123 AB 07'));
            assert.isTrue(fr.check('123 AB 08'));
            assert.isTrue(fr.check('123 AB 09'));
        });

        it('should fail if last group has 2 zeros', function(){
            assert.isFalse(fr.check('123 AB 00'));
        });

        it('should success if registration number is valid using spaces', function(){
            assert.isTrue(fr.check('251 CMN 36'));
            assert.isTrue(fr.check('1234 BSD 44'));
            assert.isTrue(fr.check('945 BZ 01'));
            assert.isTrue(fr.check('251 cmn 36'));
            assert.isTrue(fr.check('1234 bsd 44'));
            assert.isTrue(fr.check('945 bz 01'));
        });
        
        

        it('should success if registration number is valid using hyphen', function(){
            assert.isTrue(fr.check('251-CMN-36'));
            assert.isTrue(fr.check('1234-BSD-44'));
            assert.isTrue(fr.check('945-BZ-01'));
            assert.isTrue(fr.check('251-cmn-36'));
            assert.isTrue(fr.check('1234-bsd-44'));
            assert.isTrue(fr.check('945-bz-01'));
        });
        
        

        it('should success if registration number is valid using dot', function(){
            assert.isTrue(fr.check('251.CMN.36'));
            assert.isTrue(fr.check('1234.BSD.44'));
            assert.isTrue(fr.check('945.BZ.01'));
            assert.isTrue(fr.check('251.cmn.36'));
            assert.isTrue(fr.check('1234.bsd.44'));
            assert.isTrue(fr.check('945.bz.01'));
        });

        it('should success if registration number is valid using tabs', function(){
            assert.isTrue(fr.check("251\tCMN\t36"));
            assert.isTrue(fr.check("1234\tBSD\t44"));
            assert.isTrue(fr.check("945\tBZ\t01"));
            assert.isTrue(fr.check("251\tcmn\t36"));
            assert.isTrue(fr.check("1234\tbsd\t44"));
            assert.isTrue(fr.check("945\tbz\t01"));
        });
        
        

        it('should success if registration number is valid without separators', function(){
            assert.isTrue(fr.check('251CMN36'));
            assert.isTrue(fr.check('1234BSD44'));
            assert.isTrue(fr.check('945BZ01'));
            assert.isTrue(fr.check('251cmn36'));
            assert.isTrue(fr.check('1234bsd44'));
            assert.isTrue(fr.check('945bz01'));
        });

    });




    describe('Checking new french registration numbers', function(){
        it('should fail if first group has two letters "SS"', function(){
            assert.isFalse(fr.check('SS-123-AB'));
        });
        
        it('should fail if last group has two letters "SS"', function(){
            assert.isFalse(fr.check('AB-123-SS'));
        });
        
        
        it('should fail if first group has two letters "WW"', function(){
            assert.isFalse(fr.check('WW-123-AB'));
        });
        
        it('should fail if first group has at least one of the followings letters: "I", "O" or "U"', function(){
            assert.isFalse(fr.check('AI-123-AB'));
            assert.isFalse(fr.check('IA-123-AB'));
            assert.isFalse(fr.check('II-123-AB'));
            assert.isFalse(fr.check('AO-123-AB'));
            assert.isFalse(fr.check('OA-123-AB'));
            assert.isFalse(fr.check('OO-123-AB'));
            assert.isFalse(fr.check('AU-123-AB'));
            assert.isFalse(fr.check('UA-123-AB'));
            assert.isFalse(fr.check('UU-123-AB'));
        });

        it('should fail if last group has at least one of the followings letters: "I", "O" or "U"', function(){
            assert.isFalse(fr.check('AB-123-AI'));
            assert.isFalse(fr.check('AB-123-IA'));
            assert.isFalse(fr.check('AB-123-II'));
            assert.isFalse(fr.check('AB-123-AO'));
            assert.isFalse(fr.check('AB-123-OA'));
            assert.isFalse(fr.check('AB-123-OO'));
            assert.isFalse(fr.check('AB-123-AU'));
            assert.isFalse(fr.check('AB-123-UA'));
            assert.isFalse(fr.check('AB-123-UU'));
        });

        it('should fail if first group has digit', function(){
            assert.isFalse(fr.check('2B-123-CD'));
            assert.isFalse(fr.check('B2-123-CD'));
            assert.isFalse(fr.check('12-123-CD'));
        });
        
        it('should fail if middle group has at least one character that is not a digit', function(){
            assert.isFalse(fr.check('AB-I23-CD'));
            assert.isFalse(fr.check('AB-IZ3-CD'));
            assert.isFalse(fr.check('AB-IZE-CD'));
        });
        

        it('should fail if last group has digit', function(){
            assert.isFalse(fr.check('CD-123-2B'));
            assert.isFalse(fr.check('CD-123-B2'));
            assert.isFalse(fr.check('CD-123-12'));
        });

        it('should fail if first group has no 2 letters', function(){
            assert.isFalse(fr.check('ABC-123-CD'));
            assert.isFalse(fr.check('A-123-CD'));
        });

        it('should fail if second group has no 3 digits', function(){
            assert.isFalse(fr.check('AB-1234-CD'));
            assert.isFalse(fr.check('AB-12-CD'));
        });
        
        it('should fail if third group has no 2 letters', function(){
            assert.isFalse(fr.check('AB-123-CDE'));
            assert.isFalse(fr.check('AB-123-C'));
        });

        it('should fail if first group does not exist', function(){
            assert.isFalse(fr.check('-123-CD'));
            assert.isFalse(fr.check('123-CD'));
        });

        it('should fail if second group does not exist', function(){
            assert.isFalse(fr.check('AB-CD'));
        });

        it('should fail if third group does not exist', function(){
            assert.isFalse(fr.check('AB-123-'));
            assert.isFalse(fr.check('AB-123'));
        });

        it('should success if registration number is in lower cases and uses hyphens as separator', function(){
            assert.isTrue(fr.check('ab-123-cd'));
        });

        it('should success if registration number uses spaces as separator', function(){
            assert.isTrue(fr.check('AB 123 CD'));
        });

        it('should success if registration number uses dots as separator', function(){
            assert.isTrue(fr.check('AB.123.CD'));
        });

        it('should success if registration number uses tabs as separator', function(){
            assert.isTrue(fr.check('AB\t123\tCD'));
        });

        it('should success if registration number does not use separator', function(){
            assert.isTrue(fr.check('AB123CD'));
        });
    });




    describe('Formating old french registration numbers', function(){
        it('should throw exception if registration number validation fails', function(){
            assert.throw(function(){fr.format('1234 CMN 367');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('1234 CMO 36');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('1234 CMI 36');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('1234 CMU 36');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('12345 CMO 36');}, 'Invalid FR registration number');
        });


        it('should return string if registration is valid', function(){
            assert.isString(fr.format('123CMN36'));
            assert.isString(fr.format('123CMN975'));
            assert.isString(fr.format('123CMN2B'));
        });


        it('should use space separator as valid returned string', function(){
            console.log();
            assert.strictEqual(fr.format('123CMN36'), '123 CMN 36');
            assert.strictEqual(fr.format('123.CMN.36'), '123 CMN 36');
            assert.strictEqual(fr.format('123-CMN-36'), '123 CMN 36');
            assert.strictEqual(fr.format('123\tCMN\t36'), '123 CMN 36');
        });


        it('should uppercase string if it is in lowercase', function(){
            assert.strictEqual(fr.format('123cmn36'), '123 CMN 36');
            assert.strictEqual(fr.format('123cmn975'), '123 CMN 975');
            assert.strictEqual(fr.format('123cmn2b'), '123 CMN 2B');
        });
    });

    describe('Formating new french registration numbers', function(){
        it('should throw exception if registration number validation fails', function(){
            assert.throw(function(){fr.format('ABC-123-AZ');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('A-123-AZ');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AB-1234-AZ');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AB-12-AZ');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AB-123-AZE');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AB-123-A');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('SS-123-AB');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('WW-123-AB');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AB-123-SS');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AI-123-CD');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AO-123-CD');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AU-123-CD');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AB-123-CI');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AB-123-CO');}, 'Invalid FR registration number');
            assert.throw(function(){fr.format('AB-123-CU');}, 'Invalid FR registration number');
        });


        it('should return string if registration is valid', function(){
            assert.isString(fr.format('AA123BB'));
            assert.isString(fr.format('ZZ999ZZ'));
        });

        it('should return string with hyphen as separator if registration number is valid', function(){
            assert.strictEqual(fr.format('AB123CD'), 'AB-123-CD');
            assert.strictEqual(fr.format('AB.123.CD'), 'AB-123-CD');
            assert.strictEqual(fr.format('AB-123-CD'), 'AB-123-CD');
            assert.strictEqual(fr.format('AB 123 CD'), 'AB-123-CD');
            assert.strictEqual(fr.format('AB\t123\tCD'), 'AB-123-CD');
        });

        it('should uppercase string if it is in lowercase', function(){
            assert.strictEqual(fr.format('ab123bc'), 'AB-123-BC');
            assert.strictEqual(fr.format('ab.123.bc'), 'AB-123-BC');
            assert.strictEqual(fr.format('ab-123-bc'), 'AB-123-BC');
            assert.strictEqual(fr.format('ab 123 bc'), 'AB-123-BC');
            assert.strictEqual(fr.format('ab\t123\tbc'), 'AB-123-BC');
        });

    });
});


