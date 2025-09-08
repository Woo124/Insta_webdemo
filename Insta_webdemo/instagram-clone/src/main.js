import './style.css'

// 페이지 네비게이션 기능
class InstagramClone {
  constructor() {
    this.currentPage = 'home';
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupInteractions();
    console.log('Instagram Clone 초기화 완료');
  }

  // 네비게이션 설정
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = item.dataset.page;
        if (targetPage) {
          this.switchPage(targetPage);
        }
      });
    });
  }

  // 페이지 전환
  switchPage(pageName) {
    // 현재 활성 페이지 숨기기
    const currentPageElement = document.getElementById(`${this.currentPage}-page`);
    if (currentPageElement) {
      currentPageElement.classList.remove('active');
    }

    // 새 페이지 보이기
    const newPageElement = document.getElementById(`${pageName}-page`);
    if (newPageElement) {
      newPageElement.classList.add('active');
    }

    // 네비게이션 활성 상태 업데이트
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });

    const activeNavItem = document.querySelector(`.nav-item[data-page="${pageName}"]`);
    if (activeNavItem) {
      activeNavItem.classList.add('active');
    }

    this.currentPage = pageName;
  }

  // 인터랙티브 요소들 설정
  setupInteractions() {
    // 팔로우 버튼 클릭
    this.setupFollowButtons();

    // 좋아요 버튼 클릭
    this.setupLikeButtons();

    // 스토리 클릭
    this.setupStoryClicks();

    // 프로필 탭 전환
    this.setupProfileTabs();
  }

  // 팔로우 버튼 기능
  setupFollowButtons() {
    const followButtons = document.querySelectorAll('.follow-btn, .follow-suggestion-btn');

    followButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = button;

        if (btn.textContent?.includes('팔로우')) {
          btn.textContent = '팔로잉';
          btn.style.backgroundColor = '#fafafa';
          btn.style.color = '#262626';
          btn.style.border = '1px solid #dbdbdb';
        } else {
          btn.textContent = '팔로우';
          btn.style.backgroundColor = '#0095f6';
          btn.style.color = 'white';
          btn.style.border = 'none';
        }
      });
    });
  }

  // 좋아요 버튼 기능
  setupLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = button;

        if (btn.classList.contains('liked')) {
          btn.classList.remove('liked');
          // 빈 하트로 변경
          const svg = btn.querySelector('svg');
          svg.innerHTML = '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" fill="none"/>';
        } else {
          btn.classList.add('liked');
          // 채워진 하트로 변경
          const svg = btn.querySelector('svg');
          svg.innerHTML = '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ed4956" stroke="#ed4956" stroke-width="2"/>';
        }
      });
    });
  }

  // 스토리 클릭 기능
  setupStoryClicks() {
    const storyItems = document.querySelectorAll('.story-item');

    storyItems.forEach(story => {
      story.addEventListener('click', () => {
        // 스토리 보기 시뮬레이션
        alert('스토리 보기 기능 (데모)');
      });
    });
  }

  // 프로필 탭 전환
  setupProfileTabs() {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // 모든 탭에서 active 클래스 제거
        tabs.forEach(t => t.classList.remove('active'));

        // 클릭된 탭에 active 클래스 추가
        tab.classList.add('active');
      });
    });
  }
}

// 이미지 로딩 최적화
class ImageOptimizer {
  constructor() {
    this.setupLazyLoading();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// 반응형 기능
class ResponsiveHandler {
  constructor() {
    this.setupResponsive();
  }

  setupResponsive() {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;

      // 모바일에서 사이드바 텍스트 숨기기
      const navTexts = document.querySelectorAll('.nav-text');
      const logo = document.querySelector('.logo h1');

      if (isMobile) {
        navTexts.forEach(text => text.style.display = 'none');
        if (logo) logo.style.display = 'none';
      } else {
        navTexts.forEach(text => text.style.display = 'block');
        if (logo) logo.style.display = 'block';
      }

      // 태블릿에서 우측 사이드바 숨기기
      const rightSidebar = document.querySelector('.right-sidebar');
      if (rightSidebar) {
        rightSidebar.style.display = isTablet ? 'none' : 'block';
      }
    };

    // 초기 실행
    checkScreenSize();

    // 윈도우 리사이즈 시 실행
    window.addEventListener('resize', checkScreenSize);
  }
}

// 애니메이션 효과
class AnimationEffects {
  constructor() {
    this.setupAnimations();
  }

  setupAnimations() {
    // 스크롤 애니메이션
    this.setupScrollAnimations();

    // 호버 효과
    this.setupHoverEffects();
  }

  setupScrollAnimations() {
    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    });

    const elementsToAnimate = document.querySelectorAll('.post, .story-item, .suggestion-item');
    elementsToAnimate.forEach(el => {
      animateOnScroll.observe(el);
    });
  }

  setupHoverEffects() {
    // 포스트 호버 효과
    const posts = document.querySelectorAll('.grid-post');
    posts.forEach(post => {
      post.addEventListener('mouseenter', () => {
        const img = post.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1.05)';
        }
      });

      post.addEventListener('mouseleave', () => {
        const img = post.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1)';
        }
      });
    });
  }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
  new InstagramClone();
  new ImageOptimizer();
  new ResponsiveHandler();
  new AnimationEffects();

  console.log('🚀 Instagram Clone이 성공적으로 로드되었습니다!');
});

// 추가 CSS 애니메이션
const additionalStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: fadeInUp 0.6s ease-out;
  }

  img {
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  img.loaded {
    opacity: 1;
  }

  .post {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .post:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .nav-item {
    position: relative;
    overflow: hidden;
  }

  .nav-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .nav-item:hover::before {
    left: 100%;
  }
`;

// 동적 스타일 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
