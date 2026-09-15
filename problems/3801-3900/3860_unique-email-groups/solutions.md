# Solutions — Unique Email Groups

Two addresses belong to the same group exactly when their normalized forms
are identical, so the task reduces to normalizing every address and counting
the distinct results.

## Normalize into a canonical key

For each address, split at the first `'@'`. The local part is cut at the
first `'+'` if one exists, every `'.'` is removed, and the remainder is
lowercased; the domain part is simply lowercased. Joining the two with `'@'`
gives a canonical key that represents the address's whole group.

Every character of every email is visited a bounded number of times, so the
work is linear in the total input size. Only one key is kept per group, so
the space used is the total length of the normalized addresses that survive.

**Complexity:** `O(L)` time, `O(U)` space, where `L` is the total number of
characters across all emails and `U` is the number of unique groups.
