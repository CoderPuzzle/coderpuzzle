class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        def sweep(budget):
            counts = {}
            distinct = 0
            qualified = 0
            best = 0
            left = 0
            for right, ch in enumerate(s):
                prev = counts.get(ch, 0)
                if prev == 0:
                    distinct += 1
                counts[ch] = prev + 1
                if prev + 1 == k:
                    qualified += 1
                # Growing a window never lowers its letter variety, so once
                # the window busts the budget only shrinking repairs it: left
                # advances monotonically and never backtracks.
                while distinct > budget:
                    drop = s[left]
                    left += 1
                    if counts[drop] == k:
                        qualified -= 1
                    counts[drop] -= 1
                    if counts[drop] == 0:
                        distinct -= 1
                # qualified never exceeds distinct, which never exceeds the
                # budget, so reaching the budget means exactly budget letters
                # are present and each has reached k. A letter rarer than k
                # across the whole string never joins qualified, so windows
                # relying on it stay unrecorded.
                if qualified == budget:
                    best = max(best, right - left + 1)
            return best

        # Every qualifying window holds between 1 and 26 distinct letters.
        # Pin that count as a budget and the window rule -- no more than
        # budget distinct letters -- becomes one two pointers can maintain.
        return max(sweep(budget) for budget in range(1, 27))
