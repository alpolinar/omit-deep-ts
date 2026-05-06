function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function nativeOmit(obj: Record<string, unknown>, props: string[]): Record<string, unknown> {
  const result = { ...obj };
  for (const prop of props) {
    delete result[prop];
  }
  return result;
}

export function omitDeep<T>(input: T, props: string | string[], ...rest: string[]): T {
  const propsArray: string[] = Array.isArray(props) ? props : [props, ...rest];
  function recurse(obj: unknown): unknown {
    if (obj === undefined) return obj;
    if (!Array.isArray(obj) && !isPlainObject(obj)) return obj;
    if (Array.isArray(obj)) return obj.map(recurse);

    const o: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      o[key] = !isNil(value) ? recurse(value) : value;
    }
    return nativeOmit(o, propsArray);
  }
  if (Array.isArray(input)) {
    return input.map(recurse) as unknown as T;
  }
  return recurse(input) as T;
}
