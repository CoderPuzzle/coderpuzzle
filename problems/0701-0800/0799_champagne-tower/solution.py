class Solution:
    def champagneTower(self, poured: float, query_row: int, query_glass: int) -> float:
        # Row-by-row simulation. row[j] is the total champagne glass j of the
        # current row has received; a full glass splits its excess equally
        # between the two glasses below, and rows below query_row never matter.
        row = [float(poured)]
        for _ in range(query_row):
            nxt = [0.0] * (len(row) + 1)
            for j in range(len(row)):
                excess = (row[j] - 1.0) / 2.0
                if excess > 0.0:
                    nxt[j] += excess
                    nxt[j + 1] += excess
            row = nxt
        return min(1.0, row[query_glass])
