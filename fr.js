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
 * Checking and formating for french vehicle registration numbers. 
 * 
 * @class
 * @return {Object}
 */
var VehicleRegistrationNumberFr = function(){





    /**
     * Checks given registration number validity, for old and new
     * registration number format.
     *
     * @public
     * @return {Boolean}
     * @param {String} rn Registration number to test.
     * @throws {String} Exception if registration number does not follow some rules.
     */
    this.check = function(rn){
        // TODO
        return true;
    };



    /**
     * Formats given registration number.
     *
     * If registration number is into the old always avaialable format,
     * then separator used is space, in other way, it is hypen.
     *
     * @public
     * @return {String}
     * @param {String} rn Registration number to test.
     */
    this.format = function(rn){
        // TODO
        return rn;
    };



};

module.exports = VehicleRegistrationNumberFr;
