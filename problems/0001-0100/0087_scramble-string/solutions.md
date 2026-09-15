# Solutions — Scramble String

## Memoized recursion with letter-count pruning

The scramble procedure is itself recursive, so the test mirrors it directly: `solve(a, b)` asks whether `b` is a scrambled `a`. When `a` splits into `a[:i] + a[i:]`, the two halves either keep their order — matched against `b` split at the same index — or they swap, matched against `b` split from the other end; the pair is a scramble exactly when some split makes both halves match in one of the two alignments. Two one-character strings match by equality, which is the base of the recursion.

What keeps the exponential swap tree tractable is that a scramble can never add or remove a letter. Every call therefore compares a 26-way letter count of `a` against `b` before doing anything else and returns false on any mismatch; because the check opens every call, each split's children are cut off before they can recurse deeper, and only anagram-consistent pairs ever multiply. Each pair that survives the guard is memoized, so no `(a, b)` pair is ever explored twice, and identical strings short-circuit to true immediately.

An interval dynamic program over `(index, index, length)` reaches the same answers bottom-up, but it replaces the definition with a three-index table and gains nothing at the stated ceiling: with `n` at most 30 the pruned recursion resolves even adversarial balanced ternary inputs in milliseconds, in every offered language, while staying a line-by-line transcription of the procedure the statement describes.

**Complexity:** pessimistically `O(n⁴)` substring-pair states times `O(n)` splits with `O(n)` counting each — `O(n⁶)` before pruning, which the anagram guard cuts to milliseconds at `n = 30`; the memo holds one entry per explored pair.
