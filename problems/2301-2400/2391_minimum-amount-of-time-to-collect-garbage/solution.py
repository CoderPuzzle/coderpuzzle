class Solution:
    def garbageCollection(self, garbage: List[str], travel: List[int]) -> int:
        # Every unit costs one pickup minute; each truck drives exactly
        # to the last house holding its type. Track those last indices,
        # then add prefix travel once per type that appears past house 0.
        minutes = 0
        last: dict[str, int] = {}
        for i, g in enumerate(garbage):
            minutes += len(g)
            for ch in g:
                last[ch] = i
        pre = 0
        for i, cost in enumerate(travel, start=1):
            pre += cost
            for ch in "MPG":
                if last.get(ch) == i:
                    minutes += pre
                    last[ch] = -1
        return minutes
