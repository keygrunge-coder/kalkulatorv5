// Pendaftaran Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js");
    });
}

const $ = i => document.getElementById(i);
document.querySelectorAll("input").forEach(e => e.oninput = hitung);

function rp(n) { return "Rp" + Math.round(n).toLocaleString("id-ID"); }

function hitung() {
    let h = +$('hpp').value || 0, m = +$('margin').value || 0, a = +$('admin').value || 0, l = +$('lain').value || 0;
    
    let marginRp = h * m / 100;
    let danaTarget = h + marginRp + l;
    let jual = (a >= 100) ? 0 : danaTarget / (1 - a / 100);
    let adminRp = jual * a / 100;
    let diterima = jual - adminRp;
    
    $('hjHero').textContent = rp(jual); 
    $('hj').textContent = rp(jual);
    $('adm').textContent = rp(adminRp) + " (" + a + "%)";
    $('dana').textContent = rp(diterima) + " (" + (100 - a) + "%)";
    $('mar').textContent = rp(marginRp) + " (" + m + "%)";
    
    let n = +$('nilai').value || 0, iklan = 0;
    if (n > 0) iklan = jual / n;
    $('ik').textContent = rp(iklan);
    
    let setelah = diterima - iklan;
    let untung = setelah - h - l;
    
    $('ds').textContent = rp(setelah);
    $('ub').textContent = rp(untung) + " (" + (h ? ((untung / h) * 100).toFixed(1) : 0) + "%)";
    
    let t = +$('target').value || 0;
    let jumlahPaket = (t > 0 && untung > 0) ? Math.ceil(t / untung) : 0;
    
    $('paket').textContent = (jumlahPaket > 0) ? jumlahPaket + " Paket" : "-";
    $('omzet').textContent = (jumlahPaket > 0) ? rp(jumlahPaket * jual) : "-";
}
hitung();
