# Solutions — Palindrome Pairs

## Hash map with palindrome splits

Checking all `O(n^2)` pairs is far too slow; instead every word is put into a hash map from word to index, and the search is reorganized around each word's own splits. For a concatenation `words[i] + words[j]` to be a palindrome, one of the two halves must already be a palindrome and the other half must be the mirror image of its counterpart: if the prefix of `words[j]` is a palindrome, then a word equal to `reverse(suffix of words[j])` can stand on the left; symmetrically, if the suffix of `words[j]` is a palindrome, a word equal to `reverse(prefix)` can stand on the right.

The code enumerates, for each word `w` at index `j`, every cut position from 0 to `len(w)` inclusive, splitting `w` into prefix and suffix. When the prefix is a palindrome it looks up `reverse(suffix)` in the map and emits the pair `(found, j)`; when the suffix is a palindrome it looks up `reverse(prefix)` and emits `(j, found)`. The `index != j` check stops a word from pairing with itself, and the guard `cut != length` on the second branch prevents the full-string case from being emitted twice — the pair `w + reverse(w)` is already discovered from the perspective of the partner word at cut 0, since `reverse(w)`'s empty prefix is a palindrome.

Edge cases fall out naturally: the empty string, whose empty prefix and suffix are both palindromes, pairs with any palindromic word in both orders; palindromic words pair with each other in both orders; and a set (rather than a list) collects results so the same pair discovered via several cut positions is deduplicated, with a final sort giving a canonical order. Per word of length `L`, the `L + 1` cuts each cost `O(L)` for the slice, reversal, and palindrome test.

**Complexity:** `O(Σ|wᵢ|²)` time (plus the sort of the returned pairs), `O(n + P)` space where `P` is the number of reported pairs.
