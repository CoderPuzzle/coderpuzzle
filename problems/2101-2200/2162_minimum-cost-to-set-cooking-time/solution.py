class Solution:
    def minCostSetTime(self, startAt: int, moveCost: int, pushCost: int, targetSeconds: int) -> int:
        # Only minutes in [0, 99] whose implied seconds target - 60*minutes
        # also land in [0, 99] are settable at all; cost each survivor by
        # walking its digit sequence after normalization trims the zeroes
        # the microwave would otherwise prepend.
        best = None
        for minutes in range(100):
            seconds = targetSeconds - 60 * minutes
            if seconds < 0 or seconds > 99:
                continue
            digits = f"{minutes:02d}{seconds:02d}".lstrip("0")
            cost = 0
            finger = startAt
            for character in digits:
                digit = int(character)
                if digit != finger:
                    cost += moveCost
                    finger = digit
                cost += pushCost
            if best is None or cost < best:
                best = cost
        return best
