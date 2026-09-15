from typing import List


class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        # The game is an unweighted shortest-path search: squares are nodes
        # and dice rolls are edges of cost 1, so BFS from square 1 finds the
        # fewest moves. Flatten the board with the boustrophedon walk (bottom
        # row left to right, next row right to left, flipping each row up);
        # a roll landing on square s resolves to cells[s] when that entry is
        # not -1 and to s otherwise — exactly one mandatory teleport, never
        # chained, since the landing square is enqueued as an ordinary node.
        # Each node expands to the at-most-six destinations in
        # [curr + 1, min(curr + 6, n * n)], and an empty level means n * n
        # is unreachable.
        n = len(board)
        target = n * n
        cells = [-1] * (target + 1)  # cells[s]: the board value at square s
        square = 1
        for row_from_bottom in range(n):
            row = board[n - 1 - row_from_bottom]
            columns = range(n) if row_from_bottom % 2 == 0 else range(n - 1, -1, -1)
            for column in columns:
                cells[square] = row[column]
                square += 1
        visited = [False] * (target + 1)
        visited[1] = True
        current = [1]
        moves = 0
        while current:
            moves += 1
            reachable = []
            for curr in current:
                for nxt in range(curr + 1, min(curr + 6, target) + 1):
                    destination = cells[nxt] if cells[nxt] != -1 else nxt
                    if destination == target:
                        return moves
                    if not visited[destination]:
                        visited[destination] = True
                        reachable.append(destination)
            current = reachable
        return -1
