#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const vfs = require('vinyl-fs');
const scanner = require('i18next-scanner');
const path = require('path');
// Using this url support translate online
// https://translate.i18next.com/
// http://www.lingoes.net/en/translator/langcode.htm

vfs
  .src(`src/**/*.{ts,tsx}`)
  .pipe(
    scanner({
      debug: true,
      attr: false,
      nsSeparator: false,
      keySeparator: false,
      plural: false,
      removeUnusedKeys: true,
      trans: false,
      lngs: [
        'en', //English
        'hi', //Hindi
        'ja', //Japan
        'pt', //Portuguese / Brazil
        'es', //Spanish
        'ko', //Korean
        'id', //Indonesian
        'de', //Germany
      ],
      func: {
        list: ['t'],
        extensions: ['.ts', '.tsx'],
      },
      defaultValue: (lng, ns, key) => key,
      resource: {
        loadPath: path.join('src/resources', 'locales/{{lng}}.json'),
        savePath: 'locales/{{lng}}.json',
        jsonIndent: 2,
      },
    }),
  )
  .pipe(vfs.dest('src/resources'));
