# Solutions — Word Ladder

## Wildcard-Bucket BFS

Words are nodes of an implicit graph where adjacency means differing by one letter, and the answer is the shortest path from `beginWord` to `endWord` counted in words rather than edges — exactly what a level-order BFS from `beginWord` measures. The obstacle is neighbor lookup: comparing every pair of words is quadratic, and with up to 5000 dictionary words that is too slow.

The trick is to bucket every dictionary word under each of its wildcard patterns: "hot" files under "*ot", "h*t", and "ho*", so all neighbors of a word share one of its patterns. The BFS proceeds level by level, and when a word is expanded its pattern buckets are popped from the map, so each bucket is read once overall and a `visited` set ensures every word is enqueued at most once. Popping also prevents re-reading shared buckets when two words of the same level have common neighbors.

The step counter starts at 1 — `beginWord` itself counts — and increments once per level; the loop checks each dequeued word against `endWord` and returns the count the moment it is expanded, yielding the word count of the shortest ladder. An up-front membership check returns 0 when `endWord` is not in the dictionary, since no sequence can end outside it. With N words of length L, building the buckets and the BFS both cost N · L pattern constructions of length L.

**Complexity:** `O(N · L^2)` time, `O(N · L)` space.
