from typing import List


class Solution:
    def maxArea(self, height: int, positions: List[int], directions: str) -> int:
        # The total moves each second by (#up - #down); that balance only
        # changes at critical times when a piston lands on an end and turns
        # around. Between critical times the total runs along a straight
        # line, so its peak sits at t = 0 or at some critical time.
        events = {}
        balance = 0
        for p, d in zip(positions, directions):
            # A piston parked at an end turns around on the spot.
            if p == 0:
                going_up = True
            elif p == height:
                going_up = False
            else:
                going_up = d == "U"
            first = height - p if going_up else p
            if going_up:
                # Landing on the top flips a piston downward.
                events[first] = events.get(first, 0) - 2
                balance += 1
                if first < height:  # second landing stays inside period 2h
                    events[first + height] = events.get(first + height, 0) + 2
            else:
                # Landing on the floor flips a piston upward.
                events[first] = events.get(first, 0) + 2
                balance -= 1
                if first < height:
                    events[first + height] = events.get(first + height, 0) - 2

        total = sum(positions)
        best = total
        prev = 0
        for t in sorted(events):
            total += balance * (t - prev)
            best = max(best, total)
            balance += events[t]
            prev = t
        return best
