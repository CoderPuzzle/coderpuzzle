# Solutions — Robot Room Cleaner

## Spiral DFS with backtracking

The robot is blind, but the algorithm can keep perfect bookkeeping: cells are recorded relative to the start (`(0, 0)`), and the robot's absolute facing is known at every moment because the code itself issues every turn. The core is the classic spiral DFS — from each cell, try the four directions in clockwise order, descending into every unvisited open cell, and back out of each one before continuing.

The invariant that makes the driving correct: iteration `i` of a cell's frame always begins with the robot facing `(entry + i) % 4`, where `entry` is the direction the robot faced when it arrived. Each iteration ends in exactly one `turnRight` — immediately when the cell ahead is blocked (or already visited), or deferred when it descends into a child. When a child frame is exhausted, the back-out sequence _turnRight, turnRight, move, turnRight, turnRight_ retraces the step and restores the child's arrival facing, and one final `turnRight` delivers the parent's deferred turn, landing exactly on the orientation its next iteration expects. The physical robot and the algorithm therefore never disagree.

The recursion is made explicit with a frame stack (`[row, col, entry, index]`), which matters here: a 100 x 200 room admits DFS paths ten thousand cells deep, beyond both Python's and the sandbox JVM's stack limits. Each cell is cleaned once, entered at most once, and probed in each direction at most once from every side, so the whole run costs a bounded number of operations per cell — comfortably inside the 200 000-operation budget for the largest rooms. The `visited` check happens _before_ calling `move()`, so probes into already-explored cells are free.

**Complexity:** `O(mn)` time and space — a constant number of robot calls per cell plus a fixed five-call back-out per tree edge.
