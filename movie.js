// movie.js - loads movie details from the same dataset and tries to play video.
// If video streaming fails (common with Dropbox), shows fallback "Open in new tab".
document.addEventListener('DOMContentLoaded', () => {

  // Same movie dataset (must match app.js)
  const MOVIES = [
    { id:"madam-cash", title:"MADAM CASH", plot:"Madam Cash — an overly wealthy philanthropist, landlord and multi-billionaire entrepreneur. Behind the curtains hides a dark & twisted secret.", year:2025, poster:"https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/m92paNu2HwYcy0WKr10D.gif", video:"https://www.dropbox.com/scl/fi/zwa1rpo4502cvvf4f5mtn/Video-Oct-24-2025-12-00-10-AM.mov?dl=1" },
    { id:"ojuju-curse", title:"OJUJU CURSE", plot:"A horrifying story of a possession. Nana, a bar girl, encounters a stranger and her life is changed forever.", year:2025, poster:"https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/y0MQbrGbB2463NmrSkVb.gif", video:"https://www.dropbox.com/scl/fi/8fupl9cx53ft2ayv93r2u/Video-Oct-23-2025-11-59-23-PM.mov?dl=1" },
    { id:"vengance-abiyoyo", title:"VENGEANCE OF ABIYOYO", plot:"In a wasteland alternate Abuja, a demon terrorises the people and causes mass hysteria.", year:2025, poster:"https://uce1c28927b2f347c01359fcd529.previews.dropboxusercontent.com/p/thumb/ACxnf_5SEmXc6lt0ukJcCMPmkA2PvVZf2bK_mJXmZ9nN6rJJb2THfGRmoc4_7mKwTN6-VAPIP8q4ixPgQcyrRMpcSoLNnNhO_4Q90Xt5Fghl4lMVVj0lrN-JXm1ulXyk7Lyv8_0QxtO0fwhHJQu0cs6HBtzC71MUuxFattK6AMrp7tt_Cn1IM2zl83M4dJZUqTgvaI2VTVqJkqJ3bPWltX2B5oZHKZCNDh7hmF4tUpB_Ct2O6Ogmd5o1WGNJOjVEeEdMdR19OIawNA8MTguBX-P67NLjKBuwk9JzCTFBFJaliL8X2sAcNw5v5QsKV_2HqJePorUPHjMS6CD1JaFzUWQN_PfG4fgYtVjXA_kVxastgY8AROFReVuUgjdMhBmX4HTtBqj7v80DFCBX3YKI8QkkOjY6bhDCH3vUR_fTcFs3eti64uB-bM56Zg8kezK5Xy4/p.gif?is_prewarmed=true", video:"https://www.dropbox.com/scl/fi/ovrlys523t356nulee5x4/Video-Oct-24-2025-12-00-48-AM.mov?dl=1" },
    { id:"lagbaja", title:"LAGBAJA", plot:"Dive into the hidden tribe of The ERU people — culture & peace are challenged by a masqueraded entity.", year:2025, poster:"https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/G6rMESZT3IfnBqWaJng5.gif", video:"https://www.dropbox.com/scl/fi/o70fdliuucstko0o69oci/Video-Oct-24-2025-12-00-33-AM.mov?dl=1" },
    { id:"kalakuta-2", title:"KALAKUTA 2", plot:"KUTI faces tragedy and must rise up again to free the people of KALAKUTA.", year:2025, poster:"https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/3oNTh0hvHjF15ni37UEm.gif", video:"https://www.dropbox.com/scl/fi/lkbb8uylde1j4oll4azoe/ScreenRecording_10-22-2025-10-01-57_1.MP4?dl=1" },
    { id:"kalakuta-1", title:"KALAKUTA 1", plot:"Step into an alternate world where bad governance sparks a rise against injustice and freedom has a cost.", year:2025, poster:"https://i.imgur.com/qk2aQL7.gif", video:"https://youtu.be/2q5Hmn6KlBU?si=7yfTV_hsApbzN_4h" }
  ];

  // Helpers
  function qs(name){ return new URLSearchParams(location.search).get(name); }
  function findMovie(id){ return MOVIES.find(m=>m.id===id); }

  const id = qs('id');
  const movie = findMovie(id);

  const backBtn = document.getElementById('backBtn');
  backBtn && backBtn.addEventListener('click', ()=> history.back());

  if(!movie){
    document.querySelector('.container').innerHTML = `<p style="color:var(--muted)">Movie not found. <a href="index.html">Back to home</a></p>`;
    return;
  }

  // Fill metadata
  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-year').textContent = movie.year || '';
  document.getElementById('movie-plot').textContent = movie.plot || '';
  const posterEl = document.getElementById('movie-poster');
  if(posterEl) posterEl.style.backgroundImage = `url('${movie.poster}')`;

  const playerHolder = document.getElementById('playerHolder');
  const videoEl = document.getElementById('movie-video');
  const fallbackBox = document.getElementById('videoFallback');

  // If YouTube, embed iframe
  if(movie.video && (movie.video.includes('youtube.com') || movie.video.includes('youtu.be'))){
    const embed = movie.video.replace('watch?v=','embed/').replace('youtu.be/','youtube.com/embed/');
    const iframe = document.createElement('iframe');
    iframe.src = embed;
    iframe.width = '100%';
    iframe.height = '480';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.setAttribute('allowfullscreen','');
    videoEl.replaceWith(iframe);
    if(fallbackBox) fallbackBox.innerHTML = `<div style="color:var(--muted);margin-top:10px">Embedded YouTube video. Use the player above or <a href="${movie.video}" target="_blank" rel="noopener">open on YouTube</a>.</div>`;
  } else if(movie.video){
    // Try using <video>; Dropbox often blocks playback — provide fallback link
    const normalized = movie.video;
    videoEl.src = normalized;
    videoEl.poster = movie.poster || '';
    videoEl.controls = true;
    videoEl.muted = true;

    let readyTimeout = setTimeout(()=>{
      if(videoEl.readyState < 3){
        // not ready -> show fallback
        fallbackBox.innerHTML = `<div style="color:var(--muted)">This video may not stream inline. <a class="btn subscribe" href="${movie.video}" target="_blank" rel="noopener">Open source (new tab)</a></div>`;
      }
    }, 6000);

    videoEl.addEventListener('canplay', ()=> {
      clearTimeout(readyTimeout);
      // attempt autoplay muted (may be blocked)
      videoEl.play().catch(()=>{ /* autoplay blocked - user will use controls */ });
    });

    videoEl.addEventListener('error', ()=> {
      fallbackBox.innerHTML = `<div style="color:var(--muted)">Playback failed. <a class="btn subscribe" href="${movie.video}" target="_blank" rel="noopener">Open source (new tab)</a></div>`;
    });

  } else {
    fallbackBox.innerHTML = `<div style="color:var(--muted)">No video source available. <a href="https://youtube.com/@kezithelastcreator?si=AIUm9DMrV8DnBxw-" target="_blank">Visit channel</a></div>`;
  }

  // Flick it: try to play or open source
  const flickBtn = document.getElementById('flickIt');
  flickBtn.addEventListener('click', () => {
    const vid = document.querySelector('#playerHolder video');
    if(vid && vid.play){
      vid.muted = false;
      vid.play().catch(()=> alert('Autoplay blocked — click Play on the video or open source.'));
    } else {
      window.open(movie.video || 'https://youtube.com/@kezithelastcreator?si=AIUm9DMrV8DnBxw-','_blank');
    }
  });

});
  if(rawVideo && (rawVideo.includes('youtube.com')||rawVideo.includes('youtu.be'))){
    let embed = rawVideo.replace('watch?v=','embed/').replace('youtu.be/','youtube.com/embed/');
    const iframe = document.createElement('iframe');
    iframe.src = embed;
    iframe.width = '100%'; iframe.height = '480';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.setAttribute('allowfullscreen','');
    videoEl.replaceWith(iframe);
  } else if(rawVideo){
    videoEl.src = rawVideo;
    videoEl.poster = movie.poster || '';
    videoEl.muted = true;
    videoEl.addEventListener('canplay', ()=> videoEl.play().catch(()=>{}), {once:true});
  } else {
    videoEl.insertAdjacentHTML('beforebegin', `<div style="color:var(--muted)">No playable video available. <a href="${movie.video||'#'}" target="_blank" rel="noopener">Open source</a></div>`);
  }

  document.getElementById('flickIt').addEventListener('click', ()=>{
    const vid = document.getElementById('movie-video');
    if(vid && vid.play){ vid.muted = false; vid.play().catch(()=> alert('Click Play on the video if autoplay is blocked')); vid.scrollIntoView({behavior:'smooth', block:'center'}); }
    else window.open(movie.video,'_blank');
  });

  const ytSub = document.getElementById('yt-sub');
  if(ytSub) ytSub.href = 'https://youtube.com/@kezithelastcreator?si=AIUm9DMrV8DnBxw-';

});    const rawVideo = normalizeVideoUrl(movie.video || '');
    const videoEl = document.getElementById('movie-video');

    if(rawVideo && (rawVideo.includes('youtube.com')||rawVideo.includes('youtu.be'))){
      let embed = rawVideo.replace('watch?v=','embed/').replace('youtu.be/','youtube.com/embed/');
      const iframe = document.createElement('iframe');
      iframe.src = embed;
      iframe.width = '100%'; iframe.height = '480';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.setAttribute('allowfullscreen','');
      videoEl.replaceWith(iframe);
    } else if(rawVideo){
      videoEl.src = rawVideo;
      videoEl.poster = movie.poster || '';
      videoEl.muted = true;
      videoEl.addEventListener('canplay', ()=> videoEl.play().catch(()=>{}), {once:true});
    } else {
      videoEl.insertAdjacentHTML('beforebegin', `<div style="color:var(--muted)">No playable video available. <a href="${movie.video||'#'}" target="_blank" rel="noopener">Open source</a></div>`);
    }

    document.getElementById('flickIt').addEventListener('click', ()=>{
      const vid = document.getElementById('movie-video');
      if(vid && vid.play){ vid.muted = false; vid.play().catch(()=> alert('Click Play on the video if autoplay is blocked')); vid.scrollIntoView({behavior:'smooth', block:'center'}); }
      else window.open(movie.video,'_blank');
    });

    const ytSub = document.getElementById('yt-sub');
    if(ytSub) ytSub.href = 'https://youtube.com/@kezithelastcreator?si=AIUm9DMrV8DnBxw-';
  }

}); // end DOMContentLoaded
