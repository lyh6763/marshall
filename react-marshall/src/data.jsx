export const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Artists', href: '/artists' },
  { label: 'Social', href: '/social' }
];

export const productFilters = [
  { key: 'all', label: 'All' },
  { key: 'portable', label: 'Portable' },
  { key: 'home', label: 'Home' },
  { key: 'stage', label: 'Stage' }
];

export const products = [
  {
    key: 'headphones',
    slug: 'headphones',
    number: '01',
    title: 'Headphones',
    headline: 'Sound that Moves with you',
    summary: '이동 중에도 Marshall의 질감을 유지하는 개인 청취 라인입니다.',
    heroLabel: 'Portable Listening',
    body: 'Marshall 헤드폰은 맞춤 튜닝된 다이내믹 드라이버로 우렁찬 저음, 부드러운 중음, 화려한 고음을 전달합니다. 이동 중에도 선명한 시그니처 사운드를 경험할 수 있습니다.',
    href: 'https://www.marshall.com/us/en/headphones',
    aria: 'Marshall 헤드폰 제품 더 알아보기',
    textClass: 'headphone_text',
    imageClass: 'headphone_img',
    image: {
      base: '/img/optimized/marshall_headphone',
      alt: 'Marshall 헤드폰 제품 이미지'
    },
    filters: ['portable'],
    specs: {
      use: '이동 중 청취',
      tone: '선명한 고음과 단단한 저음',
      fit: '개인 감상'
    }
  },
  {
    key: 'speakers',
    slug: 'speakers',
    number: '02',
    title: 'Speakers',
    headline: 'Room-filling Presence',
    summary: '거실, 작업실, 야외까지 공간을 채우는 스피커 라인입니다.',
    heroLabel: 'Room Sound',
    body: 'Marshall 스피커는 공간을 채우는 풍부한 사운드와 클래식한 디자인의 결합입니다. 홈 스테레오부터 포터블 블루투스 스피커까지 다양한 환경에 어울립니다.',
    href: 'https://www.marshall.com/us/en/speakers',
    aria: 'Marshall 스피커 제품 더 알아보기',
    textClass: 'speaker_text',
    imageClass: 'speaker_image',
    image: {
      base: '/img/optimized/marshall_speaker',
      alt: 'Marshall 스피커 제품 이미지'
    },
    filters: ['portable', 'home'],
    specs: {
      use: '공간을 채우는 재생',
      tone: '넓은 스테레오와 따뜻한 질감',
      fit: '거실과 작업실'
    }
  },
  {
    key: 'amplifiers',
    slug: 'amplifiers',
    number: '03',
    title: 'Amplifiers',
    headline: 'Amplify your sound',
    summary: '스튜디오와 무대를 위한 Marshall 사운드의 중심축입니다.',
    heroLabel: 'Stage Output',
    body: '1962년부터 이어져 온 Marshall 앰프의 전통은 스튜디오와 무대에서 여전히 강한 존재감을 남깁니다. 시그니처 톤과 뛰어난 내구성으로 사운드의 기준을 세워왔습니다.',
    href: 'https://www.marshall.com/us/en/amplifiers',
    aria: 'Marshall 앰프 제품 더 알아보기',
    textClass: 'amp_text',
    imageClass: 'amp_image',
    image: {
      base: '/img/optimized/marshall_amp',
      alt: 'Marshall 앰프 제품 이미지'
    },
    filters: ['stage'],
    specs: {
      use: '연주와 녹음',
      tone: '거친 드라이브와 직접적인 출력',
      fit: '스튜디오와 무대'
    }
  }
];

export const artistFilters = [
  { key: 'all', label: 'All' },
  { key: 'new-wave', label: 'New Wave' },
  { key: 'legacy', label: 'Legacy' },
  { key: 'creator', label: 'Creator' }
];

