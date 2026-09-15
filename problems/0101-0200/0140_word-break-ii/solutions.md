# Solutions — Word Break II

## Bottom-up prefixes, last word first

The answer is an enumeration, but the statement pins the exact order: compare sentences by their last word, the shorter last word first, ties decided the same way by the words before it. That order is not something to sort into afterwards — it is what a table of prefixes emits naturally. `dp[i]` lists every sentence for the prefix `s[:i]`, and each entry extends the sentences of a shorter prefix by one last word, so the sentence for a segmentation is assembled left to right even though the choices are made right to left.

The outer loop grows the prefix length `i` upward; the inner loop walks the split `j` from `i - 1` down to `0`, so the candidate last word `s[j:i]` is one character long first and grows from there. A shorter last word therefore contributes its sentences before a longer one, and sentences sharing their last word inherit the order of `dp[j]` — the recursive tie-break the pin describes, for free. `dp[0]` holds the single empty sentence, a prefix that cannot be segmented holds an empty list, and the `dp[j]` emptiness check prunes every dead split before any substring is cut.

The dictionary lives in a hash set, so each membership test costs the length of one candidate word, and iterating split positions rather than dictionary entries makes the emission order independent of how `wordDict` happens to be ordered. With `s` at most 20 characters the table has 21 entries and every prefix pair is examined once; reuse of a dictionary word and ambiguous overlaps need no special handling because every prefix combination is enumerated, not searched. The seventh prefix table is the answer itself, returned as is.

**Complexity:** `O(n² · L + S)` time and `O(S)` space, where `L` is the longest dictionary word and `S` the total size of the sentences stored across the table.
