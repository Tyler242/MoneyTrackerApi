import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IIncome extends mongoose.Document {
    date: Date;
    amount: number;
    tithingAmount: number;
    tithingPaid: boolean;
}

export const incomeSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    tithingAmount: {
        type: Number,
        required: true,
    },
    tithingPaid: {
        type: Boolean,
        required: true,
    },
});

const Income = mongoose.model<IIncome>('Income', incomeSchema);
export default Income;