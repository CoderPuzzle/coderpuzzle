# Approaches

## Greedy digit removal

A number is divisible by three exactly when its digit sum is. So among all
sub-multisets of `digits`, the best answer uses as many digits as possible with
a sum divisible by three: first maximize the digit count, then arrange the
chosen digits in descending order to make the value largest.

Count how many times each digit appears and take the total sum's remainder
modulo 3:

- Remainder 0: keep every digit.
- Remainder 1: drop one digit that is 1, 4, or 7 (the smallest available); if
  none exists, drop two digits from {2, 5, 8} (the two smallest available).
- Remainder 2: symmetrically, drop one digit from {2, 5, 8}; if none exists,
  drop two digits from {1, 4, 7}.

Each removal costs the fewest digits possible, so no larger multiset works, and
dropping smallest digits keeps the concatenation maximal. If even these
removals are impossible, no non-empty subset has a sum divisible by three.

Emit the surviving digits in descending order; if everything was dropped or the
result is all zeros, return `"0"` when any zero remains and `""` otherwise.

**Complexity:** `O(n)` time, `O(1)` space (the count table has ten slots).
