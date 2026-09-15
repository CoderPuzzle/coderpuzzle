/**
 * @param {string} word
 * @return {number}
 */
var addMinimum = function (word) {
    // Two pointers over word and the repeating pattern "abc": every
    // aligned pattern slot the word fails to consume is a letter that
    // must be inserted there.
    let answer = 0;
    let k = 0;
    let i = 0;
    while (k < word.length) {
        if (word[k] === "abc"[i % 3]) {
            k++;
        } else {
            answer++;
        }
        i++;
    }
    // After the last consumed letter, finish off its cycle.
    return answer + ((3 - (i % 3)) % 3);
};
