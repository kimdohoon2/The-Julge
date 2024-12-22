import ApprovalButton from '@/app/components/my-shop/detail/ApprovalButton';

export default function StatusIcon({
  status,
}: {
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
}) {
  const handleStatus = () => {
    switch (status) {
      case 'pending':
        return {
          content: (
            <div className="flex gap-3">
              <ApprovalButton approve={true} />
              <ApprovalButton approve={false} />
            </div>
          ),
          style: '',
        };
      case 'accepted':
        return { content: '승인 완료', style: 'text-blue-20 bg-blue-10' };
      case 'rejected':
        return { content: '거절', style: 'text-red-40 bg-red-10' };
      case 'canceled':
        return { content: '취소', style: 'text-gray-40 bg-gray-10' };
      default:
        return { content: '', style: '' };
    }
  };

  const { content, style } = handleStatus();

  return (
    <>
      <span className={`rounded-full px-3 py-2 text-sm font-semibold ${style}`}>{content}</span>
    </>
  );
}
