
var path = require('path')
const TreeDel =  require("./utils.js")
//要遍历的文件夹所在的路径
const paths  = [
  '/Users/star/Documents/github-me/',
  '/Users/star/Documents/projectme/',
  '/Users/star/Documents/worker/',
  '/Users/star/Documents/get/',
  '/Users/star/Documents/code/',
]

paths.forEach((item) => {
  let filePath = path.resolve(item)
  TreeDel.fileDisplay(filePath)
})
