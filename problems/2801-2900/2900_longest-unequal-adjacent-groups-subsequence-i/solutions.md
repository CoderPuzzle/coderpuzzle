# Solutions — Longest Unequal Adjacent Groups Subsequence I

## One Word per Group Run

groups is binary, so an alternating subsequence never uses two elements of
the same group in a row — within any maximal run of equal group values at
most one element can be kept, and keeping the run's first element can never
hurt: every element a later pick could chain from has the opposite group,
and the first element of the run has exactly that opposite group too. So
the longest alternating subsequence is obtained by taking the element of
every maximal run — equivalently, taking words[i] exactly when i is 0 or
groups[i] != groups[i - 1] — and the count of picks equals the number of
group changes plus one, the DP optimum for this problem.

One pass over groups does it: start the answer with words[0], then append
words[i] whenever groups[i] differs from groups[i - 1]. Scanning left to
right keeps index order, so the result is a valid subsequence, and
consecutive picks straddle a group change, so it is alternating. n is at
most 100 and each word at most 10 letters, so every quantity stays far
inside a signed 32-bit int. The greedy pin also makes the returned answer
deterministic out of the many the statement permits.

**Complexity:** `O(n)` time, `O(n)` space for the answer.
