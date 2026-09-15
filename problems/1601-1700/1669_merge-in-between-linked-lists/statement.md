# Merge In Between Linked Lists

## Description

You are given two linked lists, `list1` and `list2`, of sizes `n` and `m`
respectively.

Remove the nodes of `list1` from the `a`th node to the `b`th node, and put
`list2` in their place.

Build the result list and return its head.

![diagram](figures/1669-1.svg)

### Example 1

![diagram](figures/1669-2.svg)

```text
Input: list1 = [10,1,13,6,9,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
Output: [10,1,13,1000000,1000001,1000002,5]
Explanation: We remove the nodes 3 and 4 and put the entire list2 in their
place, keeping the nodes before and after them.
```

### Example 2

![diagram](figures/1669-3.svg)

```text
Input: list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 = [1000000,1000001,1000002,1000003,1000004]
Output: [0,1,1000000,1000001,1000002,1000003,1000004,6]
Explanation: We remove the nodes 2 through 5 and put the entire list2 in
their place, keeping the first two and the last node of list1.
```

### Constraints

- `3 <= list1.length <= 10⁴`
- `1 <= a <= b < list1.length - 1`
- `1 <= list2.length <= 10⁴`

## Hints

### Hint 1

Check which edges need to be changed.

### Hint 2

Let the next node of the (a-1)th node of `list1` be the 0th node of
`list2`.

### Hint 3

Let the next node of the last node of `list2` be the (b+1)th node of
`list1`.
