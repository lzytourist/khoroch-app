import {getTransaction} from "@/actions/transaction";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {DeleteIcon, EditIcon} from "lucide-react";

export default async function Page({params: {id}}: { params: { id: string } }) {
  const transaction = await getTransaction(id);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{transaction!.title}</CardTitle>
          <CardDescription>{transaction!.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <p><span
            className={'font-medium'}>Amount:</span> {transaction!.amount.toLocaleString('en-BD', {currency: 'BDT'})}
          </p>
          <p><span className={'font-medium'}>Note:</span> {transaction!.note}</p>
        </CardContent>
        <CardFooter>
          <Button
            variant={'destructive'}
            className={'flex items-center gap-2 rounded-r-none'}>
            <DeleteIcon className={'h-5 w-5'}/>
          <span>Delete</span>
        </Button>
        <Button asChild variant={'outline'} className={'rounded-l-none'}>
          <Link
            className={'flex items-center gap-2'}
            href={`/dashboard/transactions/${transaction!.id}/edit`}>
            <EditIcon className={'h-5 w-5'}/>
            <span>Edit</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
</div>
)
}