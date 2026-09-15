# Solutions — Contains Duplicate III

## Sliding window of value buckets

The condition is two ranges at once — index gap at most `indexDiff`, value gap at most `valueDiff` — so keep the last `indexDiff` values as a window and, for each incoming value `x`, ask whether any window value lies in `[x - valueDiff, x + valueDiff]`. An ordered window answers that with the two nearest neighbors in `O(log k)`, but only three of the seven ports ship a tree type (`TreeMap`, `std::set`, `BTreeSet`); Python, Go, JavaScript and TypeScript would have to fall back to a sorted array with `O(k)` inserts. Buckets by value need nothing but the hash map every port already has: split the value axis into buckets of width `valueDiff + 1` and map bucket id to the one live window value inside it.

One value per bucket is enough because two values in the same width-`valueDiff + 1` bucket differ by at most `valueDiff` — a same-bucket hit is already a "yes", which is also why the map never has to hold two values per bucket. Buckets adjacent in id need a real comparison, since their values can sit `2 · valueDiff` apart: check `x - below <= valueDiff` and `above - x <= valueDiff` against the occupants of `bucket - 1` and `bucket + 1`. Before each step, the value that just fell out of the window — the one at `index - indexDiff - 1` — has its bucket deleted, so the map always mirrors exactly the live window. `valueDiff = 0` degenerates cleanly into width-1 buckets, a plain seen-set of exact values, and floor division (Python `//`, `Math.floorDiv`, `div_euclid`, `Math.floor`) is what makes negative values land in the bucket they belong to.

Values span ±10⁹, so a qualifying pair can differ by 2 · 10⁹ — one past `int32` — and every port computes values, bucket ids and differences in the 64-bit parameter type; in JavaScript and TypeScript the same integers sit far inside `number`'s exact-integer range, and `Math.floor(x / width)` is exact because no quotient here comes anywhere near a rounding boundary.

**Complexity:** `O(n)` expected time, `O(min(n, indexDiff))` space.
