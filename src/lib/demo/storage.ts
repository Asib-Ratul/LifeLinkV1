/** Fictional demo state only. Do not store real medical or personal information here. */
export function readDemoValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeDemoValue<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing, disabled storage, or a full quota should not break the demo.
  }
}

export function clearDemoData(): void {
  if (typeof window === "undefined") return;
  for (const key of Object.keys(window.localStorage)) {
    if (key.startsWith("lifelink-demo:")) window.localStorage.removeItem(key);
  }
}
