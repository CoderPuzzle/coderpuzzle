# Solutions — Bitwise XOR of All Pairings

## XOR parity trick

The pairing array contains `n * m` values `a_i ^ b_j` (with `n = len(nums1)`, `m = len(nums2)`), and the task is the XOR of all of them. Expand the double sum: every element of `nums1` appears once per element of `nums2` — `m` times — and every element of `nums2` appears `n` times. Since a value XOR-ed with itself an even number of times cancels to 0, parity is all that survives: `nums1` contributes its overall XOR exactly when `m` is odd, and `nums2` contributes exactly when `n` is odd.

The implementation is therefore two linear scans and one conditional XOR: fold `nums1` into the answer if `len(nums2)` is odd, fold `nums2` in if `len(nums1)` is odd, and return. If both lengths are even the answer is 0 regardless of contents, and if one length is odd the other array's contents are irrelevant beyond its own XOR — a striking collapse from `10^10` pair values to at most `2 * 10^5` XOR operations.

No extra data structures are needed; the accumulations run in a couple of integer registers.

**Complexity:** `O(n + m)` time, `O(1)` space.
