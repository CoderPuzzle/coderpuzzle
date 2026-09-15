# Solutions — Word Break

The same reachability question asked two ways: sweep the prefixes left
to right marking which ones segment, or push those prefixes through a
queue and explore them in first-found order. Both rest on the identical
observation — a prefix segments exactly when some earlier segmentable
prefix is followed by a dictionary word.

## dp

Let `reachable[i]` say whether the prefix `s[0..i)` can be segmented, with `reachable[0] = True` for the empty prefix. Any segmentation of that prefix ends with some last word `s[j..i)`, so `reachable[i]` holds exactly when some earlier `reachable[j]` has that piece in the dictionary; the answer is `reachable[n]`.

The dictionary lives in a hash set, so each membership test costs only the price of building the slice. For each i the inner loop tries every split point j and breaks at the first success, since only feasibility matters. Words are never consumed: the same set entry can back any number of pieces, which is what allows repeated reuse as in "apple pen apple".

The cost is dominated by the O(n^2) (j, i) pairs, each building and hashing a slice of length up to n — worst case cubic in n, which the constraint n ≤ 300 keeps to a few million character operations, and the early break plus short dictionary words make it far smaller in practice. Space is the DP array plus the word set: O(n) plus O(W) for W dictionary words of at most 20 characters each.

**Complexity:** `O(n^3)` time, `O(n + W)` space.

## bfs

The same predicate, discovered in search order instead of sweep order. Think of each index `0..n` as a position: position `i` is reachable when the prefix ending there segments, and the edges out of `i` are the dictionary words — if `s[i..i+L)` is a word, it leads to position `i + L`. The question "can `s` be segmented" becomes "is position `n` reachable from position `0`", which a plain queue-based BFS answers: start at `0`, and whenever an edge lands exactly on `n`, the whole string has been segmented and the answer is yes.

Two details keep the search tight. First, a `visited` array marks a position when it is enqueued, so each position is expanded at most once — without it, the same prefix could be re-derived through many different last words and the queue would blow up. Second, the inner loop only tries word lengths up to the longest dictionary word (`maxLen`, at most 20 by the constraints), so each position checks at most `min(maxLen, n - i)` candidate pieces rather than every split point. That cap is what makes the BFS cheaper than the DP's inner sweep: `O(n · min(maxLen, n))` substring lookups instead of `O(n²)`.

An unsegmentable string drains the queue — every reachable position expanded, `n` never hit — and returns false. Note the asymmetry with the DP: the sweep computes reachability for every prefix as a by-product, while the search stops at the first success and never revisits a position.

**Complexity:** `O(n · min(maxLen, n) · maxLen)` time for the substring hashes in the worst case (`O(n · W)` set lookups), `O(n + W)` space.
