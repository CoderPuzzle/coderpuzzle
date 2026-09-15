# Solutions — Single Number III

## XOR Split by Lowest Set Bit

XOR-ing the entire array cancels every value that appears twice (a pair XORs to zero), leaving `total` = the XOR of exactly the two values that appear once. That mixed value cannot be zero, because the two singles are distinct — and every set bit in it marks a position where the two singles differ, which is the handle needed to pull them apart.

Isolating the lowest set bit with `mask = total & -total` (the two's-complement negation keeps that bit and flips all lower bits, so the AND leaves exactly it) splits the array into two groups: values with that bit set and values without. Identical duplicates always land in the same group and cancel each other again, while the two singles — differing at that bit — land one per group. XOR-ing the masked group therefore yields one single, `first`; the other follows for free as `total ^ first`, since XOR-ing both singles gives `total`.

The final `sorted` of the two-element list is constant work and only normalizes the output order. Two linear passes and a handful of integer variables satisfy the required linear time and constant extra space; Python's arbitrary-precision integers make `total & -total` behave exactly like the classic 32-bit trick with no overflow concerns.

**Complexity:** `O(n)` time, `O(1)` space.
