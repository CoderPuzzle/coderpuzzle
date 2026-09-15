/**
 * @param {string[][]} picture
 * @param {number} target
 * @return {number}
 */
var findBlackPixel = function (picture, target) {
    // Rule 2 asks every row carrying a black pixel in column c to be an
    // exact copy of row r, so rows only interact through their content:
    // identical rows form a class keyed by the joined row string.
    const m = picture.length;
    const n = picture[0].length;
    const classOfKey = new Map();
    const classRowCount = [];
    // Black cells of one row.
    const countBlacks = (row) => {
        let blacks = 0;
        for (const cell of row) {
            if (cell === "B") blacks++;
        }
        return blacks;
    };
    const rowClass = new Array(m);
    const colCount = new Array(n).fill(0);
    for (let i = 0; i < m; i++) {
        const key = picture[i].join("");
        if (!classOfKey.has(key)) {
            classOfKey.set(key, classRowCount.length);
            classRowCount.push(countBlacks(picture[i]));
        }
        rowClass[i] = classOfKey.get(key);
        for (let j = 0; j < n; j++) {
            if (picture[i][j] === "B") colCount[j]++;
        }
    }
    // blacks[j][k]: how many black cells column j carries from class k.
    const blacks = Array.from({ length: n }, () => new Array(classRowCount.length).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (picture[i][j] === "B") blacks[j][rowClass[i]]++;
        }
    }
    // A column pays out exactly target pixels when its target blacks all come
    // from one class (rule 2) whose rows hold target blacks (rule 1).
    let total = 0;
    for (let j = 0; j < n; j++) {
        if (colCount[j] !== target) continue;
        for (let k = 0; k < classRowCount.length; k++) {
            if (blacks[j][k] === target && classRowCount[k] === target) total += target;
        }
    }
    return total;
};
