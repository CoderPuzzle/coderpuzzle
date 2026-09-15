# Solutions — Maximum Number of Non-Overlapping Substrings

## Fixed-point range expansion, then greedy interval selection

Record, for every character, the index of its first and last occurrence
in `s`. A substring anchored at a position `i` that is the first
occurrence of `s[i]` starts as the range `[i, last[s[i]]]`, but that range
may still be invalid: some character inside it might itself occur even
later, or — worse — occur earlier than `i`, in which case no substring
starting at `i` can ever be valid and the anchor is discarded. Scanning
left to right while repeatedly pulling `end` out to cover every
character's last occurrence is exactly a fixed-point computation: it
stops the moment no character inside `[i, end]` demands more room, which
happens after at most `n` extensions since `end` only moves forward. Each
surviving anchor yields one "good" substring, and by construction two
good substrings can never partially overlap — one is always either
disjoint from or nested entirely inside the other.

With the candidate good substrings in hand, choosing the maximum
non-overlapping set is the classic activity-selection greedy: sort
candidates by ending index (breaking ties by length, so a shorter, nested
candidate is preferred over the longer one that contains it), then scan
and keep a candidate whenever its start lies past the end of the last one
kept. Because overlap between candidates only ever happens through
nesting, this greedy both maximizes the count and, via the tie-break,
minimizes the total length among maximum-count sets — the exact set the
statement promises is unique. Only the order the substrings are emitted
in is left unconstrained, matching "return the substrings in any order."

**Complexity:** `O(n)` time, `O(n)` space.
