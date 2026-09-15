# Solutions — Maximum Capacity Within Budget

## Sort by cost with prefix capacity maxima

An empty selection always respects the budget — its total cost is 0, strictly
below `budget` since `budget >= 1` — so the answer starts at 0 and only
improves; that is also the correct result when no single machine is
affordable. Sort the machines by cost while keeping each capacity aligned and
build `prefMax`, where `prefMax[t]` is the largest capacity among the first
`t + 1` sorted machines. Any partner of a fixed machine must have cost below
`budget - costs[i]`, and because the sorted costs are non-decreasing those
partners form a prefix of the sorted order, so one binary search per machine
finds the largest allowed index `j` and a prefix lookup then answers "best
partner capacity" in constant time.

Each machine `i` contributes two candidates: its own capacity alone, whenever
`costs[i] < budget`, and the pair `capacity[i] + prefMax[t]` with
`t = min(j, i - 1)`. Capping the partner range at `i - 1` makes self-pairing
impossible while losing nothing: an affordable pair is always counted from its
dearer end, because the cheaper machine's cost is at most the dearer one's and
therefore sits inside the dearer machine's allowed prefix whenever the pair's
cost sum is strictly below `budget`. The maximum over all candidates,
including the initial 0, is returned.

All quantities stay small: costs and capacities are at most `10⁵` and budget
at most `2 × 10⁵`, so every cost sum is below `2 × 10⁵` and every capacity
sum at most `2 × 10⁵ < 2³¹` — fixed-width languages carry everything in
32-bit integers, and JavaScript's doubles hold every integer involved
exactly, far inside `2⁵³`. The whole computation is a flat loop over the
sorted machines, so there is no recursion at any input size.

**Complexity:** `O(n log n)` time, `O(n)` space.
