# Solutions — Check if String Is Decomposable Into Value-Equal Substrings

A decomposition into value-equal substrings is governed by the lengths of
the maximal runs of identical digits.

## Classify maximal runs by length modulo 3

A decomposition is forced locally: characters equal to their neighbors must
stay inside one value-equal block, so the string splits into maximal runs
of identical digits, and each run is partitioned into pieces of length 2
or 3 independently. A run of length `L` can be built from 3s and a single
2 exactly when `L % 3` is 0 (all 3s) or 2 (one 2 plus 3s); `L % 3 == 1`
is impossible because no combination of 2s and 3s sums to 1 mod 3. Since
the whole decomposition may contain at most one length-2 piece, exactly
one run may have `L % 3 == 2` and none may have `L % 3 == 1`.

The scan walks the string once, extending each run with an inner pointer
and classifying its length. It bails out early on a 1-mod-3 run or on a
second 2-mod-3 run, and returns `true` at the end precisely when a single
2-mod-3 run was seen. The check is a pure left-to-right pass, so no
recursion or auxiliary storage beyond the run counter is involved.

**Complexity:** `O(n)` time, `O(1)` space.
