from typing import List, Optional


class Solution:
    def numberOfUniqueGoodSubsequences(self, binary: str) -> int:
        MOD = 10**9 + 7
        # end0/end1 = distinct good subsequence VALUES ending in '0'/'1' over
        # the prefix. The lone "0" is the only good value with a leading
        # zero, so it lives in a flag and end0 holds only values starting
        # with '1'.
        end0 = 0
        end1 = 0
        has_zero = False
        for ch in binary:
            # Extending every existing value by ch absorbs the old
            # ending-in-ch set (each was itself an extension of something
            # shorter), so the new count is simply end0 + end1.
            if ch == "0":
                # No lone "0" and never extend "0" itself: both would be
                # leading-zero values. Appending '0' to a 1-initial value is
                # always safe.
                end0 = (end0 + end1) % MOD
                has_zero = True
            else:
                end1 = (end1 + end0 + 1) % MOD  # +1: the character alone
        # Add back the lone "0" if any zero appeared.
        return (end0 + end1 + (1 if has_zero else 0)) % MOD
