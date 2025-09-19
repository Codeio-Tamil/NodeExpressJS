const fs = require('fs');

const readStream = fs.createReadStream('./docs/HugeFile.txt', {encoding: 'utf8'});
const writestream = fs.createWriteStream('./docs/copyHugeFile.txt');

// readStream.on('data', (buffer) => {
//     writestream.write('\nNew Buffer\n');
//     writestream.write(buffer);
// })

readStream.pipe(writestream);