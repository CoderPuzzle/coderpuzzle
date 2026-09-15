from typing import List


class Solution:
    def separateDigits(self, nums: List[int]) -> List[int]:
        # Strip digits by repeated division into a tiny buffer, then flush
        # the buffer reversed: values stay in their original reading order
        # while each number's own digits come out low-first during lifting.
        out = []
        buf = [0] * 6  # 10^5 carries at most six digits
        for x in nums:
            t = 0
            v = x
            while v > 0:
                v, r = divmod(v, 10)
                buf[t] = r
                t += 1
            while t > 0:
                out.append(buf[t - 1])
                t -= 1
        return out
