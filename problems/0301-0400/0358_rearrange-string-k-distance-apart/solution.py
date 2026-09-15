from collections import Counter
import heapq


class Solution:
    def rearrangeString(self, s: str, k: int) -> str:
        # Distance k apart is vacuous when k <= 1: any two positions already
        # qualify, and the pinned canonical returns s unchanged.
        if k <= 1:
            return s
        # Max-heap keyed by (-count, letter): pops land in exactly the pinned
        # pass order — largest remaining count first, ties to the smaller
        # letter.
        heap = [(-count, letter) for letter, count in Counter(s).items()]
        heapq.heapify(heap)
        total = len(s)
        out = []
        while total:
            # One pass drains up to k distinct letters; only afterwards are
            # the decremented counts pushed back, so a letter never repeats
            # within its own pass.
            taken = []
            while heap and len(taken) < k:
                taken.append(heapq.heappop(heap))
            # Fewer than k distinct letters while more remain: some window of
            # k consecutive positions would have to repeat a letter, so no
            # arrangement exists.
            if len(taken) < k and total > len(taken):
                return ""
            for negated, letter in taken:
                out.append(letter)
                total -= 1
                if -negated - 1 > 0:
                    heapq.heappush(heap, (negated + 1, letter))
        return "".join(out)
