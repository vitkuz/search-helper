function generateData() {
   return [
        { text: Math.floor(Math.random()*1234567890), id: Math.floor(Math.random()*1234567890) },
        { text: Math.floor(Math.random()*1234567890), id: Math.floor(Math.random()*1234567890) },
        { text: Math.floor(Math.random()*1234567890), id: Math.floor(Math.random()*1234567890) },
        { text: Math.floor(Math.random()*1234567890), id: Math.floor(Math.random()*1234567890) },
        { text: Math.floor(Math.random()*1234567890), id: Math.floor(Math.random()*1234567890) },
    ];
}

const fetchContent = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(generateData());
        },200)
    })
};

const $input = $('#inputSearch');
const $result = $('.lookup__result');

$input.focus(function () {
    console.log('onFocus');
    index = -1;
});

$input.blur(function () {
    console.log('onBlur');
});

$input.keyup(function () {
    console.log('onKeyUp');
    switch(e.which) {
        case 27: // enter
            clearTimeout(typingTimer);
            doneTyping();
            break;

        case 37: // left
            break;

        case 38: // up

            break;

        case 39: // right
            break;

        case 40: // down

            break;

        default: return; // exit this handler for other keys
    }
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);

    e.preventDefault();
});



function controlIndex() {
    if (index < startIndex) {
        index = len - 1;
    } else if (index > len - 1) {
        index = startIndex + 1;
    }
}

function selectItem($element) {
    const { id } = $element.data();
    const text = $element.text();

    $result.append(`<div data-id='${id}' class="lookup__result-item">${text}</div>`);
}

let $resultLinks = $('.lookup__search-results').find('a');
let startIndex = -1;
let index = startIndex;
let len = $resultLinks.length;

function initResultLinks() {
    $resultLinks = $('.lookup__search-results').find('a');
    startIndex = -1;
    index = startIndex;
    len = $resultLinks.length;

    $resultLinks.keydown(function (e) {
        switch(e.which) {
            case 37: // left
                break;

            case 38: // up
                $(this).toggleClass('lookup__result-item--active');
                index--;
                controlIndex();
                $($resultLinks[index]).toggleClass('lookup__result-item--active').focus();
                break;

            case 39: // right
                break;

            case 40: // down
                $(this).toggleClass('lookup__result-item--active');
                index++;
                controlIndex();
                $($resultLinks[index]).toggleClass('lookup__result-item--active').focus();
                break;

            default: return; // exit this handler for other keys
        }
    });

    $resultLinks.click(function (e) {
        console.log('Click!');

        index = -1;
        selectItem($(this));
        $input.focus();
    });

    $resultLinks.focus(() => {
        console.log('Result link on focus handler');
    });

    $resultLinks.keydown(function(e) {
        switch(e.which) {
            case 27: // enter
                index = -1;
                $input.focus();
                break;

            case 13: // enter
                index = -1;
                selectItem($(this));
                $input.focus();
                break;
            default: return; // exit this handler for other keys
        }

        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
}

initResultLinks();

$input.keydown(function (e) {
    console.log('onKeyDown');

    switch(e.which) {
        case 37: // left
            break;

        case 38: // up
            break;

        case 39: // right
            break;

        case 40: // down
            $(this).toggleClass('lookup__result-item--active');
            index++;
            controlIndex();
            $($resultLinks[index]).toggleClass('lookup__result-item--active').focus();

            break;

        default: return; // exit this handler for other keys
    }

    clearTimeout(typingTimer);

    e.preventDefault(); // prevent the default action (scroll / move caret)
});

const $lookupSearchResultContainer = $('.lookup__search-results');
let typingTimer;
const doneTypingInterval = 1000;

function renderResults(results) {
    $lookupSearchResultContainer.html('');
    results.forEach((result, index) => {
        $lookupSearchResultContainer.append(`<a href="#" tabindex="${index}" class="lookup__search-results-link" data-id=${result.id}><span class="lookup__search-results-link-text">${result.text}</span></a>`)
    });
}

function doneTyping() {
    fetchContent().then(results => {
        console.log(results);
        renderResults(results);
        initResultLinks();
    }).catch((e) => {
        console.log(e);
    })
}

$input.keypress(function () {
    console.log('onkeypress');
});
