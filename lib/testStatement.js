const Account = require('./lib/account');
const Transaction = require('./transaction');

const account = new Account();

account.deposit(1000, new Date('2023-01-10'));
account.deposit(2000, new Date('2023-01-13'));
account.withdraw(500, new Date('2023-01-14'));


console.log(account.getStatement());
