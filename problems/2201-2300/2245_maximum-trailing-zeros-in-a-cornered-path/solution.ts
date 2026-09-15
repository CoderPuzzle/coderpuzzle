function maxTrailingZeros(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;

    const count2: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    const count5: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let x = grid[i][j];
            let c2 = 0;
            while (x % 2 === 0) {
                x = Math.floor(x / 2);
                c2 += 1;
            }
            let c5 = 0;
            while (x % 5 === 0) {
                x = Math.floor(x / 5);
                c5 += 1;
            }
            count2[i][j] = c2;
            count5[i][j] = c5;
        }
    }

    // row2[i][j+1] = sum count2[i][0..j]; row5 analogous.
    const row2: number[][] = Array.from({ length: m }, () => new Array(n + 1).fill(0));
    const row5: number[][] = Array.from({ length: m }, () => new Array(n + 1).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            row2[i][j + 1] = row2[i][j] + count2[i][j];
            row5[i][j + 1] = row5[i][j] + count5[i][j];
        }
    }

    // col2[j][i+1] = sum count2[0..i][j]; col5 analogous.
    const col2: number[][] = Array.from({ length: n }, () => new Array(m + 1).fill(0));
    const col5: number[][] = Array.from({ length: n }, () => new Array(m + 1).fill(0));
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < m; i++) {
            col2[j][i + 1] = col2[j][i] + count2[i][j];
            col5[j][i + 1] = col5[j][i] + count5[i][j];
        }
    }

    const score = (r: number, c: number): number => {
        const cell2 = count2[r][c];
        const cell5 = count5[r][c];
        // horizontal sum over full row segment, vertical over full column segment
        const horiz2Left = row2[r][c + 1]; // cols [0, c]
        const horiz2Right = row2[r][n] - row2[r][c]; // cols [c, n-1]
        const vert2Top = col2[c][r + 1]; // rows [0, r]
        const vert2Bottom = col2[c][m] - col2[c][r]; // rows [r, m-1]
        const horiz5Left = row5[r][c + 1];
        const horiz5Right = row5[r][n] - row5[r][c];
        const vert5Top = col5[c][r + 1];
        const vert5Bottom = col5[c][m] - col5[c][r];

        return Math.max(
            Math.min(horiz2Left + vert2Top - cell2, horiz5Left + vert5Top - cell5),
            Math.min(horiz2Right + vert2Top - cell2, horiz5Right + vert5Top - cell5),
            Math.min(horiz2Left + vert2Bottom - cell2, horiz5Left + vert5Bottom - cell5),
            Math.min(horiz2Right + vert2Bottom - cell2, horiz5Right + vert5Bottom - cell5),
        );
    };

    let answer = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            answer = Math.max(answer, score(i, j));
        }
    }
    return answer;
}
