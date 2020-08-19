const { exec,execSync } = require('child_process');

const spawn = require('child_process').spawn;
// 输出当前目录（不一定是代码所在的目录）下的文件和文件夹
exec("ls", (err, stdout, stderr) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
})


process.env.NODE_ENV = 'production';
process.env.npm_config_color = 'production';

// let foo = execSync("history 2")
// console.log(foo.toString())
// let free = spawn("history");
// // 捕获标准输出并将其打印到控制台
// free.stdout.on('data', function (data) {
//     console.log('standard output:\n' + data);
// });
//
// // 捕获标准错误输出并将其打印到控制台
// free.stderr.on('data', function (data) {
//     console.log('standard error output:\n' + data);
// });
//
// // 注册子进程关闭事件
// free.on('exit', function (code, signal) {
//     console.log('child process eixt ,exit:' + code);
// });