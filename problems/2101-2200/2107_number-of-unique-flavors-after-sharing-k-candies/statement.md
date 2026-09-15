# Number of Unique Flavors After Sharing K Candies

## Description

You are given a 0-indexed integer array candies, where candies[i] represents the flavor of the ith candy. Your mom wants you to share these candies with your little sister by giving her k consecutive candies, but you want to keep as many flavors of candies as possible.

Return the maximum number of unique flavors of candy you can keep after sharing with your sister.

### Example 1

```text
Input: candies = [1,2,2,3,4,3], k = 3
Output: 3
Explanation:
Give the candies in the range [1, 3] (inclusive) with flavors [2,2,3].
You can eat candies with flavors [1,4,3].
There are 3 unique flavors, so return 3.
```

### Example 2

```text
Input: candies = [2,2,2,2,3,3], k = 2
Output: 2
Explanation:
Give the candies in the range [3, 4] (inclusive) with flavors [2,3].
You can eat candies with flavors [2,2,2,3].
There are 2 unique flavors, so return 2.
Note that you can also share the candies with flavors [2,2] and eat the candies with flavors [2,2,3,3].
```

### Example 3

```text
Input: candies = [2,4,5], k = 0
Output: 3
Explanation:
You do not have to give any candies.
You can eat the candies with flavors [2,4,5].
There are 3 unique flavors, so return 3.
```

### Constraints

- `0 <= candies.length <= 10⁵`
- `1 <= candies[i] <= 10⁵`
- `0 <= k <= candies.length`

## Hints

### Hint 1

For every group of k consecutive candies, count the number of unique flavors not inside that group. Return the largest number of unique flavors.

### Hint 2

When calculating an adjacent group of k consecutive candies, can you use some of your previous calculations?

### Hint 3

Use a sliding window where the window is the group of k consecutive candies you are sharing. Use a hash map to store the number of candies of each type you can keep.
