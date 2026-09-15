# Solutions — Minimum Number of Moves to Make Palindrome

## Greedy Outer-Pair Matching

Adjacent swaps let any rearrangement be reached, but a greedy that resolves the string from the outside in is optimal: match the outermost pair first using the fewest swaps, then recurse on the inner substring. When `s[left]` and `s[right]` already agree, the pair costs nothing. Otherwise the solution scans inward from `right` for the rightmost occurrence `k` of `s[left]`; bubbling that character rightward to position `right` with `right − k` adjacent swaps fixes the pair, and doing the mirror operation on the leftmost occurrence of `s[right]` is symmetric — each is minimal for its side, and resolving one pair never makes the inner subproblem more expensive.

The interesting case is when no partner exists in `(left, right]`: then `s[left]` is the odd middle character of the eventual palindrome (the input guarantees at most one such character), and swapping it one step toward the center — cost 1 — and retrying is optimal, because the middle character must end up adjacent to the shrinking window anyway. The loop then continues with the same `left`, and since the string length is at most 2000, even a middle character that must walk halfway across costs only O(n) swaps total.

Each outer pair is settled with one rightward bubble, so the whole algorithm is a two-pointer sweep whose work is dominated by those bubble passes — quadratic in the worst case (for example, a string in reverse-palindrome order), but trivially fast for `n ≤ 2000`. The string is copied into a list because Python strings are immutable and the swaps mutate it.

**Complexity:** `O(n²)` time, `O(n)` space.
