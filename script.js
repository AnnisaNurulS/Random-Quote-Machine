let random;
let randomQuote;
let authorQuote;
let colors = [
    '#0000ff',
    '#a52a2a',
    '#dc143c',
    '#00008b',
    '#008b8b',
    '#b8860b',
    '#006400',
    '#8b0000',
    '#483d8b'
];

$('#text').html("We cannot solve our problems with the same thinking we used when we created them.");
$('#author').html("Albert Einstein");

function getQuotes(){
    return $.ajax({
        url: 'https://gist.githubusercontent.com/annisanuruls/4f05c6a994f53b16b62355aac1f4accc/raw/f6efb23a4125f24f3ce6fa1437120710f59fac1e/quotes_and_img.json',
        type: 'get',
        dataType: 'json',
        success: function(result){
            random = Math.floor(Math.random() * result.quotes.length);
            randomQuote = result.quotes[random].quote;
            authorQuote = result.quotes[random].author;
            imageQuote = result.quotes[random].image;
            animated();
        }
    });
};

function animated(){
    $('#text-box').animate({opacity: 0}, 500, function(){
        $(this).animate({opacity: 1}, 500);
        $('#text').html(randomQuote);
    });
    $('#author-box').animate({opacity: 0}, 500, function(){
        $(this).animate({opacity: 1}, 500);
        $('#author').html(authorQuote);
    })

    let color = Math.floor(Math.random() * colors.length);
    $('.container').animate({
        color: colors[color]
    },
    1000
    );

    $('#img-container').stop().animate({opacity: 0}, 500, function(){
        $(this).css({'background-image': 'url("' + imageQuote + '")'});
        $(this).animate({opacity: 1}, 500);
    });

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + randomQuote + '" ' + authorQuote)
    );
}

$('#new-quote').on('click', function(){
    getQuotes();
});

$(".container").draggable();
