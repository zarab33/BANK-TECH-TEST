const Statement = require('./statement');

describe('Statement', () => {
  it('should print the statement in the desired format', () => {
    const transactions = [
      { date: new Date('2023-01-10'), amount: 1000, type: 'deposit' },
      { date: new Date('2023-01-13'), amount: 2000, type: 'deposit' },
      { date: new Date('2023-01-14'), amount: 500, type: 'withdrawal' },
    ];

    const expectedOutput = `date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00`;

    const statement = new Statement(transactions);
    const result = statement.printStatement();

    expect(result).toEqual(expectedOutput);
  });
});
