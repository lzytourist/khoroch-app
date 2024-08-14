import {getTransactionsCardInfo} from "@/actions/transaction";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const details = await getTransactionsCardInfo();
  return (
    <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'}>
      <Card className={'bg-primary text-primary-foreground'}>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
          <CardDescription className={'text-primary-foreground'}>Total cumulative balance.</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className={'text-5xl'}>{details?.[0]._sum.amount?.toLocaleString('en-BD', {currency: 'BDT'}) ?? 0}</h2>
        </CardContent>
        <CardFooter>
          <Button asChild variant={'secondary'}>
            <Link href={'/dashboard/transactions?type=BALANCE'}>Goto details</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className={'bg-destructive text-destructive-foreground'}>
        <CardHeader>
          <CardTitle>Expense</CardTitle>
          <CardDescription className={'text-destructive-foreground'}>Total cumulative expense.</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className={'text-5xl'}>{details?.[1]._sum.amount?.toLocaleString('en-BD', {currency: 'BDT'}) ?? 0}</h2>
        </CardContent>
        <CardFooter>
          <Button asChild variant={'secondary'}>
            <Link href={'/dashboard/transactions?type=EXPENSE'}>Goto details</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className={'bg-secondary text-secondary-foreground'}>
        <CardHeader>
          <CardTitle>Loan Taken</CardTitle>
          <CardDescription className={'text-secondary-foreground'}>Total cumulative loan taken.</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className={'text-5xl'}>{details?.[3]._sum.amount?.toLocaleString('en-BD', {currency: 'BDT'}) ?? 0}</h2>
        </CardContent>
        <CardFooter>
          <Button asChild variant={'default'}>
            <Link href={'/dashboard/transactions?type=LOAN_TAKEN'}>Goto details</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className={'bg-purple-600 text-primary-foreground'}>
        <CardHeader>
          <CardTitle>Loan Given</CardTitle>
          <CardDescription className={'text-primary-foreground'}>Total cumulative loan given.</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className={'text-5xl'}>{details?.[2]._sum.amount?.toLocaleString('en-BD', {currency: 'BDT'}) ?? 0}</h2>
        </CardContent>
        <CardFooter>
          <Button asChild variant={'secondary'}>
            <Link href={'/dashboard/transactions?type=LOAN_GIVEN'}>Goto details</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
