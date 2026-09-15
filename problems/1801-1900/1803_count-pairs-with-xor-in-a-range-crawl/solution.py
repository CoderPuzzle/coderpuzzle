from typing import List


class Solution:
    def countPairs(self, nums: List[int], low: int, high: int) -> int:
        # The range condition splits into two "at most" counts: the answer is
        # f(high) - f(low - 1), where f(K) counts earlier values y with
        # x XOR y <= K. Every value fits in 15 bits (2 * 10^4 < 2^15), so the
        # trie walks 15 levels, top bit first.
        nxt = [[-1, -1]]
        cnt = [0]

        def insert(value: int) -> None:
            node = 0
            for b in range(14, -1, -1):
                d = (value >> b) & 1
                if nxt[node][d] == -1:
                    nxt[node][d] = len(nxt)
                    nxt.append([-1, -1])
                    cnt.append(0)
                node = nxt[node][d]
                cnt[node] += 1

        def count_at_most(value: int, k: int) -> int:
            # Walks the trie alongside k: a 1 bit of k counts the whole
            # subtree that keeps the xor prefix equal so far (the remaining
            # suffix is then strictly smaller) and descends the other child,
            # while a 0 bit only lets the matching child continue.
            node = 0
            total = 0
            for b in range(14, -1, -1):
                xb = (value >> b) & 1
                if (k >> b) & 1:
                    equal = nxt[node][xb]
                    if equal != -1:
                        total += cnt[equal]
                    node = nxt[node][1 - xb]
                else:
                    node = nxt[node][xb]
                if node == -1:
                    return total
            return total + cnt[node]

        # Each element is counted against the trie before it is inserted, so
        # every unordered pair is counted exactly once.
        answer = 0
        for x in nums:
            answer += count_at_most(x, high) - count_at_most(x, low - 1)
            insert(x)
        return answer
