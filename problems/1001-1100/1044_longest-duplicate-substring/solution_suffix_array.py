class Solution:
    def longestDupSubstring(self, s: str) -> str:
        n = len(s)
        # Rank of each suffix by its first character alone; ranks only need
        # relative order, so raw character codes serve.
        rank = [ord(c) for c in s]
        sa = list(range(n))

        # Doubling sort: after the pass with step k, ranks order prefixes of
        # length 2k, so ceil(log2 n) passes settle the whole suffix order.
        # Each pass sorts by the pair (current rank, rank of the suffix k
        # steps later), with -1 standing in for "past the end" so a suffix
        # that is a prefix of a longer one ranks strictly below it.
        k = 1
        while k < n:
            pair = [(rank[i], rank[i + k] if i + k < n else -1) for i in range(n)]
            sa.sort(key=pair.__getitem__)
            new_rank = [0] * n
            r = 0
            prev = pair[sa[0]]
            for pos in range(1, n):
                cur = pair[sa[pos]]
                if cur != prev:
                    r += 1
                    prev = cur
                new_rank[sa[pos]] = r
            rank = new_rank
            if r == n - 1:
                break  # every suffix distinct — the order is already final
            k *= 2

        # Kasai's scan: walk the text positions left to right, matching each
        # suffix against its predecessor in sorted order. Dropping a leading
        # character from both sides of a match shortens it by at most one, so
        # a single extending counter h that only ever retreats by one per
        # step settles every LCP within 2n character comparisons.
        pos_of = [0] * n
        for pos, i in enumerate(sa):
            pos_of[i] = pos
        best_length = 0
        best_start = 0
        h = 0
        for i in range(n):
            if pos_of[i] > 0:
                j = sa[pos_of[i] - 1]
                while i + h < n and j + h < n and s[i + h] == s[j + h]:
                    h += 1
                if h > best_length:
                    best_length = h
                    best_start = i
                if h > 0:
                    h -= 1
            else:
                h = 0

        if best_length == 0:
            return ""
        return s[best_start : best_start + best_length]
