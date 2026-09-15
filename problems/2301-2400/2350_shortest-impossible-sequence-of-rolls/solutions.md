# Solutions — Shortest Impossible Sequence of Rolls

## Greedy Segment Splitting on Complete Windows

Every length-1 sequence is a subsequence of `rolls` exactly when all `k` faces have appeared at least once. Let `i1` be the first index where that happens. Then every length-2 sequence is covered exactly when all `k` faces appear again after `i1`: the first element is matched at its first occurrence (at or before `i1`), leaving the remainder of the array for the second element. Inductively, each further "complete window" of all `k` faces extends coverage to sequences one roll longer, because a window guarantees that whatever prefix was matched, every next symbol is available after it.

The greedy converse holds: if the array splits into `c` maximal complete windows (a window ends the moment the `k`-th distinct face inside it appears), then any sequence of length `c + 1` fails to be a subsequence. Its first `c` elements can be matched greedily, one per window, but the `c+1`-th element then needs a face beyond the last window's completion — and by maximality no complete set of faces remains, so some symbol of the sequence cannot be matched. Hence the answer is the number of complete windows plus one.

The implementation is a single scan with a set of faces seen since the last window reset: on each roll, insert the face; when the set reaches size `k`, increment the answer and clear it. `answer` starts at 1 because even zero windows means some length-1 sequence (some face never rolled, since `k` can exceed the faces present) is missing. Edge cases like `k = 1` (every roll completes a window) and arrays ending mid-window (the partial window contributes nothing) fall out naturally.

**Complexity:** `O(n)` time, `O(k)` space.
