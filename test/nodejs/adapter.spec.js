/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file. 
*
* A mock for http-client-x
*
* Copyright (c) 2016 University Of Helsinki (The National Library Of Finland)
*
* This file is part of http-client-x-mock
*
* http-client-x-mock is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this page.
*
**/

(function() {

  'use strict';

  var chai = require('chai'),
  nock = require('nock'),
  http = require('http'),
  adapter = require('../../lib/nodejs/adapter'),
  expect = chai.expect;

  describe('adapter', function() {

    afterEach(nock.cleanAll);
    before(nock.disableNetConnect);
    after(function() {
      nock.enableNetConnect();
    });

    it('Should be the expected object', function() {
      expect(adapter).to.be.an('object').and.to
        .respondTo('create').and.to
        .respondTo('restore');
    });
    
    describe('#create', function() {

      it('Should mock the request', function(done) {

        adapter.create({
          url: 'http://foo.bar',
          method: 'GET',
          headers: {},
          status: 418
        });
        
        http.get('http://foo.bar/')
          .on('response', function(response) {
            try {
              expect(response.statusCode).to.equal(418);
              expect(response.headers).to.eql({});
              done();
            } catch (e) {
              done(e);
            }
          })
          .on('error', done);
        
      });

    });

    describe('#restore', function() {

      it('Should fail when doing a request because it is not mocked', function(done) {

        function doRequest(responseCallback, errorCallback)
        {
          http.get('http://foo.bar')
            .on('response', responseCallback)
            .on('error', errorCallback);
        }

        adapter.create({
          url: 'http://foo.bar/',
          method: 'GET',
          headers: {},
          status: 418
        });      

        doRequest(function(response) {
          try {

            expect(response.statusCode).to.equal(418);
            adapter.restore();

            doRequest(function(){}, function(error) {
              try {
                
                expect(nock.NetConnectNotAllowedError, new RegExp('^Nock: Not allow net connect for "foo.bar:80/"$'));
                done();
                
              } catch (e) {
                done(e);
              }
            });

          } catch (e) {
            done(e);
          }
        }, done);      

      });

    });

  });

}());
