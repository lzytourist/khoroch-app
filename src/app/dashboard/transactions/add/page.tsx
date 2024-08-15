import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import TransactionForm from "@/components/forms/transaction";
import {insertTransaction} from "@/actions/transaction";

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
        <CardDescription>Record transactions via this form.</CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionForm fun={insertTransaction}/>
      </CardContent>
      <CardFooter>
        <Button asChild variant={'secondary'}>
          <Link href={'/dashboard/transactions'}>Cancel</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}