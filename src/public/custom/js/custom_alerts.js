$(document).ready(function() {
    setTimeout(function(){
        $('.alert').fadeOut('slow');
    }, 2500);

    //Aplica lib tinymce ao textarea de artigos
    tinymce.init({
        selector: "#body_article",
        language: 'pt_BR',
        plugins: [
            'advlist autolink link image lists print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons'
        ]
    });
});