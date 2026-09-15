# Solutions — Lexicographically Smallest String After a Swap

## Greedy swap at the first same-parity descent

A legal swap either changes nothing (equal digits) or moves a bigger digit
right and a smaller digit left. If it acts on the first position of
difference, a descending pair makes the string smaller while any other pair
makes it larger. So the only candidates that can beat doing nothing are the
descending same-parity pairs, and among those, the earliest one wins: it
lowers an earlier position than every rival, which no later swap can
compensate for.

The scan walks `s` once looking for the first index where `s[i] > s[i + 1]`
and both digits share parity. Swapping there and stopping immediately is
optimal — at most one swap is allowed anyway, and no later legal descent can
produce something smaller than improving this earliest position. If the scan
finds no such pair, every legal swap would worsen the string or be an
identity, so `s` itself is already the answer.

Most languages here hand out immutable strings, so each solution copies the
text into a mutable buffer first — a char list in Python, a `char[]` in Java,
a byte slice in Go, a byte vector in Rust, a char array in JavaScript and
TypeScript — and C++ scans its mutable string directly. The copy is forced by
the language; the algorithm itself touches each adjacent pair once.

**Complexity:** `O(n)` time, `O(n)` space.
