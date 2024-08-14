import {prisma} from "@/lib/db";
import {getSession} from "@/lib/jwt";
import {TransactionSchema} from "@/lib/definitions";
import {redirect} from "next/navigation";

export async function getTransaction(transactionId: string) {
  return prisma.transaction.findFirst({
    where: {
      id: transactionId
    }
  });
}

export async function getTransactions(limit: number = 15, skip: number = 0, type: 'BALANCE' | 'EXPENSE' | 'LOAN_GIVEN' | 'LOAN_TAKEN' | null | undefined) {
  const session = await getSession();

  let whereCond = {
    // @ts-ignore
    userId: session.user.id,
  };
  if (type) {
    whereCond = {
      // @ts-ignore
      userId: session.user.id,
      // @ts-ignore
      type: type
    }
  }
  const transactions = await prisma.transaction.findMany({
    take: limit,
    skip: skip,
    orderBy: [
      {
        createdAt: 'desc'
      }
    ],
    where: {
      ...whereCond
    },
  });
  const count = await prisma.transaction.aggregate({
    where: {
      ...whereCond
    },
    _count: true
  });

  return {
    data: transactions,
    count: count._count
  };
}

export async function insertTransaction(formData: FormData) {
  const validation = TransactionSchema.safeParse({
    title: formData.get('title'),
    amount: formData.get('amount'),
    note: formData.get('note'),
    type: formData.get('transactionType'),
  });
  if (validation.success) {
    const {data} = validation;

    const session = await getSession();
    if (session?.user) {
      await prisma.transaction.create({
        data: {
          // @ts-ignore
          userId: session.user.id,
          title: data.title,
          note: data.note,
          amount: parseInt(data.amount),
          type: data.type
        }
      });
      redirect('/dashboard/transactions');
    }
  }
}

export async function updateTransaction(formData: FormData, transactionId: string) {
  const session = await getSession();

  if (session?.user) {
    const validation = TransactionSchema.safeParse({
      title: formData.get('title'),
      note: formData.get('note'),
      amount: formData.get('amount'),
      type: formData.get('transactionType'),
    });

    if (validation.success) {
      await prisma.transaction.update({
        where: {
          id: transactionId,
          // @ts-ignore
          userId: session.user.id
        },
        data: {
          title: validation.data.title,
          amount: parseInt(validation.data.amount),
          note: validation.data.note,
          type: validation.data.type
        }
      });
      redirect(`/dashboard/transactions/${transactionId}`);
    }
  }
}

export async function getTransactionsCardInfo() {
  const session = await getSession();
  if (session?.user) {
    const cardInfoPromises = [
      prisma.transaction.aggregate({
        where: {
          // @ts-ignore
          userId: session.user.id,
          type: 'BALANCE'
        },
        _sum: {
          amount: true
        }
      }),
      prisma.transaction.aggregate({
        where: {
          // @ts-ignore
          userId: session.user.id,
          type: 'EXPENSE'
        },
        _sum: {
          amount: true
        }
      }),
      prisma.transaction.aggregate({
        where: {
          // @ts-ignore
          userId: session.user.id,
          type: 'LOAN_GIVEN'
        },
        _sum: {
          amount: true
        }
      }),
      prisma.transaction.aggregate({
        where: {
          // @ts-ignore
          userId: session.user.id,
          type: 'LOAN_TAKEN'
        },
        _sum: {
          amount: true
        }
      }),
    ];

    return await Promise.all(cardInfoPromises);
  }
}