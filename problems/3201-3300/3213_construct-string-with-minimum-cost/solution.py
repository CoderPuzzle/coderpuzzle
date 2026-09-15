from typing import List


class Solution:
    def minimumCost(self, target: str, words: List[str], costs: List[int]) -> int:
        # Reverse DP over suffixes: dp[i] is the minimum cost to assemble
        # target[i:], dp[n] is 0, and each position extends every word that
        # matches its next characters. Duplicate words collapse to their
        # cheapest cost first; per position only DISTINCT word lengths matter,
        # and their count never exceeds sqrt(2 * total word characters).
        # Walking candidate lengths ascending lets one wrapping u64 polynomial
        # hash of target[i:i+length) extend in O(1) per step; a hash hit only
        # triggers an exact dictionary probe, so correctness never rests on
        # the hash — a collision merely wastes one probe.
        best = {}
        for word, cost in zip(words, costs):
            if cost < best.get(word, 1 << 60):
                best[word] = cost
        codes = [ord(ch) for ch in target]
        n = len(codes)
        mask64 = (1 << 64) - 1
        buckets = {}  # word length -> set of word hashes (a filter, not truth)
        max_len = 0
        for word in best:
            h = 0
            for ch in word:
                h = (h * 131 + ord(ch)) & mask64
            buckets.setdefault(len(word), set()).add(h)
            if len(word) > max_len:
                max_len = len(word)
        big = 1 << 62
        dp = [big] * (n + 1)
        dp[n] = 0
        buckets_get = buckets.get
        best_get = best.get
        for i in range(n - 1, -1, -1):
            cur = big
            h = 0
            limit = min(max_len, n - i)
            for length in range(1, limit + 1):
                h = (h * 131 + codes[i + length - 1]) & mask64
                bucket = buckets_get(length)
                if bucket is not None and h in bucket:
                    cost = best_get(target[i : i + length])
                    if cost is not None:
                        nxt = dp[i + length]
                        if nxt != big and nxt + cost < cur:
                            cur = nxt + cost
            dp[i] = cur
        return -1 if dp[0] == big else dp[0]
