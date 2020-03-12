// GitHub API - encore une fois: CLI Python → React frontend. La boucle.
export async function searchRepos(query, language = '') {
  let url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`;
  if (language) url += `+language:${language}`;
  url += '&sort=stars&order=desc&per_page=20';

  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
    // TODO: ajouter auth token pour eviter rate limiting
    // 'Authorization': 'token ghp_xxx' <- non! pas dans le code!
  });

  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  return res.json();
}

export async function getRandomRepo(language = '') {
  // GitHub search with random offset
  const randomPage = Math.floor(Math.random() * 10) + 1;
  let url = `https://api.github.com/search/repositories?q=stars:>100`;
  if (language) url += `+language:${language}`;
  url += `&sort=stars&order=desc&per_page=1&page=${randomPage}`;

  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });

  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  const data = await res.json();
  return data.items[0] || null;
}
