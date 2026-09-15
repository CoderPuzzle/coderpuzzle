# Solutions — Count of Interesting Subarrays

## Prefix Counts with a Hash Map

First replace every element by an indicator: only whether `nums[i] % modulo == k` matters, never the value itself. A subarray is interesting when the count of indicators inside it, taken modulo `modulo`, equals `k`. That reframing turns the problem into counting subarrays whose indicator sum has a fixed residue — the classic prefix-sum-with-hash-map pattern, applied to residues instead of raw sums.

Let `pref` be the number of hits among the first `i` elements. A right endpoint at position `i` pairs with every earlier left boundary `l` where `pref[right] - pref[l] ≡ k (mod modulo)`, i.e. `pref[l] ≡ (pref[right] - k) mod modulo`. So the algorithm sweeps once, maintaining a hash map from residue to frequency of prefixes seen so far: for each element, update `pref`, add `count[(pref - k) mod modulo]` to the answer, then increment `count[pref mod modulo]`. Seeding the map with residue `0` once accounts for the empty prefix, which is what makes single-element and full-array subarrays count correctly.

Two details are worth noting. The language's modulo must yield a non-negative residue so map lookups are consistent — Python's `%` already does. And the map can hold at most `min(n, modulo)` distinct residues (frequently far fewer), since `modulo` may exceed the array length; either way the sweep stays linear.

**Complexity:** `O(n)` time, `O(min(n, modulo))` space.
