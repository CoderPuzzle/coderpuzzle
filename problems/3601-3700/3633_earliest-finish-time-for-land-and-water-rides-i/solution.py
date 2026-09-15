from typing import List


class Solution:
    def earliestFinishTime(
        self, landStartTime: List[int], landDuration: List[int], waterStartTime: List[int], waterDuration: List[int]
    ) -> int:
        # Delaying a boarding past an opening never helps, and an earlier
        # first finish never pushes the second boarding later: the second leg
        # starts at max(first finish, second opening). Price both orders for
        # every pair and keep the cheapest.
        def sweep(first_start, first_dur, second_start, second_dur):
            return min(
                max(fs + fd, ss) + sd
                for fs, fd in zip(first_start, first_dur)
                for ss, sd in zip(second_start, second_dur)
            )

        return min(
            sweep(landStartTime, landDuration, waterStartTime, waterDuration),
            sweep(waterStartTime, waterDuration, landStartTime, landDuration),
        )
