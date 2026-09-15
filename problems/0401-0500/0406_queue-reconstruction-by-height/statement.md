# Queue Reconstruction by Height

## Description

You are given an array of people, `people`, which are the attributes of
some people in a queue (not necessarily in order). Each `people[i] = [hi, ki]`
represents the `i`th person of height `hi` with exactly `ki` other people in
front who have a height greater than or equal to `hi`.

Reconstruct and return the queue that is represented by the input array
`people`. The returned queue should be formatted as an array `queue`, where
`queue[j] = [hj, kj]` is the attributes of the `j`th person in the queue
(`queue[0]` is the person at the front of the queue).

### Example 1

```text
Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
Explanation:
Person 0 has height 5 with no other people taller or the same height in front.
Person 1 has height 7 with no other people taller or the same height in front.
Person 2 has height 5 with two persons taller or the same height in front,
which are people 0 and 1.
Person 3 has height 6 with one person taller or the same height in front,
which is person 1.
Person 4 has height 4 with four people taller or the same height in front,
which are people 0, 1, 2, and 3.
Person 5 has height 7 with one person taller or the same height in front,
which is person 1.
Hence [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] is the reconstructed queue.
```

### Example 2

```text
Input: people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
Output: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
```

### Constraints

- `1 <= people.length <= 2000`
- `0 <= hi <= 10^6`
- `0 <= ki < people.length`
- It is guaranteed that the queue can be reconstructed.

## Hints

### Hint 1

What can you say about the position of the shortest person? If the shortest person is at position i, exactly ki people must be in front of them — and everyone is at least as tall.

### Hint 2

Once the position of the shortest person is fixed, the same reasoning applies to the second shortest, and so on: process people from tallest to shortest.

### Hint 3

Sort by height descending (ties by k ascending); inserting each person at index k into a list never breaks earlier (taller) insertions.
