import { events, formatDate, esc } from "./data.js";

const container = document.querySelector("#detay");

const IMZA = "utku erdoğan 2311012074";

// Kategoriye göre afiş rengi
const TEMALAR = {
  Seminer: "tema-seminer",
  Atölye: "tema-atolye",
  Söyleşi: "tema-soylesi",
  Sosyal: "tema-sosyal",
};

const PUSULA = `<svg class="afis-logo" viewBox="-70 -70 140 140" role="img" aria-label="Pusula logosu">
  <circle r="65" fill="none" stroke="currentColor" stroke-width="3"/>
  <path d="M 0,-55 L 12,-12 L 55,0 L 12,12 L 0,55 L -12,12 L -55,0 L -12,-12 Z" fill="currentColor"/>
  <path d="M 0,-55 L 0,0 L 55,0 Z M 0,55 L 0,0 L -55,0 Z" fill="#000" fill-opacity=".18"/>
  <path d="M -12,-12 L 0,0 L 0,-55 Z M 12,12 L 0,0 L 0,55 Z" fill="#fff" fill-opacity=".6"/>
</svg>`;

const ROBOT = `<svg class="afis-logo" viewBox="-70 -70 140 140" role="img" aria-label="Atölye logosu">
  <circle r="65" fill="none" stroke="currentColor" stroke-width="3"/>
  <circle r="18" fill="none" stroke="currentColor" stroke-width="3"/>
  <circle r="6" fill="currentColor"/>
  <polygon points="0,-32 -8,-20 8,-20" fill="currentColor"/>
  <polygon points="0,32 -8,20 8,20" fill="currentColor"/>
  <polygon points="-32,0 -20,-8 -20,8" fill="currentColor"/>
  <polygon points="32,0 20,-8 20,8" fill="currentColor"/>
</svg>`;

function hataGoster(mesaj) {
  document.title = "Etkinlik bulunamadı";
  container.innerHTML = `<div class="hata-sayfa">
    <h1>Etkinlik bulunamadı</h1>
    <div class="mesaj-hata" role="alert"><p>${esc(mesaj)}</p></div>
    <p><a class="dugme" href="etkinlikler.html">← Listeye dön</a></p>
    <p class="imza">${IMZA}</p>
  </div>`;
}

function afisGoster(event) {
  document.title = event.title;
  const tema = TEMALAR[event.category] || "tema-seminer";
  const logo = event.category === "Atölye" ? ROBOT : PUSULA;

  container.innerHTML = `<article class="afis ${tema}">
    <div class="afis-cerceve">
      <p class="afis-ust">SÜLEYMAN DEMİREL ÜNİVERSİTESİ<br>KAMPÜS ETKİNLİK</p>
      ${logo}
      <h1>${esc(event.title)}</h1>
      <hr class="afis-cizgi">
      <dl class="kunye">
        <dt>Tarih</dt>
        <dd><time>${formatDate(event)}, ${esc(event.time)}</time></dd>
        <dt>Yer</dt>
        <dd>${esc(event.location)}</dd>
        <dt>Kategori</dt>
        <dd>${esc(event.category)}</dd>
        <dt>Kontenjan</dt>
        <dd>${esc(event.capacity)} kişi</dd>
      </dl>
      <p class="afis-aciklama">${esc(event.description)}</p>
      <div class="afis-butonlar">
        <a class="afis-dugme" href="etkinlikler.html">← Listeye dön</a>
        <a class="afis-dugme" href="etkinlik-guncelle.html?id=${encodeURIComponent(event.id)}">Bu etkinliği güncelle</a>
      </div>
      <p class="imza">${IMZA}</p>
    </div>
  </article>`;
}

if (container) {
  const id = new URLSearchParams(location.search).get("id");
  const event = events.find((e) => e.id === id);

  if (!id) {
    hataGoster("Etkinlik numarası belirtilmedi. Listeden bir etkinlik seçin.");
  } else if (!event) {
    hataGoster(`"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`);
  } else {
    afisGoster(event);
  }
}
