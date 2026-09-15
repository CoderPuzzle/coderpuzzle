from typing import List


class Solution:
    def getMaxLen(self, nums: List[int]) -> int:
        # `pos_len` / `neg_len` are the lengths of the longest subarrays
        # ending at the current index whose product is positive / negative.
        # A zero breaks any run, so both reset to 0. A positive value keeps
        # every sign as-is: `pos_len` always extends, `neg_len` only extends
        # if there already was a negative-ending run. A negative value flips
        # every sign, so the two lengths swap roles (each extended by one)
        # before moving on: what used to end negative now ends positive, and
        # what used to end positive now ends negative.
        pos_len = 0
        neg_len = 0
        max_len = 0
        for x in nums:
            if x == 0:
                pos_len = 0
                neg_len = 0
            elif x > 0:
                pos_len += 1
                neg_len = neg_len + 1 if neg_len > 0 else 0
            else:
                pos_len, neg_len = (neg_len + 1 if neg_len > 0 else 0), pos_len + 1
            max_len = max(max_len, pos_len)
        return max_len
