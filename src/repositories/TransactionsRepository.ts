import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, curr) => acc + Number(curr.value), 0);

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, curr) => acc + Number(curr.value), 0);

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
