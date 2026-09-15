# Solutions — Left and Right Sum Differences

The naive reading builds both helper arrays explicitly: `leftSum` by one
sweep, `rightSum` by another, then a third pass combining them
element-wise. All three sweeps carry the same information, and there is a
cheaper bookkeeping identity: because `leftSum[i] + rightSum[i] +
nums[i]` always equals the array's grand total, once that total is known
each `rightSum` entry is just subtraction away from the running left
prefix.

## One-pass running balance

Compute `total` in one sweep, then walk forward holding only `left`, the
sum of elements already passed: at each index the right side is `total -
left - nums[i]`, so `answer[i] = |left − (total − left − nums[i])|`
without ever materializing either helper array. The largest intermediate
is the total itself, at most `1000 × 10⁵ = 10⁸`, comfortably inside
32-bit range everywhere; the C++, Go, and Rust versions widen to 64-bit
anyway out of habit of the prefix-sum rule, while Python and JavaScript
arbitrary-precision/double integers are exact far beyond it. An O(n²)
per-index rescan computes identical results and serves as the case
generator's independent oracle, but doubles and squares the work for no
benefit.

**Complexity:** `O(n)` time, `O(1)` auxiliary space beyond the output.
