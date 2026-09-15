# Solutions — Find Xor-Beauty of Array

## XOR fold via per-bit counting

Enumerating all `n³` triplets is hopeless at `n = 10⁵`, but per individual
bit position the giant expression collapses. Bit `b` of the effective
value `((nums[i] | nums[j]) & nums[k])` is `1` exactly when the `k`
element carries that bit and at least one of `i`, `j` does, so a triplet
contributes an odd number of flips for bit `b` precisely under
counting conditions on which array elements hold the bit.

Counting those conditions: the number of `(i, j)` pairs with at least one
set bit among the two has parity equal to the count of set-bit elements
(squares don't change parity), and multiplying by — i.e. AND-ing with —
the `k` selection keeps parity as that same count squared. The total flip
count for bit `b` across every triplet is therefore "number of elements
with bit `b` set, mod 2", which builds the answer bit by bit exactly the
way hint 2 suggests.

The punchline: "keep bits held by an odd number of elements" is just XOR.
One linear fold of `^` across `nums` produces the whole xor-beauty. All
values are below `10⁹` (under `2³⁰`), so intermediate results stay inside
32 bits everywhere and far inside JavaScript's exact-Number bound; no
wider arithmetic is needed.

**Complexity:** `O(n)` time, `O(1)` space.
