/**
 * The pointer sits on a 26-letter ring. Between two consecutive letters
 * there are only two arcs — clockwise and counterclockwise — and the
 * cheaper one is always optimal, because the cost to type every future
 * character does not depend on which arc was taken (only the final
 * position matters, which is the same either way). Sum the cheaper arc
 * for each letter, then add one second per character for typing it.
 * @param {string} word
 * @return {number}
 */
var minTimeToType = function (word) {
    let seconds = word.length;
    let pos = 0; // pointer starts on 'a'
    for (let i = 0; i < word.length; i++) {
        const target = word.charCodeAt(i) - 97;
        const diff = Math.abs(target - pos);
        seconds += Math.min(diff, 26 - diff);
        pos = target;
    }
    return seconds;
};
