import React, { useState } from 'react';
import RepoCard from './RepoCard';
import LanguageFilter from './LanguageFilter';
import { searchRepos, getRandomRepo } from './api';

// roadmap.sh "GitHub Random Repository"
// CLI Python → React frontend. La boucle est bouclee.
function Explorer() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('Explorer rendered');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await searchRepos(query, language);
      setRepos(data.items || []);
      console.log('found repos:', data.total_count);
    } catch (err) {
      setError(err.message);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    setLoading(true);
    setError(null);
    try {
      const repo = await getRandomRepo(language);
      setRepos(repo ? [repo] : []);
      setQuery('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>GitHub Explorer (roadmap.sh)</h3>
      <p style={{ fontSize: '12px', color: '#666' }}>Python CLI → React. Same idea, different stack.</p>

      <form onSubmit={handleSearch} style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search repositories..."
          style={{ padding: '6px', width: '200px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <LanguageFilter selected={language} onChange={setLanguage} />
        <button type="submit" style={{ marginLeft: '10px', padding: '6px 12px', cursor: 'pointer' }}>
          Search
        </button>
        <button type="button" onClick={handleRandom} style={{ marginLeft: '5px', padding: '6px 12px', cursor: 'pointer' }}>
          Random
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && repos.length > 0 && (
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>{repos.length} results</p>
          {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
        </div>
      )}

      {!loading && repos.length === 0 && !error && (
        <p style={{ color: '#999' }}>Search for repos or click Random</p>
      )}
    </div>
  );
}

export default Explorer;
