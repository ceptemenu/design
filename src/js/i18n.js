var I18N = (function() {
    var currentLang = localStorage.getItem('ceptemenu-lang') || 'en';
    var translations = {};

    function loadTranslations(lang, data) {
        translations[lang] = data;
    }

    function applyTranslations() {
        var lang = currentLang;
        var t = translations[lang];
        if (!t) return;

        document.documentElement.setAttribute('lang', lang);

        $('[data-i18n]').each(function() {
            var key = $(this).attr('data-i18n');
            if (t[key] !== undefined) {
                // Preserve child elements, only replace text nodes
                var children = $(this).children();
                if (children.length > 0) {
                    // Find and replace only the first text node
                    var node = this.firstChild;
                    while (node) {
                        if (node.nodeType === 3 && node.textContent.trim() !== '') {
                            node.textContent = t[key];
                            break;
                        }
                        node = node.nextSibling;
                    }
                } else {
                    $(this).text(t[key]);
                }
            }
        });

        $('[data-i18n-placeholder]').each(function() {
            var key = $(this).attr('data-i18n-placeholder');
            if (t[key] !== undefined) {
                $(this).attr('placeholder', t[key]);
            }
        });

        // Update active state on language buttons
        $('.lang-switcher-btn').removeClass('active');
        $('.lang-switcher-btn[data-lang="' + lang + '"]').addClass('active');
    }

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('ceptemenu-lang', lang);
        applyTranslations();
    }

    function init() {
        if (window.__i18n_en) loadTranslations('en', window.__i18n_en);
        if (window.__i18n_tr) loadTranslations('tr', window.__i18n_tr);
        applyTranslations();
    }

    $(document).ready(function() {
        init();

        $(document).on('click', '.lang-switcher-btn', function() {
            var lang = $(this).attr('data-lang');
            switchLanguage(lang);
        });
    });

    return {
        switchLanguage: switchLanguage,
        getCurrentLang: function() { return currentLang; }
    };
})();
