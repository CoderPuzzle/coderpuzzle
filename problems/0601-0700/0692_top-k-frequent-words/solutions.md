# Solutions — Top K Frequent Words

The order the answer must carry is a total order: frequency from highest to
lowest, and words of equal frequency in lexicographical order. Every
approach therefore opens with the same counting pass — a hash map from word
to occurrences in one sweep over `words` — and then selects the first `k`
of the unique words under that order. The full sort settles that order for
every unique word in one comparison sort and slices off the first `k`,
paying ordering work for words the answer never names. The size-k min-heap
keeps only the `k` strongest candidates seen so far, so each unique word
costs a bounded-heap step instead of a place in a global order. Bucketing
goes one structural step further: frequency is an integer no larger than
`n`, so words can be filed by count and read back out in order, comparing
only within the groups that tie.

## Counting Pass, Full Sort

The most direct reading of the ranking: settle the total order for every
unique word at once, then read off the first `k`. After the counting pass,
the code sorts the unique words under the composite key — count descending
as the primary term, the word itself ascending as the tiebreak — and keeps
the first `k` of the ranked list. Nothing about the selection happens
during the sweep; the sort carries the whole ordering burden on its own.

That wholesale ranking is exactly the bill. With `u` unique words, the
bottom `u - k` — which the answer never names — are ordered with the same
care as the top `k` and then discarded, so the comparisons run `O(u log u)`
where a selection that holds only `k` candidates can stop at `O(u log k)`.
What the approach buys for that price is simplicity: it is the composite
key stated directly as a comparator, with no structure beyond the sort
itself.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Counting Pass, Size-k Min-Heap

Keep a min-heap of only `k` words keyed so the root is the weakest keeper:
the smallest count, and among equal counts the lexicographically largest
word — exactly the final ranking turned inside out. Each unique word
streams through: while the heap holds fewer than `k` words it is pushed
outright; afterwards the newcomer evicts the root only when it outranks it,
meaning a higher count, or an equal count with a lexicographically smaller
word. Because eviction order mirrors the ranking, the `k` survivors are
precisely the top `k` under the statement's order.

The one subtlety is the tie key. The guard that decides eviction inverts
frequency but not the lexicographic order: a newcomer outranks the root on
a higher count, or on an equal count with a smaller word. The heap key must
encode exactly that — root = smallest count, and among equal counts the
largest word — since a plain `(count, word)` min-heap would evict the
lexicographically smallest word of the lowest count and keep the wrong one.
After the sweep, sorting the survivors by (count descending, word
ascending) emits the answer.

**Complexity:** `O(n log k)` time, `O(n)` space.

## Counting Pass, Frequency Buckets

Frequency is an integer between 1 and `n`, so the ranking's primary key
never needs a comparison at all — it can be a bucket index. After the
counting pass, the code files every unique word into `buckets[count]` —
at most `n + 1` buckets — and walks the array from `n` down to 1. Each
bucket the walk reaches is sorted lexicographically and emitted word by
word, and the walk stops the moment `k` words are in hand, even
mid-bucket; that cutoff is safe because a bucket's sorted order is exactly
the statement's tie order.

The saving is structural: a word is never compared against a word of a
different frequency, because the buckets absorb the primary key, so
sorting happens only inside same-frequency groups and only for buckets the
walk actually reaches. With `u` unique words and `g` the largest group the
walk sorts, the comparisons total at most `u log g` on top of the linear
counting and walking passes — the more the counts spread out, the smaller
the groups and the closer the whole method sits to `O(n)`; one giant tie
group is what pushes it back up toward a full sort.

**Complexity:** `O(n + u log g)` time, `O(n)` space.
