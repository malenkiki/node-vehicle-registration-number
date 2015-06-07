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
 * Implements new VehicleRegistrationNumber object. 
 * 
 * @class
 * @param {{country: String}} Options
 * @return {Object}
 */
function VehicleRegistrationNumber(opt){


    this.country = '';



    /**
     * Constructor, takes options and does some basic stuff.
     *
     * @private
     * @param {{country: String}} Options
     */
    this.init = function(opt){
        // TODO check valid countries
        if(opt && typeof(opt.country) === 'string'){
            this.country = this.loadCountry(opt.country);
        }
    };




    /**
     * Loads module belongs to selected country.
     *
     * @private 
     * @param {String} code Corresponding country code ('fr', 'it'…)
     */
    this.loadCountry = function(code){
        var vnrc = require('./' + code.toLowerCase() + ".js");
        return new vnrc();
    };



    /**
     * Checks given registration number validity.
     *
     * @public
     * @return {Boolean}
     * @param {String} rn Registration number to test.
     * @throws {String} Exception if registration is empty or is not a string.
     */
    this.check = function(rn){
        if(!rn || typeof(rn) !== 'string'){
            throw "Registration number must be a not void string.";
        }

        return this.country.check(rn);
    };



    /**
     * Formats given registration number.
     *
     * @public
     * @return {String}
     * @param {String} rn Registration number to test.
     * @throws {String} Exception if registration is empty or is not a string.
     */
    this.format = function(rn){
        return this.country.format(rn);
    };



    this.init(opt);
};

module.exports = VehicleRegistrationNumber;
