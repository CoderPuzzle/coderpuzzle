/**
 * @param {number[]} cards
 * @return {number}
 */
var minimumCardPickup = function (cards) {
    const last = new Map();
    let best = -1;
    for (let i = 0; i < cards.length; i++) {
        const prev = last.get(cards[i]);
        if (prev !== undefined) {
            const gap = i - prev + 1;
            if (best === -1 || gap < best) {
                best = gap;
            }
        }
        last.set(cards[i], i);
    }
    return best;
};
