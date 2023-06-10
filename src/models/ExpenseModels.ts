import { ResponseCode, ResponseError } from "./Error";
import Expense from "./Expense";

export enum ExpenseTypeEnum {
    Grocery = "Grocery",
    Fun = "Fun",
    FastFood = "FastFood",
    Misc = "Misc",
    Gas = "Gas"
};

export class ExpenseModel {
    date: Date;
    amount: number;
    type: ExpenseTypeEnum;
    userId: string = "";

    public constructor(body: any) {
        this.date = new Date(body.date);
        this.amount = body.amount;
        this.type = body.type as ExpenseTypeEnum;
    }

    public setUserId(userId: string) {
        this.userId = userId;
    }

    public async addExpense() {
        if (!this.userId || this.userId === "") {
            throw new ResponseError(
                ResponseCode.InternalServerError,
                "Unable to create ExpenseModel"
            );
        }

        const expense = new Expense({
            date: this.date,
            amount: this.amount,
            type: this.type,
            userId: this.userId
        });
        await expense.save();
        return expense;
    }
}