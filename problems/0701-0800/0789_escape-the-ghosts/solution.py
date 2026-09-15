from typing import List


class Solution:
    def escapeGhosts(self, ghosts: List[List[int]], target: List[int]) -> bool:
        # Everyone covers one unit per turn on an empty grid, so travel
        # times are Manhattan distances: the runner needs |target| turns,
        # ghost i needs |ghosts[i] - target| turns to camp the target. A
        # ghost no farther than the runner gets there first (or together)
        # and waits — not an escape. A strictly farther ghost cannot even
        # meet the runner on a beeline: the runner is d - t from the
        # target at turn t, so the triangle inequality would place that
        # ghost within d of the target after all.
        mine = abs(target[0]) + abs(target[1])
        for ghost in ghosts:
            theirs = abs(ghost[0] - target[0]) + abs(ghost[1] - target[1])
            if theirs <= mine:
                return False
        return True
