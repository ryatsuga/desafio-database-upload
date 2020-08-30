// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const trasactionExists = await transactionsRepository.findOne({ id });

    if (!trasactionExists) {
      throw new AppError('This transaction doesnt exist.');
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
