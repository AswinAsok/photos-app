type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | Record<string, boolean | undefined | null>;

export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const item of classes) {
    if (!item) continue;

    const type = typeof item;

    if (type === 'string' || type === 'number') {
      result.push(String(item));
    } else if (Array.isArray(item)) {
      const inner = cn(...item);
      if (inner) result.push(inner);
    } else if (type === 'object') {
      for (const key in item as Record<string, boolean | undefined | null>) {
        if ((item as Record<string, boolean | undefined | null>)[key]) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ');
}
