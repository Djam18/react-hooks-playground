import React from 'react';

const LANGUAGES = ['', 'JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++'];

function LanguageFilter({ selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={e => onChange(e.target.value)}
      style={{ padding: '6px', marginLeft: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
    >
      <option value="">All languages</option>
      {LANGUAGES.filter(l => l).map(lang => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}

export default LanguageFilter;
