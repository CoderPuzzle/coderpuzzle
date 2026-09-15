# Solutions — Greatest English Letter in Upper and Lower Case

## Case-presence scan from Z down to A

A letter qualifies the moment the input contains it in both cases, and the
answer is the greatest such letter — so the whole problem reduces to
knowing which letters appear, in which case. Two small tables (or two
sets) record that in one pass: walk `s` and mark each character in the
half of the alphabet its case belongs to, lowering the comparison to
fixed-size storage no matter how long the string is.

With the presence information in hand, scan the alphabet from `Z` down to
`A` and return the first letter whose lowercase and uppercase slots are
both set. Scanning high-to-low makes the "greatest" requirement free: the
first hit is the answer. If the scan exhausts all 26 letters without a
hit, no letter occurs in both cases and the empty string is returned. The
examples fall out directly — `"lEeTcOdE"` sets `E` in both cases and
nothing higher, while `"AbCdEfGhIjK"` never sets any letter in both.

**Complexity:** `O(n)` time, `O(1)` space.
