import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute } from '@tanstack/react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useForm } from '@tanstack/react-form';
import type { FieldApi } from '@tanstack/react-form';

export const Route = createFileRoute('/create_expenses')({
    component: createExpense,
});

function createExpense() {
    const form = useForm({
        defaultValues: {
            title: '',
            amount: 0,
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log(value);
        },
    });

    return (
        <>
            <Card className="w-[390px] m-auto mt-4">
                <CardHeader>
                    <CardTitle>Create Expense</CardTitle>
                    <CardDescription>
                        Create a expense by entering title and amount
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action=""
                        onSubmit={(e) => {
                            form.handleSubmit();
                        }}
                    >
                        <form.Field
                            name="title"
                            children={(field) => (
                                <>
                                    <Label htmlFor={field.name}>Title</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                    />
                                    {field.state.meta.touchedErrors ? (
                                        <em>
                                            {field.state.meta.touchedErrors}
                                        </em>
                                    ) : null}
                                </>
                            )}
                        />
                        <form.Field
                            name="amount"
                            children={(field) => (
                                <>
                                    <Label htmlFor={field.name}>Amount</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        type="number"
                                        onChange={(e) =>
                                            field.handleChange(
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                    {field.state.meta.touchedErrors ? (
                                        <em>
                                            {field.state.meta.touchedErrors}
                                        </em>
                                    ) : null}
                                </>
                            )}
                        />
                        {/* <div className="mb-3"></div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input type="number" id="amount" placeholder="Amount" /> */}
                        <Button type="submit" className="mt-3">
                            Create Expense
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
