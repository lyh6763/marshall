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

const picturePresets = {
  hero: {
    widths: [960, 1440, 1920],
    sizes: '100vw',
    srcWidth: 1440,
    width: 1440,
    height: 716
  },
  productSquare: {
    widths: [360, 600],
    sizes: '(min-width: 1440px) 500px, (min-width: 768px) 300px, 100vw',
    srcWidth: 600,
    width: 600,
    height: 600
  },
  artistBanner: {
    widths: [768, 1440, 1920],
    sizes: '100vw',
    srcWidth: 1440,
    width: 1440,
    height: 373
  },
  socialSquare: {
    widths: [360, 741],
    sizes: '(min-width: 1024px) 58vw, 100vw',
    srcWidth: 741,
    width: 741,
    height: 741
  },
  partnership: {
    widths: [640, 1155],
    sizes: '(min-width: 1024px) 840px, 100vw',
    srcWidth: 1155,
    width: 1155,
    height: 750
  }
};

const wallOfSoundScenes = [
  {
    key: 'feedback-rush',
    label: '01',
    mode: 'Feedback Rush',
    headline: '앰프 앞 30cm',
    subtitle: '소리가 몸으로 먼저 들어오는 짧고 강한 순간입니다.',
    productKey: 'amplifiers',
    artistKey: 'artist2',
    storyKey: 'story',
    gain: 11,
    bpm: 168,
    flash: 'LOUD',
    levels: [96, 72, 88, 64, 100, 82, 58, 92, 76, 98, 68, 86]
  },
  {
    key: 'neon-room',
    label: '02',
    mode: 'Neon Room',
    headline: '방 안을 밀어내는 저음',
    subtitle: '스피커가 공간을 장악하고, 공기가 살짝 뒤로 밀리는 조합입니다.',
    productKey: 'speakers',
    artistKey: 'artist3',
    storyKey: 'community',
    gain: 9,
    bpm: 124,
    flash: 'ROOM',
    levels: [62, 90, 74, 96, 54, 84, 100, 78, 68, 92, 58, 88]
  },
  {
    key: 'night-sprint',
    label: '03',
    mode: 'Night Sprint',
    headline: '밤길을 찢고 지나가는 리듬',
    subtitle: '헤드폰 안에서 드럼과 기타가 앞다퉈 튀어나오는 장면입니다.',
    productKey: 'headphones',
    artistKey: 'artist1',
    storyKey: 'heritage',
    gain: 10,
    bpm: 152,
    flash: 'MOVE',
    levels: [78, 100, 66, 88, 72, 94, 60, 82, 98, 70, 90, 64]
  },
  {
    key: 'aftershock',
    label: '04',
    mode: 'Aftershock',
    headline: '무대가 끝난 뒤 남는 잔향',
    subtitle: '커뮤니티의 장면과 오래된 헤리티지가 뒤섞여 천천히 번집니다.',
    productKey: 'speakers',
    artistKey: 'artist4',
    storyKey: 'community',
    gain: 8,
    bpm: 108,
    flash: 'ECHO',
    levels: [54, 76, 92, 68, 86, 58, 80, 96, 62, 84, 70, 90]
  }
];

const productMainCopy = {
  headphones: {
    eyebrow: 'Personal Output',
    title: 'Headphones',
    body: '혼자 듣는 순간을 빠르게 밀어 올리는 이동형 사운드입니다.',
    detail: '선명한 고음, 단단한 저음, 가까운 질감'
  },
  speakers: {
    eyebrow: 'Room Output',
    title: 'Speakers',
    body: '방의 분위기와 사람의 움직임까지 같이 바꾸는 공간형 사운드입니다.',
    detail: '넓은 스테레오, 따뜻한 존재감, 실내 중심'
  },
  amplifiers: {
    eyebrow: 'Stage Output',
    title: 'Amplifiers',
    body: '연주자의 손끝에서 바로 튀어나오는 거칠고 직접적인 출력입니다.',
    detail: '드라이브, 압력, 무대 앞 존재감'
  }
};

