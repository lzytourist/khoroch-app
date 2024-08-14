import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getTransaction, insertTransaction, updateTransaction} from "@/actions/transaction";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import LoadingButton from "@/components/loading-button";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {redirect} from "next/navigation";

export default async function Page({params: {id}}: {params: {id: string}}) {
  const transaction = await getTransaction(id);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add Transaction</CardTitle>
          <CardDescription>Record transactions via this form.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={async (formData: FormData) => {
            'use server'
            await updateTransaction(formData, id)
          }} className={'space-y-4'}>
            <div className={'space-y-2'}>
              <Label htmlFor={'title'}>Title</Label>
              <Input
                type={'text'}
                name={'title'}
                defaultValue={transaction!.title}
                id={'title'}/>
            </div>
            <div className={'grid grid-cols-2 gap-4'}>
              <div className={'space-y-2'}>
                <Label htmlFor={'amount'}>Amount</Label>
                <Input
                  type={'number'}
                  name={'amount'}
                  defaultValue={transaction!.amount.toString()}
                  id={'amount'}/>
              </div>
              <div className={'space-y-2'}>
                <Label htmlFor={'transactionType'}>Type</Label>
                <Select name={'transactionType'} defaultValue={transaction!.type}>
                  <SelectTrigger>
                    <SelectValue placeholder={'Select transaction type'}/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'BALANCE'}>Balance</SelectItem>
                    <SelectItem value={'EXPENSE'}>Expense</SelectItem>
                    <SelectItem value={'LOAN_GIVEN'}>Loan given</SelectItem>
                    <SelectItem value={'LOAN_TAKEN'}>Loan taken</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className={'space-y-2'}>
              <Label htmlFor={'note'}>Short note</Label>
              <Textarea name={'note'} id={'note'}>{transaction!.note}</Textarea>
            </div>
            <LoadingButton>Save</LoadingButton>
          </form>
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