/**
 * @param {string[]} grid
 * @param {number} catJump
 * @param {number} mouseJump
 * @return {boolean}
 */
var canMouseWin = function (grid, catJump, mouseJump) {
    // Nothing about a position matters except the two cells and whose turn
    // it is — at most 64*64*2 = 8192 states, so label every state outright:
    // mouse on food is a Mouse win; cat on food or on the mouse is a Cat
    // win. Then work backward with degree counting — a state whose mover
    // can jump into a state already won by that mover inherits the win, and
    // any other labeled successor retires one of its moves, so a state
    // whose last move dies is the opponent's. States never labeled are
    // draws the mouse survives forever without eating, which the 1000-turn
    // rule awards to Cat. Per-cell jump lists (slide up to the limit, stop
    // before the first wall, staying counts) drive both the labeling and
    // its reverse edges.
    const rows = grid.length;
    const cols = grid[0].length;
    const idx = new Array(rows * cols).fill(-1);
    let n = 0;
    let mouse0 = 0;
    let cat0 = 0;
    let food = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const ch = grid[r][c];
            if (ch !== "#") {
                idx[r * cols + c] = n++;
                if (ch === "M") mouse0 = idx[r * cols + c];
                else if (ch === "C") cat0 = idx[r * cols + c];
                else if (ch === "F") food = idx[r * cols + c];
            }
        }
    }
    const mouseMoves = jumpLists(grid, rows, cols, idx, n, mouseJump);
    const catMoves = jumpLists(grid, rows, cols, idx, n, catJump);
    const mouseBack = reversed(mouseMoves, n);
    const catBack = reversed(catMoves, n);
    const UNKNOWN = 0;
    const MOUSE = 1;
    const CAT = 2;
    const label = new Array(2 * n * n).fill(UNKNOWN);
    const degree = new Array(2 * n * n).fill(0);
    const queue = [];
    for (let m = 0; m < n; m++) {
        for (let c = 0; c < n; c++) {
            for (let t = 0; t < 2; t++) {
                const s = (m * n + c) * 2 + t;
                degree[s] = (t === 0 ? mouseMoves[m] : catMoves[c]).length;
                if (c === food || m === c) {
                    label[s] = CAT;
                    queue.push(s);
                } else if (m === food) {
                    label[s] = MOUSE;
                    queue.push(s);
                }
            }
        }
    }
    for (let head = 0; head < queue.length; head++) {
        const s = queue[head];
        const base = Math.floor(s / 2);
        const t = s % 2;
        const m = Math.floor(base / n);
        const c = base % n;
        const win = label[s];
        if (t === 1) {
            for (const m2 of mouseBack[m]) {
                // predecessors: the mouse just moved
                const p = (m2 * n + c) * 2;
                if (label[p] === UNKNOWN) {
                    if (win === MOUSE) {
                        label[p] = MOUSE;
                        queue.push(p);
                    } else if (--degree[p] === 0) {
                        label[p] = CAT;
                        queue.push(p);
                    }
                }
            }
        } else {
            for (const c2 of catBack[c]) {
                // predecessors: the cat just moved
                const p = (m * n + c2) * 2 + 1;
                if (label[p] === UNKNOWN) {
                    if (win === CAT) {
                        label[p] = CAT;
                        queue.push(p);
                    } else if (--degree[p] === 0) {
                        label[p] = MOUSE;
                        queue.push(p);
                    }
                }
            }
        }
    }
    return label[(mouse0 * n + cat0) * 2] === MOUSE;
};

function jumpLists(grid, rows, cols, idx, n, jump) {
    const dirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    const out = Array.from({ length: n }, () => []);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const i = idx[r * cols + c];
            if (i < 0) continue;
            out[i].push(i); // staying in place is a move too
            for (const [dr, dc] of dirs) {
                for (let s = 1; s <= jump; s++) {
                    const rr = r + dr * s;
                    const cc = c + dc * s;
                    if (rr < 0 || rr >= rows || cc < 0 || cc >= cols || grid[rr][cc] === "#") break;
                    out[i].push(idx[rr * cols + cc]);
                }
            }
        }
    }
    return out;
}

function reversed(moves, n) {
    const back = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; i++) {
        for (const j of moves[i]) back[j].push(i);
    }
    return back;
}
