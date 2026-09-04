Formulare psihoterapie — aplicație simplă

Scop
Aplicatie frontend simplă (fără server) pentru înregistrarea veniturilor și cheltuielilor unui cabinet de psihoterapie. Interfața este în română, are autentificare locală (localStorage), salvare/încărcare locală și export CSV/Excel.

Rulare
1. Deschide index.html direct în browser sau rulează un server simplu în folderul de lucru:
   python3 -m http.server 8000
   apoi accesează http://localhost:8000

Autentificare
- Cont implicit: user=admin, pass=admin (se creează automat)
- Poți înregistra alți utilizatori folosind formularul „Înregistrare”.

Seed (date exemplu)
Pentru a popula aplicația cu date de probă, deschide consola browserului (F12) și rulează:

const seed = [
  ["1","2026-09-01","Factura 001","Ședință individuală","200.00","","0.00","","0.00"],
  ["2","2026-09-03","Chitanță 002","Ședință de grup","150.00","","0.00","","0.00"],
  ["3","2026-09-05","Factura 003","Materiale cabinet","","","0.00","50.00","50.00"]
];
localStorage.setItem('db', JSON.stringify(seed));
localStorage.setItem('currentUser', 'admin');
location.reload();

Funcționalități
- Adaugă/șterge rânduri
- Mod editabil pentru toate celulele
- Salvează/încarcă date în localStorage
- Export CSV/Excel (fișier .xls text delimitat) folosind butoanele din interfață
- Coloană "Deducibil (RON)" pentru sumele parțial deducibile

Notă
Aceasta este o versiune prototip; datele sunt stocate local în browser. Pentru producție recomand:
- Backend cu autentificare și stocare sigură (ex: SQLite/Postgres)
- Validare server-side a sumelor
- Protecție parole (nu stoca parole în clar)

Contribuire
Editează fișierele index.html, script.js, style.css. Pentru întrebări sau cerințe noi, răspunde în sesiune.
