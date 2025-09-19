// FS - File System

const fs = require('fs');

// // mkdir
// if( ! fs.existsSync('./docs') )
// {
//     fs.mkdir('./docs', (err) => {
//         if(err){
//             console.log(err.message);
//         }
//         else
//             console.log('Folder created');
//     })

//     console.log('here here');

// }

// fs.writeFile('./docs/file.txt', 'Subsribe to code io', (err) => {
//     if(err){
//         console.log(err.message);
//     }
//     else{
//         console.log('File Written');
//     }
// })

// if(fs.existsSync('./docs/file.txt')){
//     fs.readFile('./docs/file.txt', (err, data)=> {
//         if(err) 
//             console.log(err.message);
//         else
//             console.log(data.toString());
//     })
// }

if(fs.existsSync('./docs/file.txt')){

    fs.unlink('./docs/file.txt', (err)=>{
        if(err)
            console.log(err.message);
        else
            console.log('file deleted');
    });

}

if(fs.existsSync('./docs')){
    fs.rmdir('./docs', (err)=> {
    if(err)
        console.log(err.message);
    else
        console.log('folder deletd');
    })
}
