# Solutions — Minimum Operations to Sort a Permutation

## Compressed state BFS

The two operations only produce rotations of `nums` and rotations of
`reverse(nums)`. Represent every reachable array as `(type, shift)`, where
`type = 0` uses rotations of the original array and `type = 1` uses rotations
of its reverse.

Rotating left advances the shift. Reversing toggles the type and maps the
shift to `(n - shift) % n`. Run BFS from the initial state to the state whose
family contains the sorted array.

**Complexity:** `O(n)` time, `O(n)` space.
