from typing import List


class Solution:
    def canMouseWin(self, grid: List[str], catJump: int, mouseJump: int) -> bool:
        # Nothing about a position matters except the two cells and whose
        # turn it is — at most 64*64*2 = 8192 states, so label every state
        # outright: mouse on food is a Mouse win; cat on food or on the
        # mouse is a Cat win. Then work backward with degree counting — a
        # state whose mover can jump into a state already won by that mover
        # inherits the win, and any other labeled successor retires one of
        # its moves, so a state whose last move dies is the opponent's.
        # States never labeled are draws the mouse survives forever without
        # eating, which the 1000-turn rule awards to Cat. Per-cell jump
        # lists (slide up to the limit, stop before the first wall, staying
        # counts) drive both the labeling and its reverse edges.
        rows, cols = len(grid), len(grid[0])
        idx = {}
        cells = []
        mouse0 = cat0 = food = -1
        for r in range(rows):
            for c in range(cols):
                ch = grid[r][c]
                if ch != "#":
                    idx[r * cols + c] = len(cells)
                    cells.append(r * cols + c)
                    if ch == "M":
                        mouse0 = idx[r * cols + c]
                    elif ch == "C":
                        cat0 = idx[r * cols + c]
                    elif ch == "F":
                        food = idx[r * cols + c]

        def graph(jump):
            moves, back = [], [[] for _ in cells]
            for i, p in enumerate(cells):
                r, c = divmod(p, cols)
                lst = [i]
                for dr, dc in ((0, 1), (0, -1), (1, 0), (-1, 0)):
                    for s in range(1, jump + 1):
                        rr, cc = r + dr * s, c + dc * s
                        if not (0 <= rr < rows and 0 <= cc < cols) or grid[rr][cc] == "#":
                            break
                        lst.append(idx[rr * cols + cc])
                moves.append(lst)
                for j in lst:  # staying put is a move too, with its own edge
                    back[j].append(i)
            return moves, back

        mouse_moves, mouse_back = graph(mouseJump)
        cat_moves, cat_back = graph(catJump)
        n = len(cells)
        UNKNOWN, MOUSE, CAT = 0, 1, 2
        label = [UNKNOWN] * (2 * n * n)
        degree = [0] * (2 * n * n)
        queue = []
        for m in range(n):
            for c in range(n):
                for t in range(2):
                    s = (m * n + c) * 2 + t
                    degree[s] = len(mouse_moves[m] if t == 0 else cat_moves[c])
                    if c == food or m == c:
                        label[s] = CAT
                        queue.append(s)
                    elif m == food:
                        label[s] = MOUSE
                        queue.append(s)
        head = 0
        while head < len(queue):
            s = queue[head]
            head += 1
            base, t = divmod(s, 2)
            m, c = divmod(base, n)
            win = label[s]
            if t == 1:
                for m2 in mouse_back[m]:  # predecessors: the mouse just moved
                    p = (m2 * n + c) * 2
                    if label[p] == UNKNOWN:
                        if win == MOUSE:
                            label[p] = MOUSE
                            queue.append(p)
                        else:
                            degree[p] -= 1
                            if degree[p] == 0:
                                label[p] = CAT
                                queue.append(p)
            else:
                for c2 in cat_back[c]:  # predecessors: the cat just moved
                    p = (m * n + c2) * 2 + 1
                    if label[p] == UNKNOWN:
                        if win == CAT:
                            label[p] = CAT
                            queue.append(p)
                        else:
                            degree[p] -= 1
                            if degree[p] == 0:
                                label[p] = MOUSE
                                queue.append(p)
        return label[(mouse0 * n + cat0) * 2] == MOUSE
