# Bank Tech Test Multi-Class Planned Design Recipe

## 1. Describe the Problem

As a user
So that I can keep track of my finances
I want to have an account to monitor my finances.

As a user
So that I can monitor my money
I want to be able to deposit it into my account.

As a user
So that I can make use of my account 
I want to be able to withdraw money.

As a user
So that I can keep track of my finances
I want to View my acount listing date, amount and balance.

## 2. Design the Class System

_Consider diagramming out the classes and their relationships. Take care to
focus on the details you see as important, not everything. The diagram below
uses asciiflow.com but you could also use excalidraw.com, draw.io, or miro.com_

```
            ┌────────────────────────────────┐
            │                                │
            │ Account(balance, transactions) │
            │                                │
            │                                │
            │ - deposit(amount, date)        │
            │                                │ ───────────┐
            │                                │            │
            │ -Withdraw(amount, date)        │            │
            │                                │            │
            │                                │            │
            │ -getStatement                  │            │
            │                                │            │
            └────────────────────────────────┘            │
                                                          │
                                                          │
            ┌──────────────────────────────────┐          │
            │                                  │          │
            │  Transaction(date, amount, type) │          │
            │                                  │          │
            │                                  │          │
            │                                  │ ◄────────┘
┌────────── │  -formatTransaction              │
│           │                                  │
│           │                                  │
│           │                                  │
│           │                                  │
│           └──────────────────────────────────┘
│
│           ┌───────────────────────────────────┐
│           │  PrintStatement(transactions)     │
│           │                                   │
│           │                                   │
│           │                                   │
│           │  -createStatement                 │
│           │                                   │
└─────────► │                                   │
            │                                   │
            │                                   │
            └───────────────────────────────────┘
```

```javaScript

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

class Transaction {
  constructor(date, amount, type) {
    this.date = date;
    this.amount = amount;
    this.type = type;
  }

  toString() {
    return `${this.date} || ${this.type === 'deposit' ? this.amount.toFixed(2) : ''} || ${this.type === 'withdrawal' ? this.amount.toFixed(2) : ''} || ${this.balance.toFixed(2)}`;
  }
}

class Statement {
  constructor(transactions) {
    this.transactions = transactions;
  }

  printStatement() {
    let statement = 'date || credit || debit || balance\n';
    let balance = 0;

    for (const transaction of this.transactions) {
      const { date, amount, type } = transaction;
      if (type === 'deposit') {
        balance += amount;
        statement += `${date} || ${amount.toFixed(2)} || || ${balance.toFixed(2)}\n`;
      } else if (type === 'withdrawal') {
        balance -= amount;
        statement += `${date} || || ${amount.toFixed(2)} || ${balance.toFixed(2)}\n`;
      }
    }

    return statement.trim();
  }
}





## 3. Create Examples as Integration Tests

_Create examples of the classes being used together in different situations and
combinations that reflect the ways in which the system will be used._

const account = new Account();
account.deposit(1000, '10-01-2023');
account.deposit(2000, '13-01-2023');
account.withdraw(500, '14-01-2023');
const statement = account.getStatement();
console.log(statement);
// Output:
// date || credit || debit || balance
// 14-01-2023 || || 500.00 || 2500.00
// 13-01-2023 || 2000.00 || || 3000.00
// 10-01-2023 || 1000.00 || || 1000.00


## 4. Create Examples as Unit Tests

_Create examples, where appropriate, of the behaviour of each relevant class at
a more granular level of detail._

describe('Account', () => {
  let account;

  beforeEach(() => {
    account = new Account();
  });

  it('should deposit money into the account', () => {
    account.deposit(1000, '10-01-2023');
    expect(account.balance).toEqual(1000);
  });

  it('should withdraw money from the account', () => {
    account.deposit(1000, '10-01-2023');
    account.withdraw(500, '11-01-2023');
    expect(account.balance).toEqual(500);
  });

  it('should return the account statement', () => {
    account.deposit(1000, '10-01-2023');
    account.deposit(2000, '13-01-2023');
    account.withdraw(500, '14-01-2023');
    const statement = account.getStatement();
    expect(statement).toEqual('date || credit || debit || balance\n14-01-2023 || || 500.00 || 2500.00\n13-01-2023 || 2000.00 || || 3000.00\n10-01-2023 || 1000.00 || || 1000.00');
  });
});


## 5. Implement the Behaviour

_After each test you write, follow the test-driving process of red, green,
refactor to implement the behaviour._


