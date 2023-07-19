class Statement {
  constructor(transactions) {
    this.transactions = transactions;
  }

  formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  }

  printStatement() {
    let statement = '';
    let balance = 0;

    // Sort transactions by date in ascending order
    const sortedTransactions = this.transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    for (const transaction of sortedTransactions) {
      const { date, amount, type } = transaction;
      const formattedDate = this.formatDate(date);

      if (type === 'deposit') {
        balance += amount;
        statement += `${formattedDate} || ${amount.toFixed(2)} || || ${balance.toFixed(2)}\n`;
      } else if (type === 'withdrawal') {
        balance -= amount;
        statement += `${formattedDate} || || ${amount.toFixed(2)} || ${balance.toFixed(2)}\n`;
      }
    }

    // Reverse the statement to get the desired output order
    const reversedStatement = statement.trim().split('\n').reverse().join('\n');
    const finalStatement = `date || credit || debit || balance\n${reversedStatement}`;
    // Create the final statement with the header line
    return finalStatement.trim();
  }
}

module.exports = Statement;





