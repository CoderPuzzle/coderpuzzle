# Solutions — Open the Lock

## Breadth-First Search

Model the lock as an unweighted graph whose 10,000 nodes are the four-digit strings and whose edges join states differing by one turn of one wheel — eight neighbors per state, since each of the four wheels turns up or down with wraparound between `0` and `9`. The minimum number of turns to reach the target is then the shortest path from `0000`, which breadth-first search measures exactly: the queue processes states in order of turn count, so the first time the target appears is optimal.

The deadends go into a set for constant-time membership tests, and the search refuses to enqueue any deadend state, so no path ever passes through one. The start itself is checked first — if `0000` is a deadend the wheels can never move and the answer is `-1` immediately. States are marked seen at enqueue time so each enters the queue at most once, and a state is compared against the target when dequeued, returning the turn count it carries. Exhausting the queue without meeting the target means every neighbor of every reached state is either seen or dead, so the lock cannot be opened.

Each of the 10,000 states is expanded at most once, generating its eight neighbors with short constant-length digit strings, all bounded work. The seen set and the queue are likewise bounded by the state space.

**Complexity:** `O(10^4)` time, `O(10^4)` space.
