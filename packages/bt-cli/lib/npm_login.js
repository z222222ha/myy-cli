const shell = require("shelljs")

console.log(process.argv)

// 校验参数
if (process.argv.length !== 5) {
  console.error("Usage: node login.js <username> <password> <email>")
  process.exit(1)
}

function npmlogin() {
  var username = process.argv[2]
  var password = process.argv[3]
  var email = process.argv[4]
  var inputArray = [username + "\n", password + "\n", email + "\n"]

  var child = shell.exec("npm login", { async: true })

  child.stdout.on("data", (chunk) => {
    var cmd = inputArray.shift()
    if (cmd) {
      shell.echo(chunk + "input " + cmd)
      child.stdin.write(cmd)
    } else {
      child.stdin.end()
    }
  })
}
npmlogin()
