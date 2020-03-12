import React from 'react';

function RepoCard({ repo }) {
  console.log('RepoCard rendered:', repo.name);

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '4px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: 'bold', color: '#0366d6' }}>
            {repo.full_name}
          </a>
          <p style={{ color: '#666', fontSize: '13px', margin: '4px 0' }}>
            {repo.description || 'No description'}
          </p>
        </div>
        {repo.language && (
          <span style={{ backgroundColor: '#e1f5fe', color: '#0277bd', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', whiteSpace: 'nowrap' }}>
            {repo.language}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666', marginTop: '8px' }}>
        <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
        <span>🍴 {repo.forks_count.toLocaleString()}</span>
        {repo.open_issues_count > 0 && <span>🐛 {repo.open_issues_count} issues</span>}
      </div>
    </div>
  );
}

export default RepoCard;
