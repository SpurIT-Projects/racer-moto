// Глобальные JavaScript функции

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация компонентов
    initScrollToTop();
    initMobileMenu();
    initAnimations();
});

// Компонент автоматического скролла вверх
function initScrollToTop() {
    // Создаем кнопку скролла вверх
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scrollToTop';
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Прокрутить вверх');
    document.body.appendChild(scrollButton);

    // Показ/скрытие кнопки при скролле
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });

    // Обработчик клика по кнопке
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Инициализация мобильного меню
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Инициализация анимаций при скролле
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Автоматический скролл вверх при смене страницы
function scrollToTopOnPageChange() {
    window.scrollTo(0, 0);
}

// Функция для форматирования телефонного номера
function formatPhoneNumber(phone) {
    return phone.replace(/(\+375)\s*\((\d{2})\)\s*(\d{3})-(\d{2})-(\d{2})/, '$1 ($2) $3-$4-$5');
}

// Функция для валидации email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Универсальная функция для отправки форм
function submitForm(formData, endpoint) {
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Ошибка отправки формы:', error);
        throw error;
    });
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Экспорт функций для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToTopOnPageChange,
        formatPhoneNumber,
        isValidEmail,
        submitForm,
        showNotification
    };
}