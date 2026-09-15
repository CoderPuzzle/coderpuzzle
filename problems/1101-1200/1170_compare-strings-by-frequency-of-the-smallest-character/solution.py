class Solution:
    def numSmallerByFrequency(self, queries: List[str], words: List[str]) -> List[int]:
        def f(s: str) -> int:
            # Smallest character of the string, then how often it appears.
            smallest = min(s)
            return s.count(smallest)

        freqs = sorted(f(w) for w in words)
        answer = []
        for q in queries:
            p = f(q)
            # Everything strictly above p forms one sorted suffix; find
            # where it starts.
            lo, hi = 0, len(freqs)
            while lo < hi:
                mid = (lo + hi) // 2
                if freqs[mid] <= p:
                    lo = mid + 1
                else:
                    hi = mid
            answer.append(len(freqs) - lo)
        return answer
