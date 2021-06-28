const CATEGORY_FILTER = [
  { id: 1, value: '', name: '필터', queryString: '' },
  {
    id: 2,
    value: 'popular',
    name: '인기순',
    queryString: '&sortMethod=sellcount&reverse=True',
  },
  {
    id: 3,
    value: 'grade',
    name: '평점 높은순',
    queryString: '&sortMethod=avg_score&reverse=True',
  },
  {
    id: 4,
    value: 'highPrice',
    name: '높은 가격순',
    queryString: '&sortMethod=discount&reverse=True',
  },
  {
    id: 5,
    value: 'lowPrice',
    name: '낮은 가격순',
    queryString: '&sortMethod=discount',
  },
];

export default CATEGORY_FILTER;
