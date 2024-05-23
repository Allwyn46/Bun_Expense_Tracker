import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { promise, z } from 'zod';

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(50),
    amount: z.number().int().positive(), //BY DOING THIS THE REQUEST MUST HAVE THESE TWO VALUES
});

type Expense = z.infer<typeof expenseSchema>;

// CREATING POST SCHEMA TO VALIDATE THE DATA THAT ARE PASSED IN THE POST REQUEST ARE IN CORRECT FORMAT

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
    { id: 1, title: 'food', amount: 100 },
    { id: 2, title: 'clothing', amount: 200 },
    { id: 3, title: 'grocery', amount: 300 },
];

export const expensesRoute = new Hono()

    // GET ALL EXPENSES

    .get('/', (c) => {
        return c.json({ expenses: fakeExpenses });
    })

    // ADDING AN EXPENSE

    .post('/', zValidator('json', createPostSchema), async (c) => {
        const expense = await c.req.valid('json'); // GETTING THE VALIDATED JSON OBJECT FROM zValidator
        fakeExpenses.push({ ...expense, id: fakeExpenses.length++ });
        c.status(201);
        return c.json(expense);
    })

    // GETTING A SPECIFIC EXPENSE

    .get('/:id{[0-9]+}', (c) => {
        const id = Number.parseInt(c.req.param('id'));
        const expense = fakeExpenses.find((expense) => expense.id === id);

        if (!expense) {
            return c.notFound();
        }
        return c.json({ expense });
    })

    // DELETE AN EXPENSE

    .delete('/:id{[0-9]+}', (c) => {
        const id = Number.parseInt(c.req.param('id'));
        const expense = fakeExpenses.find((expense) => expense.id === id);

        if (!expense) {
            return c.notFound();
        }
        // const deletedExpense = fakeExpenses.splice(index, 1)[0];
        const deletedExpense = fakeExpenses.shift();
        return c.json({ expense: deletedExpense });
    })

    //GET TOTAL EXPENSE AMOUNT

    .get('/total-spent', async (c) => {
        const totalSpent = fakeExpenses.reduce(
            (acc, expense) => acc + expense.amount,
            0
        );
        return c.json({ totalSpent });
    });
