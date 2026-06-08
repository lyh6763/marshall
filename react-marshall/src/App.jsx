import { useEffect, useRef, useState } from 'react';
import PlaceholderMedia from './components/PlaceholderMedia.jsx';
import {
  artistFilters,
  artists,
  footerSections,
  navItems,
  productFilters,
  products,
  socialSlides
} from './data.jsx';
import { useScrollAnimation } from './hooks/useScrollAnimation.js';
import { useWindowWidth } from './hooks/useWindowWidth.js';

const externalProps = {
  target: '_blank',
  rel: 'noopener noreferrer'
};

const routeChangeEvent = 'marshall-route-change';

function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname || '/');

    window.addEventListener('popstate', syncPath);
    window.addEventListener(routeChangeEvent, syncPath);

    return () => {
      window.removeEventListener('popstate', syncPath);
      window.removeEventListener(routeChangeEvent, syncPath);
    };
  }, []);

  return path;
}

function navigateTo(href) {
  const url = new URL(href, window.location.origin);
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const target = `${url.pathname}${url.search}${url.hash}`;

  if (current !== target) {
    window.history.pushState({}, '', target);
  }

  window.dispatchEvent(new Event(routeChangeEvent));

  window.setTimeout(() => {
    if (url.hash) {
      document.querySelector(url.hash)?.scrollIntoView({ block: 'start' });
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, 0);
}

function InternalLink({ href, children, onClick, ...props }) {
  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigateTo(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function Header({ currentPath }) {
  const width = useWindowWidth();
  const isDesktop = width >= 1024;
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const navRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
      document.body.style.overflow = '';
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 250);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !navRef.current) return;
      const focusables = Array.from(
        navRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const openMenu = () => {
    lastFocusedRef.current = document.activeElement;
    setIsOpen(true);
  };

  const closeMenu = ({ restoreFocus = true } = {}) => {
    setIsOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => (lastFocusedRef.current || menuButtonRef.current)?.focus(), 0);
    }
  };

  const navVisible = isDesktop || isOpen;

  return (
    <header>
      <div className="header_center">
        <h1><InternalLink href="/">Marshall</InternalLink></h1>
        <button
          ref={menuButtonRef}
          type="button"
          className="btn"
          aria-expanded={isOpen && !isDesktop}
          aria-controls="site-nav"
          onClick={openMenu}
        >
          <span>메뉴 열기</span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav
        ref={navRef}
        id="site-nav"
        className={isOpen ? 'is-open is-visible' : ''}
        aria-hidden={!navVisible}
        aria-label="주요 메뉴"
      >
        <div className="nav_wrap">
          <div className="nav_header">
            <h1><InternalLink href="/" onClick={() => closeMenu({ restoreFocus: false })}>Marshall</InternalLink></h1>
            <button
              ref={closeButtonRef}
              type="button"
              className="close_btn"
              aria-label="메뉴 닫기"
              onClick={() => closeMenu()}
            >
              <span>메뉴 닫기</span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div className="nav_body">
            <h2 className="screen_out">주요 메뉴</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <InternalLink
                    href={item.href}
                    onClick={() => closeMenu({ restoreFocus: false })}
                  >
                    {item.label}
                  </InternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="language">
            <strong className="language_current" aria-current="true">한국어</strong>
            <span className="language_divider"></span>
            <a href="https://www.marshall.com/us/en" {...externalProps}>English</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <div className="header_visual">
      <PlaceholderMedia
        className="hero_image"
        label="Hero"
        role="대표 비주얼"
        ratio="2 / 1"
      />
      <div className="slogan scroll-fade-up">
        <h2>Rock 'n' roll is<br />a state of mind</h2>
        <p>옷차림이나 사회적 지위는 중요하지 않습니다. 다음에는 무엇이 세상을 이끌어 갈지 추측하는 것과는 더 거리가 먼 일입니다.</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="about_section" id="about">
      <div className="about">
        <div className="about_text scroll-fade-up">
          <h2>Live Loud, Play True</h2>
          <p>
            1962년 창립 이래로 Marshall은 다양한 음악 장르와 세대를 지나며 독보적인 사운드의 기준을 만들어왔습니다.
            이 화면은 그 헤리티지를 바탕으로 제품, 아티스트, 커뮤니티 이야기를 차분하게 탐색할 수 있도록 정리한 에디토리얼입니다.
          </p>
          <a href="https://www.marshall.com/us/en/about-marshall" aria-label="Marshall 소개 더 알아보기" {...externalProps}>더 알아보기</a>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [compareKeys, setCompareKeys] = useState([]);
  const visibleProducts = products.filter((product) => activeFilter === 'all' || product.filters.includes(activeFilter));
  const comparedProducts = products.filter((product) => compareKeys.includes(product.key));

  const toggleCompare = (productKey) => {
    setCompareKeys((current) => {
      if (current.includes(productKey)) {
        return current.filter((key) => key !== productKey);
      }

      return [...current.slice(-1), productKey];
    });
  };

  return (
    <section className="products_section" id="products">
      <h2 className="scroll-fade-up">Products</h2>
      <div className="product_tools scroll-fade-up" aria-label="제품 필터와 비교">
        <div className="product_filters" role="group" aria-label="제품군 필터">
          {productFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={activeFilter === filter.key ? 'is-active' : ''}
              aria-pressed={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="product_result" aria-live="polite">총 {visibleProducts.length}개 제품</p>
        <InternalLink className="product_index_link" href="/products">전체 제품 보기</InternalLink>
      </div>

      <div className="products">
        {visibleProducts.map((product, index) => {
          const isCompared = compareKeys.includes(product.key);

          return (
            <div key={product.key} className={`${product.key} ${index === 1 ? 'scroll-fade-right' : 'scroll-fade-left'}`}>
              <div className={product.textClass}>
                <span>{product.number}</span>
                <h3>{product.title}</h3>
                <strong>{product.headline}</strong>
                <p>{product.body}</p>
                <dl className="product_specs">
                  <div>
                    <dt>Use</dt>
                    <dd>{product.specs.use}</dd>
                  </div>
                  <div>
                    <dt>Tone</dt>
                    <dd>{product.specs.tone}</dd>
                  </div>
                  <div>
                    <dt>Fit</dt>
                    <dd>{product.specs.fit}</dd>
                  </div>
                </dl>
                <div className="product_actions">
                  <a href={product.href} aria-label={product.aria} {...externalProps}>더 알아보기</a>
                  <button
                    type="button"
                    className={isCompared ? 'is-active' : ''}
                    aria-pressed={isCompared}
                    onClick={() => toggleCompare(product.key)}
                  >
                    {isCompared ? '비교 해제' : '비교 담기'}
                  </button>
                </div>
                <div className={product.imageClass}>
                  <PlaceholderMedia
                    label={product.title}
                    role="제품 이미지"
                    ratio="1 / 1"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="product_compare" aria-live="polite">
        <div className="product_compare_header">
          <strong>비교 덱</strong>
          <span>{comparedProducts.length}/2 선택됨</span>
        </div>
        {comparedProducts.length > 0 ? (
          <div className="product_compare_grid">
            {comparedProducts.map((product) => (
              <article key={product.key}>
                <h3>{product.title}</h3>
                <p>{product.specs.use}</p>
                <dl>
                  <div>
                    <dt>Tone</dt>
                    <dd>{product.specs.tone}</dd>
                  </div>
                  <div>
                    <dt>Fit</dt>
                    <dd>{product.specs.fit}</dd>
                  </div>
                </dl>
                <button type="button" onClick={() => toggleCompare(product.key)}>제거</button>
              </article>
            ))}
          </div>
        ) : (
          <p className="product_compare_empty">제품을 최대 2개까지 담아 용도와 톤을 빠르게 비교해보세요.</p>
        )}
      </div>
    </section>
  );
}

function Artists() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [featuredKey, setFeaturedKey] = useState(artists[0].key);
  const visibleArtists = artists.filter((artist) => activeFilter === 'all' || artist.filters.includes(activeFilter));
  const featuredArtist = visibleArtists.find((artist) => artist.key === featuredKey) || visibleArtists[0] || artists[0];

  return (
    <section className="artists_section" id="artists">
      <div className="artists">
        <div className="artists_banner scroll-fade-up">
          <PlaceholderMedia
            className="artists_banner_image"
            label="Artists"
            role="아티스트 배너"
            ratio="4 / 1"
          />
          <div className="artists_text">
            <div className="artists_text_left"><h2>Artists</h2></div>
            <div className="artists_text_right">
              <h3>마샬을<br />증폭하는 차세대 사운드 아이콘</h3>
              <p>
                Jim Marshall의 음악에 대한 열정은 오늘의 아티스트에게도 이어집니다.
                이 섹션에서는 서로 다른 무대와 작업 방식을 가진 아티스트의 톤을 간결하게 비교해볼 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="artist_tools scroll-fade-up" aria-label="아티스트 필터와 포커스">
        <div className="artist_filters" role="group" aria-label="아티스트 유형 필터">
          {artistFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={activeFilter === filter.key ? 'is-active' : ''}
              aria-pressed={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <article className="artist_focus">
          <span>선택한 아티스트</span>
          <h3>{featuredArtist.signal}</h3>
          <p>{featuredArtist.venue}</p>
        </article>
      </div>

      <div className="artist_content">
        {visibleArtists.map((artist) => (
          <div key={artist.key} className={`${artist.key} ${artist.direction} is-visible`}>
            <div className={`${artist.key}_text`}>
              <span>{artist.number}</span>
              <h3>{artist.title}</h3>
              <p>{artist.body}</p>
              <dl className="artist_meta">
                <div>
                  <dt>Signal</dt>
                  <dd>{artist.signal}</dd>
                </div>
                <div>
                  <dt>Stage</dt>
                  <dd>{artist.venue}</dd>
                </div>
              </dl>
              <button
                type="button"
                className={featuredArtist.key === artist.key ? 'is-active' : ''}
                aria-pressed={featuredArtist.key === artist.key}
                onClick={() => setFeaturedKey(artist.key)}
              >
                포커스 선택
              </button>
            </div>
            <div className={`${artist.key}_image`}>
              <PlaceholderMedia
                label={artist.signal}
                role="아티스트 이미지"
                ratio="1 / 1"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SocialSlide({ slide, isActive }) {
  return (
    <article className="editorial_slide" aria-hidden={!isActive}>
      <PlaceholderMedia
        className="slide_image"
        label={slide.title}
        role="스토리 이미지"
        ratio="1 / 1"
      />
      <div className="editorial_slide_text">
        <span>{slide.label}</span>
        <h3>{slide.title}</h3>
        <p>{slide.body}</p>
        <a href={slide.href} className="more" aria-label={slide.aria} tabIndex={isActive ? undefined : -1} {...externalProps}>더 알아보기</a>
      </div>
    </article>
  );
}

function SocialSlider() {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const slideCount = socialSlides.length;
  const activeSlide = socialSlides[current];

  const goTo = (index) => {
    setCurrent((index + slideCount) % slideCount);
  };

  useEffect(() => {
    if (!isAuto) return undefined;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % slideCount);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isAuto, slideCount]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(current + 1);
    }
  };

  return (
    <div
      className="editorial_carousel scroll-scale"
      aria-label="Marshall 소셜 콘텐츠"
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="editorial_carousel_status">
        <span>{String(current + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}</span>
        <strong>{activeSlide.title}</strong>
        <button type="button" aria-pressed={isAuto} onClick={() => setIsAuto((value) => !value)}>
          {isAuto ? '자동 정지' : '자동 재생'}
        </button>
      </div>

      <div className="editorial_carousel_viewport">
        <div className="editorial_carousel_track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {socialSlides.map((slide, index) => (
            <SocialSlide key={slide.key} slide={slide} isActive={index === current} />
          ))}
        </div>
      </div>

      <div className="editorial_carousel_controls" aria-label="슬라이드 이동">
        <button type="button" onClick={() => goTo(current - 1)} aria-label="이전 콘텐츠">‹</button>
        <div className="editorial_carousel_dots" role="group" aria-label="소셜 콘텐츠 선택">
          {socialSlides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              className={index === current ? 'is-active' : ''}
              aria-label={`${slide.title} 보기`}
              aria-pressed={index === current}
              onClick={() => goTo(index)}
            >
              <span>{slide.title}</span>
            </button>
          ))}
        </div>
        <button type="button" onClick={() => goTo(current + 1)} aria-label="다음 콘텐츠">›</button>
      </div>
    </div>
  );
}

function Social() {
  return (
    <section className="social_section" id="social">
      <div className="social_text scroll-fade-up">
        <h2>Social</h2>
        <p>음악 산업의 뿌리 깊은 유산과 공동체, 그리고 뮤지션들의 이야기를 한 곳에서 탐색해보세요.</p>
      </div>

      <SocialSlider />

      <div className="social_partnership scroll-fade-up">
        <PlaceholderMedia
          className="partnership_image"
          label="Partnership"
          role="캠페인 이미지"
          ratio="3 / 2"
        />
        <div className="partnership_text">
          <h3>PARTNERSHIP</h3>
          <p>경계를 허물고 혁신을 이어가는 다양한 크리에이티브 파트너십과 협업을 소개합니다.</p>
          <a href="https://www.marshall.com/us/en/backstage/partnerships" className="more" aria-label="Marshall 파트너십 콘텐츠 더 알아보기" {...externalProps}>더 알아보기</a>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const notes = [
    {
      title: 'Heritage',
      body: '1962년부터 이어진 Marshall의 사운드 언어를 짧은 에디토리얼 흐름으로 정리할 예정입니다.'
    },
    {
      title: 'Tone',
      body: '거친 출력, 따뜻한 질감, 무대 위 존재감처럼 브랜드를 이루는 감각 키워드를 다룹니다.'
    },
    {
      title: 'Culture',
      body: '제품보다 먼저 남는 태도와 커뮤니티의 이야기를 이후 콘텐츠로 확장합니다.'
    }
  ];

  return (
    <main className="subpage_main detail_subpage about_subpage">
      <section className="subpage_hero">
        <div className="subpage_hero_text scroll-fade-up">
          <span>About</span>
          <h2>소리가 태도가 되는 순간</h2>
          <p>
            Marshall의 역사를 촘촘하게 복제하기보다, 브랜드가 어떤 방식으로 음악 문화 안에 자리 잡았는지 차분하게 따라갑니다.
          </p>
          <InternalLink href="/#about">메인 소개 섹션으로 돌아가기</InternalLink>
        </div>
        <PlaceholderMedia
          className="subpage_hero_media"
          label="About"
          role="헤리티지 대표 이미지"
          ratio="16 / 9"
        />
      </section>

      <section className="subpage_detail_section" aria-label="About 상세 메모">
        <div className="subpage_collection_header scroll-fade-up">
          <div>
            <span>Draft Notes</span>
            <h2>정리할 이야기</h2>
          </div>
        </div>
        <div className="subpage_detail_grid">
          {notes.map((note) => (
            <article key={note.title} className="subpage_detail_card scroll-fade-up">
              <span>{note.title}</span>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const visibleProducts = products.filter((product) => activeFilter === 'all' || product.filters.includes(activeFilter));

  return (
    <main className="subpage_main products_subpage">
      <section className="subpage_hero">
        <div className="subpage_hero_text scroll-fade-up">
          <span>Products</span>
          <h2>사운드를 고르는 세 가지 방식</h2>
          <p>
            헤드폰, 스피커, 앰프를 목적과 공간에 따라 다시 묶은 시작 페이지입니다.
            제품마다 다른 사용 장면과 톤의 결을 비교하며 자신에게 맞는 방향을 고를 수 있습니다.
          </p>
          <InternalLink href="/#products">메인 제품 섹션으로 돌아가기</InternalLink>
        </div>
        <PlaceholderMedia
          className="subpage_hero_media"
          label="Products"
          role="컬렉션 대표 이미지"
          ratio="16 / 9"
        />
      </section>

      <section className="subpage_collection" aria-label="제품 컬렉션">
        <div className="subpage_collection_header scroll-fade-up">
          <div>
            <span>Collection</span>
            <h2>제품 라인업</h2>
          </div>
          <div className="product_filters" role="group" aria-label="제품군 필터">
            {productFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={activeFilter === filter.key ? 'is-active' : ''}
                aria-pressed={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="subpage_product_grid">
          {visibleProducts.map((product) => (
            <article key={product.key} className="subpage_product_card scroll-fade-up">
              <PlaceholderMedia
                label={product.title}
                role={product.heroLabel}
                ratio="4 / 3"
              />
              <div className="subpage_product_card_text">
                <span>{product.number} / {product.heroLabel}</span>
                <h3>{product.title}</h3>
                <p>{product.summary}</p>
                <dl>
                  <div>
                    <dt>Use</dt>
                    <dd>{product.specs.use}</dd>
                  </div>
                  <div>
                    <dt>Tone</dt>
                    <dd>{product.specs.tone}</dd>
                  </div>
                  <div>
                    <dt>Fit</dt>
                    <dd>{product.specs.fit}</dd>
                  </div>
                </dl>
                <a href={product.href} aria-label={product.aria} {...externalProps}>공식 제품 보기</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ArtistsPage() {
  return (
    <main className="subpage_main detail_subpage artists_subpage">
      <section className="subpage_hero">
        <div className="subpage_hero_text scroll-fade-up">
          <span>Artists</span>
          <h2>무대가 사운드를 기억하는 방식</h2>
          <p>
            각 아티스트의 이름보다 먼저 남는 사운드의 결, 무대 환경, 작업 태도를 중심으로 이야기를 정리합니다.
          </p>
          <InternalLink href="/#artists">메인 아티스트 섹션으로 돌아가기</InternalLink>
        </div>
        <PlaceholderMedia
          className="subpage_hero_media"
          label="Artists"
          role="아티스트 대표 이미지"
          ratio="16 / 9"
        />
      </section>

      <section className="subpage_detail_section" aria-label="아티스트 상세 메모">
        <div className="subpage_collection_header scroll-fade-up">
          <div>
            <span>Lineup</span>
            <h2>아티스트 노트</h2>
          </div>
        </div>
        <div className="subpage_detail_grid">
          {artists.map((artist) => (
            <article key={artist.key} className="subpage_detail_card scroll-fade-up">
              <PlaceholderMedia
                label={artist.signal}
                role="아티스트 이미지"
                ratio="4 / 3"
              />
              <div>
                <span>{artist.number} / {artist.venue}</span>
                <h3>{artist.signal}</h3>
                <p>{artist.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function SocialPage() {
  return (
    <main className="subpage_main detail_subpage social_subpage">
      <section className="subpage_hero">
        <div className="subpage_hero_text scroll-fade-up">
          <span>Social</span>
          <h2>커뮤니티로 이어지는 백스테이지</h2>
          <p>
            Heritage, Story, Community 콘텐츠를 한 흐름으로 묶어 Marshall을 둘러싼 음악 문화의 장면들을 살펴봅니다.
          </p>
          <InternalLink href="/#social">메인 소셜 섹션으로 돌아가기</InternalLink>
        </div>
        <PlaceholderMedia
          className="subpage_hero_media"
          label="Social"
          role="커뮤니티 대표 이미지"
          ratio="16 / 9"
        />
      </section>

      <section className="subpage_detail_section" aria-label="소셜 콘텐츠 상세 메모">
        <div className="subpage_collection_header scroll-fade-up">
          <div>
            <span>Stories</span>
            <h2>콘텐츠 허브</h2>
          </div>
        </div>
        <div className="subpage_detail_grid">
          {socialSlides.map((slide) => (
            <article key={slide.key} className="subpage_detail_card scroll-fade-up">
              <PlaceholderMedia
                label={slide.title}
                role="스토리 이미지"
                ratio="4 / 3"
              />
              <div>
                <span>{slide.label}</span>
                <h3>{slide.title}</h3>
                <p>{slide.body}</p>
                <a href={slide.href} aria-label={slide.aria} {...externalProps}>공식 콘텐츠 보기</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Footer() {
  const width = useWindowWidth();
  const isDesktop = width >= 768;
  const [activeKey, setActiveKey] = useState(null);

  return (
    <footer>
      <div className="footer_center">
        <div className="footer_top">
          <div className="footer_logo"><span className="screen_out">Marshall</span></div>
          <p className="footer_top_text">live loud, play true</p>
        </div>

        <div className="footer_bottom">
          {footerSections.map((section) => {
            const isActive = isDesktop || activeKey === section.key;
            const listId = `footer-${section.key}-list`;

            return (
              <div key={section.key} className={`footer_section ${section.className} ${isActive ? 'active' : ''}`}>
                <h3>
                  <button
                    type="button"
                    className="footer_toggle"
                    aria-expanded={isActive}
                    aria-controls={listId}
                    onClick={() => {
                      if (isDesktop) return;
                      setActiveKey(isActive ? null : section.key);
                    }}
                  >
                    {section.title}
                    <span className="dropdown_icon" aria-hidden="true"></span>
                  </button>
                </h3>
                <ul className={section.listClass} id={listId} aria-hidden={!isActive}>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} tabIndex={isActive ? undefined : -1} {...externalProps}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="footer_social">
            <h3>소셜 미디어</h3>
            <div className="social_icons">
              <a href="https://x.com/marshallamps" aria-label="X에서 Marshall 보기" title="X" {...externalProps}></a>
              <a href="https://www.instagram.com/marshallamps/" aria-label="Instagram에서 Marshall 보기" title="Instagram" {...externalProps}></a>
              <a href="https://www.facebook.com/marshallamps/" aria-label="Facebook에서 Marshall 보기" title="Facebook" {...externalProps}></a>
            </div>
          </div>
        </div>

        <p className="copyright">© 2026 Marshall Editorial Study.</p>
      </div>
    </footer>
  );
}

function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 520);
    };

    updateVisibility();
    const intervalId = window.setInterval(updateVisibility, 250);
    window.addEventListener('scroll', updateVisibility, { passive: true });
    document.addEventListener('scroll', updateVisibility, { passive: true, capture: true });

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('scroll', updateVisibility);
      document.removeEventListener('scroll', updateVisibility, { capture: true });
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <button
      type="button"
      className={`scroll_top_button ${isVisible ? 'is-visible' : ''}`}
      aria-label="맨 위로 이동"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onPointerDown={scrollToTop}
      onClick={scrollToTop}
    >
      <span aria-hidden="true">↑</span>
      <em>Top</em>
    </button>
  );
}

export default function App() {
  const currentPath = useRoute();
  const routePath = currentPath.replace(/\/$/, '') || '/';
  const routeTitles = {
    '/about': 'About | Marshall Editorial Study',
    '/products': 'Products | Marshall Editorial Study',
    '/artists': 'Artists | Marshall Editorial Study',
    '/social': 'Social | Marshall Editorial Study'
  };

  useScrollAnimation();

  useEffect(() => {
    document.title = routeTitles[routePath] || 'Marshall Editorial Study';
  }, [routePath]);

  const renderRoute = () => {
    if (routePath === '/about') return <AboutPage />;
    if (routePath === '/products') return <ProductsPage />;
    if (routePath === '/artists') return <ArtistsPage />;
    if (routePath === '/social') return <SocialPage />;

    return (
      <>
        <Hero />
        <main>
          <About />
          <Products />
          <Artists />
          <Social />
        </main>
      </>
    );
  };

  return (
    <div id="top" className="react_experiment">
      <Header currentPath={currentPath} />
      {renderRoute()}
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
