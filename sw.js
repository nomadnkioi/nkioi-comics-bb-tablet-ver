const CACHE_NAME = 'nkioi-comics-bb-tablet-v1.0.0';

// 서비스 워커 설치 시 자원 캐싱 (네트워크가 오프라인일 때 백업용)
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// 네트워크 요청 감지 및 처리
self.addEventListener('fetch', (e) => {
  // 일반적인 네트워크 요청 처리 (실시간 최신 파일 반영을 위해 네트워크 우선 동작)
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
