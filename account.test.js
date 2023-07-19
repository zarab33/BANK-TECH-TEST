const Account = require('./account');

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

  it("should return the account statement", () => {
  const expectedStatement = `date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00`;

  const account = new Account();
  account.deposit(1000, new Date('2023-01-10'));
  account.deposit(2000, new Date('2023-01-13'));
  account.withdraw(500, new Date('2023-01-14'));

  const statement = account.getStatement();

  expect(statement).toEqual(expectedStatement);
});

});
