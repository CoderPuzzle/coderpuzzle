# Solutions — High Five

## Bucket by student, sort each bucket, average the top five

Each student's average depends only on their own scores, so the first
step buckets every `items[i] = [ID, score]` by `ID` in a hash map from
student id to a list of scores. The statement guarantees at least five
scores per student, and with at most `1000` items no bucket is large, so
sorting each bucket in descending order and taking the first five scores
is the simplest honest approach. The average is `sum(top5) / 5` using
integer division, which floors the result exactly as required.

Because the result must be ordered by `ID`, the ids are iterated in
sorted order when emitting the `[ID, average]` pairs; the map lookup and
the bucket sort make the per-student work independent of the other
students.

**Complexity:** `O(N log N)` time — sorting each bucket dominates — and
`O(N)` space for the buckets, where `N` is the number of items.
