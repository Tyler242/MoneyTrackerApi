import express from 'express';

import { getAllExpenses, getExpenseById, postExpense } from '../controllers/expense';

export const router = express.Router();

router.post('/', postExpense);

router.get('/', getAllExpenses);

router.get('/:expenseId', getExpenseById);

// router.put('/:expenseId', updateExpense);

// router.delete('/:expenseId, deleteExpense');