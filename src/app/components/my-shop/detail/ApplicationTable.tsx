import { NoticeApplication } from '@/app/types/Shop';
import StatusIcon from '@/app/components/my-shop/detail/StatusIcon';

interface NoticeApplicationItem {
  count: number;
  hasNext: boolean;
  items: NoticeApplication[];
  limit: number;
  links: [];
  offset: number;
}

export default function ApplicationTable({
  applications,
  token,
  shopId,
  noticeId,
}: {
  applications: NoticeApplicationItem;
  token: string;
  shopId: string;
  noticeId: string;
}) {
  return (
    <>
      <table className="w-full text-left">
        <thead className="bg-red-10">
          <tr>
            <th className="th w-[24%] pl-3">신청자</th>
            <th className="th w-[31%]">소개</th>
            <th className="th W-[21%]">전화번호</th>
            <th className="th w-[24%]">상태</th>
          </tr>
        </thead>
        <tbody>
          {applications.items.map((application) => (
            <tr key={application.item.id} className="border-b py-5">
              <td className="td pl-3">{application.item.user.item.name || '비공개'}</td>
              <td className="td">{application.item.user.item.bio || '잘 부탁드립니다.'}</td>
              <td className="td">{application.item.user.item.phone || '010-****-****'}</td>
              <td className="td pr-7">
                <StatusIcon
                  status={application.item.status}
                  type="employer"
                  token={token}
                  shopId={shopId}
                  noticeId={noticeId}
                  applicationId={application.item.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
