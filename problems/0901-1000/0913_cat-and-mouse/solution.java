class Solution {

    public int catMouseGame(int[][] graph) {
        // The game is a three-valued minimax over positions (mouse node, cat
        // node, whose turn) — at most 2n*n of them, and a repeated position
        // ends the game as a draw, so every position is played at most once
        // and the game is finite. Evaluate positions backward from the
        // terminals: the mouse at the hole is a mouse win, the cat on the
        // mouse a cat win. A position whose mover reaches any marked
        // successor carrying its own win takes that mark immediately; once
        // its last undecided successor falls, every move leads to the
        // opponent's win and the position takes the opponent's mark. The
        // cat's moves skip the hole. Whatever stays unmarked at the fixpoint
        // is a draw — a player that cannot force a win keeps play cycling
        // until a position repeats. The queue is iterative, and the answer
        // is the mark of the initial position (mouse at 1, cat at 2, mouse
        // to move).
        int n = graph.length;
        // value[state]: 0 undecided/draw, 1 mouse win, 2 cat win; a state
        // encodes (mouse, cat, turn), turn 0 = mouse to move, 1 = cat to
        // move.
        int states = n * n * 2;
        int[] value = new int[states];
        int[] moves = new int[states];
        for (int mouse = 0; mouse < n; ++mouse) {
            for (int cat = 1; cat < n; ++cat) {
                moves[(mouse * n + cat) * 2] = graph[mouse].length;
                int catMoves = 0;
                for (int node : graph[cat]) {
                    if (node != 0) {
                        ++catMoves;
                    }
                }
                moves[(mouse * n + cat) * 2 + 1] = catMoves;
            }
        }
        int[] queue = new int[states];
        int tail = 0;
        for (int cat = 1; cat < n; ++cat) {
            for (int turn = 0; turn < 2; ++turn) {
                value[cat * 2 + turn] = 1;
                queue[tail++] = cat * 2 + turn;
            }
        }
        for (int mouse = 1; mouse < n; ++mouse) {
            for (int turn = 0; turn < 2; ++turn) {
                value[(mouse * n + mouse) * 2 + turn] = 2;
                queue[tail++] = (mouse * n + mouse) * 2 + turn;
            }
        }
        for (int head = 0; head < tail; ++head) {
            int state = queue[head];
            int turn = state % 2;
            int cat = (state / 2) % n;
            int mouse = state / (2 * n);
            int mark = value[state];
            if (turn == 1) {
                // predecessors: mouse-to-move positions stepping onto `mouse`
                for (int node : graph[mouse]) {
                    int previous = (node * n + cat) * 2;
                    if (value[previous] != 0) {
                        continue;
                    }
                    if (mark == 1) {
                        // the mouse (the mover) wins
                        value[previous] = 1;
                        queue[tail++] = previous;
                    } else if (--moves[previous] == 0) {
                        value[previous] = 2;
                        queue[tail++] = previous;
                    }
                }
            } else if (cat != 0) {
                // no cat move can ever reach the hole
                for (int node : graph[cat]) {
                    int previous = (mouse * n + node) * 2 + 1;
                    if (value[previous] != 0) {
                        continue;
                    }
                    if (mark == 2) {
                        // the cat (the mover) wins
                        value[previous] = 2;
                        queue[tail++] = previous;
                    } else if (--moves[previous] == 0) {
                        value[previous] = 1;
                        queue[tail++] = previous;
                    }
                }
            }
        }
        return value[(1 * n + 2) * 2];
    }
}
