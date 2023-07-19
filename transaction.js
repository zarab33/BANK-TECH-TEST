
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

module.exports = Transaction;