from typing import List, Optional


class Solution:
    def seePeople(self, heights: List[List[int]]) -> List[List[int]]:
        m = len(heights)
        n = len(heights[0])
        res = [[0] * n for _ in range(m)]

        # Count people visible to the right in each row.
        for i in range(m):
            st = []
            for j in range(n - 1, -1, -1):
                x = heights[i][j]
                cnt = 0
                while st and st[-1] < x:
                    st.pop()
                    cnt += 1
                if st:
                    cnt += 1
                res[i][j] += cnt
                while st and st[-1] <= x:
                    st.pop()
                st.append(x)

        # Count people visible below in each column.
        for j in range(n):
            st = []
            for i in range(m - 1, -1, -1):
                x = heights[i][j]
                cnt = 0
                while st and st[-1] < x:
                    st.pop()
                    cnt += 1
                if st:
                    cnt += 1
                res[i][j] += cnt
                while st and st[-1] <= x:
                    st.pop()
                st.append(x)

        return res
