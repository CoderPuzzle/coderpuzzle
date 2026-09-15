class Solution:
    def rotateTheBox(self, boxGrid: List[List[str]]) -> List[str]:
        # Gravity first: in each original row stones slide right until an
        # obstacle or the wall. Then a 90-degree clockwise rotation maps
        # new[r][c] to old[m - 1 - c][r].
        m, n = len(boxGrid), len(boxGrid[0])
        rows = []
        for row in boxGrid:
            cells = list(row)
            write = n - 1
            for c in range(n - 1, -1, -1):
                if cells[c] == "*":
                    write = c - 1
                elif cells[c] == "#":
                    cells[c], cells[write] = cells[write], cells[c]
                    write -= 1
            rows.append(cells)
        return [[rows[m - 1 - c][r] for c in range(m)] for r in range(n)]
