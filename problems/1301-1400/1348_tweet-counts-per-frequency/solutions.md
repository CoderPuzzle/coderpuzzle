# Tweet Counts Per Frequency

## Approach: Per-name sorted time lists, chunked by binary range counts

Recording is an insertion into a per-tweet-name list kept sorted (a
binary search finds the position), so the name's tweets are always in
calendar order. A query maps its frequency to a chunk length — 60, 3600,
or 86400 seconds — and slices `[startTime, endTime]` into
`(endTime - startTime) / chunk + 1` consecutive chunks starting exactly
at `startTime`; the last chunk may be short and always ends at
`endTime`.

Each chunk's count comes from two binary searches over the sorted list —
the number of times landing in `[lo, hi]` — so a query costs
O(chunks · log n) without scanning the record set. Tweets recorded
outside the window fall into no chunk, and duplicates recorded at the
same instant each count, matching the API's one-tweet-per-call meaning.

**Complexity:** O(n) per record insertion (memmove of the sorted tail)
and O(c · log n) per query, with c chunks; O(n) space.
