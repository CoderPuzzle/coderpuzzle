# Solutions — Maximum Matching of Players With Trainers

## Sort and two pointers

Sort both arrays ascending and match greedily: always try to pair the weakest unmatched player with the weakest unmatched trainer. Walking the two sorted arrays with pointers `i` and `j`, if `players[i] <= trainers[j]` the pair matches and both advance; otherwise that trainer is too weak for the weakest remaining player, and since players only get stronger from here, the trainer is useless forever — advance `j` alone.

The exchange argument shows this is optimal. Matching the weakest player to the weakest trainer that can train it never hurts: any optimal solution can be rewritten so that player is matched to that trainer (or unmatched) without reducing the count, because any trainer assigned to the weakest player in the optimal solution is at least as capable, so swapping the partners preserves both matches. Discarding an over-weak trainer loses nothing for the same reason — no remaining player could ever use it.

With `n` players and `m` trainers, the loop ends when either array is exhausted, naturally handling unbalanced lengths, and the match count is returned directly.

**Complexity:** `O(n log n + m log m)` time, `O(n + m)` space.
