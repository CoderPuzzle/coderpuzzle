# Maximum Number of People That Can Be Caught in Tag

## Description

You are playing a game of tag with your friends. In tag, people are divided
into two teams: people who are "it", and people who are not "it". The people
who are "it" want to catch as many people as possible who are not "it".

You are given a 0-indexed integer array `team` containing only zeros (denoting
people who are not "it") and ones (denoting people who are "it"), and an
integer `dist`. A person who is "it" at index `i` can catch any one person
whose index is in the range `[i - dist, i + dist]` (inclusive) and is not "it".

Return the maximum number of people that the people who are "it" can catch.

### Example 1

```text
Input: team = [0,1,0,1,0], dist = 3
Output: 2
Explanation:
The person who is "it" at index 1 can catch people in the range
[i-dist, i+dist] = [1-3, 1+3] = [-2, 4]. They can catch the person who is not
"it" at index 2.
The person who is "it" at index 3 can catch people in the range
[i-dist, i+dist] = [3-3, 3+3] = [0, 6]. They can catch the person who is not
"it" at index 0.
The person who is not "it" at index 4 will not be caught because the people at
indices 1 and 3 are already catching one person.
```

### Example 2

```text
Input: team = [1], dist = 1
Output: 0
Explanation:
There are no people who are not "it" to catch.
```

### Example 3

```text
Input: team = [0], dist = 1
Output: 0
Explanation:
There are no people who are "it" to catch people.
```

### Constraints

- `1 <= team.length <= 10⁵`
- `0 <= team[i] <= 1`
- `1 <= dist <= team.length`

## Hints

### Hint 1

Try to use as much of the range of a person who is "it" as possible.

### Hint 2

Find the leftmost person who is "it" that has not caught anyone yet, and the
leftmost person who is not "it" that has not been caught yet.

### Hint 3

If the person who is not "it" can be caught, pair them together and repeat the
process.

### Hint 4

If the person who is not "it" cannot be caught, and the person who is not "it"
is on the left of the person who is "it", find the next leftmost person who is
not "it".

### Hint 5

If the person who is not "it" cannot be caught, and the person who is "it" is
on the left of the person who is not "it", find the next leftmost person who
is "it".
