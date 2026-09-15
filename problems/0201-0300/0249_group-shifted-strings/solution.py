from typing import List, Optional


class Solution:
    def groupStrings(self, strings: List[str]) -> List[List[str]]:
        groups = {}
        for string in strings:
            # Anchoring on the first letter canonicalizes the shifting
            # sequence: the gap from it to every letter, mod 26, is invariant
            # under shifts, so shifted copies produce identical keys and
            # unshiftable strings can never collide on one.
            first = ord(string[0])
            key = tuple((ord(letter) - first) % 26 for letter in string)
            # setdefault creates the bucket on first sight of a key, so group
            # membership accumulates automatically — every string lands in
            # exactly one bucket, alongside precisely its shifts.
            groups.setdefault(key, []).append(string)
        # The buckets are the required groups.
        return list(groups.values())
