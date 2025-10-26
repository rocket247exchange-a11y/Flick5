// app.js - updated: logos placed directly on posters, writeup at top,
// coming soon only "ORIGIN OF ABIYOYO", poster fixes, safe DOM timing.

document.addEventListener('DOMContentLoaded', () => {

  function normalizeVideoUrl(url){
    if(!url) return null;
    try{
      const u = new URL(url);
      if(u.hostname.includes('dropbox.com')){
        // prefer raw streaming param
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
      // allow direct i.imgur, storage.googleapis, dropbox preview links (they can be long)
      return url;
    }catch(e){ return url; }
  }

  // MOVIES (with corrected REVENGE/VENGEANCE poster link from user)
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
      poster: "https://uce1c28927b2f347c01359fcd529.previews.dropboxusercontent.com/p/thumb/ACxnf_5SEmXc6lt0ukJcCMPmkA2PvVZf2bK_mJXmZ9nN6rJJb2THfGRmoc4_7mKwTN6-VAPIP8q4ixPgQcyrRMpcSoLNnNhO_4Q90Xt5Fghl4lMVVj0lrN-JXm1ulXyk7Lyv8_0QxtO0fwhHJQu0cs6HBtzC71MUuxFattK6AMrp7tt_Cn1IM2zl83M4dJZUqTgvaI2VTVqJkqJ3bPWltX2B5oZHKZCNDh7hmF4tUpB_Ct2O6Ogmd5o1WGNJOjVEeEdMdR19OIawNA8MTguBX-P67NLjKBuwk9JzCTFBFJaliL8X2sAcNw5v5QsKV_2HqJePorUPHjMS6CD1JaFzUWQN_PfG4fgYtVjXA_kVxastgY8AROFReVuUgjdMhBmX4HTtBqj7v80DFCBX3YKI8QkkOjY6bhDCH3vUR_fTcFs3eti64uB-bM56Zg8kezK5Xy4/p.gif?is_prewarmed=true",
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

  // Coming soon: only ORIGIN OF ABIYOYO
  const COMING = [
    { id: "origin-abiyoyo", title: "ORIGIN OF ABIYOYO", plot: "The origin story of the creature.", poster: "https://i.imgur.com/9Uklygc.jpeg" }
  ];

  const grid = document.getElementById('grid-wrap');
  const comingGrid = document.getElementById('coming-grid');

  function posterUrlSafe(url){
    const p = normalizePosterUrl(url);
    return p || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"><rect width="100%" height="100%" fill="%23000"/><text x="50%" y="50%" fill="%23fff" font-size="28" font-family="Arial" text-anchor="middle">Poster unavailable</text></svg>';
  }

  function createMovieCard(m, index){
    const card = document.createElement('article');
    card.className = 'card';
    const poster = posterUrlSafe(m.poster);

    card.innerHTML = `
      <div class="card-inner">
        <div class="poster-wrap">
          <div class="poster-logo">FLICK<span class="reg">®</span></div>
          <div class="poster-flip flipping"><img class="poster-img" src="${poster}" alt="${m.title}"></div>
          <div class="play-overlay"><button class="play-btn" data-id="${m.id}" title="Play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg></button></div>
        </div>
        <div class="card-body">
          <h3>${m.title}</h3>
          <div class="meta-row">${m.year || ''}</div>
          <p class="plot">${m.plot}</p>
        </div>
      </div>
    `;
    card.querySelector('.play-btn').addEventListener('click', (e) => { e.stopPropagation(); location.href = `movie.html?id=${encodeURIComponent(m.id)}`; });
    card.addEventListener('click', ()=> location.href = `movie.html?id=${encodeURIComponent(m.id)}`);
    card.querySelector('.poster-img').addEventListener('error', (ev)=> ev.target.src = posterUrlSafe(''));
    return card;
  }

  MOVIES.forEach((m,i) => grid.appendChild(createMovieCard(m,i)));
  document.querySelectorAll('.poster-flip').forEach((el,i)=> el.style.animationDelay = (i*260)+'ms');

  // Coming soon single card (rectangular with soft gold glow)
  COMING.forEach(c => {
    const div = document.createElement('div');
    div.className = 'coming-card';
    div.style.backgroundImage = `url('${posterUrlSafe(c.poster)}')`;
    div.innerHTML = `
      <div class="coming-overlay">
        <div>
          <h4 class="small-title">${c.title}</h4>
          <p style="margin:8px 0 0;color:var(--muted)">${c.plot}</p>
          <div style="margin-top:10px"><a class="btn subscribe" href="https://youtube.com/@kezithelastcreator?si=AIUm9DMrV8DnBxw-" target="_blank">Subscribe</a> <a class="btn flickit" href="#" data-id="${c.id}">Flick it</a></div>
        </div>
      </div>
    `;
    comingGrid.appendChild(div);
    div.querySelector('.btn.flickit').addEventListener('click',(e)=>{ e.preventDefault(); window.open('https://youtube.com/@kezithelastcreator?si=AIUm9DMrV8DnBxw-','_blank'); });
  });

  // gentle auto-scroll for desktop if desired
  if(window.innerWidth > 1000){
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

  // Welcome sign timing: hide after intro and reveal main
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
    }, 3500);
  })();

});    },
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

  /* Render Now Showing grid */
  const grid = document.getElementById('grid-wrap');
  function posterUrlSafe(url){
    const p = normalizePosterUrl(url);
    return p || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"><rect width="100%" height="100%" fill="%23000"/><text x="50%" y="50%" fill="%23fff" font-size="28" font-family="Arial" text-anchor="middle">Poster unavailable</text></svg>';
  }
  function createMovieCard(m){
    const card = document.createElement('article');
    card.className = 'card';
    const poster = posterUrlSafe(m.poster);

    // create card-logo using text-logo (no <img>)
    const cardLogo = `<div class="card-logo"><div class="logo-text-mini" aria-hidden="true">FLICK<span class="reg">®</span></div></div>`;

    card.innerHTML = `
      ${cardLogo}
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

  /* Render Coming Soon as GIF backgrounds w/ overlay */
  const comingGrid = document.getElementById('coming-grid');
  COMING.forEach(c=>{
    const div = document.createElement('div');
    div.className = 'coming-card';
    div.style.backgroundImage = `url('${c.poster}')`;
    div.innerHTML = `
      <div class="coming-overlay">
        <div class="small-logo"><div class="logo-text-mini" aria-hidden="true">FLICK<span class="reg">®</span></div></div>
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

  /* Optional gentle auto-scroll for desktop for visual motion */
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
