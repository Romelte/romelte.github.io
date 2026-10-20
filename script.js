/**
 * Romel Arango - CV & Portfolio Script
 * Features: Dark/Light Mode with localStorage persistence, Copy-to-clipboard, Print handler
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const toggleButton = document.getElementById('toggle-mode');
    const printButton = document.getElementById('print-btn');
    const copyButton = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast');

    // Theme Management
    const THEME_STORAGE_KEY = 'romel_portfolio_theme';
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    // Apply saved or system theme preference (defaults to dark-mode)
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }

    // Toggle button listener
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
            toggleButton.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        });
    }

    // Print / Export to PDF handler
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }

    // Copy Email to Clipboard
    let toastTimeout;
    if (copyButton && toast) {
        copyButton.addEventListener('click', async () => {
            const email = copyButton.getAttribute('data-email') || 'romelyalexa@gmail.com';
            
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    // Fallback for non-https or older browser environments
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                }

                // Show toast notification
                toast.classList.add('show');
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            } catch (err) {
                console.error('Error al copiar correo: ', err);
            }
        });
    }
});
