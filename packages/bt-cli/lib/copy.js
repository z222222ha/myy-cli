const fs = require("fs").promises
const path = require("path")

function copyFiles(srcDir, destDir) {
  return fs
    .mkdir(destDir, { recursive: true }) // 确保目标目录存在
    .then(() => fs.readdir(srcDir)) // 读取源目录文件
    .then((files) => {
      return Promise.all(
        files.map((file) => {
          const srcFilePath = path.join(srcDir, file)
          const destFilePath = path.join(destDir, file)

          return fs.stat(srcFilePath).then((stat) => {
            if (stat.isDirectory()) {
              return copyFiles(srcFilePath, destFilePath) // 递归复制文件夹
            } else {
              return fs.copyFile(srcFilePath, destFilePath) // 复制文件
            }
          })
        })
      )
    })
    .then(() => console.log(`所有文件已从 ${srcDir} 复制到 ${destDir}`))
    .catch((err) => console.error("复制文件出错:", err))
}

module.exports = copyFiles
