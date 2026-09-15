# Solutions — Total Characters in String After Transformations I

Simulating the string itself is hopeless — a lone `z` doubles through the
`z -> "ab"` rule, so lengths grow like Fibonacci across the alphabet — but
the answer never needs the string, only how many of each letter exist.

## Count-vector rotation

Keep a 26-entry count vector. One transformation does two things to it:
every count slides one letter up (`d` inherits `c`'s count, `e` inherits
`d`'s, and so on), and the `z` bucket splits, contributing its whole count
to both `a` and `b`. That is a right rotation of the vector with the
z-count re-added at index 1, so each sweep is O(26) work regardless of how
long the string has become.

Reducing `counts[1]` below 10⁹ + 7 on every sweep keeps all entries below
that bound forever (each entry is either carried or a two-term sum), and
the final length is just the bucket total reduced once at the end. The
total peaks around 2.7 × 10¹⁰ — past 32-bit range, so the sum accumulates
in 64-bit integers where they exist; every per-step value stays below
2 × 10⁹, exact in JavaScript's doubles. The count pass is one linear scan
and the sweep pass is `t` rotations, so even `t = |s| = 10⁵` is trivial.

**Complexity:** `O(|s| + t)` time, `O(1)` space.
