from typing import List


class Solution:
    def camelMatch(self, queries: List[str], pattern: str) -> List[bool]:
        # Two-pointer scan: advance the pattern pointer on a match, skip a
        # lowercase letter as an implicit insertion, and reject outright on
        # an uppercase letter that doesn't match. The query matches only if
        # every pattern character was consumed by the end of the scan.
        def matches(query: str) -> bool:
            j = 0
            for c in query:
                if j < len(pattern) and c == pattern[j]:
                    j += 1
                elif c.isupper():
                    return False
            return j == len(pattern)

        return [matches(query) for query in queries]
