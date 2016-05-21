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

  var nock = require('nock'),
  url = require('url');

  module.exports = {
    restore: nock.cleanAll,
    create: function(options)
    {

      var url_obj = url.parse(options.url);

      nock(url_obj.protocol + '//' + url_obj.host, {
        reqheaders: options.headers
      }).intercept(url_obj.path, options.method).reply(options.status, options.body);

    }
  };

}());