# Solutions — Lexicographically Smallest String After Substring Operation

## Greedy: shrink the first run of non-'a' letters

Decrementing a letter helps exactly when that letter is not `'a'`: the
changed position drops by one, and the first position where a candidate
differs from `s` decides the comparison. So the best operation starts at
the first non-'a' letter — touching any earlier position would turn an
`'a'` into `'z'`, which loses immediately against every candidate that
leaves that `'a'` alone. Starting there and walking right, extending the
operation through another non-'a' letter is always strictly better than
stopping before it (the letter falls to its predecessor instead of
staying put), while crossing the next `'a'` is always strictly worse
(it would plant a `'z'` at a position that could have kept `'a'`,
regardless of what happens beyond it). One contiguous run — the maximal
run of non-'a' letters beginning at the first non-'a' letter — is
therefore the whole optimum; later runs never matter, because improving
position `i` dominates anything that might happen after it.

Concretely: scan for the first letter that is not `'a'`, decrement every
letter of the consecutive non-'a' run starting there, and stop at the
next `'a'` or the end of the string. If no such letter exists the string
is all `'a'`s, where no edit improves anything yet the mandatory
operation must still change something — every choice produces at least
one `'z'`, so the smallest result pushes that `'z'` as far right as it
can go: wrap only the last letter, giving `"a…az"`.

**Complexity:** `O(n)` time, `O(1)` extra space.
