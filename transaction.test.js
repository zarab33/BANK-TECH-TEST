const Transaction = require('./transaction');

describe('Transaction', () => {
  const date = new Date('2023-01-10');
  const amount = 1000;
  const type = 'deposit';

  it('should have the correct properties', () => {
    const transaction = new Transaction(date, amount, type);

    expect(transaction.date).toEqual(date);
    expect(transaction.amount).toEqual(amount);
    expect(transaction.type).toEqual(type);
    expect(transaction.balance).toEqual(0);
  });

  it('should return the correct string representation', () => {
    const transaction = new Transaction(date, amount, type);

    const expectedString = `${date} || 1000.00 || || 0.00`;
    expect(transaction.toString()).toEqual(expectedString);
  });

  it('should return the correct date', () => {
    const transaction = new Transaction(date, amount, type);

    expect(transaction.getDate()).toEqual(date);
  });

  it('should return the correct amount', () => {
    const transaction = new Transaction(date, amount, type);

    expect(transaction.getAmount()).toEqual(amount);
  });

  it('should return the correct type', () => {
    const transaction = new Transaction(date, amount, type);

    expect(transaction.getType()).toEqual(type);
  });
});
