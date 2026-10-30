/**
 * Cine 24/7 - canal de peliculas continuo (prueba)
 * Se activa al abrir el canal "Cine 24/7" (id "kitsu:c24-cine"). Calcula con el reloj cual pelicula "toca" ahora
 * y en que minuto va, como un canal real: todos ven lo mismo a la misma hora.
 * Para cambiar peliculas, duraciones u hora de inicio solo se edita este archivo (MOVIES / START).
 */
if (typeof globalThis.setTimeout !== "function") {
  globalThis.setTimeout = function () { return 1; };
  globalThis.clearTimeout = function () {};
}
var VERSION = "1.0.0";
var LABEL = "Cine 24/7";
var PREFIX = "c24-";
// Hora en que "empezo" el ciclo (Ciudad de Mexico, UTC-6). Al terminar la ultima pelicula vuelve a empezar la primera.
var START = Date.UTC(2026, 9, 30, 6, 0, 0); // 2026-10-30 00:00 hora de Mexico
// min = duracion en minutos (aqui van 100 de prueba; poner la real de cada pelicula)
var MOVIES = [
  {n:"Misión: Imposible - La sentencia final", tmdb:"575265", min:165, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Misi%C3%B3n-%20Imposible%20-%20La%20sentencia%20final%20(2025)%20IMAX%20REMUX%204K%20Dolby%20Visi%C3%B3n%20HDR%20Latino%20Castellano.mkv"},
  {n:"Evil Dead: En llamas", tmdb:"1212763", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/E.D.E.LL%20(2026)%20Web-Dl%204K%20DV%20HDR%20Lat%20(RES).mkv"},
  {n:"Supergirl", tmdb:"1081003", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/5U93RG1R1%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20Lat%20Cast.mkv"},
  {n:"Hot Spot", tmdb:"813418", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Hot%20Spot%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20Lat.mkv"},
  {n:"Jackass: La última y nos vamos", tmdb:"1612018", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Jackass-%20La%20%C3%BAltima%20y%20nos%20vamos%20(2026)%20Web-Dl%204K%20HDR%2B%20Latino.mkv"},
  {n:"The Furious", tmdb:"1280738", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/The%20Furious%20(2026)%20BDRip%204K%20DV%20HDR%20Lat.mkv"},
  {n:"Toy Story 5", tmdb:"1084244", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Toy.Story.5.2026.2160p.MA.WEB-DL.DDP5.1.Atmos.DV.HDR.H.265-Ochaco.mkv"},
  {n:"El final de la Calle Oak", tmdb:"1101383", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/El%20final%20de%20la%20calle%20Oak%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20Lat%20Cast.mkv"},
  {n:"Barreda", tmdb:"1471168", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Barreda%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20Lat.mkv"},
  {n:"El Joven Washington", tmdb:"1308767", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Young%20Washington%20(2026)%20Web-Dl%204K%20UHD%20HDR%2B%20Lat.mkv"},
  {n:"Carrera contra el tiempo", tmdb:"1386315", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Carrera%20contra%20el%20tiempo%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20LC.mkv"},
  {n:"La última bala", tmdb:"1607127", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/La%20%C3%BAltima%20bala%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20LC.mkv"},
  {n:"La hipótesis del amor", tmdb:"1032863", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/La%20hip%C3%B3tesis%20del%20amor%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20Lat%20Cast%20P.mkv"},
  {n:"Sunrise: El último amanecer", tmdb:"1516698", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Sunrise%20El%20%C3%BAltimo%20amanecer%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20LC.mkv"},
  {n:"Paw Patrol: La dino película", tmdb:"1185806", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Paw%20Patrol_%20La%20dino%20pel%C3%ADcula%20(2026)%20Web-Dl%204K%20UHD%20HDR%2B%20LC.mkv"},
  {n:"La captura", tmdb:"1621552", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/La%20Captura%20(2026)%20Web-Dl%204K%20DV%20HDR%20Lat.mkv"},
  {n:"La última casa", tmdb:"1284041", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/La%20%C3%BAltima%20casa%20(2026)%20Web-Dl%204K%20DV%20HDR%20Lat%20Cast.mkv"},
  {n:"Soulm8te", tmdb:"1307118", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Soulm8te%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20Lat.mkv"},
  {n:"UNABOMBER", tmdb:"1492640", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Unabomber%20(2026)%20Web-Dl%204K%20DV%20HDR%20LC.mkv"},
  {n:"Minions & Monstruos", tmdb:"1315772", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Minions.and.Monsters.2026.2160p.iT.WEB-DL.DDP5.1.Atmos.DV.HDR.H.265-Ochaco.mkv"},
  {n:"Moana", tmdb:"1108427", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Moana%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20L%20C.mkv"},
  {n:"Mayday", tmdb:"1137844", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Mayday%20(2026)%20Web-Dl%204K%20DV%20HDR%20LC.mkv"},
  {n:"Susurran tu nombre", tmdb:"860508", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Susurran%20tu%20nombre%20(2026)%20Web-Dl%204K%20DV%20HDR%20L%20C.mkv"},
  {n:"Camp Rock 3", tmdb:"1493400", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/Camp%20Rock%203%20(2026)%20Web-Dl%204K%20DV%20HDR%2B%20Lat%20Cast.mkv"},
  {n:"Código: Venganza", tmdb:"1288445", min:100, url:"http://vod-r2.lioniptv.us/PELICULAS/4K/C%C3%B3digo%20Venganza%20(2026)%20Web-Dl%204K%20UHD%20HDR%2B%20L.mkv"}
];

function schedule(now) {
  var total = 0, i;
  for (i = 0; i < MOVIES.length; i++) total += MOVIES[i].min * 60;
  var pos = Math.floor((now - START) / 1000) % total;
  if (pos < 0) pos += total;
  for (i = 0; i < MOVIES.length; i++) {
    var len = MOVIES[i].min * 60;
    if (pos < len) return { index: i, offset: pos, left: len - pos };
    pos -= len;
  }
  return { index: 0, offset: 0, left: MOVIES[0].min * 60 };
}
function mmss(s) { var m = Math.floor(s / 60); return m + " min"; }

async function getStreams(tmdbId, type, season, episode) {
  var id = String(tmdbId || "").toLowerCase();
  if (type !== "tv" || id.indexOf(PREFIX) < 0) return [];
  var s = schedule(Date.now());
  var cur = MOVIES[s.index], nxt = MOVIES[(s.index + 1) % MOVIES.length];
  var out = [];
  out.push({ name: LABEL, title: "AHORA: " + cur.n + " (va en el min " + Math.floor(s.offset / 60) + ", faltan " + mmss(s.left) + ")", url: cur.url, quality: "4K", headers: {} });
  // prueba: misma pelicula pidiendo al reproductor arrancar en el minuto actual (si el reproductor lo ignora, empieza desde cero)
  out.push({ name: LABEL, title: "AHORA (prueba minuto " + Math.floor(s.offset / 60) + "): " + cur.n, url: cur.url + "#t=" + s.offset, quality: "4K", headers: {} });
  out.push({ name: LABEL, title: "SIGUE: " + nxt.n, url: nxt.url, quality: "4K", headers: {} });
  return out;
}

exports.getStreams = getStreams;
exports._schedule = schedule;
