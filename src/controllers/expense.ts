import { Request, Response } from 'express';
import { ExpenseModel } from '../models/ExpenseModels';
import { ResponseCode, ResponseError } from '../models/Error';
import Expense, { IExpense } from '../models/Expense';
import { Types } from 'mongoose';

export const postExpense = async (req: Request, res: Response, next: any) => {
    try {
        const userId: string | undefined = req.get('userId');

        if (!userId) {
            throw new ResponseError(
                ResponseCode.Unauthorized,
                "Unauthorized"
            );
        }

        if (!req.body) {
            throw new ResponseError(
                ResponseCode.BadRequest,
                "Invalid request body"
            )
        }
        const expenseModel: ExpenseModel = new ExpenseModel(req.body);

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
        if (userId === undefined) {
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

export const getExpenseById = async (req: Request, res: Response, next: any) => {
    try {
        const userId: string | undefined = req.get('userId');
        if (userId === undefined) {
            throw new ResponseError(
                ResponseCode.Unauthorized,
                'Unauthorized'
            );
        }
        const expenseId: string | undefined = req.params.expenseId;
        if (expenseId === undefined) {
            throw new ResponseError(
                ResponseCode.BadRequest,
                "No expense Id provided"
            );
        }

        const expenses = await Expense.find({ userId: userId });
        const expense = expenses.find(exp => exp._id == expenseId);
        if (expense === undefined) {
            throw new ResponseError(
                ResponseCode.NotFound,
                `Unable to find expense for id: ${expenseId}`
            );
        }
        res.status(ResponseCode.OK).json({ message: 'Expense found', result: expense });
    } catch (err) {
        next(err);
    }
}