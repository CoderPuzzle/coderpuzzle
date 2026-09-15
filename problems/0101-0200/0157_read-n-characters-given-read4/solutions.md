# Solutions

## Buffered copy through read4

Read the file in four-character blocks: each `read4(buf4)` call returns the number of fresh characters it placed in `buf4` (0 once the file is exhausted), so the loop keeps calling it while fewer than `n` characters have been delivered. Each block contributes only `min(count, n - total)` characters — the final block is usually partial, either because the request runs out or the file does.

Copy that many characters from `buf4` into `buf` at the running offset and advance the total. Stop early when `read4` reports 0, which is the end-of-file signal, so no extra queries are wasted on an empty file.

**Complexity:** O(n) time, O(1) extra space (the four-slot scratch buffer).
