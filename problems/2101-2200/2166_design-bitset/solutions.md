# Solutions — Design Bitset

## Lazy flip flag over a byte array

The trap in this contract is `flip()`: taken literally it rewrites every
bit, and with up to `10⁵` calls over a `10⁵`-bit set the naive walk is
`10¹⁰` bit writes. But flipping twice is the identity, so the entire history
of flips collapses to a single parity bit. The set therefore stores its
array in a _storage orientation_ together with one boolean `flipped` flag,
and the effective value of bit `i` is defined as `storage[i] XOR flipped` —
no mutation ever needs to touch more than one slot to keep that invariant
true.

`fix(idx)` and `unfix(idx)` write the effective bit: when
`storage[idx] XOR flipped` already equals the target value they are the
documented no-ops, and otherwise they store the value that complements back
through the flag (`1 - flipped` for `fix`, `flipped` for `unfix`) while a
maintained `ones` counter moves by one. `flip()` merely toggles the flag and
re-derives the counter as `size - ones`, which makes `all()`, `one()`, and
`count()` plain counter reads. `toString()` — capped at five calls by the
constraints — is the only place the flag is applied per bit again, emitting
`storage[i] XOR flipped` down the line.

Every mutator and every counter query is constant work; only `toString`
scans, at `O(size)` each. The array itself is the whole footprint.

**Complexity:** `O(1)` time per `fix`/`unfix`/`flip`/`all`/`one`/`count`,
`O(size)` per `toString`, `O(size)` space.
