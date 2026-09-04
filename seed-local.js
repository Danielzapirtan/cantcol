(function(){
  // Seed localStorage with example data on first load. Safe idempotent check using 'seeded_v1'
  try {
    const seededKey = 'seeded_v1';
    if (localStorage.getItem(seededKey)) {
      // already seeded
      console.log('seed-local: already seeded');
      return;
    }

    const seed = [
      ["1","2026-09-01","Factura 001","Ședință individuală","200.00","","0.00","","0.00"],
      ["2","2026-09-03","Chitanță 002","Ședință de grup","150.00","","0.00","","0.00"],
      ["3","2026-09-05","Factura 003","Materiale cabinet","","0.00","0.00","50.00","50.00"]
    ];

    localStorage.setItem('db', JSON.stringify(seed));

    // ensure default user store and admin user
    const usersRaw = localStorage.getItem('users');
    const users = usersRaw ? JSON.parse(usersRaw) : {};
    if (!users.admin) users.admin = 'admin';
    localStorage.setItem('users', JSON.stringify(users));

    // set current user to admin for immediate access
    localStorage.setItem('currentUser', 'admin');

    localStorage.setItem(seededKey, '1');
    console.log('seed-local: seeded db and admin user (admin/admin)');
  } catch (e) {
    console.error('seed-local error', e);
  }
})();
