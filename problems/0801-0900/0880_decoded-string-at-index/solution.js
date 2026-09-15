/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var decodeAtIndex = function (s, k) {
    // Forward pass computes the decoded length of each prefix, saturated at a
    // huge cap (far above k) since the true length can exceed any safe integer.
    // Backward pass reduces k through each repetition/letter.
    const n = s.length;
    const CAP = 1e15;
    const lengths = new Array(n);
    let cur = 0;
    for (let i = 0; i < n; i++) {
        const ch = s[i];
        if (ch >= "2" && ch <= "9") {
            const d = ch.charCodeAt(0) - 48;
            cur = cur > CAP / d ? CAP : cur * d;
        } else {
            cur = cur < CAP ? cur + 1 : CAP;
        }
        lengths[i] = cur;
    }
    let kk = k;
    for (let i = n - 1; i >= 0; i--) {
        const ch = s[i];
        if (ch >= "2" && ch <= "9") {
            const prev = lengths[i - 1];
            kk = ((kk - 1) % prev) + 1;
        } else {
            if (kk === lengths[i]) {
                return ch;
            }
        }
    }
    return s[0];
};
