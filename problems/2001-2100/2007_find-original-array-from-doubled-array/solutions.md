# Solutions — Find Original Array From Doubled Array

## Greedily pair values from smallest to largest

An odd-length array cannot contain one original copy and one doubled copy for
every element. Otherwise, sort `changed` and count each value. The smallest
unused value cannot be the double of a different remaining nonnegative value,
so it must belong to `original` and must consume one copy of twice itself.

Scan the sorted values, skipping copies already consumed as doubles. For every
remaining value, remove it first and then require its double; removing first is
what makes zero work correctly, because a zero must be paired with a second
zero. Appending in scan order directly produces the required nondecreasing
answer, while a missing double proves that no original array exists.

**Complexity:** `O(n log n)` time, `O(n)` space.
