class Transaction {
  constructor(date, amount, type) {
    this.date = date;
    this.amount = amount;
    this.type = type;
    this.balance = 0;
  }

  toString() {
    return `${this.date} || ${this.type === 'deposit' ? this.amount.toFixed(2) : ''} || ${
      this.type === 'withdrawal' ? this.amount.toFixed(2) : ''
    }|| ${this.balance.toFixed(2)}`;
  }

  getDate() {
    return this.date;
  }

  getAmount() {
    return this.amount;
  }

  getType() {
    return this.type;
  }
}

module.exports = Transaction;
