var countLocalMaximums = function (matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const positions = Array.from({ length: 201 }, () => []);
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            const value = matrix[row][column];
            if (value !== 0) positions[value].push([row, column]);
        }
    }
    let answer = 0;
    for (let value = 1; value <= 200; value++) {
        if (positions[value].length === 0) continue;
        const prefix = Array.from({ length: rows + 1 }, () => Array(columns + 1).fill(0));
        for (let row = 0; row < rows; row++) {
            let running = 0;
            for (let column = 0; column < columns; column++) {
                if (matrix[row][column] > value) running++;
                prefix[row + 1][column + 1] = prefix[row][column + 1] + running;
            }
        }
        for (const [row, column] of positions[value]) {
            const top = Math.max(0, row - value);
            const bottom = Math.min(rows - 1, row + value);
            const left = Math.max(0, column - value);
            const right = Math.min(columns - 1, column + value);
            let greater =
                prefix[bottom + 1][right + 1] - prefix[top][right + 1] - prefix[bottom + 1][left] + prefix[top][left];
            for (const cornerRow of [row - value, row + value]) {
                for (const cornerColumn of [column - value, column + value]) {
                    if (
                        cornerRow >= 0 &&
                        cornerRow < rows &&
                        cornerColumn >= 0 &&
                        cornerColumn < columns &&
                        matrix[cornerRow][cornerColumn] > value
                    ) {
                        greater--;
                    }
                }
            }
            if (greater === 0) answer++;
        }
    }
    return answer;
};
