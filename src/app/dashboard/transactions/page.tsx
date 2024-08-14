import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel} from "@/components/ui/dropdown-menu";
import {DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Table, TableCell, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {MoreHorizontal, PlusCircle} from "lucide-react";
import Link from "next/link";
import {getTransactions} from "@/actions/transaction";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Nov',
  'Dec'
];

const formatDate = (date: Date) => {
  return Intl.DateTimeFormat('en-BD', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default async function Page({searchParams: {page, limit, type}}: {
  searchParams: { page: number | undefined, limit: number | undefined, type: 'BALANCE' | 'EXPENSE' | 'LOAN_TAKEN' | 'LOAN_GIVEN' | undefined }
}) {
  const _limit: number = limit && Number(limit) > 0 && Number(limit) <= 100 ? Number(limit) : 15;
  const _skip: number = page && Number(page) > 0 ? (Number(page) - 1) * _limit : 0;
  const _page: number = page && Number(page) > 0 ? Number(page) : 1;
  const transactions = await getTransactions(_limit, _skip, type);

  const pageCount: number = Math.ceil(transactions!.count / _limit);

  return (
    <div>
      <div className={'flex justify-end mb-4'}>
        <Button size="sm" className="h-7 gap-1" asChild>
          <Link href={'/dashboard/transactions/add'}>
            <PlusCircle className="h-3.5 w-3.5"/>
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Transaction
                  </span>
          </Link>
        </Button>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Keep track of your transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                transactions.data.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className={'font-medium'}>{transaction.title}</TableCell>
                    <TableCell className={'font-medium'}>
                      <Badge
                        className={
                          transaction!.type == 'BALANCE' ? 'bg-green-500 hover:bg-green-600' :
                            transaction!.type == 'EXPENSE' ? 'bg-red-500 hover:bg-red-600' :
                              transaction!.type == 'LOAN_GIVEN' ? 'bg-blue-500 hover:bg-blue-600' :
                                'bg-orange-500 hover:bg-orange-600'
                        }
                      >{transaction.type}</Badge>
                    </TableCell>
                    <TableCell className={'text-sm'}>{transaction.note}</TableCell>
                    <TableCell
                      className={'text-medium'}>{transaction.amount.toLocaleString('en-BD', {currency: 'BDT'})}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(transaction.createdAt)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4"/>
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild className={'cursor-pointer'}>
                            <Link href={`/dashboard/transactions/${transaction.id}`}>View</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className={'cursor-pointer'}>
                            <Link href={`/dashboard/transactions/${transaction.id}/edit`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className={'flex items-center justify-between'}>
          <p className={'text-sm text-muted-foreground'}>Showing transactions {Math.min(_limit, transactions.count)} of {transactions.count}.</p>
          {
            pageCount > 1 &&
              <Pagination>
                  <PaginationContent>
                      <PaginationItem>
                          <PaginationPrevious
                              href={
                                `/dashboard/transactions?page=${_page > 1 ? _page - 1 : 1}` +
                                `${limit ? '&limit=' + _limit : ''}` +
                                `${type ? '&type=' + type : ''}`
                              }/>
                      </PaginationItem>
                    {
                      Array.from({length: pageCount}).map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            isActive={_page == index + 1}
                            href={
                              `/dashboard/transactions?page=${index + 1}` +
                              `${limit ? '&limit=' + _limit : ''}` +
                              `${type ? '&type=' + type : ''}`
                            }
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                    }
                      <PaginationItem>
                          <PaginationNext
                              href={`/dashboard/transactions?page=${_page < pageCount ? _page + 1 : pageCount}` +
                                `${limit ? '&limit=' + _limit : ''}` +
                                `${type ? '&type=' + type : ''}`
                              }/>
                      </PaginationItem>
                  </PaginationContent>
              </Pagination>
          }
        </CardFooter>
      </Card>
    </div>
  )
}