# Solutions — Group Anagrams

## Sorted-String Hash Key

Two strings are anagrams exactly when they contain the same multiset of characters, and sorting a string canonicalizes that multiset: any two anagrams produce byte-identical sorted strings. So the sorted form of a word is a perfect hash key for its anagram class, while two non-anagrams can never collide on it.

The algorithm makes a single pass over the input. For each word it computes `"".join(sorted(word))` — the word's characters in sorted order — and appends the original word to the list stored under that key in a dictionary (`setdefault` creates the list on first sight of a key). Group membership therefore accumulates automatically: every word lands in exactly one bucket, alongside precisely the words it can be rearranged into. When the pass ends, the dictionary's values are the required groups.

Sorting each word costs `O(L log L)` for a word of length `L`, which dominates the `O(L)` join and hash; over `N` words of maximum length `L` the pass does `O(N · L log L)` work. The dictionary holds every word once under its key (keys are themselves at most length `L`), so the structure uses `O(N · L)` space, matching the size of the output, which no algorithm can avoid.

The approach needs no special cases: the empty string sorts to itself and forms its own group, a lone word forms a singleton group, and duplicates of the same word simply land in the same bucket. (A 26-slot character-count tuple would shave the sort down to `O(L)` per word; this solution favors the sorted-string key for its simplicity, at a `log L` factor.)

**Complexity:** `O(N · L log L)` time, `O(N · L)` space.
