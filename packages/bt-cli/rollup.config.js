const commonjs = require("@rollup/plugin-commonjs")
const json = require("@rollup/plugin-json")
const nodeResolve = require("@rollup/plugin-node-resolve")
const copy = require("rollup-plugin-copy")

const fs = require("fs")
const path = require("path")

module.exports = {
  input: "bin/index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs"
  },
  plugins: [
    commonjs(),
    json(),
    nodeResolve(),
    copy({
      //   targets: [
      //     { src: '../bt-core', dest: 'dist' },
      //     { src: '../bt-map/src', dest: 'dist/bt-map' },
      //     { src: '../bt-map/index.html', dest: 'dist/bt-map' },
      //   ],
      targets: [{ src: "../bt-core", dest: "dist" }, ...generateTargets("../bt-map")],
      verbose: true // 在终端进行console.log
    })
  ]
}

function readDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath)
  const result = []

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file)
    const stats = fs.statSync(filePath)

    // 排除 node_modules
    if (file === "node_modules") {
      return
    }

    if (stats.isDirectory()) {
      console.log(filePath)
      result.push({
        name: file,
        type: "directory",
        path: filePath
      })
    } else {
      console.log(filePath)
      result.push({
        name: file,
        type: "file",
        path: filePath
      })
    }
  })

  return result
}

function generateTargets(directoryPath) {
  return readDirectory(directoryPath).map((file) => {
    return { src: "../bt-map/" + file.name, dest: "dist/bt-map" }
  })
}
