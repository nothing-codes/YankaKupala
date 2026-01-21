// Современные анимации и интерактивность
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Функция переключения вкладок с анимацией
    function switchTab(targetTab) {
        // Скрыть все вкладки с анимацией
        tabContents.forEach(content => {
            if (content.classList.contains('active')) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    content.classList.remove('active');
                }, 200);
            }
        });

        // Убрать активный класс со всех ссылок
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Показать целевую вкладку с анимацией
        setTimeout(() => {
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.opacity = '0';
                targetContent.style.transform = 'translateY(20px)';
                
                // Анимация появления
                requestAnimationFrame(() => {
                    targetContent.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                });

                // Анимация элементов внутри вкладки
                animateTabContent(targetContent);
            }
        }, 200);

        // Добавить активный класс к текущей ссылке
        const activeLink = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Закрыть мобильное меню
        navMenu.classList.remove('active');
    }

    // Анимация элементов внутри вкладки
    function animateTabContent(content) {
        const animatableElements = content.querySelectorAll('.timeline-item, .gallery-item, .work-category, .museum-info, .song');
        
        animatableElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100 + 300);
        });
    }

    // Обработчики кликов по навигации
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Мобильное меню с анимацией
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Анимация гамбургера
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Закрытие мобильного меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
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

    // Продвинутый Intersection Observer для анимаций
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Различные анимации для разных элементов
                if (element.classList.contains('timeline-item')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                } else if (element.classList.contains('gallery-item')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                } else if (element.classList.contains('work-category')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) rotateX(0)';
                } else {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
                
                // Добавляем класс для дополнительных CSS анимаций
                element.classList.add('animated');
            }
        });
    }, observerOptions);

    // Наблюдение за элементами с начальной настройкой
    function setupAnimations() {
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            observer.observe(item);
        });

        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.9)';
            item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            observer.observe(item);
        });

        document.querySelectorAll('.work-category').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) rotateX(10deg)';
            item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
            observer.observe(item);
        });

        document.querySelectorAll('.museum-info').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
            observer.observe(item);
        });

        document.querySelectorAll('.song').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px)';
            item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
            observer.observe(item);
        });
    }

    // Эффект печатной машинки для эпиграфа
    const epigraph = document.querySelector('.epigraph p');
    if (epigraph) {
        const text = epigraph.textContent;
        epigraph.textContent = '';
        epigraph.style.borderRight = '2px solid rgba(240, 147, 251, 0.8)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                epigraph.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    epigraph.style.borderRight = 'none';
                }, 2000);
            }
        };
        
        // Запуск анимации через 1.5 секунды после загрузки
        setTimeout(typeWriter, 1500);
    }

    // Продвинутый параллакс для портрета
    const portrait = document.querySelector('.portrait');
    if (portrait) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            const rotate = scrolled * 0.02;
            
            portrait.style.transform = `translateY(${rate}px) rotate(${rotate}deg)`;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }

    // Интерактивные частицы на фоне
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '-1';
        particleContainer.className = 'particle-container';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 6 + 3 + 'px';
            particle.style.height = particle.style.width;
            
            // Разные типы частиц
            const particleType = Math.random();
            if (particleType < 0.3) {
                // Круглые частицы
                particle.style.background = `rgba(${102 + Math.random() * 50}, ${126 + Math.random() * 50}, 234, ${Math.random() * 0.6 + 0.2})`;
                particle.style.borderRadius = '50%';
            } else if (particleType < 0.6) {
                // Квадратные частицы
                particle.style.background = `rgba(${240 + Math.random() * 15}, ${147 + Math.random() * 50}, 251, ${Math.random() * 0.5 + 0.2})`;
                particle.style.borderRadius = '2px';
                particle.style.transform = 'rotate(45deg)';
            } else {
                // Треугольные частицы (используем CSS)
                particle.style.width = '0';
                particle.style.height = '0';
                particle.style.borderLeft = '3px solid transparent';
                particle.style.borderRight = '3px solid transparent';
                particle.style.borderBottom = `6px solid rgba(${120 + Math.random() * 50}, ${219 + Math.random() * 36}, 255, ${Math.random() * 0.4 + 0.2})`;
            }
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            const duration = Math.random() * 25 + 15;
            const delay = Math.random() * 8;
            
            particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
            
            particleContainer.appendChild(particle);
        }
    }

    // Создание светящихся орбов
    function createGlowingOrbs() {
        const orbContainer = document.createElement('div');
        orbContainer.style.position = 'fixed';
        orbContainer.style.top = '0';
        orbContainer.style.left = '0';
        orbContainer.style.width = '100%';
        orbContainer.style.height = '100%';
        orbContainer.style.pointerEvents = 'none';
        orbContainer.style.zIndex = '-2';
        orbContainer.className = 'orb-container';
        document.body.appendChild(orbContainer);

        for (let i = 0; i < 5; i++) {
            const orb = document.createElement('div');
            orb.style.position = 'absolute';
            orb.style.width = Math.random() * 200 + 100 + 'px';
            orb.style.height = orb.style.width;
            orb.style.borderRadius = '50%';
            orb.style.background = `radial-gradient(circle, rgba(${102 + Math.random() * 50}, ${126 + Math.random() * 50}, 234, 0.1) 0%, transparent 70%)`;
            orb.style.left = Math.random() * 100 + '%';
            orb.style.top = Math.random() * 100 + '%';
            orb.style.filter = 'blur(2px)';
            
            const duration = Math.random() * 30 + 20;
            orb.style.animation = `floatOrb ${duration}s ease-in-out infinite`;
            
            orbContainer.appendChild(orb);
        }
    }

    // CSS для анимации частиц
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0.3;
            }
            25% { 
                transform: translateY(-30px) translateX(20px) rotate(90deg);
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-15px) translateX(-25px) rotate(180deg);
                opacity: 0.5;
            }
            75% { 
                transform: translateY(-40px) translateX(15px) rotate(270deg);
                opacity: 0.7;
            }
        }

        @keyframes floatOrb {
            0%, 100% { 
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            33% { 
                transform: translate(-50px, -30px) scale(1.2);
                opacity: 0.5;
            }
            66% { 
                transform: translate(30px, -50px) scale(0.8);
                opacity: 0.4;
            }
        }

        .particle-container,
        .orb-container {
            overflow: hidden;
        }

        @media (max-width: 768px) {
            .particle-container,
            .orb-container {
                display: none;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Счетчик посещений с анимацией
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    // Добавление счетчика в футер с анимацией
    const footer = document.querySelector('.footer');
    if (footer && visitCount > 1) {
        const visitInfo = document.createElement('p');
        visitInfo.textContent = `Вы наведалі гэты сайт ${visitCount} разоў`;
        visitInfo.style.fontSize = '0.9rem';
        visitInfo.style.opacity = '0';
        visitInfo.style.transform = 'translateY(20px)';
        visitInfo.style.transition = 'all 0.6s ease';
        visitInfo.style.background = 'rgba(255, 255, 255, 0.1)';
        visitInfo.style.padding = '0.5rem 1rem';
        visitInfo.style.borderRadius = '20px';
        visitInfo.style.display = 'inline-block';
        visitInfo.style.marginTop = '1rem';
        
        footer.appendChild(visitInfo);
        
        setTimeout(() => {
            visitInfo.style.opacity = '0.8';
            visitInfo.style.transform = 'translateY(0)';
        }, 2000);
    }

    // Инициализация всех анимаций
    setTimeout(() => {
        setupAnimations();
        createParticles();
        createGlowingOrbs();
        
        // Анимация начальной вкладки
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            animateTabContent(activeTab);
        }
    }, 500);

    // Интерактивность при движении мыши
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Легкое движение фона
        const bgElement = document.body;
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        bgElement.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });

    // Добавление эффекта свечения к интерактивным элементам
    const interactiveElements = document.querySelectorAll('.nav-link, .gallery-item, .work-category, .museum-info');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });

    // Модальное окно для галереи
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.modal-close');
    const galleryImages = document.querySelectorAll('.gallery-image');

    // Открытие модального окна при клике на изображение
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            modal.classList.add('show');
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            modalCaption.textContent = this.alt;
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
        });
    });

    // Закрытие модального окна
    function closeImageModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
    }

    // Закрытие по клику на крестик
    closeModal.addEventListener('click', closeImageModal);

    // Закрытие по клику вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });

    // Закрытие по нажатию Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeImageModal();
        }
    });

    // Предотвращение закрытия при клике на само изображение
    modalImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    modalCaption.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});