from typing import List, Optional
from collections import Counter


class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        def longest(sub):
            if not sub:
                return 0
            counts = Counter(sub)
            # A character rarer than k inside this piece can never reach k by
            # shortening the substring, so it is a hard splitter.
            rare = [ch for ch, count in counts.items() if count < k]
            if not rare:
                # No splitter: the whole piece is already valid.
                return len(sub)
            rare_set = set(rare)
            best = 0
            piece = []
            # Recurse on the pieces between consecutive rare characters; each
            # level eliminates at least one letter, so depth is bounded by 26.
            for ch in sub:
                if ch in rare_set:
                    best = max(best, longest("".join(piece)))
                    piece = []
                else:
                    piece.append(ch)
            best = max(best, longest("".join(piece)))
            return best

        return longest(s)
