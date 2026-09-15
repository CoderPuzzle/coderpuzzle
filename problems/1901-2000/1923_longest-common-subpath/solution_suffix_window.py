from collections import deque


class Solution:
    def longestCommonSubpath(self, n: int, paths: list[list[int]]) -> int:
        k = len(paths)
        # Every sequence is glued into one text, closed by its own separator.
        # Separators sit strictly above every value in the text and are
        # pairwise distinct, so a separator can never line up with a value —
        # or with another separator — and a match between suffixes of two
        # sequences stops exactly at the sequence ends instead of leaking
        # across a boundary. The first separator sits just past the largest
        # value in play: the statement bounds values below n, and the
        # measured maximum keeps even an out-of-bounds value from colliding.
        hi = -1
        for path in paths:
            for v in path:
                if v > hi:
                    hi = v
        base = max(n, hi + 1)
        text = []
        owner = []  # sequence index per position, -1 on separators
        for i, path in enumerate(paths):
            text.extend(path)
            owner.extend([i] * len(path))
            text.append(base + i)
            owner.append(-1)
        total = len(text)

        # Rank of each suffix by its first symbol alone; ranks only need
        # relative order, so raw values serve.
        rank = list(text)
        sa = list(range(total))

        # Doubling sort: after the pass with step k, ranks order prefixes of
        # length 2k, so ceil(log2 total) passes settle the whole suffix
        # order. Each pass sorts by the pair (current rank, rank of the
        # suffix k steps later), with -1 standing in for "past the end" so a
        # suffix that is a prefix of a longer one ranks strictly below it.
        step = 1
        while step < total:
            pair = [(rank[i], rank[i + step] if i + step < total else -1) for i in range(total)]
            sa.sort(key=pair.__getitem__)
            new_rank = [0] * total
            classes = 0
            prev = pair[sa[0]]
            for pos in range(1, total):
                cur = pair[sa[pos]]
                if cur != prev:
                    classes += 1
                    prev = cur
                new_rank[sa[pos]] = classes
            rank = new_rank
            if classes == total - 1:
                break  # every suffix distinct — the order is already final
            step *= 2

        # Kasai's scan: walk the text positions left to right, matching each
        # suffix against its predecessor in sorted order. Dropping a leading
        # symbol from both sides of a match shortens it by at most one, so a
        # single extending counter h that only ever retreats by one per step
        # settles every adjacent LCP within 2N symbol comparisons.
        pos_of = [0] * total
        for pos, i in enumerate(sa):
            pos_of[i] = pos
        lcp = [0] * total  # lcp[i] = shared prefix of the suffixes at sa[i-1] and sa[i]
        h = 0
        for i in range(total):
            if pos_of[i] > 0:
                j = sa[pos_of[i] - 1]
                while i + h < total and j + h < total and text[i + h] == text[j + h]:
                    h += 1
                lcp[pos_of[i]] = h
                if h > 0:
                    h -= 1
            else:
                h = 0

        # Suffixes that start on a separator cannot share even one symbol
        # with another suffix, so the sweep below keeps only suffixes that
        # start on a value. The LCP of consecutive kept suffixes is the
        # minimum over the span of dropped ones between them (the shared
        # prefix of a sorted range is the minimum of its adjacent LCPs),
        # folded in one pass with a running minimum.
        seq_of = []
        span_lcp = []
        span = total
        for i in range(total):
            if lcp[i] < span:
                span = lcp[i]
            who = owner[sa[i]]
            if who >= 0:
                seq_of.append(who)
                span_lcp.append(span)
                span = total

        # A segment shared by every sequence is a prefix shared by one
        # suffix of each sequence, and such suffixes occupy one contiguous
        # block of the sorted order — so the answer is the deepest window of
        # the suffix array that still holds a suffix from every sequence,
        # its depth being the minimum adjacent LCP inside it. Two pointers
        # sweep the narrowest covering windows (shrinking can only deepen
        # the minimum), and a monotonic deque carries that minimum at its
        # front: each suffix enters and leaves the window once.
        best = 0
        cnt = [0] * k
        have = 0
        left = 0
        window = deque()
        for right in range(len(seq_of)):
            who = seq_of[right]
            if cnt[who] == 0:
                have += 1
            cnt[who] += 1
            while window and span_lcp[window[-1]] >= span_lcp[right]:
                window.pop()
            window.append(right)
            while have == k:
                while window and window[0] <= left:
                    window.popleft()
                if window and span_lcp[window[0]] > best:
                    best = span_lcp[window[0]]
                gone = seq_of[left]
                cnt[gone] -= 1
                if cnt[gone] == 0:
                    have -= 1
                left += 1
        return best
