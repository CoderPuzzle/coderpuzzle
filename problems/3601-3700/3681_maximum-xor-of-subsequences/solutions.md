# Solutions — Maximum XOR of Subsequences

## Linear basis greedy

A subsequence's XOR depends only on which positions it picks, never on their
order, so the values `X` can take are exactly the XORs of all subsets of
`nums`. That family is closed under XOR — XOR-ing two subsets' values gives
the value of their symmetric difference, still a subset — so every `X ^ Y`
is itself an achievable subset XOR; conversely any achievable `z` arises as
`z ^ 0` by leaving the second subsequence empty. The task therefore collapses
to producing the largest XOR any subset of `nums` can form.

Gaussian elimination over GF(2) captures that span in one pass. Keep 30
slots indexed by bit position (`nums[i] <= 10⁹ < 2³⁰`); inserting a value
strips its highest set bit against the slot already leading with that bit,
either walking down to a free slot where the reduced value lands, or
collapsing to zero — the value was linearly dependent and carries nothing
new. With the basis built, fold it greedily from bit 29 down: absorb a
slot's vector exactly when it grows the running answer. Each vector leads
with its own bit and higher steps settle strictly higher bits, so this
local rule reaches the true maximum of the span; an all-zero input leaves
every slot empty and answers 0.

Values stay below 2³⁰, hence answers too, and every fixed-width language
holds them in signed 32-bit integers (JavaScript's bitwise operators are
32-bit, so plain numbers work there as well). All loops are bounded by the
array length or the 30-bit width — nothing recurses.

**Complexity:** `O(30n)` time, `O(1)` space.
