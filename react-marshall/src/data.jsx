export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Artists', href: '#artists' },
  { label: 'Social', href: '#social' }
];

export const products = [
  {
    key: 'headphones',
    number: '01',
    title: 'Headphones',
    headline: 'Sound that Moves with you',
    body: 'Marshall 헤드폰은 맞춤 튜닝된 다이내믹 드라이버가 탑재되어 우렁찬 저음, 부드러운 중음, 화려한 고음을 전달합니다. Marshall만의 고품질 시그니처 사운드를 지금 바로 경험해 보세요.',
    href: 'https://www.marshall.com/us/en/headphones',
    aria: 'Marshall 헤드폰 제품 더 알아보기',
    textClass: 'headphone_text',
    imageClass: 'headphone_img',
    image: {
      base: '/img/optimized/marshall_headphone',
      alt: 'Marshall 헤드폰 제품 이미지'
    }
  },
  {
    key: 'speakers',
    number: '02',
    title: 'Speakers',
    headline: 'Room-filling Presence',
    body: 'Marshall의 스피커는 공간을 채우는 풍부한 사운드와 클래식한 디자인의 결합입니다. 홈 스테레오부터 포터블 블루투스 스피커까지, 어떤 환경에서도 진정한 Marshall 사운드를 선사합니다.',
    href: 'https://www.marshall.com/us/en/speakers',
    aria: 'Marshall 스피커 제품 더 알아보기',
    textClass: 'speaker_text',
    imageClass: 'speaker_image',
    image: {
      base: '/img/optimized/marshall_speaker',
      alt: 'Marshall 스피커 제품 이미지'
    }
  },
  {
    key: 'amplifiers',
    number: '03',
    title: 'Amplifiers',
    headline: 'Amplify your sound',
    body: '1962년부터 이어져 온 Marshall 앰프의 전통. 스튜디오부터 무대까지, 수많은 전설적 뮤지션들이 선택한 사운드를 당신의 손끝에서 느껴보세요. 시그니처 톤과 뛰어난 내구성으로 여전히 업계 표준을 정의합니다.',
    href: 'https://www.marshall.com/us/en/amplifiers',
    aria: 'Marshall 앰프 제품 더 알아보기',
    textClass: 'amp_text',
    imageClass: 'amp_image',
    image: {
      base: '/img/optimized/marshall_amp',
      alt: 'Marshall 앰프 제품 이미지'
    }
  }
];

export const artists = [
  {
    key: 'artist1',
    number: '01',
    title: <>경계를 넘어 울려 퍼지는<br /> 새로운 사운드</>,
    body: '장르의 틀을 깨고, 감각을 흔드는 음악. 이들은 단지 노래를 만드는 것이 아니라, 시대를 울리는 사운드를 설계합니다. 자신만의 언어로 세상과 연결되는 아티스트들의 음악을 들어보세요.',
    direction: 'scroll-fade-left',
    imageBase: '/img/optimized/artist01',
    alt: '무대 위에서 연주하는 Marshall 아티스트 이미지'
  },
  {
    key: 'artist2',
    number: '02',
    title: '혁신의 소리를 만나다',
    body: '독특한 재능과 역동적인 사운드로 자신의 흔적을 남기고 새로운 음악적 방향성을 제시하며, Marshall의 사운드를 만들어 온 전설적인 아티스트들의 유산을 살펴보세요.',
    direction: 'scroll-fade-right',
    imageBase: '/img/optimized/artist02',
    alt: 'Marshall 사운드를 사용하는 아티스트 공연 이미지'
  },
  {
    key: 'artist3',
    number: '03',
    title: '새로운 시대의 Artist들',
    body: '신예부터 거장까지, 다양한 음악적 색깔을 지닌 소속 아티스트들을 소개합니다. 장르의 경계를 허물고 새로운 시도를 주저하지 않으며, 자신만의 독창적인 창의성과 역동적인 사운드로 전 세계적으로 영향력을 넓혀 가고 있습니다. 레이블을 혁신적 음악의 중심지로 만든 그들의 열정과 예술성, 그리고 개성을 지금 만나보세요.',
    direction: 'scroll-fade-left',
    imageBase: '/img/optimized/artist03',
    alt: '새로운 음악을 선보이는 Marshall 아티스트 이미지'
  },
  {
    key: 'artist4',
    number: '04',
    title: <>Marshall 위를<br /> 달리는 창조자들</>,
    body: '소리 위를 질주하는 아티스트들, 그들의 무대는 경계가 없습니다. Marshall의 진동 위에서 태어난 음악은, 각각 자신만의 세계입니다. 이들은 틀을 따르지 않으며, 새로운 소리를 창조하고, 시대를 다시 씁니다.',
    direction: 'scroll-fade-right',
    imageBase: '/img/optimized/artist04',
    alt: 'Marshall 장비와 함께하는 창작자 이미지'
  }
];

export const socialSlides = [
  {
    key: 'heritage',
    className: 'social_heritage',
    textClass: 'heritage_text',
    title: 'HERITAGE',
    body: '60년이 넘는 역사를 자랑하는 만큼 Marshall에게는 많은 이야기들이 숨겨져 있습니다. 1962년으로 거슬러 올라가 Marshall로부터 직접 들어보세요.',
    href: 'https://www.marshall.com/us/en/backstage/heritage',
    aria: 'Marshall 헤리티지 콘텐츠 더 알아보기',
    imageBase: '/img/optimized/social_heritage',
    alt: 'Marshall 헤리티지 콘텐츠 이미지'
  },
  {
    key: 'story',
    className: 'social_story',
    textClass: 'story_text',
    title: 'STORY',
    body: '음악과 관련된 모든 이야기들이 담겨 있는 시리즈를 만나보세요. 여기서만 공개되는 뮤지션의 투어 생활을 들여다보거나, 가장 좋아하는 아티스트들의 연주 스타일을 배울 수 있는 내용까지 여러분을 초대합니다.',
    href: 'https://www.marshall.com/us/en/backstage',
    aria: 'Marshall 스토리 콘텐츠 더 알아보기',
    imageBase: '/img/optimized/social_story',
    alt: 'Marshall 스토리 콘텐츠 이미지'
  },
  {
    key: 'community',
    className: 'social_community',
    textClass: 'community_text',
    title: 'COMMUNITY',
    body: 'Jim Marshall은 음악이 변화시키는 힘을 가지고 있다고 믿었고, 모두에게 기회가 주어져야 한다는 철학을 남겼습니다. 그것이 오늘날까지 계속해서 신인들을 지원하고 음악 커뮤니티의 포용성을 높이기 위해 힘쓰고 있는 이유입니다.',
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