const artistMainCopy = {
  artist1: {
    title: 'Night Runner',
    body: '빠른 리듬과 개인적인 청취 장면을 연결합니다.'
  },
  artist2: {
    title: 'Stage Driver',
    body: '앰프 앞에서 가장 크게 살아나는 에너지를 담당합니다.'
  },
  artist3: {
    title: 'Room Shaper',
    body: '공간 전체를 하나의 청취 장면처럼 만드는 흐름입니다.'
  },
  artist4: {
    title: 'After Hours',
    body: '잔향, 기록, 커뮤니티의 온도를 천천히 남깁니다.'
  }
};

const storyMainCopy = {
  heritage: {
    title: 'Heritage',
    body: '오래된 사운드 언어를 지금의 화면 구조로 다시 펼칩니다.'
  },
  story: {
    title: 'Backstage',
    body: '제품보다 조금 더 가까운 곳에서 사람과 장면을 보여줍니다.'
  },
  community: {
    title: 'Community',
    body: '혼자 듣는 경험이 다른 사람의 장면과 만나는 지점입니다.'
  }
};

function MediaImage({ base, alt, variant, className, pictureClassName, loading, fetchPriority }) {
  return (
    <Picture
      base={base}
      alt={alt}
      className={className}
      pictureClassName={pictureClassName}
      loading={loading}
      fetchPriority={fetchPriority}
      {...picturePresets[variant]}
    />
  );
}

function getSceneBundle(scene) {
  return {
    product: products.find((item) => item.key === scene.productKey) || products[0],
    artist: artists.find((item) => item.key === scene.artistKey) || artists[0],
    story: socialSlides.find((item) => item.key === scene.storyKey) || socialSlides[0]
  };
}

function findSceneIndexBy(field, key) {
  const nextIndex = wallOfSoundScenes.findIndex((scene) => scene[field] === key);
  return nextIndex >= 0 ? nextIndex : 0;
}

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
      <MediaImage
        base="/img/optimized/head_img"
        alt="Marshall 무대와 장비 분위기를 보여주는 대표 이미지"
        variant="hero"
        className="hero_image"
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
            1962년 창립 이래로 Marshall은 다양한 음악 장르와 세대를 지나며 독보적인 사운드의 기준을 만들어왔습니다.
            이 화면은 그 헤리티지를 바탕으로 제품, 아티스트, 커뮤니티 이야기를 차분하게 탐색할 수 있도록 정리한 에디토리얼입니다.
          </p>
          <a href="https://www.marshall.com/us/en/about-marshall" aria-label="Marshall 소개 더 알아보기" {...externalProps}>더 알아보기</a>
        </div>
      </div>
    </section>
  );
}

