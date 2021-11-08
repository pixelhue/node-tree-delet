/*
 * @Description: 删除 文件夹下所以 node_modules 文件
 * @Author: kunyu.cao@hlifetech.com
 * @Date: 2021-08-12 22:24:22
 * @LastEditors: kunyu.cao@hlifetech.com
 * @LastEditTime: 2021-11-08 11:06:50
 */

var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec

const reg = /node\_modules/ // 要删除的文件名称
//要遍历的文件夹所在的路径
var filePath = path.resolve('/Users/${name}/Documents')

//调用文件遍历方法
fileDisplay(filePath)

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err, '读取文件夹错误！')
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename)
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败')
          } else {
            // var isFile = stats.isFile() //是文件
            var isDir = stats.isDirectory() //是文件夹
            // if (isFile) {
            //   // console.log(filedir)
            // }
            if (isDir) {
              if (reg.test(filedir)) {
                const pre = filedir.split('node_modules')[0]
                exec(`rm -rf ${pre}node_modules`, function (err, out) {
                  console.log(`${pre}node_modules  成功删除`, out)
                  err && console.log(err)
                })
              } else {
                fileDisplay(filedir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
              }
            }
          }
        })
      })
    }
  })
}

/**
 * 删除文件夹下所有问价及将文件夹下所有文件清空
 * @param {*} path
 */
function emptyDir(path) {
  const files = fs.readdirSync(path)
  files.forEach((file) => {
    const filePath = `${path}/${file}`
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      emptyDir(filePath)
    } else {
      fs.unlinkSync(filePath)
      console.log(`删除${file}文件成功`)
    }
  })
}

/**
 * 删除指定路径下的所有空文件夹
 * @param {*} path
 */
function rmEmptyDir(path, level = 0) {
  const files = fs.readdirSync(path)
  if (files.length > 0) {
    let tempFile = 0
    files.forEach((file) => {
      tempFile++
      rmEmptyDir(`${path}/${file}`, 1)
    })
    if (tempFile === files.length && level !== 0) {
      fs.rmdirSync(path)
    }
  } else {
    level !== 0 && fs.rmdirSync(path)
  }
}

/**
 * 清空指定路径下的所有文件及文件夹
 * @param {*} path
 */
function clearDir(path) {
  emptyDir(path)
  rmEmptyDir(path)
}
