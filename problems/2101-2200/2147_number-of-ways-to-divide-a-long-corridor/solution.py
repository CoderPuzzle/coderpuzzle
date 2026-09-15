from typing import List, Optional


class Solution:
    def numberOfWays(self, corridor: str) -> int:
        # Sections pair the seats up in order, so exactly one divider is
        # forced between each finished pair and the next seat — placeable
        # at any of the plants-plus-one positions inside that gap.
        MOD = 10**9 + 7
        ways = 1
        seats = 0
        plants = 0
        for c in corridor:
            if c == "S":
                seats += 1
                if seats > 2 and seats % 2 == 1:
                    ways = ways * (plants + 1) % MOD
                plants = 0
            elif seats >= 2:
                plants += 1
        return ways if seats and seats % 2 == 0 else 0
