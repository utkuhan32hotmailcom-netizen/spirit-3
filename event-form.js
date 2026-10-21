import { events, toInputDate, esc } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

const ALANLAR = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

if (form) {
  const guncelleme = form.dataset.mode === "guncelle";
  let etkinlik = null;

  // Kategori seçeneklerini veriden üret (değerler veriyle aynı: "Atölye")
  const kategoriSec = form.elements.kategori;
  [...new Set(events.map((e) => e.category))].forEach((kategori) => {
    const secenek = document.createElement("option");
    secenek.value = kategori;
    secenek.textContent = kategori;
    kategoriSec.append(secenek);
  });

  if (guncelleme) {
    const id = new URLSearchParams(location.search).get("id");
    etkinlik = events.find((e) => e.id === id);

    if (!etkinlik) {
      const neden = id
        ? `"${id}" numaralı bir etkinlik bulunamadı.`
        : "Güncellenecek etkinlik seçilmedi.";
      form.previousElementSibling?.remove(); // "alanlar dolu gelir" açıklamasını kaldır
      form.outerHTML = `<div class="mesaj-hata" role="alert">
        <p>${esc(neden)} Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      </div>
      <p><a class="dugme" href="etkinlikler.html">Etkinliklere git</a></p>`;
    } else {
      form.elements.ad.value = etkinlik.title;
      form.elements.kategori.value = etkinlik.category;
      form.elements.tarih.value = toInputDate(etkinlik);
      form.elements.saat.value = etkinlik.time;
      form.elements.yer.value = etkinlik.location;
      form.elements.kontenjan.value = etkinlik.capacity ?? "";
      form.elements.aciklama.value = etkinlik.description;
    }
  }

  if (!guncelleme || etkinlik) {
    kurForm(guncelleme, etkinlik);
  }
}

function kurForm(guncelleme, etkinlik) {
  // Düzeltilen alanın eski hatasını temizle
  ALANLAR.forEach((ad) => {
    form.elements[ad].addEventListener("input", () => hataTemizle(ad));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const kontenjanMetni = String(fd.get("kontenjan") ?? "").trim();
    const [yil, ay, gun] = String(fd.get("tarih") || "").split("-");

    const data = {
      id: guncelleme ? etkinlik.id : yeniId(),
      title: String(fd.get("ad") || "").trim(),
      category: fd.get("kategori") || "",
      date: yil ? `${gun}-${ay}-${yil}` : "",
      time: fd.get("saat") || "",
      location: String(fd.get("yer") || "").trim(),
      description: String(fd.get("aciklama") || "").trim(),
      capacity: kontenjanMetni === "" ? null : Number(kontenjanMetni),
    };

    const errors = dogrula(data);

    // Her alanın hatasını göster ya da temizle
    ALANLAR.forEach((ad) => {
      if (errors[ad]) hataGoster(ad, errors[ad]);
      else hataTemizle(ad);
    });

    if (Object.keys(errors).length > 0) {
      mesaj.className = "mesaj-hata";
      mesaj.setAttribute("role", "alert");
      mesaj.textContent = "Formda hatalı alanlar var.";
      const ilk = ALANLAR.find((ad) => errors[ad]);
      form.elements[ilk].focus();
      return;
    }

    // Hata yok: yeşil kutu + oluşan nesne (kaydedilmez)
    mesaj.className = "mesaj-basari";
    mesaj.setAttribute("role", "status");
    mesaj.replaceChildren();
    const baslik = document.createElement("p");
    baslik.textContent = guncelleme
      ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(data, null, 2);
    mesaj.append(baslik, pre);
    console.log(data);
  });
}

function yeniId() {
  const enBuyuk = Math.max(0, ...events.map((e) => Number(e.id.replace("event-", "")) || 0));
  return `event-${enBuyuk + 1}`;
}

function dogrula(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (data.location.length === 0) errors.yer = "Yer bilgisini yazın.";
  if (
    data.capacity !== null &&
    (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
  ) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  }
  return errors;
}

function hataGoster(ad, metin) {
  const alan = form.elements[ad];
  alan.setAttribute("aria-invalid", "true");
  document.querySelector(`#${ad}-hata`).textContent = metin;
}

function hataTemizle(ad) {
  const alan = form.elements[ad];
  alan.removeAttribute("aria-invalid");
  document.querySelector(`#${ad}-hata`).textContent = "";
}
