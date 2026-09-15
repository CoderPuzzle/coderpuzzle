# Solutions — Truncate Sentence

Words are separated by single spaces with nothing hanging off the ends, so
the first `k` words form a plain prefix of the sentence — the answer is
everything before the `k`-th space.

## Cut at the k-th space

Walk the characters once and count spaces: each space closes exactly one
word. When the count reaches `k`, the current index sits on the separator
that follows the k-th word, so `s[:i]` — everything before it — is the
truncated sentence, returned without scanning the remainder. If the walk
ends without a k-th space, `k` equals the word count and the whole string is
already the answer.

On `"Hello how are you Contestant"` with `k = 4`, the fourth space sits at
index 18, and the prefix `"Hello how are you"` comes back in one slice.

**Complexity:** `O(n)` time, `O(n)` space for the returned slice, where `n`
is the length of `s`.
