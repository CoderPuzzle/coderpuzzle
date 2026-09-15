# Solutions — Number of Subsequences That Satisfy the Given Sum Condition

## Sort and Two Pointers With Powers of Two

A subsequence is defined by which elements it contains, not their order, so sorting nums first loses nothing. After sorting, a chosen subsequence is valid exactly when its smallest plus its largest element is at most the target, because every other member lies between the two and can never violate the bound on its own. Fixing the smallest chosen element at index i, if the farthest usable partner is index j, then every subset of the elements strictly between i and j may be included or excluded freely, giving 2^(j - i) valid subsequences whose minimum sits exactly at i.

Rather than binary-searching j for each i, the solution walks two pointers inward from both ends of the sorted array. When the current endpoints satisfy the sum bound, every element between them is also a legal partner of the left end, and the earlier decrements of the right pointer guarantee none beyond it can be — so the right pointer is exactly the farthest partner of the left end, and 2^(right - left) is added before advancing the left end. When the sum bound fails, the right end is too large to pair with anything at or after the left end, so it is decremented.

Powers of two are precomputed modulo 10^9 + 7 up to n - 1 so each contribution is one multiplication, and the running total is reduced at every step. Single-element subsequences fall out naturally: when both pointers meet, the sum compared is twice that element, exactly the condition for it to stand alone.

**Complexity:** `O(n log n)` time, `O(n)` space.
