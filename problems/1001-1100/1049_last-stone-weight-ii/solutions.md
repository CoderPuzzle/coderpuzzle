# Solutions — Last Stone Weight II

## Subset-Sum Partition (0/1 Knapsack)

The insight that unlocks the problem is that the smash order is irrelevant to the final outcome: any sequence of smashes leaves a stone whose weight is a signed sum ±stones[0] ± stones[1] ... , and conversely every such signed sum is achievable by pairing the positive-sign stones against the negative-sign stones one at a time. So minimizing the last stone's weight means choosing signs so the absolute value of the sum is as small as possible. Equivalently, split the stones into two groups and minimize the difference of their sums.

Since group A + group B = total is fixed, minimizing total − 2·sum(A) means pushing sum(A) as close to total/2 as possible without exceeding it — a classic 0/1 subset-sum question: what is the largest reachable subset sum not exceeding total//2? The DP keeps a boolean array `reachable` over sums 0..target, seeded with sum 0, and processes each stone once, walking the array downward so a stone cannot be counted twice in the same sum.

After all stones are processed, the best achievable sum at most target is found by scanning down from target for the first true entry, and the answer is total − 2·best. Edge cases fall out naturally: one stone gives total − 0 = the stone itself; stones summing symmetrically give 0. Since total ≤ 30·100 = 3000, the table is tiny.

**Complexity:** `O(n·S)` time, `O(S)` space, where S is half the total weight.
