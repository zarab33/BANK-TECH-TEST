class Statement {
  constructor(transactions) {
    this.transactions = transactions;
  }

  printStatement() {
  let statement = 'date || credit || debit || balance\n';
  let balance = 0;

  const sortedTransactions = this.transactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  for (const transaction of sortedTransactions) {
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

module.exports = Statement;
