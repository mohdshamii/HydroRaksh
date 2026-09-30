import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp-up to 20 users
    { duration: '1m', target: 50 },   // Sustained load at 50 users
    { duration: '30s', target: 100 }, // Peak stress at 100 users
    { duration: '20s', target: 0 },   // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'], // 95% of requests must complete below 300ms
    http_req_failed: ['rate<0.01'],    // Error rate must be under 1%
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:8000/api/v1';

export default function () {
  // 1. Dashboard KPIs
  const kpiRes = http.get(`${BASE_URL}/dashboard/kpis`);
  check(kpiRes, {
    'KPI status 200': (r) => r.status === 200,
    'KPI has 5 metrics': (r) => JSON.parse(r.body).kpis.length === 5,
  });

  // 2. Districts Map Data
  const distRes = http.get(`${BASE_URL}/dashboard/districts`);
  check(distRes, {
    'Districts status 200': (r) => r.status === 200,
    'Districts count >= 8': (r) => JSON.parse(r.body).districts.length >= 8,
  });

  // 3. Public Read-Only API
  const pubRes = http.get(`${BASE_URL}/public/districts`);
  check(pubRes, {
    'Public API status 200': (r) => r.status === 200,
  });

  sleep(1);
}
