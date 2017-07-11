/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file. 
*
* A mock for http-client-x
*
* Copyright (c) 2016-2017 University Of Helsinki (The National Library Of Finland)
*
* This file is part of http-client-x-mock
*
* http-client-x-mock is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this page.
*
**/

(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define([
      'chai/chai',
      'simple-mock',
      '../lib/factory'
    ], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('chai'),
      require('simple-mock'),
      require('../lib/factory')
    );
  }

}(this, factory));

function factory(chai, simple, factory)
{

  'use strict';

  var expect = chai.expect;

  describe('factory', function() {

    it('Should be a  function', function() {
      expect(factory).to.be.a('function');
    });

    it('Should throw because adapter is not the expected object', function() {
      expect(factory).to.throw(Error, /^Adapter is not the expected object$/);
    });

    it('Should return the expected object', function() {
      expect(factory({

        create: simple.stub(),
        restore: simple.stub()

      })).to.be.an('object').and.to
        .respondTo('create').and.to
        .respondTo('restore');
    });

    describe('object', function() {

      describe('#create', function() {

        it('Should throw because URL is not defined', function() {
          expect(factory({

            create: simple.stub(),
            restore: simple.stub()

          }).create).to.throw(Error, /^URL is not defined$/);
        });

        it('Should use options passed in as single argument', function() {
          
          var spy = simple.spy();

          factory({            
            create: spy,
            restore: simple.stub()            
          }).create({
            url: 'foobar'
          });

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args[0]).to.eql({
            url: 'foobar',
            status: 200,
            method: 'GET',
            headers: {},
            body: '',
          });

        });

        it('Should use options passed in as separate arguments', function() {

          var spy = simple.spy();

          factory({            
            create: spy,
            restore: simple.stub()            
          }).create('foo', 'bar', 0, {}, '', 'foobar');

          expect(spy.callCount).to.equal(1);
          expect(spy.calls[0].args[0]).to.eql({
            url: 'foo',
            status: 0,
            method: 'bar',
            headers: {},
            body: ''
          });

        });

      });

      describe('#restore', function() {

        var spy = simple.spy();
        
        factory({          
          create: simple.stub(),
          restore: spy        
        }).restore();

        expect(spy.callCount).to.equal(1);
        expect(spy.calls[0].args.length).to.equal(0);

      });

    });

  });

}
