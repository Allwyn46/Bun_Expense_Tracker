import { createFileRoute } from '@tanstack/react-router';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute('/expenses')({
    component: Expenses,
});

async function getAllExpenses() {
    await new Promise((r) => setTimeout(r, 3000));
    const res = await api.expenses.$get();
    if (!res.ok) {
        throw new Error('Server-Error');
    }
    const data = await res.json();
    return data;
}

function Expenses() {
    // Queries
    const { isPending, error, data } = useQuery({
        queryKey: ['get-all-expenses'],
        queryFn: getAllExpenses,
    });

    if (error)
        return 'Something went Wrong please try again. Note:' + error.message;

    return (
        <>
            <div className="p-2 max-w-5xl m-auto">
                <Table>
                    <TableCaption>A list of your Expenses.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isPending
                            ? Array(3)
                                  .fill(0)
                                  .map((_, i) => (
                                      <TableRow key={i}>
                                          <TableCell>
                                              <Skeleton className="h-4" />
                                          </TableCell>
                                          <TableCell className="font-medium">
                                              <Skeleton className="h-4" />
                                          </TableCell>
                                          <TableCell className="text-right">
                                              <Skeleton className="h-4" />
                                          </TableCell>
                                      </TableRow>
                                  ))
                            : data?.expenses.map((expense) => (
                                  <TableRow key={expense.id}>
                                      <TableCell>{expense.id}</TableCell>
                                      <TableCell className="font-medium">
                                          {expense.title}
                                      </TableCell>
                                      <TableCell className="text-right">
                                          {expense.amount}
                                      </TableCell>
                                  </TableRow>
                              ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
