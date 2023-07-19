const Transaction = require('./transaction');
const Statement = require('./statement');

class Account {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount, date) {
    const transaction = new Transaction(date, amount, 'deposit');
    this.transactions.push(transaction);
    this.balance += amount;
  }

  withdraw(amount, date) {
    const transaction = new Transaction(date, amount, 'withdrawal');
    this.transactions.push(transaction);
    this.balance -= amount;
  }

  getStatement() {
    const statement = new Statement(this.transactions);
    return statement.printStatement();
  }
}

module.exports = Account;

