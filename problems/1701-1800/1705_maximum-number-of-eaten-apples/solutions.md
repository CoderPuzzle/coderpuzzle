# Solutions — Maximum Number of Eaten Apples

## Greedy Min-Heap by Rot Date

The greedy rule is to always eat an apple from the batch that rots soonest. Exchange argument: if a schedule eats a later-rotting apple while an earlier-rotting one is still fresh and will later be eaten (or rot), swapping the two eating days never reduces the total — the earlier apple stays fresh at least as long into the future. So a min-heap keyed by rot day, holding `(rot_day, count)` pairs, always exposes the right apple to eat.

During the first `n` days the loop performs three steps per day `i`: push the new batch `(i + days[i], apples[i])` if the tree produced apples; pop every batch whose rot day has arrived (`rot_day <= i`, since apples rot on day `i + days[i]` and are inedible from that day on); then, if anything is left, pop the earliest-rotting batch, count one eaten apple, and push it back with `count - 1` if any apples remain in it.

After day `n` no new apples appear, but eating may continue. The second loop keeps a `day` counter starting at `n` and repeats the same purge-and-eat step, advancing `day` by one for each apple eaten, until the heap is empty. The loop terminates because every rot day is finite, so eventually all batches are purged. The constraint `days[i] == 0` iff `apples[i] == 0` guarantees no zero-count batch is ever pushed. The number of simulated days is bounded by `n + max(i + days[i])`, which is O(n), and each day costs a logarithmic number of heap operations.

**Complexity:** `O(n log n)` time, `O(n)` space.
