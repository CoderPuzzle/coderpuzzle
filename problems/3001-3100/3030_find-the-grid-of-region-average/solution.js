/**
 * @param {number[][]} image
 * @param {number} threshold
 * @return {number[][]}
 */
var resultGrid = function (image, threshold) {
    const m = image.length;
    const n = image[0].length;
    if (m < 3 || n < 3) {
        return image;
    }
    // Fold the twelve adjacent-pair tests once: calmH[r][c] says row r is
    // horizontally calm across columns c..c+2, calmV[r][c] says column c is
    // vertically calm across rows r..r+2.
    const calmH = Array.from({ length: m }, () => new Array(n - 2).fill(false));
    const calmV = Array.from({ length: m - 2 }, () => new Array(n).fill(false));
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c + 2 < n; ++c) {
            const left = Math.abs(image[r][c] - image[r][c + 1]) <= threshold;
            const right = Math.abs(image[r][c + 1] - image[r][c + 2]) <= threshold;
            calmH[r][c] = left && right;
        }
    }
    for (let c = 0; c < n; ++c) {
        for (let r = 0; r + 2 < m; ++r) {
            const top = Math.abs(image[r][c] - image[r + 1][c]) <= threshold;
            const bot = Math.abs(image[r + 1][c] - image[r + 2][c]) <= threshold;
            calmV[r][c] = top && bot;
        }
    }
    // Prefix sums give each window's nine-cell total in constant time.
    const pref = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            pref[r + 1][c + 1] = pref[r][c + 1] + pref[r + 1][c] - pref[r][c] + image[r][c];
        }
    }
    const sum = Array.from({ length: m }, () => new Array(n).fill(0));
    const count = Array.from({ length: m }, () => new Array(n).fill(0));
    for (let i = 0; i + 2 < m; ++i) {
        for (let j = 0; j + 2 < n; ++j) {
            if (!calmH[i][j] || !calmH[i + 1][j] || !calmH[i + 2][j]) {
                continue;
            }
            if (!calmV[i][j] || !calmV[i][j + 1] || !calmV[i][j + 2]) {
                continue;
            }
            const total = pref[i + 3][j + 3] - pref[i][j + 3] - pref[i + 3][j] + pref[i][j];
            const avg = Math.floor(total / 9);
            for (let r = i; r < i + 3; ++r) {
                for (let c = j; c < j + 3; ++c) {
                    sum[r][c] += avg;
                    count[r][c] += 1;
                }
            }
        }
    }
    const result = Array.from({ length: m }, () => new Array(n));
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            result[r][c] = count[r][c] ? Math.floor(sum[r][c] / count[r][c]) : image[r][c];
        }
    }
    return result;
};
