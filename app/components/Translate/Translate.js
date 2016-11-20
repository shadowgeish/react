// Global configuration
var preferredLang = 'en';
var pathPrefix    = 'server/i18n'; // folder of json files
var packName      = 'site';

function initTranslation(lang) {

    if (!$.fn.localize) return;

    // set initial options
    if(lang!=undefined){
        preferredLang = lang;
    }

    // Set initial language
    setLanguage(packName,preferredLang,pathPrefix);

    // Listen for changes
    $(document).on('click', '[data-set-lang]', function() {

        var selectedLang = $(this).data('setLang');
        var packName = sessionStorage.getItem('packName') == undefined ? 'site' : sessionStorage.getItem('packName',packName) ;
        var language = sessionStorage.getItem('language')  == undefined ? 'en' : sessionStorage.getItem('language',packName) ;
        var pathPrefix = sessionStorage.getItem('pathPrefix')  == undefined ? 'server/i18n' : sessionStorage.getItem('pathPrefix',packName) ;

        if (selectedLang && language !== selectedLang) {
            setLanguage(packName,selectedLang,pathPrefix);
            activateDropdown($(this));
        }

    });

    // Update translated text
    function setLanguage(packName,language,pathPrefix) {
        sessionStorage.setItem('packName',packName);
        sessionStorage.setItem('language',language);
        sessionStorage.setItem('pathPrefix',pathPrefix);
        var options = {
            language: language,
            pathPrefix: pathPrefix,
            callback: function(data, defaultCallback) {
                defaultCallback(data);
            }
        };
        $('[data-localize]').localize(packName, options);
    }

    // Set the current clicked text as the active dropdown text
    function activateDropdown(elem) {
        var menu = elem.parents('.dropdown-menu');
        if (menu.length) {
            var toggle = menu.prev('button, a');
            toggle.text(elem.text());
        }
    }

}

export default initTranslation;
