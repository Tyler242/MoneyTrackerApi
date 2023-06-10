import express from 'express';

import { getAllExpenses, postExpense } from '../controllers/expense';

export const router = express.Router();

router.post('/', postExpense);

router.get('/', getAllExpenses);

// router.get('/:expenseId', getExpenseById);

// router.put('/', updateExpense);