import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getTransaction, updateTransaction} from "@/actions/transaction";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import TransactionForm from "@/components/forms/transaction";

export default async function Page({params: {id}}: { params: { id: string } }) {
  const transaction = await getTransaction(id);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Transaction</CardTitle>
          <CardDescription>Update record transactions via this form.</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm
            id={transaction!.id}
            fun={updateTransaction}
            title={transaction!.title}
            amount={transaction!.amount.toString()}
            type={transaction!.type}
            note={transaction!.note ?? ''}/>
        </CardContent>
        <CardFooter>
          <Button asChild variant={'secondary'}>
            <Link href={'/dashboard/transactions'}>Cancel</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}