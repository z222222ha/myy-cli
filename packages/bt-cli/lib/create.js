const path = require("path")
const fs = require("fs-extra")
const inquirer = require("inquirer")
const copyFiles = require("./copy")
const { exec } = require("child_process")
const ora = require("ora")

function copyBtFiles(targetDir) {
  copyFiles(path.resolve(__dirname, "./bt-map"), targetDir).then(() => {
    console.log("bt-map复制成功!", targetDir)
    // 复制 bt-core 到 目标文件夹下
    copyFiles(path.resolve(__dirname, "./bt-core"), path.join(targetDir, "/public/lib/bt")).then(() => {
      console.log("bt-core复制成功!")
      // 运行 npm install 并设置镜像
      const spinner = ora("正在安装依赖...").start()
      exec("npm install --registry=https://registry.npmmirror.com", { cwd: targetDir }, (error, stdout, stderr) => {
        console.log(error)
        console.log(stdout)
        console.log(stderr)
        if (error) {
          spinner.fail("安装依赖失败!")
        } else {
          spinner.succeed("安装依赖成功!")
        }
      })
    })
  })
}

module.exports = function (prjName, ops) {
  console.log(111, prjName, ops)

  // 返回 Node.js 进程当前正在操作的目录的绝对路径
  const cwd = process.cwd()
  const targetDir = path.join(cwd, prjName)
  console.log(222, targetDir, fs.existsSync(targetDir))

  if (fs.existsSync(targetDir)) {
    console.log("目标目录已存在!")
    if (ops.force) {
      fs.remove(targetDir)
    } else {
      inquirer
        .prompt([
          {
            name: "overwrite",
            type: "confirm",
            message: "目标目录已存在, 是否覆盖?"
          }
        ])
        .then((data) => {
          if (data.overwrite) {
            console.log("删除目标目录")
            fs.remove(targetDir)
            // 复制
            copyBtFiles(targetDir)
          }
        })
    }
  } else {
    // 复制
    copyBtFiles(targetDir)
  }
}
