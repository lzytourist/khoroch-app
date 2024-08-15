export default function FieldError({message}: {message: string[] | null}) {
  return (
    <p className={'text-destructive text-sm'}>{message?.join('. ')}</p>
  )
}