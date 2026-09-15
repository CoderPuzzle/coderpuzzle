class Solution:
    def fixedRatio(self, s: str, num1: int, num2: int) -> int:
        # A substring's zeros z and ones o have ratio num1 : num2 exactly
        # when z*num2 == o*num1. With prefix counts Z, O, the substring
        # (l, r) qualifies exactly when Z[r]*num2 - O[r]*num1 equals
        # Z[l]*num2 - O[l]*num1, so counting pairs of equal prefix keys is
        # the whole task. Keys reach 10^5*10^5 = 10^10 and answers reach
        # 2.5e9, comfortably inside Python's unbounded ints.
        seen = {0: 1}
        z = o = 0
        ans = 0
        for ch in s:
            if ch == "0":
                z += 1
            else:
                o += 1
            key = z * num2 - o * num1
            prev = seen.get(key, 0)
            ans += prev
            seen[key] = prev + 1
        return ans
