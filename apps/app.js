$(function(){
  $('#search').click(function(event){
    event.preventDefault();
    $('.filler').remove();
    $('#search-results').empty();
    $('#search-results').hide();
    $('#next').remove();
    var searchTerm = $('#query').val();
    getResults(searchTerm);
  });

  $('#nextbox').on('click', '#next', function(event){
    $('#next').remove();
    var searchTerm = $('#query').val();
    getResults(searchTerm, nextPage)
  });
});

var nextPage = '';

function storeToken(token){
  nextPage = token;
}

function getResults(searchTerm, token){
  var params = {
    part:'snippet',
    key:'AIzaSyAzrW8qlKjU1kXdfy6PHI23-3jfdpfKBdU',
    q: searchTerm,
    maxResults: 7,
    type: 'video',
    order: 'viewCount',
    /*videoDuration: 'any',
    videoDefinition: 'high',
    videoSyndicated: 'true',
    videoEmeddable: 'true',
    eventTyp: 'completed',
    safeSearch: 'strict',*/
    pageToken: token
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    showResults(data.items);
    storeToken(data.nextPageToken);
  });
}

function showResults(results){
  var html = "";
  $.each(results, function(index,value){
    html += '<table><tr><td><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '?vq=hd1080" data-lity>' +
    '<img class="thumbnail" src="' + value.snippet.thumbnails.medium.url + '"></a></td>' +
    '<td class="tdtext"><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" data-lity><p class="videotitle">' + 
    value.snippet.title + '</p></a><p class="videochannel">' + 
    'From <a href="https://www.youtube.com/channel/' + value.snippet.channelId + '" target="_blank">' +
    value.snippet.channelTitle + '</a></p></td></tr></table>';
  });
  $('#search-results').append(html);
  $('#search-results').fadeIn(500)
  $('#nextbox').append('<button id="next">Show more results</button>');
}