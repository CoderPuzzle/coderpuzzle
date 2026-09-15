# Solutions — Number of Valid Words for Each Puzzle

## Bitmask Submask Enumeration

A word is valid for a puzzle when the word's distinct-letter set contains the puzzle's first letter and is contained in the puzzle's letter set — repeats within a word are irrelevant, so a word is fully described by its 26-bit letter mask. Checking masks directly against every word-puzzle pair would be 10^5 * 10^4 comparisons; instead, bucket the words by mask once, and for each puzzle enumerate exactly the masks that could match.

The preprocessing pass builds `counts`, mapping each distinct word mask to how many words share it (duplicates are summed). For a puzzle, a word mask is valid iff it is a submask of `puzzle_mask` and includes the first letter's bit. Enumerating all submasks of `puzzle_mask` with the standard trick `sub = (sub - 1) & puzzle_mask` visits exactly those contained masks; since a puzzle has 7 distinct letters, there are at most `2^7 - 1 = 127` of them, and the filter `sub & first` keeps only those containing the required first letter, summing `counts.get(sub, 0)`.

The zero mask never appears (words have at least 4 letters), and the loop starts from the full puzzle mask, descending through all non-empty submasks — so `while sub` naturally terminates after the single-bit masks. Each puzzle costs a constant 127 steps regardless of the word list size, which is what makes 10^5 words times 10^4 puzzles tractable: the words are touched once, in the bucketing pass. With `C` the total character count of the words, `P` the number of puzzles, and `U` the number of distinct word masks, the work splits cleanly between the two phases.

**Complexity:** `O(C + 127 * P)` time, `O(U)` space.
