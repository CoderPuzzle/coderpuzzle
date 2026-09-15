# Solutions — Count Almost Equal Pairs II

## Two-Swap Reachability over a Frequency Map

Although the two operations may be spent on either number, splitting
them never helps. The minimum number of digit swaps that reshapes one
zero-padded digit string into another is zero exactly on equality,
symmetric, and obeys the triangle inequality, so rerouting both numbers
through an intermediate value costs at least as much as reshaping one
onto the other directly. Two integers are therefore almost equal exactly
when one of them can be turned into the other's value by at most two
swaps of its own digits — comparing them padded with leading zeros to
the longer length. The padding is what lets `1023` become `0213`, which
is `213`, or lets `1` meet `100` as `001`; adding further common zeros
only appends positions where both strings hold `0`, so any common width
gives the same verdict. Note the first example pins this one-sided
reading: `1023` and `2130` need three swaps to meet directly and do not
pair, even though each could reach `2310` with swaps to spare.

So pad every number to the widest width `w` in the array (`w <= 7`,
since `nums[i] < 10⁷`) and enumerate its whole reachable set: applying a
first swap to one of `C(w,2)` position pairs and optionally a second to
another yields at most `1 + 21 + 441` distinct values, deduplicated into
a set. Sweep the array left to right with a frequency map of the numbers
already processed; for the current number, add `freq[v]` summed over
every reachable value `v`, and only then increment `freq[nums[i]]`. Each
qualifying pair `(i, j)` is counted exactly once, when the later element
queries the earlier element's actual value through the map. Equal digit
multisets alone do not imply almost equality — rearranging `1023` into
`3102` takes three swaps — so the exact enumeration cannot be replaced
by sorting digits.

The reachable-set enumeration costs `O(C(w,2)² · w)` per number and the
sweep performs at most `463` hash-map probes per element, a few million
cheap steps at the caps `n = 5000`, `w = 7`. The frequency map and the
per-element sets use `O(n + C(w,2)²)` space, and the answer is at most
`C(5000, 2) ≈ 1.25 * 10⁷`, safely inside 32-bit range.

**Complexity:** `O(n · w⁵)` time, `O(n + w⁴)` space.