function HomePage({ scene, sceneIndex, onSceneChange }) {
  const [isKicking, setIsKicking] = useState(false);
  const { product, artist, story } = getSceneBundle(scene);
  const productCopy = productMainCopy[product.key] || productMainCopy.headphones;
  const artistCopy = artistMainCopy[artist.key] || artistMainCopy.artist1;
  const storyCopy = storyMainCopy[story.key] || storyMainCopy.heritage;

  useEffect(() => {
    if (!isKicking) return undefined;
    const timer = window.setTimeout(() => setIsKicking(false), 620);

    return () => window.clearTimeout(timer);
  }, [isKicking]);

  const changeScene = (nextIndex) => {
    onSceneChange(nextIndex);
    setIsKicking(true);
  };

  const cycleScene = () => {
    onSceneChange();
    setIsKicking(true);
  };

  return (
    <main className={`home_playground ${isKicking ? 'is-kicking' : ''}`}>
      <section className="playground_hero" aria-labelledby="home-playground-title">
        <div className="playground_hero_text scroll-fade-up">
          <span>Marshall Playroom</span>
          <h2 id="home-playground-title">Pick a scene. Make it loud.</h2>
          <p>
            제품을 고르는 목록 대신 하나의 장면을 조립하는 화면입니다. 버튼 하나로 제품, 아티스트,
            스토리가 동시에 바뀌고 페이지의 리듬도 같이 반응합니다.
          </p>
          <div className="playground_actions">
            <button type="button" onClick={cycleScene} aria-label="다음 사운드 장면으로 전환">
              Shuffle Scene
            </button>
            <InternalLink href="/products">전체 제품 보기</InternalLink>
          </div>
        </div>

        <div className="playground_stage scroll-scale" aria-live="polite">
          <MediaImage
            base={product.image.base}
            alt={`${productCopy.title} 대표 이미지`}
            variant="productSquare"
            pictureClassName="stage_media"
            className="stage_image"
            loading="eager"
            fetchPriority="high"
          />
          <div className="stage_overlay">
            <span>{scene.label} / {scene.mode}</span>
            <strong>{scene.flash}</strong>
            <p>{scene.headline}</p>
          </div>
          <div className="stage_meter" aria-label={`Gain ${scene.gain}, tempo ${scene.bpm} bpm`}>
            <b>{scene.gain}</b>
            <span>gain</span>
            <em>{scene.bpm} bpm</em>
          </div>
        </div>
      </section>

      <section className="scene_switchboard" aria-label="사운드 장면 선택">
        <div className="scene_switchboard_header scroll-fade-up">
          <span>Scene Switchboard</span>
          <p>누르면 메인 페이지의 이미지와 카드 구성이 함께 바뀝니다.</p>
        </div>
        <div className="scene_switches" role="group" aria-label="메인 사운드 장면">
          {wallOfSoundScenes.map((item, index) => (
            <button
              key={item.key}
              type="button"
              className={index === sceneIndex ? 'is-active' : ''}
              aria-pressed={index === sceneIndex}
              onClick={() => changeScene(index)}
            >
              <span>{item.label}</span>
              <strong>{item.mode}</strong>
              <em>{item.headline}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="signal_triptych" aria-label="선택된 장면 구성">
        <article className="signal_card signal_product scroll-fade-up">
          <span>{productCopy.eyebrow}</span>
          <h3>{productCopy.title}</h3>
          <p>{productCopy.body}</p>
          <em>{productCopy.detail}</em>
        </article>
        <article className="signal_card signal_artist scroll-fade-up">
          <MediaImage
            base={artist.imageBase}
            alt={`${artistCopy.title} 아티스트 이미지`}
            variant="productSquare"
            pictureClassName="signal_card_media"
            className="signal_image"
          />
          <div>
            <span>Artist Signal</span>
            <h3>{artistCopy.title}</h3>
            <p>{artistCopy.body}</p>
          </div>
        </article>
        <article className="signal_card signal_story scroll-fade-up">
          <MediaImage
            base={story.imageBase}
            alt={`${storyCopy.title} 스토리 이미지`}
            variant="socialSquare"
            pictureClassName="signal_card_media"
            className="signal_image"
          />
          <div>
            <span>Story Feed</span>
            <h3>{storyCopy.title}</h3>
            <p>{storyCopy.body}</p>
          </div>
        </article>
      </section>

      <section className="product_dock" id="products" aria-labelledby="product-dock-title">
        <div className="section_kicker scroll-fade-up">
          <span>Product Dock</span>
          <h2 id="product-dock-title">세 가지 출력 방식</h2>
        </div>
        <div className="dock_grid">
          {products.map((item) => {
            const copy = productMainCopy[item.key] || productMainCopy.headphones;
            const nextIndex = findSceneIndexBy('productKey', item.key);

            return (
              <button
                key={item.key}
                type="button"
                className={`dock_card scroll-fade-up ${item.key === product.key ? 'is-active' : ''}`}
                aria-pressed={item.key === product.key}
                onClick={() => changeScene(nextIndex)}
              >
                <MediaImage
                  base={item.image.base}
                  alt={`${copy.title} 제품 이미지`}
                  variant="productSquare"
                  pictureClassName="dock_card_media"
                  className="dock_image"
                />
                <span>{copy.eyebrow}</span>
                <strong>{copy.title}</strong>
                <em>{copy.detail}</em>
              </button>
            );
          })}
        </div>
      </section>

      <section className="artist_tape" id="artists" aria-labelledby="artist-tape-title">
        <div className="section_kicker scroll-fade-up">
          <span>Artist Tape</span>
          <h2 id="artist-tape-title">장면을 움직이는 네 가지 신호</h2>
        </div>
        <div className="artist_tape_grid">
          {artists.map((item) => {
            const copy = artistMainCopy[item.key] || artistMainCopy.artist1;
            const nextIndex = findSceneIndexBy('artistKey', item.key);

            return (
              <button
                key={item.key}
                type="button"
                className={`artist_tape_card scroll-fade-up ${item.key === artist.key ? 'is-active' : ''}`}
                aria-pressed={item.key === artist.key}
                onClick={() => changeScene(nextIndex)}
              >
                <MediaImage
                  base={item.imageBase}
                  alt={`${copy.title} 아티스트 이미지`}
                  variant="productSquare"
                  pictureClassName="artist_tape_media"
                  className="artist_tape_image"
                />
                <span>{item.number}</span>
                <strong>{copy.title}</strong>
                <em>{copy.body}</em>
              </button>
            );
          })}
        </div>
      </section>

      <section className="story_wave" id="social" aria-labelledby="story-wave-title">
        <div className="section_kicker scroll-fade-up">
          <span>Story Wave</span>
          <h2 id="story-wave-title">콘텐츠는 장면의 여운으로 배치합니다</h2>
        </div>
        <div className="story_wave_grid">
          {socialSlides.map((item) => {
            const copy = storyMainCopy[item.key] || storyMainCopy.heritage;
            const nextIndex = findSceneIndexBy('storyKey', item.key);

            return (
              <article key={item.key} className={`story_wave_card scroll-fade-up ${item.key === story.key ? 'is-active' : ''}`}>
                <MediaImage
                  base={item.imageBase}
                  alt={`${copy.title} 콘텐츠 이미지`}
                  variant="socialSquare"
                  pictureClassName="story_wave_media"
                  className="story_wave_image"
                />
                <div>
                  <span>{item.label}</span>
                  <h3>{copy.title}</h3>
                  <p>{copy.body}</p>
                  <button type="button" onClick={() => changeScene(nextIndex)} aria-pressed={item.key === story.key}>
                    이 흐름 보기
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="heritage_strip" id="about" aria-labelledby="heritage-strip-title">
        <div className="heritage_strip_text scroll-fade-up">
          <span>About</span>
          <h2 id="heritage-strip-title">낡은 복제가 아니라, 만지면서 변하는 한 장의 사운드 보드.</h2>
          <p>
            이 메인 페이지는 제품 소개, 아티스트 이미지, 스토리 콘텐츠를 독립된 섹션으로 세우기보다
            하나의 선택 상태에 묶어 탐색합니다.
          </p>
        </div>
        <InternalLink className="heritage_strip_link scroll-fade-up" href="/about">
          About 상세 보기
        </InternalLink>
      </section>
    </main>
  );
}

function WallOfSound({ scene, sceneIndex, onBlast }) {
  const [isBlasting, setIsBlasting] = useState(false);
  const product = products.find((item) => item.key === scene.productKey) || products[0];
  const artist = artists.find((item) => item.key === scene.artistKey) || artists[0];
  const story = socialSlides.find((item) => item.key === scene.storyKey) || socialSlides[0];

  useEffect(() => {
    if (!isBlasting) return undefined;
    const timer = window.setTimeout(() => setIsBlasting(false), 900);

    return () => window.clearTimeout(timer);
  }, [isBlasting]);

  const triggerBlast = () => {
    setIsBlasting(false);
    window.requestAnimationFrame(() => {
      onBlast();
      setIsBlasting(true);
    });
  };

  return (
    <section className={`wall_of_sound_section ${isBlasting ? 'is-blasting' : ''}`} aria-labelledby="wall-of-sound-title">
      <div className="wall_of_sound_header">
        <div>
          <span>Wall of Sound</span>
          <h2 id="wall-of-sound-title">Gain to 11</h2>
          <p>버튼을 누를 때마다 제품, 아티스트, 스토리가 한 덩어리로 터지면서 다른 사운드 장면으로 전환됩니다.</p>
        </div>
        <button type="button" className="wall_blast_button" onClick={triggerBlast} aria-pressed={isBlasting}>
          터뜨리기
        </button>
      </div>

      <div className="wall_of_sound_stage" aria-live="polite">
        <div className="wall_noise_grid" aria-hidden="true">
          {scene.levels.map((level, index) => (
            <span
              key={`${scene.key}-${index}`}
              style={{
                '--level': `${level}%`,
                '--delay': `${index * 42}ms`
              }}
            >
              {scene.flash}
            </span>
          ))}
        </div>

        <div className="wall_centerpiece">
          <span>{scene.label} / {scene.mode}</span>
          <strong>{scene.gain}</strong>
          <em>gain</em>
          <b>{scene.bpm} bpm</b>
        </div>

        <div className="wall_scene_copy">
          <span>{scene.mode}</span>
          <h3>{scene.headline}</h3>
          <p>{scene.subtitle}</p>
        </div>
      </div>

      <div className="wall_signal_strip" aria-label="현재 사운드 조합">
        <article>
          <span>Product</span>
          <strong>{product.title}</strong>
          <p>{product.specs.tone}</p>
        </article>
        <article>
          <span>Artist</span>
          <strong>{artist.signal}</strong>
          <p>{artist.venue}</p>
        </article>
        <article>
          <span>Story</span>
          <strong>{story.title}</strong>
          <p>{story.label}</p>
        </article>
      </div>

      <div className="wall_equalizer" aria-label="사운드 레벨 시각화">
        {scene.levels.map((level, index) => (
          <i
            key={`bar-${scene.key}-${index}`}
            style={{
              '--level': `${level}%`,
              '--delay': `${index * 34}ms`
            }}
          >
            <span className="screen_out">{index + 1}번 레벨 {level}</span>
          </i>
        ))}
      </div>

      <div className="wall_scene_picker" role="group" aria-label="사운드 장면 선택">
        {wallOfSoundScenes.map((item, index) => (
          <button
            key={item.key}
            type="button"
            className={index === sceneIndex ? 'is-active' : ''}
            aria-pressed={index === sceneIndex}
            onClick={() => {
              if (index === sceneIndex) return;
              onBlast(index);
              setIsBlasting(true);
            }}
          >
            <span>{item.label}</span>
            {item.mode}
          </button>
        ))}
      </div>
    </section>
  );
}

function Products({ featuredProductKey }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [compareKeys, setCompareKeys] = useState([]);
  const featuredProduct = products.find((product) => product.key === featuredProductKey) || products[0];
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
      <div className="scene_bridge_note scroll-fade-up">
        <span>Scene Product</span>
        <strong>{featuredProduct.title}</strong>
        <p>{featuredProduct.summary}</p>
      </div>
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
            <div key={product.key} className={`${product.key} ${product.key === featuredProductKey ? 'is-scene-match' : ''} ${index === 1 ? 'scroll-fade-right' : 'scroll-fade-left'}`}>
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
                  <MediaImage
                    base={product.image.base}
                    alt={product.image.alt}
                    variant="productSquare"
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

function Artists({ featuredArtistKey }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [featuredKey, setFeaturedKey] = useState(featuredArtistKey || artists[0].key);
  const visibleArtists = artists.filter((artist) => activeFilter === 'all' || artist.filters.includes(activeFilter));
  const featuredArtist = visibleArtists.find((artist) => artist.key === featuredKey) || visibleArtists[0] || artists[0];

  useEffect(() => {
    if (featuredArtistKey) {
      setFeaturedKey(featuredArtistKey);
      setActiveFilter('all');
    }
  }, [featuredArtistKey]);

  return (
    <section className="artists_section" id="artists">
      <div className="artists">
        <div className="artists_banner scroll-fade-up">
          <MediaImage
            base="/img/optimized/artist_banner"
            alt="Marshall 아티스트와 무대 분위기를 보여주는 배너 이미지"
            variant="artistBanner"
            className="artists_banner_image"
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
          <div key={artist.key} className={`${artist.key} ${artist.key === featuredArtistKey ? 'is-scene-match' : ''} ${artist.direction} is-visible`}>
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
              <MediaImage
                base={artist.imageBase}
                alt={artist.alt}
                variant="productSquare"
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
      <MediaImage
        base={slide.imageBase}
        alt={slide.alt}
        variant="socialSquare"
        className="slide_image"
        loading="eager"
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

function SocialSlider({ featuredStoryKey }) {
  const initialIndex = Math.max(0, socialSlides.findIndex((slide) => slide.key === featuredStoryKey));
  const [current, setCurrent] = useState(initialIndex);
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

  useEffect(() => {
    const nextIndex = socialSlides.findIndex((slide) => slide.key === featuredStoryKey);
    if (nextIndex >= 0) {
      setCurrent(nextIndex);
    }
  }, [featuredStoryKey]);

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

function Social({ featuredStoryKey }) {
  const featuredStory = socialSlides.find((slide) => slide.key === featuredStoryKey) || socialSlides[0];

  return (
    <section className="social_section" id="social">
      <div className="social_text scroll-fade-up">
        <h2>Social</h2>
        <p>현재 장면은 {featuredStory.title} 콘텐츠로 이어집니다. 음악 산업의 유산과 공동체, 뮤지션들의 이야기를 한 곳에서 탐색해보세요.</p>
      </div>

      <SocialSlider featuredStoryKey={featuredStoryKey} />

      <div className="social_partnership scroll-fade-up">
        <MediaImage
          base="/img/optimized/social_partnership"
          alt="Marshall 파트너십 캠페인 이미지"
          variant="partnership"
          className="partnership_image"
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
        <MediaImage
          base="/img/optimized/head_img"
          alt="Marshall 헤리티지와 사운드 문화를 보여주는 대표 이미지"
          variant="hero"
          pictureClassName="subpage_hero_picture"
          className="subpage_hero_media"
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
        <MediaImage
          base="/img/optimized/marshall_speaker"
          alt="Marshall 제품 컬렉션을 대표하는 스피커 이미지"
          variant="productSquare"
          pictureClassName="subpage_hero_picture"
          className="subpage_hero_media"
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
              <MediaImage
                base={product.image.base}
                alt={product.image.alt}
                variant="productSquare"
                pictureClassName="subpage_card_picture"
                className="subpage_card_media"
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
        <MediaImage
          base="/img/optimized/artist_banner"
          alt="Marshall 아티스트 콘텐츠를 대표하는 무대 이미지"
          variant="artistBanner"
          pictureClassName="subpage_hero_picture"
          className="subpage_hero_media"
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
              <MediaImage
                base={artist.imageBase}
                alt={artist.alt}
                variant="productSquare"
                pictureClassName="subpage_card_picture"
                className="subpage_card_media"
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
        <MediaImage
          base="/img/optimized/social_community"
          alt="Marshall 커뮤니티 콘텐츠를 대표하는 이미지"
          variant="socialSquare"
          pictureClassName="subpage_hero_picture"
          className="subpage_hero_media"
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
              <MediaImage
                base={slide.imageBase}
                alt={slide.alt}
                variant="socialSquare"
                pictureClassName="subpage_card_picture"
                className="subpage_card_media"
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
  const [sceneIndex, setSceneIndex] = useState(0);
  const currentScene = wallOfSoundScenes[sceneIndex];
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

  const blastScene = (nextIndex) => {
    setSceneIndex((index) => {
      if (typeof nextIndex === 'number') return nextIndex;
      return (index + 1) % wallOfSoundScenes.length;
    });
  };

  const renderRoute = () => {
    if (routePath === '/about') return <AboutPage />;
    if (routePath === '/products') return <ProductsPage />;
    if (routePath === '/artists') return <ArtistsPage />;
    if (routePath === '/social') return <SocialPage />;

    return <HomePage scene={currentScene} sceneIndex={sceneIndex} onSceneChange={blastScene} />;
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
