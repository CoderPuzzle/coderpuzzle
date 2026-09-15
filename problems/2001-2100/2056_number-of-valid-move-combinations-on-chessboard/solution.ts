type ChessMove = [number, number, number];

function chessMoves(piece: string, position: number[]): ChessMove[] {
    const orthogonal: [number, number][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    const diagonal: [number, number][] = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
    ];
    const directions: [number, number][] = [];
    if (piece !== "bishop") directions.push(...orthogonal);
    if (piece !== "rook") directions.push(...diagonal);
    const moves: ChessMove[] = [[0, 0, 0]];
    for (const [dr, dc] of directions) {
        for (let steps = 1; ; ++steps) {
            const row = position[0] + dr * steps;
            const column = position[1] + dc * steps;
            if (row < 1 || row > 8 || column < 1 || column > 8) break;
            moves.push([dr, dc, steps]);
        }
    }
    return moves;
}

function countCombinations(pieces: string[], positions: number[][]): number {
    const options: ChessMove[][] = pieces.map((piece, index) => chessMoves(piece, positions[index]));
    const chosen: ChessMove[] = [];

    const compatible = (index: number, move: ChessMove, other: number): boolean => {
        const otherMove = chosen[other];
        for (let second = 0; second <= 7; ++second) {
            const row = positions[index][0] + move[0] * Math.min(second, move[2]);
            const column = positions[index][1] + move[1] * Math.min(second, move[2]);
            const otherRow = positions[other][0] + otherMove[0] * Math.min(second, otherMove[2]);
            const otherColumn = positions[other][1] + otherMove[1] * Math.min(second, otherMove[2]);
            if (row === otherRow && column === otherColumn) return false;
        }
        return true;
    };

    const search = (index: number): number => {
        if (index === pieces.length) return 1;
        let total = 0;
        for (const move of options[index]) {
            let valid = true;
            for (let other = 0; other < index && valid; ++other) {
                valid = compatible(index, move, other);
            }
            if (valid) {
                chosen.push(move);
                total += search(index + 1);
                chosen.pop();
            }
        }
        return total;
    };

    return search(0);
}
