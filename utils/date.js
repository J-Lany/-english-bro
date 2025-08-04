export const getToday = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
