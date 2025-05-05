$(document).ready(function() {
    $.get("https://www.googleapis.com/youtube/v3/videos", {
            //O que será resgatado
            part: 'statistics',
            //Código do vídeo
            id: 'C9nSNkqv_x8',
            //Key do Youtube API
            key: 'AIzaSyBNvkKk0PELWwj-EZe0SWOzvy1EpkD0_zs'},
            function(data) {
                console.log(data);
            }
    )
});