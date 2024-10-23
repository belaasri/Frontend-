import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setDownloadUrl(data.downloadUrl);
      }
    } catch (err) {
      setError('Failed to fetch the download link.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>YouTube Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ width: '300px', padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Download</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {downloadUrl && (
        <div>
          <h3>Download Ready:</h3>
          <a href={downloadUrl} download>Click here to download</a>
        </div>
      )}
    </div>
  );
}
