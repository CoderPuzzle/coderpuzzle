class Solution:
    def sumGame(self, num: str) -> bool:
        # Track f = 2*diff + 9*k where diff is (left sum - right sum) over
        # fixed digits and k = (#'?' left) - (#'?' right). Every fill changes
        # f by an odd offset in [-9, 9] regardless of side. Alice wins iff
        # f != 0: she pushes +9 each turn, Bob can cancel at most -9 per
        # reply, and Bob holds f at 0 by mirroring whenever it starts there.
        diff = 0
        k = 0
        for i, ch in enumerate(num):
            if ch == "?":
                if i < len(num) // 2:
                    k += 1
                else:
                    k -= 1
            else:
                d = ord(ch) - ord("0")
                diff += d if i < len(num) // 2 else -d
        return 2 * diff + 9 * k != 0
