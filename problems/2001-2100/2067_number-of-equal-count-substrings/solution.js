/**
 * @param {string} s
 * @param {number} count
 * @return {number}
 */
var equalCountSubstrings = function (s, count) {
    let answer = 0;
    for (let distinct = 1; distinct <= 26; ++distinct) {
        const windowLength = distinct * count;
        if (windowLength > s.length) break;
        const frequencies = new Array(26).fill(0);
        let present = 0;
        let exact = 0;

        for (let right = 0; right < s.length; ++right) {
            let index = s.charCodeAt(right) - 97;
            if (frequencies[index] === 0) ++present;
            if (frequencies[index] === count) --exact;
            ++frequencies[index];
            if (frequencies[index] === count) ++exact;

            if (right >= windowLength) {
                index = s.charCodeAt(right - windowLength) - 97;
                if (frequencies[index] === count) --exact;
                --frequencies[index];
                if (frequencies[index] === count) ++exact;
                if (frequencies[index] === 0) --present;
            }
            if (right + 1 >= windowLength && present === distinct && exact === distinct) ++answer;
        }
    }
    return answer;
};
