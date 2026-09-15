# Solutions — Lexicographically Smallest Equivalent String

## Union-Find with Smallest Representative

Each pair (s1[i], s2[i]) asserts that two characters are equivalent, and equivalence closes under reflexivity, symmetry, and transitivity — the exact behavior of connected components in a graph over the 26 letters, maintained incrementally by a union-find structure. The key trick is that the union rule itself encodes the answer: when merging two components, the code always attaches the larger root under the smaller root, so every component's root is automatically its lexicographically smallest letter. No per-component minimum tracking is needed.

The find operation uses path halving (each visited node is re-pointed at its grandparent), which flattens trees as it walks; over a 26-element universe this is effectively constant time per operation. The code walks zip(s1, s2), looks up both roots, and skips unions that are already in the same component.

Finally, baseStr is translated in one pass: each character maps to the root of its component, which by construction is the smallest equivalent letter. Edge cases are inherent — letters never mentioned in s1/s2 remain singleton components and map to themselves, and reflexive pairs (a letter equivalent to itself) trigger no union. Since every find is on a fixed 26-node structure, the cost is dominated by the linear scans of the two strings.

**Complexity:** `O(|s1| + |baseStr|)` time, `O(1)` space.
