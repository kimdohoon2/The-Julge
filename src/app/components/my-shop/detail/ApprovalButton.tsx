export default function ApprovalButton({ approve }: { approve: boolean }) {
  const isApprove = approve
    ? { content: '승인하기', style: 'border-blue-20 text-blue-20' }
    : { content: '거절하기', style: 'border-red-40 text-red-40' };

  return (
    <button className={`rounded-lg border px-5 py-2 ${isApprove.style}`}>
      {isApprove.content}
    </button>
  );
}
