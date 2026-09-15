# Solutions — Design Video Sharing Platform

## Live map plus a min-heap of freed ids

The platform is two structures: a hash map from `videoId` to the video's
state, and a min-heap of the ids that have been deleted and are therefore
free to reuse. `upload` must return the _smallest_ available id, which is
exactly what a min-heap provides: when the heap is non-empty the smallest
freed id is popped and reused, and when it is empty every live id is still
a dense prefix `0..n-1`, so the next id is simply the current map size.

Every other method is a direct map operation guarded by existence. `remove`
deletes the entry and, only when the id actually existed, pushes it onto the
heap — so removing an unknown id is a silent no-op and never pollutes the
reuse pool. `watch` returns `"-1"` for a missing video and otherwise bumps
the view count and slices the content from `startMinute` through
`min(endMinute, len - 1)` inclusive, which naturally handles an `endMinute`
past the end of the video. `like`, `dislike`, `getLikesAndDislikes`, and
`getViews` all follow the same pattern: mutate or read the entry when it
exists, and fall back to the documented sentinel (`[-1]` / `-1`) when it
does not.

All operations are constant work in the number of live videos; the heap
pairs each delete with an `O(log n)` push and each reuse with an `O(log n)`
pop, which keeps the per-call cost logarithmic even though the id space can
grow to `10⁵` over the `10⁵` calls.

**Complexity:** `O(log n)` time per `upload` and `remove`, `O(1)` time per
`watch`/`like`/`dislike`/`getLikesAndDislikes`/`getViews` (where `n` is the
number of deleted ids), `O(n)` space for the live videos and the heap.
