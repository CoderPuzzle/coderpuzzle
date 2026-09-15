# Solutions — Create Object from Two Arrays

## First-Occurrence Sweep with Own-Key Probing

Make one ascending pass over the pairs, converting each key with
`String(keysArr[i])` and storing the value only when that string is not
already an own property of the result: `if
(!Object.prototype.hasOwnProperty.call(obj, key)) obj[key] = valuesArr[i]`.
Scanning left to right and never overwriting makes "first occurrence wins"
fall out for free — the first index that produces a coerced key is the only
one that ever writes it, and every later duplicate is skipped in constant
time.

The membership probe is the whole trick. `key in obj` is wrong because `in`
walks the prototype chain: an input key like `"toString"` or
`"constructor"` would look already-present on a fresh `{}` and be dropped
even though it was never stored. Truthiness (`if (!obj[key])`) is wrong
twice over — a stored falsey value looks missing, and a falsey _key_ such
as `0`, `false`, or `""` still deserves a slot after coercion (String("")
is the perfectly valid empty-string key). `hasOwnProperty` asks exactly the
right question: has _this object itself_ ever written this exact string?

Only keys are coerced; values are copied as-is, so `null` stays `null` and
an array value survives as an array rather than being stringified into its
join. Every element is visited once and String() is linear in the key's
size, so the sweep costs time proportional to the total input size, with
space for one entry per surviving key.

**Complexity:** `O(n)` time, `O(k)` space, where `n` is the total serialized
size of both arrays and `k` is the number of distinct first-occurrence keys.
