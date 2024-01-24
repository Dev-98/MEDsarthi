const easyocr = require('easyocr');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { Image } = require('canvas');
const { PythonShell } = require('python-shell');
const { promisify } = require('util');
const { fuzz } = require('thefuzz');
const { digits, punctuation } = require('string');

const image = 'text.png';
const path = createCanvas(1, 1);
const ctx = path.getContext('2d');
const img = loadImage(image);
ctx.drawImage(img, 0, 0);
const reader = new easyocr.Reader(['en']);
const results = reader.readtext(path);
let text = ' ';
for (const result of results) {
  text += result[1] + ' ';
}

const removeDigits = text => text.replace(new RegExp(`[${punctuation}]`, 'g'), '');
const removeDigits2 = text => text.replace(new RegExp(`[${digits}]`, 'g'), '');
let res = removeDigits(text);
res = removeDigits2(res);
let new_text = '';
for (const word of res.split(' ')) {
  if (word.length > 4) {
    new_text += word + ' ';
  }
}

const data = fs.readFileSync('medicine_data.csv', 'utf8');
const rows = data.split('\n');
const headers = rows[0].split(',');
const l = [];
for (let i = 1; i < rows.length; i++) {
  const row = rows[i].split(',');
  const score = fuzz.partial_token_sort_ratio(row[1], new_text);
  l.push(score);
}
const index = l.indexOf(Math.max(...l));
let out = {};
if (Math.max(...l) >= 80) {
  const bimari = rows[index + 1].split(',')[0];
  const dawai = rows[index + 1].split(',')[1];
  out = { Ailments: bimari, Medicine: dawai };
} else {
  const bimari = 'Not available in database';
  const dawai = 'Unreadable image';
  out = { Ailments: bimari, Medicine: dawai };
}
console.log(out);

