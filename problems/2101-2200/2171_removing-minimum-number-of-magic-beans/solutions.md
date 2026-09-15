# Solutions — Removing Minimum Number of Magic Beans

## Sort, then try every kept value as a suffix

An optimal plan always keeps some value `m` and reduces every bag to
either `m` beans or zero: emptying the smallest bags entirely and trimming
the rest to `m` is exactly what the removal rules allow, and no other
shape can do better for that target. Sorting the bags turns each candidate
`m` into one arithmetic expression — when `m` sits at sorted index `i`,
the bags before it are removed whole and every bag from `i` on is trimmed,
so the removals are `total - (n - i) * ordered[i]`.

Scanning the sorted array once evaluates every distinct candidate target
(duplicates just repeat their own value and lose to nothing), and keeping
the minimum is the answer. The running totals reach `10⁵ × 10⁵ = 10¹⁰`,
past 32-bit range in every typed language.

**Complexity:** `O(n log n)` time for the sort plus a linear scan,
`O(n)` space (or `O(1)` extra beyond sorting).
