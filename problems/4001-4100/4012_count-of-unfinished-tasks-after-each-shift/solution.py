from typing import List

from bisect import bisect_right


class Solution:
    def countTasks(self, tasks: List[int], shifts: List[int]) -> List[int]:
        n = len(tasks)
        pref = []
        acc = 0
        for t in tasks:
            acc += t
            pref.append(acc)
        total = acc
        done = 0
        out = []
        for s in shifts:
            # done is the cumulative work finished within the current pass;
            # reaching the total ends the pass and discards unused time.
            done += s
            if done >= total:
                out.append(0)
                done = 0
                continue
            # bisect_right counts boundary landings as complete: pref[i] <=
            # done means task i is fully finished, and the next task holds
            # all partial work.
            out.append(n - bisect_right(pref, done))
        return out
