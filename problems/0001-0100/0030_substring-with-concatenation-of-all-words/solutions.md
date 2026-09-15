# Solutions — Substring with Concatenation of All Words

## Sliding windows per word offset

All words share one length `w`, so every candidate match is a chain of `w`-sized blocks whose starts share a single residue modulo `w`. The sweep fixes each offset `r` in `0..w-1` and slides a window over `s` block by block, keeping a hash map of how many of each word the window currently holds and how many blocks it spans. Admitting the block entering on the right is one counter increment; if that pushes a word past its required count, blocks leave from the left end until the surplus is gone. The window therefore never holds more than the required copies of any word and never restarts from scratch, which is what turns the naive rescan of every position into one linear pass per offset.

A block that is not one of the words can never appear inside a match, so when one enters, the window empties and resumes after it. When the block count reaches `words.length`, every count is exactly satisfied, so the window's left edge is a match: it is recorded, the leftmost block is released, and the scan continues — the next match can be as close as one block away, which is why `s = "barfoofoobarthefoobarman"` yields 6, 9, and 12. Each offset emits its matches already ascending within its own residue class, and a final sort of the collected indices (at most `O(r · log r)` on top of the sweep, `r` being the answer size) merges the classes into the single ascending order the statement pins.

**Complexity:** `O(n · w)` time, `O(k · w)` space, for `n = s.length`, `k = words.length`, and common word length `w`.
