from typing import List, Optional


class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        # all 2^k codes present <=> distinct length-k substrings reach 2^k
        need = 1 << k
        # too short to host even one code of length k
        if len(s) < k:
            return False
        seen = set()
        for i in range(len(s) - k + 1):
            seen.add(s[i : i + k])
            # early exit: codes exhausted before the string ends
            if len(seen) == need:
                return True
        return len(seen) == need
