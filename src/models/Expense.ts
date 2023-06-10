import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IExpense extends mongoose.Document {
    date: Date;
    amount: number;
    type: string;
    vendor: string;
}

export const expenseSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    }
});

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
export default Expense;