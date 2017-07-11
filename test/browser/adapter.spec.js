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

define(['chai/chai', '@natlibfi/xmlhttprequest-mock', '../../lib/browser/adapter'], function(chai, xhrMockFactory, adapter) {

  'use strict';

  var expect = chai.expect;

  describe('adapter', function() {

    it('Should be the expected object', function() {
      expect(adapter).to.be.an('object').and.to
        .respondTo('create').and.to
        .respondTo('restore');
    });

    describe('create', function() {

      afterEach(adapter.restore);

      it('Should mock the request', function(done) {

        var xhr;

        adapter.create({
          status: 418
        });

        xhr = new XMLHttpRequest();

        xhr.addEventListener('error', done);
        xhr.addEventListener('load', function() {
          try {

            expect(xhr.status).to.equal(418);
            expect(xhr.responseText).to.equal('');
            expect(xhr.getAllResponseHeaders()).to.be.null /*jshint -W030 */;

            done();

          } catch (e) {
            done(e);
          }
        });

        xhr.open('GET', 'http://foo.bar');
        xhr.send();

      });

      describe('restore', function() {

        var xhr_mock = xhrMockFactory(1);

        afterEach(function() {
          xhr_mock.restore();
          adapter.restore();
        });

        it('Should not be an instance of a mocked XMLHttpRequest after #restore() is called', function(done) {

          var xhr;

          adapter.create({
            status: 418
          });

          xhr = new XMLHttpRequest();

          xhr.addEventListener('error', done);
          xhr.addEventListener('load', function() {
            try {

              expect(xhr.status).to.equal(418);
              expect(xhr.responseText).to.equal('');
              expect(xhr.getAllResponseHeaders()).to.be.null /*jshint -W030 */;

              adapter.restore();

              xhr = new XMLHttpRequest();

              expect(xhr).to.not.be.an.instanceof(xhr_mock.create({
                url: 'http://foo.bar'
              }));

              done();

            } catch (e) {
              done(e);
            }
          });

          xhr.open('GET', 'http://foo.bar');
          xhr.send();

        });

      });
      
    });

  });

});
