let inquirer = require('inquirer')
let fs = require('fs')

let store = {}

try {
  const data = fs.readFileSync('./store.dat', 'utf8')
  store = JSON.parse(data)
} catch (err) {
  console.error(err)
}

var selectionPrompt = {
  type: 'list',
  name: 'selection',
  message: '?',
  choices: ['Insert a new charge', 'Edit my current budget'],
}

function main() {
  console.log(`You have $${store.budget} left.\n`)
  console.log('What would you like to?')
  prompt();
}

function prompt() {
  inquirer.prompt(selectionPrompt).then((answers) => {
    if (answers.selection === 'Insert a new charge') {
      insertNewCharge()
    } else if (answers.selection === 'Edit my current budget') {
      editBudget()
    }
  });
}

// ----
// USER SELECTION - INSERT NEW CHARGE
// ----

const questions = [
  {
    type: 'input',
    name: 'new_spend',
    message: 'How much did you spend?',
  },
  {
    type: 'list',
    name: 'category',
    message: 'What category is this under?',
    choices: ['Supermarket', 'Gas', 'Restaurant', 'Entertainment'],
    filter: function (val) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Do you have other charges (just hit enter for YES)?',
    default: true,
  },
];

let output = [];

function insertNewCharge() {
  inquirer.prompt(questions).then((answers) => {
    output.push(answers.new_spend)
    store.budget -= answers.new_spend
    console.log(`Category you picked was ${answers.category}`);
    if (answers.askAgain) {
      insertNewCharge();
    } else {
      console.log('Your charges were:', output.join(', '))
      console.log(`You have $${store.budget} left.`)
      try {
        fs.writeFileSync('./store.dat', JSON.stringify(store))
      } catch (err) {
        console.error('error', err)
      }

    }
  })
}


// ----
// USER SELECTION - EDIT BUDGET
// ----

const edit_budget_questions = [
  {
    type: 'input',
    name: 'new_budget',
    message: 'How much is your new budget?',
  },
];

function editBudget() {
  inquirer.prompt(edit_budget_questions).then((answers) => {
    store.budget = answers.new_budget
    try {
      fs.writeFileSync('./store.dat', JSON.stringify(store))
    } catch (err) {
      console.error('error', err)
    }
  });
}

main()