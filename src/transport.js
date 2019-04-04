const API_BASE = 'https://xkcd.com';
const API_SUFFIX = 'info.0.json';
// https://xkcd.com/info.0.json OR 
// https://xkcd.com/<id>/info.0.json
const fetchComic = (id) => 
  fetch(`https://cors-anywhere.herokuapp.com/${API_BASE}/${id}/${API_SUFFIX}`)
  .then(response => response.json())
  .then(data => JSON.stringify(data));

/*
{
  "category": ["music"],
  "icon_url": "https:\/\/assets.chucknorris.host\/img\/avatar\/chuck-norris.png",
  "id": "qxsbf-jeq_act5a4bbwavq",
  "url": "https:\/\/api.chucknorris.io\/jokes\/qxsbf-jeq_act5a4bbwavq",
  "value": "The Drummer for Def Leppard\u0027s only got one arm. Chuck Norris needed a back scratcher."
}
*/
/*
{
"month":"9",
"num":2050,
"link":"https://xkcd.com/1061/",
"year":"2018",
"news":"",
"safe_title":"6/6 Time",
"transcript":"",
"alt":"You know how Einstein figured out that the speed of light was constant, and everything else had to change for consistency? My theory is like his, except not smart or good.",
"img":"https://imgs.xkcd.com/comics/6_6_time.png",
"title":"6/6 Time",
"day":"24"
}*/

export default fetchComic;