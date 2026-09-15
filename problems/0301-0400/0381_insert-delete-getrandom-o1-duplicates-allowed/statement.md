# Insert Delete GetRandom O(1) - Duplicates allowed

## Description

Design a data structure that supports inserting, removing and reporting an
element of a **collection of integers that may contain duplicates** (a
multiset). Each operation must run in **average O(1)** time.

Implement the `RandomizedCollection` class:

- `RandomizedCollection()` Initializes the empty collection.
- `boolean insert(int val)` Inserts one occurrence of `val` into the multiset,
  even if `val` is already present. Returns `true` if `val` was **not**
  present before the call, `false` otherwise.
- `boolean remove(int val)` Removes **one** occurrence of `val` from the
  multiset if present, and returns `true` if `val` was present, `false`
  otherwise.
- `int getRandom()` Returns an element of the current multiset. It is only
  called when the collection contains at least one element.

### Deterministic judging rule

In the original formulation `getRandom` picks an element uniformly at random,
which cannot be compared against an expected output. CoderPuzzle therefore judges a
**deterministic variant** in which the collection behaves as if it were backed
by a plain array `a` maintained under exactly these rules:

1. `insert(val)` appends `val` to the **end** of `a`.
2. `remove(val)` locates the **leftmost** (smallest-index) occurrence of `val`
   in `a`, at index `i`. The element at the **end** of `a` is moved into slot
   `i` (unless `i` already is the end), and `a` shrinks by one. The relative
   order of the other elements may change.
3. `getRandom()` returns `a[0]`, the element stored at the smallest index.

Any implementation that follows these rules produces identical return values —
the classic one keeps `a` together with a hash map from each value to an
ordered set of its indices in `a`, updated on every insert, swap and removal.

### Example 1

```text
Input:
["RandomizedCollection", "insert", "insert", "insert", "getRandom", "remove", "getRandom"]
[[], [1], [1], [2], [], [1], []]
Output: [null, true, false, true, 1, true, 2]
Explanation:
RandomizedCollection collection = new RandomizedCollection();
collection.insert(1);    // true — 1 was absent.  a = [1]
collection.insert(1);    // false — 1 was present. a = [1, 1]
collection.insert(2);    // true — 2 was absent.   a = [1, 1, 2]
collection.getRandom();  // returns a[0] = 1
collection.remove(1);    // true — the leftmost 1 (index 0) is removed and the
                         // last element 2 fills slot 0, so a = [2, 1]
collection.getRandom();  // returns a[0] = 2
```

### Example 2

```text
Input:
["RandomizedCollection", "insert", "insert", "insert", "insert", "remove", "remove", "remove", "insert", "getRandom"]
[[], [10], [10], [20], [20], [20], [20], [20], [10], []]
Output: [null, true, false, true, false, true, true, false, false, 10]
Explanation:
collection.insert(10);   // true — 10 was absent.   a = [10]
collection.insert(10);   // false — a = [10, 10]
collection.insert(20);   // true — a = [10, 10, 20]
collection.insert(20);   // false — a = [10, 10, 20, 20]
collection.remove(20);   // true — the leftmost 20 sits at index 2 and the last
                         // element is also 20, so a shortens to [10, 10, 20]
collection.remove(20);   // true — the last element is again 20, a = [10, 10]
collection.remove(20);   // false — 20 is no longer present
collection.insert(10);   // false — a = [10, 10, 10]
collection.getRandom();  // returns a[0] = 10
```

### Example 3

```text
Input:
["RandomizedCollection", "insert", "insert", "insert", "remove", "getRandom", "remove", "getRandom"]
[[], [1], [2], [3], [1], [], [3], []]
Output: [null, true, true, true, true, 3, true, 2]
Explanation:
collection.insert(1);    // true — a = [1]
collection.insert(2);    // true — a = [1, 2]
collection.insert(3);    // true — a = [1, 2, 3]
collection.remove(1);    // true — the last element 3 fills slot 0, a = [3, 2]
collection.getRandom();  // returns a[0] = 3
collection.remove(3);    // true — the last element 2 fills slot 0, a = [2]
collection.getRandom();  // returns a[0] = 2
```

### Constraints

- `-2³¹ <= val <= 2³¹ - 1`
- At most `2 * 10⁵` calls in total will be made to `insert`, `remove`, and
  `getRandom`.
- `getRandom` is only called when the collection contains at least one
  element.

### Follow-up

Could you implement each of `insert`, `remove`, and `getRandom` in average
`O(1)` time using a hash map from values to ordered index sets plus one
backing array?

## Hints

### Hint 1

An array alone cannot tell you whether a value is present without a scan, and
a hash set alone cannot deliver an element in `O(1)`. Combine them: keep the
elements in an array `a` and, alongside it, a hash map from each value to the
set of indices at which it sits in `a`. Each structure covers the other's
weakness — the map answers presence and locates occurrences, the array answers
`a[0]` for `getRandom`.

### Hint 2

Deleting from the middle of an array costs `O(n)` — unless you may reorder.
Overwrite the slot being removed with the **last** element of the array and
then drop the final slot. That is `O(1)`, but remember to repair the moved
element's entry in the index map: its set loses the last index and gains the
vacated one.

### Hint 3

When the value being removed is also the value stored at the last index, the
swap moves a copy onto itself: the index set must lose exactly one entry —
the last index — and keep the vacated slot's entry, since a copy of the value
remains there. Since the judge removes the **leftmost** occurrence, the index
sets must be kept ordered (a sorted container) so the smallest index is
available in `O(log n)`.
