import axios from 'axios';

interface ShopItem {
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface NoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: ShopItem;
  };
}

interface ApiResponse {
  items: { item: NoticeItem }[];
  count: number;
}

export const fetchNotices = async (
  currentPage: number,
  itemsPerPage: number,
  sortOption: string,
  filterOptions: { locations: string[]; startDate: string; amount: string }
): Promise<ApiResponse> => {
  try {
    let url = `https://bootcamp-api.codeit.kr/api/11-2/the-julge/notices?offset=${
      (currentPage - 1) * itemsPerPage
    }&limit=${itemsPerPage}&sort=${sortOption}`;

    if (filterOptions.locations.length > 0) {
      filterOptions.locations.forEach((location) => {
        url += `&address=${encodeURIComponent(location)}`;
      });
    }

    if (filterOptions.startDate) {
      const date = new Date(filterOptions.startDate);
      const formattedDate = date.toISOString();
      url += `&startsAtGte=${formattedDate}`;
    }

    if (filterOptions.amount) {
      url += `&hourlyPayGte=${filterOptions.amount}`;
    }

    const response = await axios.get<ApiResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching notices:', error);
    throw new Error('Failed to fetch notices');
  }
};
