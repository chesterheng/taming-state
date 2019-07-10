export const byQuery = query => item =>
  !query || item.name.toLowerCase().includes(query.toLowerCase());
