// Tek veri kaynağı: tüm sayfalar bu diziden üretilir.
// Tarih biçimi GG-AA-YYYY, saat biçimi SS:DD.
export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 120,
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Lab 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    capacity: 40,
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "13:00",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
    capacity: 50,
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "03-11-2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
    capacity: 30,
  },
  {
    id: "event-5",
    title: "Yapay Zekâya Giriş",
    category: "Seminer",
    date: "10-11-2026",
    time: "11:00",
    location: "C Blok Amfi 3",
    description: "Makine öğrenmesinin temelleri ve günlük hayattan örnekler.",
    capacity: 80,
  },
  {
    id: "event-6",
    title: "Kampüs Film Gecesi",
    category: "Sosyal",
    date: "17-11-2026",
    time: "19:00",
    location: "Merkez Kütüphane Bahçesi",
    description: "Açık havada kısa film gösterimi ve sohbet.",
    capacity: 150,
  },
];

// ---- Yardımcı fonksiyonlar (modüller bunları data.js'ten alır) ----

// "12-10-2026" + "14:00" -> Date nesnesi
export function parseDate(event) {
  const [gun, ay, yil] = event.date.split("-").map(Number);
  const [saat, dakika] = event.time.split(":").map(Number);
  return new Date(yil, ay - 1, gun, saat, dakika);
}

// Date -> "12 Ekim 2026"
export function formatDate(event) {
  return parseDate(event).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// "12-10-2026" -> "2026-10-12" (date input için)
export function toInputDate(event) {
  const [gun, ay, yil] = event.date.split("-");
  return `${yil}-${ay}-${gun}`;
}

// Diziyi tarihe göre sıralanmış YENİ dizi olarak döndürür (events değişmez)
export function sortByDate(dizi) {
  return [...dizi].sort((a, b) => parseDate(a) - parseDate(b));
}

// Metni HTML'e güvenle yazmak için
export function esc(metin) {
  return String(metin).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}
