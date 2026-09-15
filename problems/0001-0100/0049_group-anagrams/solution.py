from typing import List, Optional


class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = {}
        for word in strs:
            # Sorting canonicalizes the character multiset: anagrams produce
            # byte-identical keys and non-anagrams can never collide on one.
            key = "".join(sorted(word))
            # setdefault creates the bucket on first sight of a key, so group
            # membership accumulates automatically — every word lands in
            # exactly one bucket, alongside precisely its rearrangements.
            groups.setdefault(key, []).append(word)
        # The buckets are the required groups.
        return list(groups.values())
