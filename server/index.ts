import app from './app';
Bun.serve({
    hostname: '0.0.0.0', // defaults to "0.0.0.0"
    fetch: app.fetch,
});
console.log('senkai');
