# Solutions — Filling Bookcase Shelves

## Partition DP over Shelf Breaks

The only freedom is where shelf boundaries fall, because books must stay in the given order and each shelf holds a contiguous run of books. That makes the problem a linear partition: dp[i] is the minimum total height for shelving the first i books, and the last shelf of that prefix takes books j+1..i for some j, contributing the maximum height of that run plus dp[j]. Minimizing over all valid j gives dp[i].

![On books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]] with shelfWidth 4, dp fills to [0,1,3,4,5,5,5,6], and the i = 7 backwards scan of last shelves bottoms out at dp[3] + 2 = 6.](figures/solution-dp-last-shelf-backwards.svg)

Concretely, the code walks i from 1 to n and grows the last shelf backwards from book i−1, accumulating width and running height as it goes; the moment the accumulated width exceeds shelfWidth the loop breaks, since adding earlier (thicker-accumulated) books can only widen it further. Each candidate j contributes dp[j] + height and the minimum is kept. dp[0] = 0 is the empty-bookcase base.

Scanning the last shelf from the right means the width check prunes candidates in O(1) per book, and since every shelf run fits only while its width is within shelfWidth, the inner loop is also bounded by the number of books that fit on one shelf. In the worst case (thin books) that is O(n) per i. Edge cases: a first book thicker than half the shelf still forms a valid single-book shelf because thickness ≤ shelfWidth is guaranteed, and identical heights spread over shelves each pay their own shelf height.

**Complexity:** `O(n²)` time worst case, `O(n)` space.
