/**
 * @param {number[][]} graph
 * @return {number}
 */
var catMouseGame = function (graph) {
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
    const n = graph.length;
    // value[state]: 0 undecided/draw, 1 mouse win, 2 cat win; a state
    // encodes (mouse, cat, turn), turn 0 = mouse to move, 1 = cat to move.
    const states = n * n * 2;
    const value = new Array(states).fill(0);
    const moves = new Array(states).fill(0);
    for (let mouse = 0; mouse < n; mouse++) {
        for (let cat = 1; cat < n; cat++) {
            moves[(mouse * n + cat) * 2] = graph[mouse].length;
            let catMoves = 0;
            for (const node of graph[cat]) {
                if (node !== 0) {
                    catMoves++;
                }
            }
            moves[(mouse * n + cat) * 2 + 1] = catMoves;
        }
    }
    const queue = [];
    for (let cat = 1; cat < n; cat++) {
        for (let turn = 0; turn < 2; turn++) {
            value[cat * 2 + turn] = 1;
            queue.push(cat * 2 + turn);
        }
    }
    for (let mouse = 1; mouse < n; mouse++) {
        for (let turn = 0; turn < 2; turn++) {
            value[(mouse * n + mouse) * 2 + turn] = 2;
            queue.push((mouse * n + mouse) * 2 + turn);
        }
    }
    for (let head = 0; head < queue.length; head++) {
        const state = queue[head];
        const turn = state % 2;
        const cat = Math.floor(state / 2) % n;
        const mouse = Math.floor(state / (2 * n));
        const mark = value[state];
        if (turn === 1) {
            // predecessors: mouse-to-move positions stepping onto `mouse`
            for (const node of graph[mouse]) {
                const previous = (node * n + cat) * 2;
                if (value[previous] !== 0) {
                    continue;
                }
                if (mark === 1) {
                    // the mouse (the mover) wins
                    value[previous] = 1;
                    queue.push(previous);
                } else if (--moves[previous] === 0) {
                    value[previous] = 2;
                    queue.push(previous);
                }
            }
        } else if (cat !== 0) {
            // no cat move can ever reach the hole
            for (const node of graph[cat]) {
                const previous = (mouse * n + node) * 2 + 1;
                if (value[previous] !== 0) {
                    continue;
                }
                if (mark === 2) {
                    // the cat (the mover) wins
                    value[previous] = 2;
                    queue.push(previous);
                } else if (--moves[previous] === 0) {
                    value[previous] = 1;
                    queue.push(previous);
                }
            }
        }
    }
    return value[(1 * n + 2) * 2];
};
