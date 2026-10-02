const path=location.pathname.replace(/\/$/,'')||'/';const section=path.split('/').filter(Boolean).at(-1)||'';
const nav=document.querySelector('.nav');const menu=document.querySelector('.menu');
if(menu)menu.addEventListener('click',()=>{menu.classList.toggle('open');nav.classList.toggle('open');menu.setAttribute('aria-expanded',menu.classList.contains('open'))});
document.querySelectorAll('.nav a').forEach(a=>{const target=new URL(a.href,location.href).pathname.split('/').filter(Boolean).at(-1)||'';if(target===section)a.classList.add('active')});