export const artists = [
  {
    key: 'artist1',
    number: '01',
    title: <>경계를 넘어 울려 퍼지는<br /> 새로운 사운드</>,
    body: '장르의 틀을 깨고 감각을 흔드는 음악. 이들은 단지 노래를 만드는 것이 아니라, 시대를 울리는 사운드를 설계합니다.',
    direction: 'scroll-fade-left',
    imageBase: '/img/optimized/artist01',
    alt: '무대 위에서 연주하는 Marshall 아티스트 이미지',
    filters: ['new-wave'],
    signal: 'genre bending',
    venue: 'club stage'
  },
  {
    key: 'artist2',
    number: '02',
    title: '혁신의 소리를 만나다',
    body: '독특한 재능과 역동적인 사운드로 자신의 흔적을 남기고 새로운 음악적 방향성을 제시한 아티스트들의 유산을 살펴보세요.',
    direction: 'scroll-fade-right',
    imageBase: '/img/optimized/artist02',
    alt: 'Marshall 사운드를 사용하는 아티스트 공연 이미지',
    filters: ['legacy'],
    signal: 'signature tone',
    venue: 'main stage'
  },
  {
    key: 'artist3',
    number: '03',
    title: '새로운 시대의 Artist들',
    body: '신예부터 거장까지, 다양한 음악적 색깔을 지닌 아티스트들이 자신만의 창의성과 사운드로 영향력을 넓혀 가고 있습니다.',
    direction: 'scroll-fade-left',
    imageBase: '/img/optimized/artist03',
    alt: '새로운 음악을 선보이는 Marshall 아티스트 이미지',
    filters: ['new-wave', 'creator'],
    signal: 'label energy',
    venue: 'record room'
  },
  {
    key: 'artist4',
    number: '04',
    title: <>Marshall 위를<br /> 달리는 창조자들</>,
    body: '소리 위를 질주하는 아티스트들, 그들의 무대에는 경계가 없습니다. 각자의 방식으로 새로운 소리를 만들고 시대를 다시 씁니다.',
    direction: 'scroll-fade-right',
    imageBase: '/img/optimized/artist04',
    alt: 'Marshall 장비와 함께하는 창작자 이미지',
    filters: ['creator'],
    signal: 'independent spark',
    venue: 'workshop'
  }
];

export const socialSlides = [
  {
    key: 'heritage',
    label: 'Archive',
    title: 'HERITAGE',
    body: '60년이 넘는 역사를 자랑하는 만큼 Marshall에게는 많은 이야기가 남아 있습니다. 1962년의 시작점부터 오늘의 사운드까지 직접 들어보세요.',
    href: 'https://www.marshall.com/us/en/backstage/heritage',
    aria: 'Marshall 헤리티지 콘텐츠 더 알아보기',
    imageBase: '/img/optimized/social_heritage',
    alt: 'Marshall 헤리티지 콘텐츠 이미지'
  },
  {
    key: 'story',
    label: 'Backstage',
    title: 'STORY',
    body: '음악과 관련된 다양한 이야기를 담은 시리즈입니다. 뮤지션의 투어 생활, 작업 방식, 연주 스타일을 가까이에서 만나볼 수 있습니다.',
    href: 'https://www.marshall.com/us/en/backstage',
    aria: 'Marshall 스토리 콘텐츠 더 알아보기',
    imageBase: '/img/optimized/social_story',
    alt: 'Marshall 스토리 콘텐츠 이미지'
  },
  {
    key: 'community',
    label: 'Community',
    title: 'COMMUNITY',
    body: 'Jim Marshall은 음악이 변화시키는 힘을 가지고 있다고 믿었습니다. Marshall은 오늘날에도 신인과 음악 커뮤니티의 가능성을 지원하고 있습니다.',
    href: 'https://www.marshall.com/us/en/backstage',
    aria: 'Marshall 커뮤니티 콘텐츠 더 알아보기',
    imageBase: '/img/optimized/social_community',
    alt: 'Marshall 커뮤니티 콘텐츠 이미지'
  }
];

export const footerSections = [
  {
    key: 'company',
    title: '회사',
    className: 'footer_company',
    listClass: 'company_list',
    links: [
      { label: 'Marshall 소개', href: 'https://www.marshall.com/us/en/about-marshall' },
      { label: 'Marshall Group 소개', href: 'https://group.marshall.com/' },
      { label: '채용', href: 'https://careers.marshall.com/' }
    ]
  },
  {
    key: 'customer',
    title: '고객지원',
    className: 'footer_customer',
    listClass: 'customer_list',
    links: [
      { label: '반품', href: 'https://www.marshall.com/us/en/support/returns' },
      { label: '배송 및 조회', href: 'https://www.marshall.com/us/en/support/track-order' },
      { label: '주문 및 결제', href: 'https://www.marshall.com/us/en/support/orders' },
      { label: '보증 및 수리', href: 'https://www.marshall.com/us/en/support/warranty' },
      { label: '문의하기', href: 'https://www.marshall.com/us/en/support/contact-us' }
    ]
  },
  {
    key: 'account',
    title: '계정',
    className: 'footer_account',
    listClass: 'account_list',
    links: [
      { label: '로그인/가입하기', href: 'https://www.marshall.com/kr/en/MyAccount/Register' },
      { label: '제품 등록', href: 'https://www.marshall.com/us/en/register-products' }
    ]
  }
];
