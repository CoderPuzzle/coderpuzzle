# Solutions — Find The First Player to win K Games in a Row

## Champion streak scan

Challenges in the real queue always bring players to the front in their
original index order — a loser is appended behind everyone, so nobody
plays twice before every player has challenged once. That makes a single
king-of-the-hill pass over `skills` replay the game sequence verbatim:
keep the reigning champion's index and its consecutive-win counter, and
either promote a stronger challenger (its streak restarts at 1, since
beating the champion is itself one win) or bump the counter. The moment
the counter reaches `k` the champion's initial index is the answer.

If the array runs out first, the surviving champion holds the largest
skill in `skills` and — winners never leave the front — cannot ever be
dethroned, so it reaches `k` wins eventually no matter how large `k` is;
that settles the `k >= n` cases without simulating up to 10⁹ games.

**Complexity:** `O(n)` time, `O(1)` space.
