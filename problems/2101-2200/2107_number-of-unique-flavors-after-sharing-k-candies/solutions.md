# Solutions — Number of Unique Flavors After Sharing K Candies

## Slide the shared interval

Count every flavor among the candies initially kept, then remove the first `k` candies to form the first shared interval. Track how many flavors still have a positive kept count.

Slide the shared interval one position at a time: restore the candy leaving the interval and remove the candy entering it, updating the distinct kept count at zero crossings. Retain the largest count seen.

**Complexity:** `O(n)` time and `O(n)` space.
