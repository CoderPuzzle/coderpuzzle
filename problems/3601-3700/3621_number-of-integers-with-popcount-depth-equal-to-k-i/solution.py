class Solution:
    def popcountDepth(self, n: int, k: int) -> int:
        # depth[j] = popcount-depth of the value j itself: 1 has depth 0,
        # deeper values sit one step past their own popcount.
        depth = [0] * 64
        for j in range(2, 64):
            depth[j] = depth[j.bit_count()] + 1
        # Digit DP over the binary digits of n: free[x] counts prefixes
        # already strictly below n's prefix that carry x set bits, while
        # tight_ones follows n's exact prefix. Answers reach ~5e14 (<
        # 2^53), which Python ints handle natively.
        free = [0] * 64
        tight_ones = 0
        for i in range(n.bit_length() - 1, -1, -1):
            nxt = free[:]
            for x in range(64):
                if free[x]:
                    nxt[x + 1] += free[x]
            if (n >> i) & 1:
                # Place 0 under n's 1: that branch goes loose, free to
                # take any suffix of the remaining bits.
                nxt[tight_ones] += 1
                tight_ones += 1
            free = nxt
        # counts[x] = integers in [1, n] with x set bits (0 included).
        counts = free[:]
        counts[tight_ones] += 1
        counts[0] -= 1  # the all-zero string is not a positive integer
        counts[1] -= 1  # x = 1 itself has depth 0, not depth 1
        answer = 1 if k == 0 else 0
        for j in range(1, 64):
            if depth[j] == k - 1:
                answer += counts[j]
        return answer
