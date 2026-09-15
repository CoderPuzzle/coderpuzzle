# Solutions — Count Residue Prefixes

## Single pass with a running seen-set

A prefix is a residue when its distinct-character count equals its length
modulo 3, so the answer is a stream of per-position decisions. The distinct
count of the growing prefix only changes when a character appears for the
first time, which means one left-to-right pass can carry it: a seen-set (a
26-entry table in the static languages) absorbs each character, and after
the i-th character it holds exactly the distinct characters of the prefix
of length i. The residue test is then a single comparison against i % 3.

No multiple-of-3 length can ever qualify, since every non-empty prefix has
at least one distinct character and i % 3 is 0 exactly at those lengths —
the comparison absorbs that fact with no special-casing. The very first
prefix always counts (one distinct character, length 1), so the answer is
never zero, and the pass returns its count after one traversal.

**Complexity:** `O(n)` time, `O(1)` space.
