/**
 * @param {string} word
 * @return {number}
 */
var possibleStringCount = function (word) {
    // The long press, if it happened, extended exactly one run of equal
    // characters: the intended string kept r copies and the held key added
    // the remaining L - r. A run of length L >= 2 therefore admits L - 1
    // shorter intended lengths, and since the slip happened at most once
    // these alternatives never combine. The count is 1 (nothing was
    // mistyped) plus one per position whose character repeats the previous
    // one.
    let count = 1;
    for (let i = 1; i < word.length; i++) {
        if (word[i] === word[i - 1]) count++;
    }
    return count;
};
