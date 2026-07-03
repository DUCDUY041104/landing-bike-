const https = require('https');
const url = 'https://xedienthoinay.blogspot.com/feeds/posts/default?alt=json&max-results=3';
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('status', res.statusCode);
    try {
      const parsed = JSON.parse(data);
      console.log('keys', Object.keys(parsed));
      const feed = parsed.feed;
      console.log('feed ok', !!feed);
      const entry = feed?.entry;
      console.log('entry type', typeof entry, Array.isArray(entry));
      console.log('entry count', Array.isArray(entry) ? entry.length : entry ? 1 : 0);
      const first = Array.isArray(entry) ? entry[0] : entry;
      if (first) {
        console.log('id', first.id?.$t);
        console.log('title', first.title?.$t);
        console.log('published', first.published?.$t);
        console.log('link count', Array.isArray(first.link) ? first.link.length : 0);
        console.log('alternate', Array.isArray(first.link) ? first.link.filter(l => l.rel === 'alternate' && l.type === 'text/html').map(l => l.href) : []);
        console.log('content exists', !!first.content?.$t);
        console.log('media thumbnail', first.media$thumbnail);
      }
    } catch (err) {
      console.error('parse error', err);
      console.error(data.slice(0, 2000));
    }
  });
}).on('error', err => console.error('fetch error', err));
