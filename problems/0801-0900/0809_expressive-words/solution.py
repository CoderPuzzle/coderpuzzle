from typing import List, Optional


class Solution:
    def expressiveWords(self, s: str, words: List[str]) -> int:
        # Run-length encode s once: its letter spine is what every
        # stretchy word must reproduce, group by group.
        s_groups = []
        i = 0
        while i < len(s):
            j = i
            while j < len(s) and s[j] == s[i]:
                j += 1
            s_groups.append((s[i], j - i))
            i = j

        def stretchy(w: str) -> bool:
            # Walk w's own groups against s's: same letters, same group
            # count, and per group either equal counts or an s-side count
            # of 3 or more strictly above the word's.
            gi = 0
            i = 0
            while i < len(w):
                j = i
                while j < len(w) and w[j] == w[i]:
                    j += 1
                if gi == len(s_groups) or s_groups[gi][0] != w[i]:
                    return False
                s_count = s_groups[gi][1]
                w_count = j - i
                if s_count != w_count and not (s_count >= 3 and s_count > w_count):
                    return False
                gi += 1
                i = j
            # The walk must end in lockstep with s's spine.
            return gi == len(s_groups)

        return sum(1 for w in words if stretchy(w))
