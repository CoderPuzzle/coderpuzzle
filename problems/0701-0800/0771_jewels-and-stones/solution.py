class Solution:
    def numJewelsInStones(self, jewels: str, stones: str) -> int:
        # A stone counts when its letter is one of the jewel types. Those
        # types are case sensitive and English letters occupy two disjoint
        # ASCII bands, 65..90 and 97..122, so a direct 128-slot table keyed
        # by character code marks each jewel letter in place — 'a' and 'A'
        # land in different slots with no folding — and every stone then
        # costs one array lookup.
        is_jewel = [False] * 128
        for ch in jewels:
            is_jewel[ord(ch)] = True
        return sum(1 for ch in stones if is_jewel[ord(ch)])
