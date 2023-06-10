import { Request, Response } from 'express';
import { ExpenseModel } from '../models/ExpenseModels';
import { ResponseCode, ResponseError } from '../models/Error';
import Expense, { IExpense } from '../models/Expense';
import { Types } from 'mongoose';

export const postExpense = async (req: Request, res: Response, next: any) => {
    try {
        if (!req.body) {
            throw new ResponseError(
                ResponseCode.BadRequest,
                "Invalid request body"
            )
        }
        const expenseModel: ExpenseModel = new ExpenseModel(req.body);
        const userId: string | undefined = req.get('userId');

        if (!userId) {
            throw new ResponseError(
                ResponseCode.Unauthorized,
                "Unauthorized"
            );
        }

        expenseModel.setUserId(userId);
        const expense: IExpense & {
            _id: Types.ObjectId;
        } = await expenseModel.addExpense();

        res.status(ResponseCode.Created).json({ message: 'Created', result: expense });
    } catch (err) {
        next(err);
    }
}

export const getAllExpenses = async (req: Request, res: Response, next: any) => {
    try {
        const userId: string | undefined = req.get('userId');
        if (!req.get('userId')) {
            throw new ResponseError(
                ResponseCode.Unauthorized,
                'Unauthorized'
            );
        }

        const expenses = await Expense.find({ userId: userId });
        if (expenses.length > 0) {
            res.status(ResponseCode.OK).json({
                message: 'Success',
                length: expenses.length,
                result: expenses
            });
        } else {
            res.status(ResponseCode.NoContent).json({ message: "No Expenses found" });
        }
    } catch (err) {
        next(err);
    }
}