# Solutions — Number of Unique Flavors After Sharing K Candies

## Slide the shared interval

Count every flavor among the candies initially kept, then remove the first `k` candies to form the first shared interval. Track how many flavors still have a positive kept count.

Slide the shared interval one position at a time: restore the candy leaving the interval and remove the candy entering it, updating the distinct kept count at zero crossings. Retain the largest count seen.

![Sliding the length-3 shared window over candies [1, 2, 2, 3, 4, 3], the kept counts update at each zero crossing and the kept-distinct total peaks at 3 by handing over [2, 2, 3] and keeping {1, 3, 4}.](figures/solution-shared-window-slide.svg)

**Complexity:** `O(n)` time and `O(n)` space.
