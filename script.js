/**
 * JJC Web Interaction System
 * - Hover: 리스트 탐색 (CSS 처리) -> About은 이제 Click!
 * - Click (li): 배경 활성화 + 리스트 고정 (Lock)
 * - Click (Books): 전체 초기화 (Reset)
 * - Click (About): 설명 토글
 */

const booksLabel = document.querySelector('.books-label');
const booksLink = booksLabel.querySelector('a'); // "Books" 텍스트 링크
const aboutLabel = document.querySelector('.about-label'); // "About" 텍스트 링크
const listItems = document.querySelectorAll('.book-list li');
const body = document.body;

// 1. 리스트 항목(li) 클릭 시 로직
listItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // 부모(nav, body)로 이벤트가 퍼져서 리스트가 닫히는 것을 방지
        e.stopPropagation();

        // Force navigation if click was on li but not on the link itself
        const link = item.querySelector('a');
        if (link && e.target !== link && !link.contains(e.target)) {
            window.location.href = link.href;
        }

        const isAlreadySelected = item.classList.contains('is-selected');

        // About이 열려있다면 닫기
        aboutLabel.classList.remove('is-open');

        // 우선 모든 항목의 선택 표시(실선)를 초기화
        listItems.forEach(li => li.classList.remove('is-selected'));

        if (isAlreadySelected) {
            // 이미 선택된 항목을 다시 클릭했다면: 배경을 끄고 리스트 고정 해제
            body.classList.remove('bg-active');
            booksLabel.classList.remove('is-open');
        } else {
            // 새로운 항목을 클릭했다면: 배경 켜기 + 항목 실선 + 리스트 고정(Lock)
            body.classList.add('bg-active');
            item.classList.add('is-selected');
            // 마우스가 떠나도 리스트가 닫히지 않도록 클래스 부여
            booksLabel.classList.add('is-open');
        }
    });
});

// 2. 메뉴명 "Books" 클릭 시 로직
// Desktop(>=1300px): 강제 전체 초기화 (Reset)
// Mobile/Tablet(<1300px): 메뉴 토글 (Toggle)
booksLabel.addEventListener('click', (e) => {
    const isMobileOrTablet = window.matchMedia("(max-width: 1299px)").matches;

    // 공통: About 닫기
    aboutLabel.classList.remove('is-open');

    // MOBILE / TABLET Logic (< 1300px)
    if (isMobileOrTablet) {
        e.preventDefault();
        e.stopPropagation(); // 드롭다운 토글 시 페이지 이동 방지

        // Books 메뉴 토글
        booksLabel.classList.toggle('is-open');

        // 만약 열리는 거라면 Body 배경 등 처리 (필요시)
        // 여기서는 is-open 클래스만으로 CSS display 조정됨
        return;
    }

    // DESKTOP Logic (>= 1300px)
    // 실제 이동할 링크 href 확인
    const link = booksLink; // 상단에서 정의된 booksLink (a 태그) 사용
    const href = link.getAttribute('href');

    // href가 javascript:void(0) 이거나 # 일 때만 JS 로직 실행 (메인 페이지 동작)
    if (href === 'javascript:void(0)' || href === '#') {
        e.preventDefault();
        e.stopPropagation();

        // 모든 활성 상태 제거
        body.classList.remove('bg-active');
        booksLabel.classList.remove('is-open');
        listItems.forEach(li => li.classList.remove('is-selected'));
    }
    // 그 외(예: ../index.html)는 페이지 이동 허용
    else {
        e.stopPropagation(); // 문서 클릭(UI 리셋) 방지

        // 만약 클릭된 요소가 a태그가 아니라면(예: div의 밑줄 영역 등), 강제 이동
        if (e.target !== link && !link.contains(e.target)) {
            window.location.href = link.href;
        }
    }
});

// 3. 메뉴명 "About" 클릭 시 로직: 토글
aboutLabel.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Books 열려있다면 닫기 (배경 포함)
    body.classList.remove('bg-active');
    booksLabel.classList.remove('is-open');

    // 서브 페이지가 아닐 때만 리스트 선택 해제 (메인에서는 초기화 개념)
    // 서브 페이지에서는 현재 페이지 표시(밑줄)를 유지해야 함
    if (!body.classList.contains('sub-page')) {
        listItems.forEach(li => li.classList.remove('is-selected'));
    }

    // About 토글
    aboutLabel.classList.toggle('is-open');
});

// 4. 바탕(Document) 클릭 시: 전체 초기화 (닫기)
document.addEventListener('click', () => {
    body.classList.remove('bg-active');
    booksLabel.classList.remove('is-open');

    // 서브 페이지가 아닐 때만 리스트 선택 해제 (메인에서는 초기화 개념)
    if (!body.classList.contains('sub-page')) {
        listItems.forEach(li => li.classList.remove('is-selected'));
    }
});

// 5. 배경색 순환 (메인 페이지만)
// Colors: #ffffff (White), #00FFFF (Cyan), #FF00FF (Magenta), #FFFF00 (Yellow)
// Interval: 5s
if (!body.classList.contains('sub-page')) {
    const colors = ['#ffffff', '#00FFFF', '#FF00FF', '#FFFF00'];
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % colors.length;
        body.style.backgroundColor = colors[currentIndex];
    }, 5000);
}