// 读取指定目录下的一级目录的所有文件和文件夹
const fs = require('fs')
const path = require('path')

function readDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath)
  const result = []

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      result.push({
        name: file,
        type: 'directory',
        path: filePath,
      })
    } else {
      result.push({
        name: file,
        type: 'file',
        path: filePath,
      })
    }
  })

  return result
}

console.log(
  readDirectory('../bt-map').map((file) => {
    return { src: '../bt-map/' + file.name, dest: 'dist/bt-map' }
  })
)
