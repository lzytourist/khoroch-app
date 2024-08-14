import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import LoadingButton from "@/components/loading-button";
import {insertTransaction} from "@/actions/transaction";

export default async function Page() {
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
            await insertTransaction(formData)
          }} className={'space-y-4'}>
            <div className={'space-y-2'}>
              <Label htmlFor={'title'}>Title</Label>
              <Input type={'text'} name={'title'} id={'title'}/>
            </div>
            <div className={'grid grid-cols-2 gap-4'}>
              <div className={'space-y-2'}>
                <Label htmlFor={'amount'}>Amount</Label>
                <Input type={'number'} name={'amount'} id={'amount'}/>
              </div>
              <div className={'space-y-2'}>
                <Label htmlFor={'transactionType'}>Type</Label>
                <Select name={'transactionType'}>
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
              <Textarea name={'note'} id={'note'}/>
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