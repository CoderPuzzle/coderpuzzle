# Maximum Requests Without Violating the Limit

## Description

You are given a 2D integer array `requests`, where
`requests[i] = [useri, timei]` indicates that `useri` made a request at
`timei`.

You are also given two integers `k` and `window`.

A user violates the limit if there exists an integer `t` such that the user
makes strictly more than `k` requests in the inclusive interval
`[t, t + window]`.

You may drop any number of requests.

Return an integer denoting the maximum number of requests that can remain such
that no user violates the limit.

### Example 1

```text
Input: requests = [[1,1],[2,1],[1,7],[2,8]], k = 1, window = 4
Output: 4
Explanation:
    For user 1, the request times are [1, 7]. The difference between them is
    6, which is greater than window = 4.
    For user 2, the request times are [1, 8]. The difference is 7, which is
    also greater than window = 4.
    No user makes more than k = 1 request within any inclusive interval of
    length window. Therefore, all 4 requests can remain.
```

### Example 2

```text
Input: requests = [[1,2],[1,5],[1,2],[1,6]], k = 2, window = 5
Output: 2
Explanation:
    For user 1, the request times are [2, 2, 5, 6]. The inclusive interval
    [2, 7] of length window = 5 contains all 4 requests.
    Since 4 is strictly greater than k = 2, at least 2 requests must be
    removed.
    After removing any 2 requests, every inclusive interval of length window
    contains at most k = 2 requests.
    Therefore, the maximum number of requests that can remain is 2.
```

### Example 3

```text
Input: requests = [[1,1],[2,5],[1,2],[3,9]], k = 1, window = 1
Output: 3
Explanation:
    For user 1, the request times are [1, 2]. The difference is 1, which is
    equal to window = 1.
    The inclusive interval [1, 2] contains both requests, so the count is 2,
    which exceeds k = 1. One request must be removed.
    Users 2 and 3 each have only one request and do not violate the limit.
    Therefore, the maximum number of requests that can remain is 3.
```

### Constraints

- `1 <= requests.length <= 10⁵`
- `requests[i] = [useri, timei]`
- `1 <= k <= requests.length`
- `1 <= useri, timei, window <= 10⁵`

## Hints

### Hint 1

Use a sliding-window approach.

### Hint 2

For each user, maintain a sorted list (array) of their request times.

### Hint 3

For each user, slide a window over their times; if the count inside any
inclusive interval of length window exceeds k, remove the most recent
request(s) in that interval until the count k.
