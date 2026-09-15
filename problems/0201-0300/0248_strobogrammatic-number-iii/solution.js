/**
 * @param {string} low
 * @param {string} high
 * @return {number}
 */
var strobogrammaticInRange = function (low, high) {
    // 0, 1 and 8 rotate to themselves, 6 and 9 swap; anything else is not
    // a strobogrammatic digit and fails any equality test.
    const rotate = (digit) => (digit === "6" ? "9" : digit === "9" ? "6" : "018".includes(digit) ? digit : "?");

    // Digits a string of the given length may place at half-position
    // `position`: the outermost digit cannot be 0 (no leading zeros
    // except "0" itself), and an odd length's exact middle must
    // self-rotate, which rules out 6 and 9 there.
    const choicesAt = (position, length, half) => {
        if (position === 0 && length > 1) return "1689";
        if (length % 2 === 1 && position === half - 1) return "018";
        return "01689";
    };

    // Closed form: the first half decides the whole string, so each free
    // half-position multiplies the count.
    const totalOfLength = (length) => {
        const half = Math.ceil(length / 2);
        let total = 1;
        for (let position = half - 1; position >= 0; --position) {
            total *= choicesAt(position, length, half).length;
        }
        return total;
    };

    // Strobogrammatic strings of the boundary's own length that are >=
    // boundary. A candidate first differs from the boundary at one
    // half-position: a larger digit there settles the comparison, and the
    // inner positions complete freely, in ways[position + 1] ways.
    // Equal-length digit strings compare numerically (neither side has a
    // leading zero), so lexicographic order is numeric order.
    const countAtLeast = (boundary) => {
        const length = boundary.length;
        const half = Math.ceil(length / 2);
        const ways = new Array(half + 1).fill(1);
        for (let position = half - 1; position >= 0; --position) {
            ways[position] = choicesAt(position, length, half).length * ways[position + 1];
        }
        let count = 0;
        for (let position = 0; position < half; ++position) {
            const options = choicesAt(position, length, half);
            const digit = boundary[position];
            for (const option of options) {
                if (option > digit) count += ways[position + 1];
            }
            if (!options.includes(digit)) return count;
        }
        // Every half-position matched, so the only surviving candidate is
        // the mirror completion of the boundary's own first half.
        let candidate = boundary.slice(0, half);
        for (let i = length - half - 1; i >= 0; --i) {
            candidate += rotate(boundary[i]);
        }
        return count + (candidate >= boundary ? 1 : 0);
    };

    const isStrobogrammatic = (value) => {
        for (let i = 0; i < value.length; ++i) {
            if (rotate(value[i]) !== value[value.length - 1 - i]) return false;
        }
        return true;
    };

    let count = countAtLeast(low);
    // Every length above len(low) contributes in full, len(high) included;
    // the lengths strictly between never touch a boundary.
    for (let length = low.length + 1; length <= high.length; ++length) {
        count += totalOfLength(length);
    }
    // Subtracting countAtLeast(high) also drops high itself, so put it
    // back when high is strobogrammatic.
    return count - countAtLeast(high) + (isStrobogrammatic(high) ? 1 : 0);
};
