#!/usr/bin/env node

console.log("bt-cli hello!")

// commander
const { Command } = require("commander")
const chalk = require("chalk")

const program = new Command()
program
  .name("bt-cli")
  .description("bt-cli 脚手架")
  .version(`bt-cli ${require("../package.json").version}`)
  .usage("<command> [options]")

program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action((prjName, ops) => {
    require("../lib/create.js")(prjName, ops)
  })

program.on("--help", () => {
  console.log()
  console.log(`Run ${chalk.cyan(`bt-cli <command> --help`)} show details for a given command`)
  console.log()
})

program.parse()

// inquirer
//   .prompt([
//     {
//       name: 'vue',
//       // 多选交互功能
//       // 单选将这里修改为 list 即可
//       type: 'checkbox',
//       message: 'Check the features needed for your project:',
//       choices: [
//         {
//           name: 'Babel',
//           checked: true,
//         },
//         {
//           name: 'TypeScript',
//         },
//         {
//           name: 'Progressive Web App (PWA) Support',
//         },
//         {
//           name: 'Router',
//         },
//       ],
//     },
//   ])
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   })
