from typing import List, Optional


class Solution:
    def lexSmallestAfterDeletion(self, s: str) -> str:
        # A letter occurring once can never be deleted, and any letter can
        # be deleted down to a single occurrence, so the reachable strings
        # are exactly the subsequences that keep every distinct letter.
        # Build the smallest one letter by letter: take the smallest letter
        # whose earliest remaining occurrence still leaves every
        # not-yet-taken letter an occurrence after it.
        pos = [[] for _ in range(26)]
        for i, ch in enumerate(s):
            pos[ord(ch) - 97].append(i)
        todo = [c for c in range(26) if pos[c]]
        ptr = [0] * 26
        out = []
        p = -1
        n = len(s)
        while todo:
            # Two smallest last-occurrence deadlines among needed letters.
            m1 = m2 = n
            d1 = -1
            for c in todo:
                lc = pos[c][-1]
                if lc < m1:
                    m2, m1, d1 = m1, lc, c
                elif lc < m2:
                    m2 = lc
            for c in range(26):
                lst = pos[c]
                j = ptr[c]
                while j < len(lst) and lst[j] <= p:
                    j += 1
                ptr[c] = j
                if j == len(lst):
                    continue
                # Taking occurrence q must not strand a needed letter.
                q = lst[j]
                lim = m2 if c == d1 else m1
                if q < lim:
                    out.append(chr(97 + c))
                    p = q
                    if c in todo:
                        todo.remove(c)
                    break
        return "".join(out)
