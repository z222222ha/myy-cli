const { spawn } = require('child_process')

// function npmlogin() {
//   const username = 'zhh'
//   const password = 'zhh666'
//   const email = 'zhang2ha@qq.com'

//   const inputArray = [username, password, email]

//   const child = spawn('npm', ['login'], { stdio: 'pipe' })

//   child.stdout.on('data', (chunk) => {
//     const output = chunk.toString()
//     console.log('NPM Output:', output)

//     if (output.includes('Username:')) {
//       child.stdin.write(inputArray[0] + '\n')
//     } else if (output.includes('Password:')) {
//       child.stdin.write(inputArray[1] + '\n')
//     } else if (output.includes('Email:')) {
//       child.stdin.write(inputArray[2] + '\n')
//       child.stdin.end()
//     }
//   })

//   child.on('close', (code) => {
//     console.log(`npm login exited with code ${code}`)
//   })
// }

// npmlogin()

const shell = require('shelljs')

function npmlogin() {
  var username = 'zhh'
  var password = 'zhh666'
  var email = 'zhang2ha@qq.com'
  var inputArray = [username + '\n', password + '\n', email + '\n']

  var child = shell.exec('npm login', { async: true })

  child.stdout.on('data', (chunk) => {
    // shell.echo(byteToString(chunk))
    var cmd = inputArray.shift()
    if (cmd) {
      shell.echo('input ' + cmd)
      child.stdin.write(cmd)
    } else {
      child.stdin.end()
    }
  })
}
npmlogin()
