import ApprovalButton from '@/app/components/my-shop/detail/ApprovalButton';
import { putNoticeApplication } from '@/app/api/api';

export default function StatusIcon({
  status,
  type,
  token,
  shopId,
  noticeId,
  applicationId,
}: {
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  type: 'employer' | 'employee';
  token?: string;
  shopId?: string;
  noticeId?: string;
  applicationId?: string;
}) {
  const updateApplicationStatus = async (status: 'accepted' | 'rejected') => {
    const response = await putNoticeApplication(
      token as string,
      shopId as string,
      noticeId as string,
      applicationId as string,
      status
    );
    console.log(response);
  };

  const handleStatus = () => {
    switch (status) {
      case 'pending':
        if (type === 'employer') {
          return {
            content: (
              <div className="flex gap-3">
                <ApprovalButton
                  approve={true}
                  onClick={() => updateApplicationStatus('accepted')}
                />
                <ApprovalButton
                  approve={false}
                  onClick={() => updateApplicationStatus('rejected')}
                />
              </div>
            ),
            style: '',
          };
        } else {
          return { content: '대기중', style: 'text-green-20 bg-green-10' };
        }
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
