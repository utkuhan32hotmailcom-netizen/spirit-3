import { events, formatDate, sortByDate, esc } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// Bir etkinlikten bir kart üretir
function createCard(event) {
  return `<article>
    <h3>${esc(event.title)}</h3>
    <p><span class="kategori">${esc(event.category)}</span></p>
    <p>Tarih: ${formatDate(event)}, ${esc(event.time)}</p>
    <p>Yer: ${esc(event.location)}</p>
    <p>Kontenjan: ${esc(event.capacity)} kişi</p>
    <p>${esc(event.description)}</p>
    <a href="etkinlik-detay.html?id=${encodeURIComponent(event.id)}">Detayları gör →</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list) {
  if (list.dataset.limit) {
    // Ana sayfa: tarihi en yakın N etkinlik
    const yaklasan = sortByDate(events).slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    render(events);
    kurFiltre();
  }
}

// Arama kutusu + kategori seçimi (yalnızca liste sayfasında var)
function kurFiltre() {
  const form = document.querySelector("#filtre-formu");
  if (!form) return;

  const arama = document.querySelector("#arama");
  const kategoriSec = document.querySelector("#kategori-filtre");
  const sonuc = document.querySelector("#sonuc");

  // Kategorileri veriden üret, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kategori) => {
    const secenek = document.createElement("option");
    secenek.value = kategori;
    secenek.textContent = kategori;
    kategoriSec.append(secenek);
  });

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriSec.value;

    const bulunanlar = events.filter((e) => {
      const metin = [e.title, e.description, e.category, e.location]
        .join(" ")
        .toLocaleLowerCase("tr-TR");
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(bulunanlar);
    sonuc.textContent =
      bulunanlar.length === 0
        ? "Aramanıza uygun etkinlik bulunamadı."
        : `${bulunanlar.length} etkinlik listeleniyor.`;
  }

  arama.addEventListener("input", filtrele);
  kategoriSec.addEventListener("change", filtrele);
  // Enter'a basınca sayfa yenilenmesin
  form.addEventListener("submit", (e) => e.preventDefault());

  filtrele();
}
