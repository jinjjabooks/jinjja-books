/* JJC Web Interaction System */

const booksLabel = document.querySelector('.books-label');
const booksLink = booksLabel.querySelector('a');
const aboutLabel = document.querySelector('.about-label');
const listItems = document.querySelectorAll('.book-list li');
const body = document.body;

listItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();

        const link = item.querySelector('a');
        if (link && e.target !== link && !link.contains(e.target)) {
            window.location.href = link.href;
        }

        const isAlreadySelected = item.classList.contains('is-selected');

        aboutLabel.classList.remove('is-open');
        listItems.forEach(li => li.classList.remove('is-selected'));

        if (isAlreadySelected) {
            body.classList.remove('bg-active');
            if (!body.classList.contains('sub-page') || window.matchMedia("(max-width: 767px)").matches) {
                booksLabel.classList.remove('is-open');
            }
        } else {
            body.classList.add('bg-active');
            item.classList.add('is-selected');
            booksLabel.classList.add('is-open');
        }
    });
});

booksLabel.addEventListener('click', (e) => {
    const isMobileOrTablet = window.matchMedia("(max-width: 1299px)").matches;
    aboutLabel.classList.remove('is-open');

    if (isMobileOrTablet) {
        e.preventDefault();
        e.stopPropagation();
        booksLabel.classList.toggle('is-open');
        return;
    }

    const link = booksLink;
    const href = link.getAttribute('href');

    if (href === 'javascript:void(0)' || href === '#') {
        e.preventDefault();
        e.stopPropagation();

        body.classList.remove('bg-active');
        booksLabel.classList.remove('is-open');
        listItems.forEach(li => li.classList.remove('is-selected'));
    } else {
        e.stopPropagation();
        if (e.target !== link && !link.contains(e.target)) {
            window.location.href = link.href;
        }
    }
});

aboutLabel.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    body.classList.remove('bg-active');
    booksLabel.classList.remove('is-open');

    if (!body.classList.contains('sub-page')) {
        listItems.forEach(li => li.classList.remove('is-selected'));
    }

    aboutLabel.classList.toggle('is-open');
});

document.addEventListener('click', () => {
    body.classList.remove('bg-active');

    if (!body.classList.contains('sub-page')) {
        booksLabel.classList.remove('is-open');
        listItems.forEach(li => li.classList.remove('is-selected'));
    } else {
        if (window.matchMedia("(max-width: 767px)").matches) {
            booksLabel.classList.remove('is-open');
        }
    }
});

/* Main Page Background Colors */
if (!body.classList.contains('sub-page')) {
    const colors = ['#ffffff', '#00FFFF', '#FF00FF', '#FFFF00'];
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % colors.length;
        body.style.backgroundColor = colors[currentIndex];
        body.style.setProperty('--bg-color', colors[currentIndex]);
    }, 5000);
}

/* Sub-page Default View (Desktop/Tablet) */
if (body.classList.contains('sub-page') && !window.matchMedia("(max-width: 767px)").matches) {
    booksLabel.classList.add('is-open');
}