// Переключение вкладок
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Функция переключения вкладок
    function switchTab(targetTab) {
        // Скрыть все вкладки
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Убрать активный класс со всех ссылок
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Показать целевую вкладку
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Добавить активный класс к текущей ссылке
        const activeLink = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Закрыть мобильное меню
        navMenu.classList.remove('active');
    }

    // Обработчики кликов по навигации
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Мобильное меню
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Закрытие мобильного меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Плавная прокрутка для внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдение за элементами временной шкалы
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Наблюдение за элементами галереи
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Эффект печатной машинки для эпиграфа
    const epigraph = document.querySelector('.epigraph p');
    if (epigraph) {
        const text = epigraph.textContent;
        epigraph.textContent = '';
        epigraph.style.borderRight = '2px solid #b8c5d1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                epigraph.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            } else {
                setTimeout(() => {
                    epigraph.style.borderRight = 'none';
                }, 1500);
            }
        };
        
        // Запуск анимации через 1 секунду после загрузки
        setTimeout(typeWriter, 1200);
    }

    // Добавление эффекта параллакса для портрета
    const portrait = document.querySelector('.portrait');
    if (portrait) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            portrait.style.transform = `translateY(${rate}px)`;
        });
    }

    // Счетчик посещений (имитация)
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    // Можно добавить отображение счетчика в футер
    const footer = document.querySelector('.footer');
    if (footer && visitCount > 1) {
        const visitInfo = document.createElement('p');
        visitInfo.textContent = `Вы наведалі гэты сайт ${visitCount} разоў`;
        visitInfo.style.fontSize = '0.8rem';
        visitInfo.style.opacity = '0.7';
        footer.appendChild(visitInfo);
    }
});

// Функция для создания снежинок (декоративный эффект)
function createSnowflakes() {
    const snowflakeChars = ['❄', '❅', '❆'];
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        snowflake.style.position = 'fixed';
        snowflake.style.top = '-10px';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflake.style.color = 'rgba(255, 255, 255, 0.8)';
        snowflake.style.pointerEvents = 'none';
        snowflake.style.zIndex = '1000';
        snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        
        document.body.appendChild(snowflake);
        
        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }
}

// CSS для анимации снежинок
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(style);

// Активация снежинок в зимние месяцы (декоративно)
const currentMonth = new Date().getMonth();
if (currentMonth === 11 || currentMonth === 0 || currentMonth === 1) {
    setInterval(createSnowflakes, 10000);
}