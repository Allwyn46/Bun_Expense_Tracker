import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import './App.css';

async function getTotal() {
    const res = await api.expenses['total-spent'].$get();
    if (!res.ok) {
        throw new Error('Server-Error');
    }
    const data = await res.json();
    return data;
}

function App() {
    // Queries
    const { isPending, error, data } = useQuery({
        queryKey: ['todos'],
        queryFn: getTotal,
    });

    if (error)
        return 'Something went Wrong please try again. Note:' + error.message;

    return (
        <>
            <Card className="w-[350px] m-auto">
                <CardHeader>
                    <CardTitle>Total Spent</CardTitle>
                    <CardDescription>
                        The total amount you've Spent
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isPending ? 'Loading...' : data.totalSpent}
                </CardContent>
            </Card>
        </>
    );
}

export default App;
