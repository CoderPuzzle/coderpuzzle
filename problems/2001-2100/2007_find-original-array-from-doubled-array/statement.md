# Find Original Array From Doubled Array

## Description

An integer array `original` is transformed into a doubled array `changed` by
appending twice the value of every element in `original`, and then randomly
shuffling the resulting array.

Given an array `changed`, return `original` if `changed` is a doubled array. If
`changed` is not a doubled array, return an empty array. The elements in
`original` may mathematically be returned in any order. For deterministic
judging, return them in nondecreasing order.

### Example 1

```text
Input: changed = [1,3,4,2,6,8]
Output: [1,3,4]
Explanation: One possible original array could be [1,3,4]:
- Twice the value of 1 is 1 * 2 = 2.
- Twice the value of 3 is 3 * 2 = 6.
- Twice the value of 4 is 4 * 2 = 8.
Other original arrays could be [4,3,1] or [3,1,4].
```

### Example 2

```text
Input: changed = [6,3,0,1]
Output: []
Explanation: changed is not a doubled array.
```

### Example 3

```text
Input: changed = [1]
Output: []
Explanation: changed is not a doubled array.
```

### Constraints

- `1 <= changed.length <= 10⁵`
- `0 <= changed[i] <= 10⁵`

## Hints

### Hint 1

If `changed` is a doubled array, you should be able to delete elements and their doubled values until the array is empty.

### Hint 2

Which element is guaranteed to not be a doubled value? It is the smallest element.

### Hint 3

After removing the smallest element and its double from `changed`, is there another number that is guaranteed to not be a doubled value?
