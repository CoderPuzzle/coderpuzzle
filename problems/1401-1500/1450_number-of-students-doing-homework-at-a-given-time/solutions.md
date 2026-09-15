# Solutions — Number of Students Doing Homework at a Given Time

## One inclusive interval test per student

Each student contributes one independent boolean — is `queryTime` inside
`[startTime[i], endTime[i]]` with both ends included — so the answer is a
single pass counting the intervals that contain it. The comparison is two
inequalities, and inclusivity means neither end is strict: a student who
starts exactly at `queryTime` or ends exactly at `queryTime` counts.

With at most 100 students there is nothing to index or sort; the linear
count is the whole algorithm, and the values (all at most 1000) need no
wider arithmetic anywhere.

**Complexity:** `O(n)` time, `O(1)` space.
