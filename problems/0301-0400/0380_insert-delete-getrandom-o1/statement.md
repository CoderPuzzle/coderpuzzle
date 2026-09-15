# Insert Delete GetRandom O(1)

## Description

Implement the `RandomizedSet` class:

- `RandomizedSet()` Initializes the `RandomizedSet` object.
- `boolean insert(int val)` Inserts the item `val` into the set if not
  present. Returns `true` if the item was not present, `false` otherwise.
- `boolean remove(int val)` Removes the item `val` from the set if present.
  Returns `true` if the item was present, `false` otherwise.
- `int getRandom()` Returns an element of the current set. It is only called
  when the set contains at least one element.

Each of the three operations must run in **average O(1)** time.

### Statistical judging

`getRandom` picks an element **uniformly at random**, exactly as on
LeetCode — the judge verifies this statistically rather than comparing a
single draw. Each judged `getRandom` is invoked ~2000 times, every returned
value must belong to the current set, and the empirical frequency of each
live element must fall within a tolerance band of its uniform probability.
Any correct uniform sampler passes; `insert` and `remove` return values are
compared exactly.


### Example 1

```text
Input:
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output: [null, true, false, true, 1, true, false, 2]
Explanation:
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1);   // true — 1 was absent.  a = [1]
randomizedSet.remove(2);   // false — 2 is not present
randomizedSet.insert(2);   // true — a = [1, 2]
randomizedSet.getRandom(); // returns a[0] = 1
randomizedSet.remove(1);   // true — the last element 2 fills slot 0, so a = [2]
randomizedSet.insert(2);   // false — 2 is already present
randomizedSet.getRandom(); // returns a[0] = 2
```

### Example 2

```text
Input:
["RandomizedSet", "remove", "insert", "insert", "getRandom", "remove", "getRandom", "remove", "insert", "getRandom"]
[[], [9], [9], [4], [], [9], [], [4], [7], []]
Output: [null, false, true, true, 9, true, 4, true, true, 7]
Explanation:
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.remove(9);   // false — the set starts empty
randomizedSet.insert(9);   // true — a = [9]
randomizedSet.insert(4);   // true — a = [9, 4]
randomizedSet.getRandom(); // returns a[0] = 9
randomizedSet.remove(9);   // true — the last element 4 fills slot 0, so a = [4]
randomizedSet.getRandom(); // returns a[0] = 4
randomizedSet.remove(4);   // true — a = []
randomizedSet.insert(7);   // true — a = [7]
randomizedSet.getRandom(); // returns a[0] = 7
```

### Constraints

- `-2³¹ <= val <= 2³¹ - 1`
- At most `2 * 10⁵` calls in total will be made to `insert`, `remove`, and
  `getRandom`.
- `getRandom` is only called when the set contains at least one element.

### Follow-up

Could you implement each of `insert`, `remove`, and `getRandom` in average
`O(1)` time using one backing array plus a hash map from values to indices?

## Hints

### Hint 1

An array alone cannot tell you whether a value is present without a scan, and
a hash set alone cannot deliver `a[0]` and `a[-1]` positions on demand.
Combine them: keep the elements in an array `a` and, alongside it, a hash map
from each value to its index in `a`. The map answers presence and locates
occurrences; the array answers `a[0]` for `getRandom` and gives removal its
swap partner.

### Hint 2

Deleting from the middle of an array costs `O(n)` — unless you may reorder.
Overwrite the slot being removed with the **last** element of the array and
then drop the final slot. That is `O(1)`, but remember to repair the moved
element's entry in the index map: its index changes from the last index to the
vacated one.

### Hint 3

Mind the self-swap: when the value being removed is itself the last element,
the vacated slot and the last slot coincide, so the array just shrinks — and
the removed value's map entry is deleted either way. Since each value occurs
at most once, there is exactly one index to fix per removal.
