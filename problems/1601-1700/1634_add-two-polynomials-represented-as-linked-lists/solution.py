from typing import List, Optional


class Solution:
    def addPoly(self, poly1: List[List[int]], poly2: List[List[int]]) -> List[List[int]]:
        result: List[List[int]] = []
        i, j = 0, 0
        while i < len(poly1) and j < len(poly2):
            power1, power2 = poly1[i][0], poly2[j][0]
            if power1 == power2:
                coefficient = poly1[i][1] + poly2[j][1]
                if coefficient != 0:
                    result.append([power1, coefficient])
                i += 1
                j += 1
            elif power1 > power2:
                result.append(poly1[i])
                i += 1
            else:
                result.append(poly2[j])
                j += 1
        while i < len(poly1):
            result.append(poly1[i])
            i += 1
        while j < len(poly2):
            result.append(poly2[j])
            j += 1
        return result
