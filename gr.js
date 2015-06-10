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


/**
 * Checking and formating for greek vehicle registration numbers. 
 * 
 * @class
 * @return {Object}
 */
var VehicleRegistrationNumberGr = function(){

    this.latinToGreek = function(letter){
        var translate = {
            A: 'Α', 
            B: 'Β', 
            E: 'Ε', 
            Z: 'Ζ', 
            H: 'Η', 
            I: 'Ι', 
            K: 'Κ', 
            M: 'Μ', 
            N: 'Ν', 
            O: 'Ο', 
            P: 'Ρ', 
            T: 'Τ', 
            Y: 'Υ', 
            X: 'Χ'  
        };


        if(translate.hasOwnProperty(letter)){
	    return translate[letter.toUpperCase()];
        } else {
            throw 'Corresponding greek letter not found for latin character ' + letter;
        }
    };




    /**
     * Checks given registration number validity.
     *
     * @public
     * @return {Boolean}
     * @param {String} rn Registration number to test.
     */
    this.check = function(rn){
        var test = rn.match(/^([a-zα-ω]{2,3})(|\s|-|\t)([0-9]{3,4})$/ig);
        return test !== null;
    };



    /**
     * Formats given registration number.
     *
     * If plate has letter into roman alphabet, then this letters are converted
     * into greek alphabet.
     *
     * @public
     * @return {String}
     * @param {String} rn Registration number to test.
     */
    this.format = function(rn){
        var testHasLatin = rn.match(/^([a-z]{2,3})(|\s|-|\t)([0-9]{3,4})$/ig);
        if(testHasLatin !== null){
		var out = '';
            var chars = rn.split('');
            for(var i in chars){
		var c = chars[i];
		if(c.match(/^[a-z]{1}$/i)){
			out += this.latinToGreek(c);
		} else {
			out += c;
		}
            }
		return out.trim();
        }
	return rn;
    };



};

module.exports = VehicleRegistrationNumberGr;

