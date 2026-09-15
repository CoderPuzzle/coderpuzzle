from typing import List


class Solution:
    def validateCoupons(self, code: List[str], businessLine: List[str], isActive: List[bool]) -> List[str]:
        # Category rank: electronics < grocery < pharmacy < restaurant.
        rank = {"electronics": 0, "grocery": 1, "pharmacy": 2, "restaurant": 3}
        valid = []
        for i, name in enumerate(code):
            if not isActive[i] or businessLine[i] not in rank:
                continue
            # Non-empty, and every character alphanumeric or underscore.
            if not name or not all(
                "a" <= ch <= "z" or "A" <= ch <= "Z" or "0" <= ch <= "9" or ch == "_" for ch in name
            ):
                continue
            valid.append((rank[businessLine[i]], name))
        # Sort by (category rank, code); the code tiebreak is plain
        # lexicographic string order.
        valid.sort()
        return [name for _, name in valid]
