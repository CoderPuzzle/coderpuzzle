from typing import List, Optional


class Solution:
    def countDistinct(self, s: str) -> int:
        # Suffix automaton: each state v other than the root owns exactly the
        # len[v] - len[link[v]] substrings in its endpos equivalence class,
        # and every distinct substring belongs to exactly one class, so the
        # answer is the sum of those class sizes. Clones created while
        # splitting a transition are ordinary states and count the same way.
        n = len(s)
        cap = 2 * n
        length = [0] * cap
        link = [-1] * cap
        trans = [dict() for _ in range(cap)]
        size = 1
        last = 0
        for ch in s:
            cur = size
            size += 1
            length[cur] = length[last] + 1
            p = last
            while p != -1 and ch not in trans[p]:
                trans[p][ch] = cur
                p = link[p]
            if p == -1:
                link[cur] = 0
            else:
                q = trans[p][ch]
                if length[p] + 1 == length[q]:
                    link[cur] = q
                else:
                    # q is too deep to be cur's suffix link: copy it as a
                    # shallower clone, redirect the family's transitions,
                    # then hang both q and cur under the clone.
                    clone = size
                    size += 1
                    length[clone] = length[p] + 1
                    link[clone] = link[q]
                    trans[clone] = dict(trans[q])
                    while p != -1 and trans[p].get(ch) == q:
                        trans[p][ch] = clone
                        p = link[p]
                    link[q] = clone
                    link[cur] = clone
            last = cur
        return sum(length[v] - length[link[v]] for v in range(1, size))
