# Solutions

All approaches simulate the creation sequence with a set of used names.
The naive one re-probes `name(1)`, `name(2)`, ... from scratch on every
collision; the presented one remembers, per base name, where the last
probe stopped. That turns the amortized probing cost into constant time
per created name without changing the answers — the smallest valid `k`
never moves backwards.

## Used-Set With Per-Base Next-Suffix Memory

Keep a hash set `used` of every name assigned so far, and a map
`next` from a base string to the smallest suffix value not yet ruled out
for it. When creating `names[i]`: if it is unused, take it as is (record
`next[name] = 1`). Otherwise start probing at `k = next[base]` (where the
base of a colliding requested name is the name itself), forming
`name(k)` until an unused candidate appears, then record that candidate's
own base memory (`next[candidate-base] = k + 1` when the candidate ends
in `(digits)`), insert everything touched into `used`, and advance the
base's memory past the chosen `k`. Each probe either succeeds or
permanently advances some memory, so total work is linear in output size.

**Complexity:** `O(total characters + probes)` = effectively `O(n · L)`
time for names of length up to `L`; space `O(n · L)` for the used set and
the memory map.
