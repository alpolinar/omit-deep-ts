# omit-deep-ts

Drop-in TypeScript replacement for [`omit-deep-lodash`](https://www.npmjs.com/package/omit-deep-lodash) with **zero dependencies**.

Recursively omit specified keys from objects, nested objects, and arrays of objects — fully typed and tree-shakeable.

## Installation

```bash
pnpm add omit-deep-ts
```

```bash
npm install omit-deep-ts
```

```bash
yarn add omit-deep-ts
```

## Usage

```ts
import { omitDeep } from "omit-deep-ts";

// Flat object
omitDeep({ a: 1, b: 2 }, "a");
// → { b: 2 }

// Nested objects
omitDeep({ a: 1, nested: { a: 2, b: 3 } }, "a");
// → { nested: { b: 3 } }

// Arrays of objects
omitDeep([{ a: 1, b: 2 }, { a: 3, b: 4 }], "a");
// → [{ b: 2 }, { b: 4 }]

// Multiple keys (array syntax)
omitDeep({ a: 1, b: 2, c: 3 }, ["a", "b"]);
// → { c: 3 }

// Multiple keys (variadic syntax — drop-in compatible with omit-deep-lodash)
omitDeep({ a: 1, b: 2, c: 3 }, "a", "b");
// → { c: 3 }
```

## API

### `omitDeep<T>(input: T, props: string | string[], ...rest: string[]): T`

Recursively removes the specified keys from `input`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `input` | `T` | The object, array, or value to process. |
| `props` | `string \| string[]` | Key(s) to omit. |
| `...rest` | `string[]` | Additional keys (variadic overload for drop-in compatibility). |

**Returns** a new deep copy of `input` with the specified keys removed. Primitives and `undefined` are returned unchanged. `null` values within objects are preserved as-is.

## Features

- **Zero dependencies** — no lodash, no runtime bloat
- **TypeScript-first** — written in TypeScript with full type declarations
- **Dual format** — ships both CommonJS (`.js`) and ESM (`.mjs`)
- **Source maps** included
- **Drop-in compatible** with `omit-deep-lodash` variadic API
- **Handles edge cases** — `null`, `undefined`, primitives, deeply nested arrays

## Development

### Prerequisites

- Node.js ≥ 24
- pnpm ≥ 10.33.0

> **Tip:** This project includes a [`mise.toml`](./mise.toml) — if you use [mise](https://mise.jdx.dev), the correct tool versions are installed automatically.

### Scripts

```bash
pnpm run build       # Build with tsup (CJS + ESM + .d.ts)
pnpm run dev         # Build in watch mode
pnpm run test        # Run tests with Vitest
pnpm run typecheck   # Type-check without emitting
pnpm run lint        # Lint with Biome
pnpm run format      # Format with Biome
pnpm run check       # Lint + format (auto-fix)
```

### Project Structure

```
omit-deep-ts/
├── src/
│   └── index.ts          # Library source
├── test/
│   └── index.test.ts     # Vitest tests
├── dist/                  # Build output (CJS, ESM, .d.ts, sourcemaps)
├── tsup.config.ts         # tsup bundler config
├── vitest.config.ts       # Vitest config
├── tsconfig.json          # TypeScript config
├── biome.json             # Biome linter/formatter config
└── package.json
```

## License

[MIT](./LICENSE) © [Al Polinar](https://github.com/alpolinar)
