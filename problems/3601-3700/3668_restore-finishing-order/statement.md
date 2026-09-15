# Restore Finishing Order

## Description

You are given an integer array `order` of length `n` and an integer array
`friends`.

`order` contains every integer from `1` to `n` exactly once — the
participants' IDs listed in the order in which they finished the race.
`friends` holds the IDs of your friends who took part, sorted in strictly
increasing order, and each ID in `friends` is guaranteed to appear somewhere
in `order`.

Return an array containing your friends' IDs in their finishing order.

### Example 1

```text
Input: order = [3,1,2,5,4], friends = [1,3,4]
Output: [3,1,4]
Explanation: The race ends in the order [3,1,2,5,4]. Picking out just your
friends leaves [3,1,4].
```

### Example 2

```text
Input: order = [1,4,5,3,2], friends = [2,5]
Output: [5,2]
Explanation: The race ends in the order [1,4,5,3,2], so your friends cross
the line as [5,2].
```

### Constraints

- `1 <= n == order.length <= 100`
- `order` contains every integer from `1` to `n` exactly once.
- `1 <= friends.length <= min(8, n)`
- `1 <= friends[i] <= n`
- `friends` is sorted in strictly increasing order.

## Hints

### Hint 1

Load the friend IDs into a hash set so each membership test runs quickly while scanning.

### Hint 2

Iterate over `order` from first to last and collect every ID found in the set; the collected IDs come out already arranged by finishing position, so no sorting step is needed.
