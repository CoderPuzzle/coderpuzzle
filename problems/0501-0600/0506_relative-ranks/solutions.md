# Solutions — Relative Ranks

## Sort the athletes, not the array

An athlete's rank is just their position in the descending order of scores,
but the answer must line up with the input's order — so sort the index range
`0..n-1` by score descending instead of sorting the scores themselves. The
sorted indices enumerate the athletes from `1st` place down to `nth`, and
each index still remembers the slot its athlete came from, which is the only
fact needed to route a rank home.

The code walks the sorted indices with a place counter. The first three
places draw their medal strings `"Gold Medal"`, `"Silver Medal"`, and
`"Bronze Medal"`; every place after that takes its own number spelled out,
`"4"`, `"5"`, and so on. Writing `answer[index]` rather than appending keeps
`answer[i]` the rank of exactly the athlete whose score sits at `score[i]`.

**Complexity:** `O(n log n)` time, `O(n)` space.
