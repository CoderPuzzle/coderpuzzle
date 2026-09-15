from typing import List, Optional


class Solution:
    def timeTaken(self, arrival: List[int], state: List[int]) -> List[int]:
        # Two FIFO queues fed by an arrival pointer (equal arrival seconds
        # enter index order automatically). prev_dir carries the direction of
        # the previous second: while both sides compete the door keeps its
        # streak, and exits win only when the door has just been idle.
        n = len(arrival)
        enter_q = []
        exit_q = []
        eh = xh = 0
        ans = [-1] * n
        i = 0
        t = 0
        prev_dir = -1  # -1 unused, 0 entering, 1 exiting
        done = 0
        while done < n:
            while i < n and arrival[i] <= t:
                (exit_q if state[i] == 1 else enter_q).append(i)
                i += 1
            if len(enter_q) == eh and len(exit_q) == xh:
                t = arrival[i]  # jump the clock; the idle breaks any streak
                prev_dir = -1
                continue
            has_enter = len(enter_q) > eh
            has_exit = len(exit_q) > xh
            if has_enter and has_exit:
                d = prev_dir if prev_dir != -1 else 1
            else:
                d = 1 if has_exit else 0
            if d == 1:
                j = exit_q[xh]
                xh += 1
            else:
                j = enter_q[eh]
                eh += 1
            ans[j] = t
            prev_dir = d
            done += 1
            t += 1
        return ans
