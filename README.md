Canlı (Vercel): https://kampus-etkinlik.vercel.app

# Kampüs Etkinlik - Sprint 3

GitHub Pages: https://utkuhan32hotmailcom-netizen.github.io/odev/sprint3/

## Sayfalar ve modüller

| Sayfa | Modül |
| --- | --- |
| `index.html` | `js/event-list.js` (en yakın 2 etkinlik, `data-limit="2"`) |
| `etkinlikler.html` | `js/event-list.js` (6 etkinlik + arama + kategori filtresi) |
| `etkinlik-detay.html?id=event-3` | `js/event-detail.js` |
| `etkinlik-ekle.html` | `js/event-form.js` |
| `etkinlik-guncelle.html?id=event-4` | `js/event-form.js` (`data-mode="guncelle"`) |

`js/data.js` HTML'e bağlanmaz; diğer modüller `import` eder.

## Çalıştırma

Modüller (`type="module"`) `file://` ile çalışmaz. VS Code'da **Live Server** ile açın:
`http://127.0.0.1:5500/sprint3/`

## Kapsam

- 6 etkinlik tek dizide (`data.js`), kartlar JavaScript ile üretilir
- Arama + kategori filtresi birlikte çalışır, sonuç yoksa mesaj çıkar
- Detay sayfası `?id=` ile doğru etkinliği açar, geçersiz id'de hata kutusu gösterir
- Form kendi hata/başarı mesajını gösterir (`novalidate` + JavaScript doğrulama), veri kaydedilmez
