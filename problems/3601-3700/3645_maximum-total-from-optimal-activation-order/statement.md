# Maximum Total from Optimal Activation Order

## Description

You are given two integer arrays `value` and `limit`, both of length `n`.
Every element starts out inactive, and you may activate them one at a time
in any order you choose:

- Activating an inactive element `i` is allowed only while the number of
  currently active elements is strictly less than `limit[i]`. The activation
  adds `value[i]` to the total.
- After each activation, let `x` be the number of currently active elements.
  Every element `j` with `limit[j] <= x` becomes permanently inactive — not
  only elements that were active, but also ones still waiting to be
  activated, which may never be activated at all.

Return the maximum total obtainable by choosing the activation order
optimally.

### Example 1

```text
Input: value = [3,5,8], limit = [2,1,3]
Output: 16
Explanation: Activate 1 first (adds 5). The count reaches 1, so element 1,
whose limit is 1, immediately locks out. Activate 0 (adds 3). Activate 2
(adds 8); the count now reaches 2 and locks element 0 out, but every
element has already contributed. The total is 5 + 3 + 8 = 16.
```

### Example 2

```text
Input: value = [4,2,6], limit = [1,1,1]
Output: 6
Explanation: Whichever element goes first, the count reaches 1 afterwards
and all three limit-1 elements lock out together, so no second activation
is ever possible. The best opening move collects 6.
```

### Example 3

```text
Input: value = [4,1,5,2], limit = [3,3,2,3]
Output: 12
Explanation: Activate 2, 0, 1, then 3, adding 5, 4, 1 and 2. The counts
before those activations are 0, 1, 1 and 2 — each strictly below the
activated element's limit — so all four go through for a total of 12.
```

### Constraints

- `1 <= n == value.length == limit.length <= 10⁵`
- `1 <= value[i] <= 10⁵`
- `1 <= limit[i] <= n`

## Hints

### Hint 1

Group the elements by their limit values; each limit's budget can be
reasoned about independently of the others.

### Hint 2

A group whose limit is `j` and that holds `m` elements contributes the sum
of its top `min(j, m)` values.

### Hint 3

To extract each group's top values, use a min-heap of capacity `j`: push
each value in the group, and pop the smallest whenever the heap grows past
`j`.

### Hint 4

After processing a group's heap, add its contents to the overall total;
repeat for every group, in any order.
