from typing import List


class Solution:
    def catMouseGame(self, graph: List[List[int]]) -> int:
        # The game is a three-valued minimax over positions (mouse node, cat
        # node, whose turn) — at most 2n*n of them, and a repeated position
        # ends the game as a draw, so every position is played at most once
        # and the game is finite. Evaluate positions backward from the
        # terminals: the mouse at the hole is a mouse win, the cat on the
        # mouse a cat win. A position whose mover reaches any marked
        # successor carrying its own win takes that mark immediately; once
        # its last undecided successor falls, every move leads to the
        # opponent's win and the position takes the opponent's mark. The
        # cat's moves skip the hole. Whatever stays unmarked at the fixpoint
        # is a draw — a player that cannot force a win keeps play cycling
        # until a position repeats. The queue is iterative, and the answer
        # is the mark of the initial position (mouse at 1, cat at 2, mouse
        # to move).
        n = len(graph)
        # value[mouse][cat][turn]: 0 undecided/draw, 1 mouse win, 2 cat win;
        # turn 0 = mouse to move, turn 1 = cat to move.
        value = [[[0, 0] for _ in range(n)] for _ in range(n)]
        # moves[mouse][cat][turn]: successors of the position still undecided
        moves = [[[0, 0] for _ in range(n)] for _ in range(n)]
        for mouse in range(n):
            for cat in range(1, n):
                moves[mouse][cat][0] = len(graph[mouse])
                moves[mouse][cat][1] = sum(1 for node in graph[cat] if node != 0)
        queue = []
        for cat in range(1, n):
            for turn in (0, 1):
                value[0][cat][turn] = 1
                queue.append((0, cat, turn))
        for mouse in range(1, n):
            for turn in (0, 1):
                value[mouse][mouse][turn] = 2
                queue.append((mouse, mouse, turn))
        head = 0
        while head < len(queue):
            mouse, cat, turn = queue[head]
            head += 1
            mark = value[mouse][cat][turn]
            if turn == 1:
                # predecessors: mouse-to-move positions stepping onto `mouse`
                for node in graph[mouse]:
                    if value[node][cat][0]:
                        continue
                    if mark == 1:  # the mouse (the mover) wins
                        value[node][cat][0] = 1
                        queue.append((node, cat, 0))
                    else:
                        moves[node][cat][0] -= 1
                        if moves[node][cat][0] == 0:
                            value[node][cat][0] = 2
                            queue.append((node, cat, 0))
            elif cat != 0:  # no cat move can ever reach the hole
                for node in graph[cat]:
                    if value[mouse][node][1]:
                        continue
                    if mark == 2:  # the cat (the mover) wins
                        value[mouse][node][1] = 2
                        queue.append((mouse, node, 1))
                    else:
                        moves[mouse][node][1] -= 1
                        if moves[mouse][node][1] == 0:
                            value[mouse][node][1] = 1
                            queue.append((mouse, node, 1))
        return value[1][2][0]
