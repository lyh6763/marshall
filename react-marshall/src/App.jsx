import { useEffect, useRef, useState } from 'react';
import Picture from './components/Picture.jsx';
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

function Header() {
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
        <h1><a href="#top">Marshall</a></h1>
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
            <h1><a href="#top">Marshall</a></h1>
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
                  <a href={item.href} onClick={() => closeMenu({ restoreFocus: false })}>{item.label}</a>
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
      <Picture
        className="hero_image"
        base="/img/optimized/head_img"
        widths={[960, 1440, 1920]}
        srcWidth={1440}
        sizes="100vw"
        width="2880"
        height="1431"
        alt="Marshall 앰프와 무대 분위기를 담은 히어로 이미지"
        loading="eager"
        fetchPriority="high"
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
            1962년 창립 이래로, Marshall은 다양한 음악 장르에서 중요한 역할을 해왔으며 여러 세대에 걸쳐 획기적인 음악을 형성하는 데 기여해왔습니다.
            이 React 실험본은 그 헤리티지를 유지하되, 제품 탐색과 콘텐츠 이동을 더 명료한 인터랙션으로 다듬는 개인 작업입니다.
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
        <p className="product_result" aria-live="polite">{visibleProducts.length} product{visibleProducts.length === 1 ? '' : 's'} shown</p>
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
                  <Picture
                    base={product.image.base}
                    widths={[360, 600]}
                    srcWidth={600}
                    sizes="(min-width: 1920px) 500px, (min-width: 1024px) 420px, (min-width: 768px) 300px, 83vw"
                    width="600"
                    height="600"
                    alt={product.image.alt}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="product_compare" aria-live="polite">
        <div className="product_compare_header">
          <strong>Compare Deck</strong>
          <span>{comparedProducts.length}/2 selected</span>
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
                <button type="button" onClick={() => toggleCompare(product.key)}>Remove</button>
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
          <Picture
            className="artists_banner_image"
            base="/img/optimized/artist_banner"
            widths={[768, 1440, 1920]}
            srcWidth={1440}
            sizes="100vw"
            width="3844"
            height="996"
            alt="Marshall 아티스트 무대 분위기를 담은 배너 이미지"
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
          <span>Focus</span>
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
                Focus
              </button>
            </div>
            <div className={`${artist.key}_image`}>
              <Picture
                base={artist.imageBase}
                widths={[360, 600]}
                srcWidth={600}
                sizes="(min-width: 1920px) 600px, (min-width: 768px) 50vw, 83vw"
                width="600"
                height="600"
                alt={artist.alt}
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
      <Picture
        className="slide_image"
        base={slide.imageBase}
        widths={[360, 741]}
        srcWidth={741}
        sizes="(min-width: 1024px) 540px, 83vw"
        width="741"
        height="741"
        alt={slide.alt}
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
          {isAuto ? 'Pause' : 'Auto'}
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
        <Picture
          className="partnership_image"
          base="/img/optimized/social_partnership"
          widths={[640, 1155]}
          srcWidth={1155}
          sizes="(min-width: 1920px) 1440px, (min-width: 1024px) 1200px, 83vw"
          width="1155"
          height="750"
          alt="Marshall 파트너십 콘텐츠 이미지"
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

        <p className="copyright">© 2026 Marshall React Experiment. Personal playground.</p>
      </div>
    </footer>
  );
}

export default function App() {
  useScrollAnimation();

  return (
    <div id="top" className="react_experiment">
      <Header />
      <Hero />
      <main>
        <About />
        <Products />
        <Artists />
        <Social />
      </main>
      <Footer />
    </div>
  );
}
