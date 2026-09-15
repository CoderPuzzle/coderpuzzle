# Number of Music Playlists

## Description

Your music player contains `n` different songs. You want to listen to `goal`
songs (not necessarily different) during your trip. To avoid boredom, you
will create a playlist so that:

- Every song is played at least once.
- A song can only be played again only if `k` other songs have been played.

Given `n`, `goal`, and `k`, return the number of possible playlists you can
create. Since the answer can be very large, return it modulo 10⁹ + 7.

### Example 1

```text
Input: n = 3, goal = 3, k = 1
Output: 6
Explanation: There are 6 possible playlists: [1, 2, 3], [1, 3, 2], [2, 1, 3],
[2, 3, 1], [3, 1, 2], and [3, 2, 1].
```

### Example 2

```text
Input: n = 2, goal = 3, k = 0
Output: 6
Explanation: There are 6 possible playlists: [1, 1, 2], [1, 2, 1], [2, 1, 1],
[2, 2, 1], [2, 1, 2], and [1, 2, 2].
```

### Example 3

```text
Input: n = 2, goal = 3, k = 1
Output: 2
Explanation: There are 2 possible playlists: [1, 2, 1] and [2, 1, 2].
```

### Constraints

- `0 <= k < n <= goal <= 100`
