from typing import List


class Solution:
    def maxUpgrades(self, count: List[int], upgrade: List[int], sell: List[int], money: List[int]) -> List[int]:
        # For one data center, upgrading u servers is feasible exactly when
        # selling some of the remaining servers can bridge the shortfall:
        # u * upgrade may exceed money only if ceil(shortfall / sell) extra
        # servers sold still leave u un-upgraded hosts. Feasibility never
        # flips back as u grows, so a binary search on u finds the maximum.
        answer = []
        for i in range(len(count)):
            # Products reach 10^5 * 10^5 = 10^10, past int range in fixed
            # -width languages; Python integers need no widening.
            lo, hi = 0, count[i]
            while lo < hi:
                mid = (lo + hi + 1) // 2
                spent = mid * upgrade[i]
                if spent <= money[i]:
                    lo = mid
                else:
                    to_sell = -(-(spent - money[i]) // sell[i])
                    if to_sell + mid <= count[i]:
                        lo = mid
                    else:
                        hi = mid - 1
            answer.append(lo)
        return answer
