# Solutions — Design Twitter

## Timestamped Timelines with a Min-Heap Feed Merge

Two observations shape the design. First, tweets arrive in chronological order, so stamping each `postTweet` with a global counter and appending it to the posting user's list keeps every timeline sorted for free — no insertion work happens at post time. Second, a feed is the 10 most recent tweets across the user's own timeline and those of their followees, and only the last 10 entries of any single timeline can possibly qualify.

`getNewsFeed` therefore walks the sources — the user plus their follow set (a hash set per user, so `follow` and `unfollow` are constant average time and duplicate follows are harmless) — and pushes each source's tail of up to 10 entries into a **min-heap keyed on the timestamp**, popping the smallest whenever the heap exceeds 10. Whatever survives is exactly the 10 newest tweets; draining the heap from largest to smallest yields the feed order. The heap never holds more than 11 entries, so each feed costs `O(11 log 11)` per source rather than anything proportional to tweet volume.

Timestamps are unique integers, which makes the ordering total — no tweet id or tie rule is ever consulted. Unfollowing simply removes a source from the next merge; past tweets are untouched.

**Complexity:** `O(1)` amortized per `postTweet`/`follow`/`unfollow`, `O(F log 10)` per `getNewsFeed` with `F` sources (each contributing at most 10 heap pushes), `O(total tweets)` space.
