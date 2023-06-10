import mongoose from 'mongoose';

import { ExpenseTypeEnum } from './ExpenseModels';

const Schema = mongoose.Schema;

export interface IExpense extends mongoose.Document {
    date: Date;
    amount: number;
    type: ExpenseTypeEnum;
    userId: string;
}

export const expenseSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
});

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
export default Expense;