# Nested Sequence Iterator

## Description

A nested sequence contains integers and further nested sequences at any depth.
Build an iterator that exposes its integers in left-to-right order, as though
all nesting brackets had been removed.

Implement the `NestedSequenceIterator` class:

- `NestedSequenceIterator(List<NestedInteger> nestedList)` starts an iterator
  over `nestedList`.
- `int nextValue()` returns the next integer in traversal order.
- `boolean hasMore()` reports whether another integer remains.

The caller invokes `nextValue()` only after `hasMore()` returns `true`.

### Example 1

```text
Input:
["NestedSequenceIterator", "hasMore", "nextValue", "hasMore", "nextValue", "hasMore", "nextValue", "hasMore", "nextValue", "hasMore", "nextValue", "hasMore"]
[[[[8,[3]],[],[-2,[5,7]]]], [], [], [], [], [], [], [], [], [], [], []]
Output: [null, true, 8, true, 3, true, -2, true, 5, true, 7, false]
Explanation: Removing the nesting boundaries yields [8,3,-2,5,7].
```

### Example 2

```text
Input:
["NestedSequenceIterator", "hasMore", "nextValue", "hasMore", "nextValue", "hasMore", "nextValue", "hasMore"]
[[[[[4]],9,[[],[1]]]], [], [], [], [], [], [], []]
Output: [null, true, 4, true, 9, true, 1, false]
Explanation: Empty nested sequences contribute no values.
```

### Constraints

- `1 <= nestedList.length <= 500`
- Every stored integer lies in `[-10⁶, 10⁶]`.
