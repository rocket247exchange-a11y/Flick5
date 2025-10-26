// movie.js - page loads movie by id and plays video (handles YouTube vs direct)
document.addEventListener('DOMContentLoaded', () => {

  const MOVIES = [
    { id:"madam-cash", title:"MADAM CASH", plot:"Madam Cash — an overly wealthy philanthropist...", year:2025, poster:"https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/m92paNu2HwYcy0WKr10D.gif", video:"https://www.dropbox.com/scl/fi/zwa1rpo4502cvvf4f5mtn/Video-Oct-24-2025-12-00-10-AM.mov?dl=0" },
    { id:"ojuju-curse", title:"OJUJU CURSE", plot:"A horrifying story of a possession...", year:2025, poster:"https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/y0MQbrGbB2463NmrSkVb.gif", video:"https://www.dropbox.com/scl/fi/8fupl9cx53ft2ayv93r2u/Video-Oct-23-2025-11-59-23-PM.mov?dl=0" },
    { id:"vengance-abiyoyo", title:"VENGEANCE OF ABIYOYO", plot:"In a wasteland alternate Abuja...", year:2025, poster:"https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/3oNTh0hvHjF15ni37UEm.gif", video:"https://www.dropbox.com/scl/fi/ovrlys523t356nulee5x4/Video-Oct-24-2025-12-00-48-AM.mov?dl=0" },
    { id:"lagbaja", title:"LAGBAJA", plot:"Dive into the hidden tribe of The ERU people...", year:2025, poster:"https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/G6rMESZT3IfnBqWaJng5.gif", video:"https://www.dropbox.com/scl/fi/o70fdliuucstko0o69oci/Video-Oct-24-2025-12-00-33-AM.mov?dl=0" },
    { id:"kalakuta-2", title:"KALAKUTA 2", plot:"KUTI faces tragedy and must rise again...", year:2025, poster:"https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/cl9s7W1bPjPFlIvdnQLw/pub/3oNTh0hvHjF15ni37UEm.gif", video:"https://www.dropbox.com/scl/fi/lkbb8uylde1j4oll4azoe/ScreenRecording_10-22-2025-10-01-57_1.MP4?dl=0" },
    { id:"kalakuta-1", title:"KALAKUTA 1", plot:"A man rises against injustice...", year:2025, poster:"https://i.imgur.com/qk2aQL7.gif", video:"https://youtu.be/2q5Hmn6KlBU?si=7yfTV_hsApbzN_4h" }
  ];

  function normalizeVideoUrl(url){
    if(!url) return null;
    try{
      const u = new URL(url);
      if(u.hostname.includes('dropbox.com')){ u.searchParams.set('raw','1'); return u.toString(); }
      return url;
    }catch(e){ return url; }
  }

  function qs(name){ return new URLSearchParams(location.search).get(name); }
  const id = qs('id');
  const movie = MOVIES.find(m=>m.id===id);

  const backBtn = document.getElementById('backBtn');
  backBtn && backBtn.addEventListener('click', ()=> history.back());

  if(!movie){
    document.querySelector('.movie-landing').innerHTML = `<p style="color:var(--muted)">Movie not found. <a href="index.html">Back to home</a></p>`;
  } else {
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-year').textContent = movie.year || '';
    document.getElementById('movie-plot').textContent = movie.plot || '';
    document.getElementById('movie-poster').style.backgroundImage = `url(${movie.poster})`;

    const rawVideo = normalizeVideoUrl(movie.video || '');
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
