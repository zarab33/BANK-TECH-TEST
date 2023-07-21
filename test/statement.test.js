const Statement = require('../lib/statement');

describe('Statement', () => {
  describe('printStatement', () => {
    it('should return an empty statement when there are no transactions', () => {
      const transactions = [];
      const statement = new Statement(transactions);
      const expectedStatement = 'date || credit || debit || balance';

      expect(statement.printStatement()).toEqual(expectedStatement);
    });

    it('should return a statement with a single transaction', () => {
      const transactions = [
        { date: new Date('2023-01-10'), amount: 1000, type: 'deposit' },
      ];
      const statement = new Statement(transactions);
      const expectedStatement = `date || credit || debit || balance
10/01/2023 || 1000.00 || || 1000.00`;

      expect(statement.printStatement()).toEqual(expectedStatement);
    });

    it('should return a statement with multiple transactions in reverse chronological order', () => {
      const transactions = [
        { date: new Date('2023-01-10'), amount: 1000, type: 'deposit' },
        { date: new Date('2023-01-13'), amount: 2000, type: 'deposit' },
        { date: new Date('2023-01-14'), amount: 500, type: 'withdrawal' },
      ];
      const statement = new Statement(transactions);
      const expectedStatement = `date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00`;

      expect(statement.printStatement()).toEqual(expectedStatement);
    });

it('should handle transactions of unknown type', () => {
  const transactions = [
    { date: new Date('2023-01-10'), amount: 1000, type: 'deposit' },
    { date: new Date('2023-01-13'), amount: 2000, type: 'Unknown' },
    { date: new Date('2023-01-14'), amount: 500, type: 'Withdrawal' },
    { date: new Date('2023-01-15'), amount: 300, type: 'OTHER' },
  ];
  const statement = new Statement(transactions);
  const expectedStatement = `date || credit || debit || balance
15/01/2023 || OTHER || || 1000.00
14/01/2023 || Withdrawal || || 1000.00
13/01/2023 || Unknown || || 1000.00
10/01/2023 || 1000.00 || || 1000.00`;

  expect(statement.printStatement()).toEqual(expectedStatement);
});

});

});