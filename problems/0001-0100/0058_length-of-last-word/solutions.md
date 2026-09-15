# Solutions — Length of Last Word

## Right-to-left scan

The last word ends at the string's right edge, so the scan starts at the final character and walks left. Trailing spaces belong to no word, so the first loop skips them; the second loop then counts letters until it meets a space or the start of the string. The gap between where the counting began and where it stopped is exactly the last word's length.

Reading from the right is what keeps the pass short: a left-to-right scan must cross every word and remember the length of each, while the right-to-left scan never reads past the first letter of the last word. Two integer cursors carry the whole algorithm — no substring is built and no `split` allocates a list. The statement guarantees at least one word, so after the trailing spaces are skipped the counting loop always finds at least one letter.

**Complexity:** `O(n)` time in the worst case, `O(1)` extra space.
