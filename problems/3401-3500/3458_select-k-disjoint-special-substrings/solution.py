class Solution:
    def maxSubstringLength(self, s: str, k: int) -> bool:
        n = len(s)
        first = {}
        last = {}
        for i, ch in enumerate(s):
            if ch not in first:
                first[ch] = i
            last[ch] = i
        intervals = []
        # Every special substring starts at the first occurrence of its
        # first letter — any earlier repeat would sit outside it — so at
        # most 26 candidate starts exist.
        for ch, a in first.items():
            # Grow the window right until it covers every occurrence of
            # every character inside it; a character leaking left of the
            # start invalidates this start entirely.
            far = last[ch]
            j = a
            ok = True
            while j <= far:
                c = s[j]
                if first[c] < a:
                    ok = False
                    break
                if last[c] > far:
                    far = last[c]
                j += 1
            # The whole string itself is not a valid selection.
            if ok and (a > 0 or far < n - 1):
                intervals.append((a, far))
        # Classic activity selection: taking earliest ends leaves the most
        # room for further disjoint picks.
        intervals.sort(key=lambda iv: iv[1])
        count = 0
        end = -1
        for a, b in intervals:
            if a > end:
                count += 1
                end = b
        return count >= k
