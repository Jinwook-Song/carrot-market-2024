export function cls(...classNames: string[]) {
  return classNames.join(' ');
}

export function formatPrice(price: number, locale = 'ko-KR'): string {
  switch (locale) {
    case 'ko-KR':
      return `${price.toLocaleString(locale)}원`;
    default:
      return `${price.toLocaleString(locale)}원`;
  }
}

export function formatTimeAgo(date: string | Date): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time =
    typeof date === 'string' ? new Date(date).getTime() : date.getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);
  const formatter = new Intl.RelativeTimeFormat('ko');
  return formatter.format(diff, 'days');
}

export async function sleep(ms = 3000) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
