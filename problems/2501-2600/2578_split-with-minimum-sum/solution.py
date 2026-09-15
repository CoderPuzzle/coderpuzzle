class Solution:
    def splitNum(self, num: int) -> int:
        # Greedy over sorted digits: ascending order, dealt alternately
        # to num1 and num2, puts the small digits where they carry the
        # most significance and interleaves so neither number grows a
        # fat leading digit. A final exchange argument shows any other
        # deal has both parts at least as large.
        digits = sorted(str(num))
        num1 = num2 = 0
        for i, d in enumerate(digits):
            if i % 2 == 0:
                num1 = num1 * 10 + int(d)
            else:
                num2 = num2 * 10 + int(d)
        return num1 + num2
