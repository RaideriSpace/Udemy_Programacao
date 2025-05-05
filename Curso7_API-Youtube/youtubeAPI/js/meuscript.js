let nomeCanal = 'PatoPapao';
let upload_id;

$(document).ready(function() {
    $.get(" https://www.googleapis.com/youtube/v3/channels", {
        part:'contentDetails',
        forUsername: nomeCanal,
        key: 'AIzaSyBNvkKk0PELWwj-EZe0SWOzvy1EpkD0_zs',
    },
    
    //Puxar a informação do código de Upload
    function(data){
        //console.log(data.items[0].contentDetails.relatedPlaylists.uploads);
            upload_id = data.items[0].contentDetails.relatedPlaylists.uploads;

            pegarVideos(upload_id);
    })

    //Código de playlist no site do youtube API: 
    //  maxResults mostra os 10 últimos vídeos do canal e todas as informações

    function pegarVideos(id){
        $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            part: 'snippet',
            maxResults: 12,
            playlistId: id,
            key: 'AIzaSyBNvkKk0PELWwj-EZe0SWOzvy1EpkD0_zs',
        },

        function(data) {
            // mostrar todas as informaçõs: console.log(data);
            let imagem;
            let titulo;
            let dataDoVideo;
            let videoId;
            let arquivo;
            $.each(data.items, function(i, item){

                //Busca a imagem da thumbnail
                imagem = item.snippet.thumbnails.medium.url;

                //Busca o título do vídeo
                titulo = item.snippet.title;

                //Busca a data de publicação do vídeo
                dataDoVideo = formatarData(item.snippet.publishedAt);

                //Busca o ID do vídeo para por no link
                videoId = item.snippet.resourceId.videoId;

                arquivo = '<li class="principal"> <a class="fancybox-media" href="https://www.youtube.com/watch?v='+ videoId +'"> <div class="foto"> <img src="'+ imagem + '"/> <div class="legenda"> <h5> '+ titulo +'  </h5> <p> Publicado em ' + dataDoVideo + ' </p>  </div> </div> </a> </li>';
                
                $('div#janela ul').append(arquivo);
            })
        })
    }

    //Formata a data de publicação do vídeo:
    function formatarData(dataDoVideo){
        return dataDoVideo.substr(8,2) + '/' + dataDoVideo.substr(5,2) + "/" + dataDoVideo.substr(0,4);
    }

});