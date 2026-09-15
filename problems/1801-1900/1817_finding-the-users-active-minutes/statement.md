# Finding the Users Active Minutes

## Description

You are given the logs for users' actions on LeetCode, and an integer `k`. The
logs are represented by a 2D integer array `logs` where each
`logs[i] = [ID_i, time_i]` indicates that the user with `ID_i` performed an
action at the minute `time_i`.

Multiple users can perform actions simultaneously, and a single user can
perform multiple actions in the same minute.

The user active minutes (UAM) for a given user is defined as the number of
unique minutes in which the user performed an action on LeetCode. A minute can
only be counted once, even if multiple actions occur during it.

You are to calculate a 1-indexed array `answer` of size `k` such that, for
each `j` (`1 <= j <= k`), `answer[j]` is the number of users whose UAM equals
`j`.

Return the array `answer` as described above.

### Example 1

```text
Input: logs = [[0,5],[1,2],[0,2],[0,5],[1,3]], k = 5
Output: [0,2,0,0,0]
Explanation: The user with ID=0 performed actions at minutes 5, 2, and 5 again.
Hence, they have a UAM of 2 (minute 5 is only counted once).
The user with ID=1 performed actions at minutes 2 and 3. Hence, they have a
UAM of 2.
Since both users have a UAM of 2, answer[2] is 2, and the remaining answer[j]
values are 0.
```

### Example 2

```text
Input: logs = [[1,1],[2,2],[2,3]], k = 4
Output: [1,1,0,0]
Explanation: The user with ID=1 performed a single action at minute 1. Hence,
they have a UAM of 1.
The user with ID=2 performed actions at minutes 2 and 3. Hence, they have a
UAM of 2.
There is one user with a UAM of 1 and one with a UAM of 2.
Hence, answer[1] = 1, answer[2] = 1, and the remaining values are 0.
```

### Constraints

- `1 <= logs.length <= 10⁴`
- `0 <= ID_i <= 10⁹`
- `1 <= time_i <= 10⁵`
- `k` is in the range [The maximum UAM for a user, 10⁵].

## Hints

### Hint 1

Try to find the number of different minutes when action happened for each user.

### Hint 2

For each user increase the value of the answer array index which matches the
UAM for this user.
