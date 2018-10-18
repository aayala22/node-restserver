// =============================
// Puerto 
// =============================

process.env.PORT = process.env.PORT || 8080;

// =============================
// Vencimiento de token 
// =============================
// 60 segundos
// 60 minutos
// 24 horas 
// 30 dias 

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =============================
// SEED  de autentificación 
// =============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =============================
// SEED  de CLIENID 
// =============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '434650123195-7ph0ibfsmrvmb16slbqfupqf5ejucoki.apps.googleusercontent.com';