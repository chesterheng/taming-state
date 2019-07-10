export const byQuery = query => item =>
  !query || item.name.toLowerCase().includes(query.toLowerCase());

export const byArchived = archivedItems => item =>
  !archivedItems.includes(item.id);
