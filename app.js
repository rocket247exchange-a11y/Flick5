// app.js - landing logic, posters, coming soon, welcome hide timing
document.addEventListener('DOMContentLoaded', () => {

  /* Utilities: normalize Dropbox preview -> raw=1 (attempt direct stream) */
  function normalizeVideoUrl(url){
    if(!url) return null;
    try{
      const u = new URL(url);
      if(u.hostname.includes('dropbox.com')){
        u.searchParams.set('raw','1');
        return u.toString();
      }
      return url;
    }catch(e){ return url; }
  }
  function normalizePosterUrl(url){
    if(!url) return null;
    try{
      const u = new URL(url);
      const host = u.hostname.toLowerCase();
      if(host === 'i.imgur.com' || host.includes('storage.googleapis.com')) return url;
      // if album / unknown, return null to force placeholder
      if(host.includes('imgur.com') && (u.pathname.startsWith('/a/') || u.pathname.startsWith('/gallery/'))) return null;
      return url;
    }catch(e){ return url; }
  }

  /* === MOVIES JSON: full data you provided === */
  const MOVIES = [
    {
      id: "madam-cash",
      title: "MADAM CASH",
      plot: "Madam Cash — an overly wealthy philanthropist, landlord and multi-billionaire entrepreneur. Behind the curtains hides a dark & twisted secret.",
      year: 2025,
      poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/m92paNu2HwYcy0WKr10D.gif",
      video: normalizeVideoUrl("https://www.dropbox.com/scl/fi/zwa1rpo4502cvvf4f5mtn/Video-Oct-24-2025-12-00-10-AM.mov?dl=0")
    },
    {
      id: "ojuju-curse",
      title: "OJUJU CURSE",
      plot: "A horrifying story of a possession. Nana, a bar girl, encounters a stranger and her life is changed forever.",
      year: 2025,
      poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/y0MQbrGbB2463NmrSkVb.gif",
      video: normalizeVideoUrl("https://www.dropbox.com/scl/fi/8fupl9cx53ft2ayv93r2u/Video-Oct-23-2025-11-59-23-PM.mov?dl=0")
    },
    {
      id: "vengance-abiyoyo",
      title: "VENGEANCE OF ABIYOYO",
      plot: "In a wasteland alternate Abuja, a demon terrorises the people and causes mass hysteria.",
      year: 2025,
      poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/3oNTh0hvHjF15ni37UEm.gif",
      video: normalizeVideoUrl("https://www.dropbox.com/scl/fi/ovrlys523t356nulee5x4/Video-Oct-24-2025-12-00-48-AM.mov?dl=0")
    },
    {
      id: "lagbaja",
      title: "LAGBAJA",
      plot: "Dive into the hidden tribe of The ERU people — culture & peace are challenged by a masqueraded entity.",
      year: 2025,
      poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/G6rMESZT3IfnBqWaJng5.gif",
      video: normalizeVideoUrl("https://www.dropbox.com/scl/fi/o70fdliuucstko0o69oci/Video-Oct-24-2025-12-00-33-AM.mov?dl=0")
    },
    {
      id: "kalakuta-2",
      title: "KALAKUTA 2",
      plot: "KUTI faces tragedy and must rise up again to free the people of KALAKUTA.",
      year: 2025,
      poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/3oNTh0hvHjF15ni37UEm.gif",
      video: normalizeVideoUrl("https://www.dropbox.com/scl/fi/lkbb8uylde1j4oll4azoe/ScreenRecording_10-22-2025-10-01-57_1.MP4?dl=0")
    },
    {
      id: "kalakuta-1",
      title: "KALAKUTA 1",
      plot: "Step into an alternate world where bad governance sparks a rise against injustice and freedom has a cost.",
      year: 2025,
      poster: "https://i.imgur.com/qk2aQL7.gif",
      video: "https://youtu.be/2q5Hmn6KlBU?si=7yfTV_hsApbzN_4h"
    }
  ];

  /* Coming soon */
  const COMING = [
    { id: "origin-abiyoyo", title: "ORIGIN OF ABIYOYO", plot: "The origin story of the creature.", poster: "https://i.imgur.com/9Uklygc.jpeg" },
    { id: "kalakuta2-gif", title: "KALAKUTA 2", plot: "A new chapter unfolds.", poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/3oNTh0hvHjF15ni37UEm.gif" },
    { id: "abiyoyo-gif", title: "VENGEANCE OF ABIYOYO", plot: "A demon returns...", poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/3oNTh0hvHjF15ni37UEm.gif" },
    { id: "ojuju-gif", title: "BEWARE THE OJUJU CURSE", plot: "Something evil is near.", poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/y0MQbrGbB2463NmrSkVb.gif" },
    { id: "kalakuta1-gif", title: "KALAKUTA 1", plot: "The original uprising.", poster: "https://i.imgur.com/qk2aQL7.gif" },
    { id: "madamcash-gif", title: "MADAM CASH", plot: "Secrets of the wealthy.", poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/m92paNu2HwYcy0WKr10D.gif" },
    { id: "lagbaja-gif", title: "LAGBAJA", plot: "A mythic adventure.", poster: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/G6rMESZT3IfnBqWaJng5.gif" }
  ];

  /* Render functions */
  const grid = document.getElementById('grid-wrap');
  function posterUrlSafe(url){
    const p = normalizePosterUrl(url);
    return p || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"><rect width="100%" height="100%" fill="%23000"/><text x="50%" y="50%" fill="%23fff" font-size="28" font-family="Arial" text-anchor="middle">Poster unavailable</text></svg>';
  }
  function createMovieCard(m){
    const card = document.createElement('article');
    card.className = 'card';
    const poster = posterUrlSafe(m.poster);
    card.innerHTML = `
      <div class="card-logo"><img src="https://i.imgur.com/e40IkRK.jpeg" alt="FLICK logo"></div>
      <div class="poster-wrap">
        <div class="poster-flip flipping"><img class="poster-img" src="${poster}" alt="${m.title}"></div>
      </div>
      <div class="title-row">
        <div>
          <h3>${m.title}</h3>
          <div class="meta-row">${m.year || ''}</div>
        </div>
      </div>
      <p class="plot">${m.plot}</p>
      <div class="overlay-actions">
        <button class="play-btn" data-id="${m.id}" title="Play">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
        </button>
      </div>
    `;
    const play = card.querySelector('.play-btn');
    play.addEventListener('click',(e)=>{ e.stopPropagation(); location.href = `movie.html?id=${encodeURIComponent(m.id)}`; });
    card.addEventListener('click', ()=> location.href = `movie.html?id=${encodeURIComponent(m.id)}`);
    card.querySelector('.poster-img').addEventListener('error', (ev)=> ev.target.src = posterUrlSafe(''));
    return card;
  }
  MOVIES.forEach(m => grid.appendChild(createMovieCard(m)));
  document.querySelectorAll('.poster-flip').forEach((el,i)=> el.style.animationDelay = (i*260)+'ms');

  /* Render Coming Soon */
  const comingGrid = document.getElementById('coming-grid');
  COMING.forEach(c=>{
    const div = document.createElement('div');
    div.className = 'coming-card';
    div.style.backgroundImage = `url('${c.poster}')`;
    div.innerHTML = `
      <div class="coming-overlay">
        <div class="small-logo"><img src="https://i.imgur.com/e40IkRK.jpeg" alt="FLICK logo"></div>
        <div class="coming-text"><h4>${c.title}</h4><p>${c.plot}</p></div>
        <div class="coming-actions">
          <a class="btn subscribe" href="https://youtube.com/@kezithelastcreator?si=AIUm9DMrV8DnBxw-" target="_blank" rel="noopener">Subscribe</a>
          <a class="btn flickit" href="#" data-id="${c.id}">Flick it</a>
        </div>
      </div>
    `;
    comingGrid.appendChild(div);
    div.querySelector('.btn.flickit').addEventListener('click',(e)=>{ e.preventDefault(); window.open('https://youtube.com/@kezithelastcreator?si=AIUm9DMrV8DnBxw-','_blank'); });
  });

  /* Optional gentle auto-scroll for desktop */
  if(window.innerWidth > 900){
    let pos = 0;
    function floatScroll(){
      const el = document.getElementById('grid-wrap');
      if(!el) return;
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      pos += 0.35;
      if(pos > max) pos = 0;
      el.scrollTo({left: pos});
      requestAnimationFrame(floatScroll);
    }
    requestAnimationFrame(floatScroll);
  }

  /* Welcome sign timing: hide after intro and reveal main content */
  (function handleWelcome(){
    const welcome = document.getElementById('welcomeSign');
    const main = document.getElementById('mainContent');
    setTimeout(()=>{
      welcome.classList.add('welcome-hidden');
      setTimeout(()=>{
        welcome.setAttribute('aria-hidden','true');
        main.classList.remove('main-hidden');
        main.classList.add('main-visible');
        main.setAttribute('aria-hidden','false');
      }, 900);
    }, 4000);
  })();

}); // end DOMContentLoaded
