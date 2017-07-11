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

/* istanbul ignore next: umd wrapper */
(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['@natlibfi/es6-polyfills/lib/polyfills/object'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('@natlibfi/es6-polyfills/lib/polyfills/object'));
  }

}(this, factory));

function factory(Object)
{

  'use strict';

  var DEFAULT_OPTIONS = {
    status: 200,
    method: 'GET',
    headers: {},
    body: ''
  };

  return function(adapter)
  {
    if (typeof adapter !== 'object' || typeof adapter.create !== 'function' || typeof adapter.restore !== 'function') {
      throw new Error('Adapter is not the expected object');
    } else {
      return {
        restore: adapter.restore,
        create: function()
        {

          var options = JSON.parse(JSON.stringify(DEFAULT_OPTIONS));

          if (typeof arguments[0] === 'object') {
            options = Object.assign(options, arguments[0]);
          } else {
            for (var i = 0; i < arguments.length; i++) {
              switch (i) {
              case 0:
                options.url = arguments[i];
                break;
              case 1:
                options.method = arguments[i];
                break;
              case 2:
                options.status = arguments[i];
                break;
              case 3:
                options.headers = arguments[i];
                break;
              case 4:
                options.body = arguments[i];
                break;
              default:
                break;
              }
            }
          }

          if (!options.url) {
            throw new Error('URL is not defined');
          } else {
            adapter.create(options);
          }

        }
      };
    }

  };

}
