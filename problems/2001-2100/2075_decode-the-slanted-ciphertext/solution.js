/**
 * @param {string} encodedText
 * @param {number} rows
 * @return {string}
 */
var decodeCiphertext = function (encodedText, rows) {
    if (encodedText.length === 0) {
        return "";
    }
    const cols = encodedText.length / rows;
    const decoded = [];
    for (let start = 0; start < cols; start++) {
        for (let row = 0, col = start; row < rows && col < cols; row++, col++) {
            decoded.push(encodedText[row * cols + col]);
        }
    }
    while (decoded.length > 0 && decoded[decoded.length - 1] === " ") {
        decoded.pop();
    }
    return decoded.join("");
};
