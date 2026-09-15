# Friends Of Appropriate Ages

## Description

There are `n` persons on a social media website. You are given an integer
array `ages` where `ages[i]` is the age of the `i`th person.

Person `x` will NOT send a friend request to person `y` (`x != y`) if any of
the following conditions is true:

- `ages[y] <= 0.5 * ages[x] + 7`
- `ages[y] > ages[x]`
- `ages[y] > 100 && ages[x] < 100`

Otherwise, `x` will send a friend request to `y`.

Note that if `x` sends a request to `y`, `y` will not necessarily send a
request to `x`. Also, a person will not send a friend request to themself.

Return the total number of friend requests made.

### Example 1

```text
Input: ages = [16,16]
Output: 2
Explanation: 2 people friend request each other.
```

### Example 2

```text
Input: ages = [16,17,18]
Output: 2
Explanation: Friend requests are made 17 -> 16, 18 -> 17.
```

### Example 3

```text
Input: ages = [20,30,100,110,120]
Output: 3
Explanation: Friend requests are made 110 -> 100, 120 -> 110, 120 -> 100.
```

### Constraints

- `n == ages.length`
- `1 <= n <= 2 * 10⁴`
- `1 <= ages[i] <= 120`
