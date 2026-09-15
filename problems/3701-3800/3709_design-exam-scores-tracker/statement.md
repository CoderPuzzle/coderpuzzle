# Design Exam Scores Tracker

## Description

Alice keeps taking exams and wants a running view of her results: for any
stretch of time she names, she asks for the total of the scores she earned
inside it.

Implement the `ExamTracker` class:

- `ExamTracker()` Initializes the tracker.
- `void record(int time, int score)` Alice takes a new exam at time `time`
  and achieves the score `score`.
- `long long totalScore(int startTime, int endTime)` Returns the total score
  of every exam taken in the inclusive interval `[startTime, endTime]`. If no
  recorded exam falls inside the interval, return `0`.

The calls obey a chronological discipline:

- Every `record` call carries a strictly larger `time` than all earlier
  calls.
- A query never reaches into the future: if the most recent `record` used
  time `t`, then every `totalScore` call satisfies
  `startTime <= endTime <= t`.

### Example 1

```text
Input:
["ExamTracker", "record", "totalScore", "record", "totalScore", "totalScore", "totalScore", "totalScore"]
[[], [1, 98], [1, 1], [5, 99], [1, 3], [1, 5], [3, 4], [2, 5]]
Output: [null, null, 98, null, 98, 197, 0, 99]
Explanation:
ExamTracker examTracker = new ExamTracker();
examTracker.record(1, 98);    // an exam at time 1 scores 98.
examTracker.totalScore(1, 1); // only that exam lies in [1, 1], so return 98.
examTracker.record(5, 99);    // an exam at time 5 scores 99.
examTracker.totalScore(1, 3); // the exam at time 5 is outside [1, 3]; return 98.
examTracker.totalScore(1, 5); // both exams lie inside; return 98 + 99 = 197.
examTracker.totalScore(3, 4); // nothing was recorded in [3, 4]; return 0.
examTracker.totalScore(2, 5); // only the exam at time 5 lies in [2, 5]; return 99.
```

### Constraints

- `1 <= time <= 10⁹`
- `1 <= score <= 10⁹`
- `1 <= startTime <= endTime <= t`, where `t` is the `time` of the most
  recent `record` call
- `record` calls are made with strictly increasing `time`
- The first call after `ExamTracker()` is always `record`
- At most `10⁵` calls will be made in total to `record` and `totalScore`

## Hints

### Hint 1

Keep two growing arrays: every `record` appends its `time` to one and a
running prefix total of scores to the other, so entry `i` of the second
array holds the sum of the first `i + 1` scores.

### Hint 2

Answer a query with binary search on the sorted times: let `l` be the first
index holding a time at least `startTime`, and `r` the last index holding a
time at most `endTime`.

### Hint 3

If `l > r` no exam falls inside `[startTime, endTime]`, so return `0`;
otherwise the answer is the difference of two prefix totals.
