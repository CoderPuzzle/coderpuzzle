class Solution {
    findPattern(stream, pattern) {
        const length = pattern.length;
        // KMP failure function, built from the pattern alone: fail[k] is the
        // length of the longest proper prefix of the pattern that is also a
        // suffix of its first k bits.
        const fail = new Array(length + 1).fill(0);
        let matched = 0;
        for (let i = 1; i < length; i++) {
            while (matched > 0 && pattern[i] !== pattern[matched]) {
                matched = fail[matched];
            }
            if (pattern[i] === pattern[matched]) {
                matched += 1;
            }
            fail[i + 1] = matched;
        }
        // Stream the bits through the automaton: the state counts the pattern
        // bits matched so far. Each arriving bit either extends the state or
        // falls it back along the failure links, so no bit is ever needed
        // twice -- the state reaching `length` means the match just ended at
        // `read`, and its start is read - length.
        let state = 0;
        let read = 0;
        for (;;) {
            const bit = stream.next();
            read += 1;
            while (state > 0 && pattern[state] !== bit) {
                state = fail[state];
            }
            if (pattern[state] === bit) {
                state += 1;
            }
            if (state === length) {
                return read - length;
            }
        }
    }
}
