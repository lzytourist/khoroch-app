'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import LoadingButton from "@/components/loading-button";
import {useFormState} from "react-dom";
import FieldError from "@/components/field-error";
import {FormEvent} from "react";
import {toast} from "@/components/ui/use-toast";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface TransactionProps {
  title?: string,
  amount?: number | string,
  type?: 'BALANCE' | 'EXPENSE' | 'LOAN_GIVEN' | 'LOAN_TAKEN',
  note?: string,
  fun: Function,
  id?: string
}

export default function TransactionForm({title, amount, type, note, fun, id}: TransactionProps) {
  // @ts-ignore
  const [state, action] = useFormState(fun, null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    action(new FormData(event.currentTarget));

    toast({
      title: title ? 'Transaction inserted successfully' : 'Transaction updated successfully.',
      variant: 'default',
      action: (
        !title ? <Button asChild variant={'secondary'}>
          <Link href={'/dashboard/transactions/add'}>Add another</Link>
        </Button> : <></>
      )
    });
  }

  return (
    <form onSubmit={handleSubmit} className={'space-y-4'}>
      {
        id && <input type="hidden" name={'id'} value={id}/>
      }
      <div className={'space-y-2'}>
        <Label htmlFor={'title'}>Title</Label>
        <Input type={'text'} name={'title'} id={'title'} defaultValue={title}/>
        {
          // @ts-ignore
          state?.title && <FieldError message={state.title}/>
        }
      </div>
      <div className={'grid grid-cols-2 gap-4'}>
        <div className={'space-y-2'}>
          <Label htmlFor={'amount'}>Amount</Label>
          <Input type={'number'} name={'amount'} id={'amount'} defaultValue={amount}/>
          {
            // @ts-ignore
            state?.amount && <FieldError message={state.amount}/>
          }
        </div>
        <div className={'space-y-2'}>
          <Label htmlFor={'transactionType'}>Type</Label>
          <Select name={'transactionType'} defaultValue={type}>
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
          {
            // @ts-ignore
            state?.type && <FieldError message={state.type}/>
          }
        </div>
      </div>
      <div className={'space-y-2'}>
        <Label htmlFor={'note'}>Short note</Label>
        <Textarea name={'note'} id={'note'} defaultValue={note}/>
        {
          // @ts-ignore
          state?.note && <FieldError message={state.note}/>
        }
      </div>
      <LoadingButton>Save</LoadingButton>
    </form>
  )
}