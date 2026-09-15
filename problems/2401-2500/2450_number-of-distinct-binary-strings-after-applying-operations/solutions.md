# Solutions — Number of Distinct Binary Strings After Applying Operations

## Modular exponentiation on the window count

A flip is applied to one of the `n - k + 1` contiguous size-`k` windows, and
the hints point out the two facts that make the problem a counting exercise:
the answer depends only on the string's length, and each window may be flipped
or left alone independently. So the reachable strings are exactly the `2^e`
choices, one per subset of window starts, where `e = n - k + 1`.

The independence is what needs a proof: no two different subsets of flips can
produce the same string. Working mod 2, flipping window `i` toggles the `k`
bits `i .. i+k-1`. The first window is the only one touching position 0, so
its bit in any toggling combination is forced by the result; once window 0 is
known, window 1 is the only remaining one touching position 1, and so on —
every subset is recovered uniquely from its output string. The answer is
therefore `2^e mod (10⁹+7)`.

The code computes that power by binary exponentiation: square the base and
fold a multiplication into the result whenever the current exponent bit is
set. The modular products involve values below `10⁹+7`, so the typed
languages hold the running product in 64 bits and JavaScript uses `BigInt`
for the same exactness.

**Complexity:** `O(log n)` time, `O(1)` space.
