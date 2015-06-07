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

describe('Checking old french registration numbers', function(){
    
    it('should throw error if its first group contains letters', function(){
        assert.throws(function(){fr.check('25I CMN 36');});
        assert.throws(function(){fr.check('2ZI CMN 36');});
        assert.throws(function(){fr.check('ZZI CMN 36');});
        assert.throws(function(){fr.check('25I-CMN-36');});
        assert.throws(function(){fr.check('2ZI-CMN-36');});
        assert.throws(function(){fr.check('ZZI-CMN-36');});
        assert.throws(function(){fr.check('25I.CMN.36');});
        assert.throws(function(){fr.check('2ZI.CMN.36');});
        assert.throws(function(){fr.check('ZZI.CMN.36');});
    });
    
    it('should throw error if its second group contains digits', function(){
        assert.throws(function(){fr.check('251 CM5 36');});
        assert.throws(function(){fr.check('251 C45 36');});
        assert.throws(function(){fr.check('251 245 36');});
        assert.throws(function(){fr.check('251-CM5-36');});
        assert.throws(function(){fr.check('251-C45-36');});
        assert.throws(function(){fr.check('251-245-36');});
        assert.throws(function(){fr.check('251.CM5.36');});
        assert.throws(function(){fr.check('251.C45.36');});
        assert.throws(function(){fr.check('251.245.36');});
    });


    it('should throw error if its last group contains letters', function(){
        assert.throws(function(){fr.check("251 CMN 3G");});
        assert.throws(function(){fr.check("251 CMN EG");});
        assert.throws(function(){fr.check("251 CMN 92I");});
        assert.throws(function(){fr.check("251 CMN 9ZI");});
        assert.throws(function(){fr.check("251 CMN GZI");});
        assert.throws(function(){fr.check("251-CMN-3G");});
        assert.throws(function(){fr.check("251-CMN-EG");});
        assert.throws(function(){fr.check("251-CMN-92I");});
        assert.throws(function(){fr.check("251-CMN-9ZI");});
        assert.throws(function(){fr.check("251-CMN-GZI");});
        assert.throws(function(){fr.check("251.CMN.3G");});
        assert.throws(function(){fr.check("251.CMN.EG");});
        assert.throws(function(){fr.check("251.CMN.92I");});
        assert.throws(function(){fr.check("251.CMN.9ZI");});
        assert.throws(function(){fr.check("251.CMN.GZI");});
    });
    

    it('should not throw error if its last group is 2A or 2B, Corsica special code', function(){
        assert.doesNotThrow(function(){fr.check("251 CMN 2A");});
        assert.doesNotThrow(function(){fr.check("251 CMN 2B");});
        assert.doesNotThrow(function(){fr.check("251-CMN-2A");});
        assert.doesNotThrow(function(){fr.check("251-CMN-2B");});
        assert.doesNotThrow(function(){fr.check("251.CMN.2A");});
        assert.doesNotThrow(function(){fr.check("251.CMN.2B");});
    });
    

    it('should return true if registration number is valid using spaces', function(){
        assert.isTrue(fr.check('251 CMN 36'));
        assert.isTrue(fr.check('1234 BSD 44'));
        assert.isTrue(fr.check('945 BZ 01'));
    });
    
    

    it('should return true if registration number is valid using hyphen', function(){
        assert.isTrue(fr.check('251-CMN-36'));
        assert.isTrue(fr.check('1234-BSD-44'));
        assert.isTrue(fr.check('945-BZ-01'));
    });
    
    

    it('should return true if registration number is valid using dot', function(){
        assert.isTrue(fr.check('251.CMN.36'));
        assert.isTrue(fr.check('1234.BSD.44'));
        assert.isTrue(fr.check('945.BZ.01'));
    });

    it('should return true if registration number is valid using tabs', function(){
        assert.isTrue(fr.check("251.\tCMN\t36"));
        assert.isTrue(fr.check("1234\tBSD\t44"));
        assert.isTrue(fr.check("945\tBZ\t01"));
    });
    
    

    it('should return true if registration number is valid without separators', function(){
        assert.isTrue(fr.check('251CMN36'));
        assert.isTrue(fr.check('1234BSD44'));
        assert.isTrue(fr.check('945BZ01'));
    });

});

describe('Checking new french registration numbers', function(){
});

describe('Formating old french registration numbers', function(){
});

describe('Formating new french registration numbers', function(){
});
