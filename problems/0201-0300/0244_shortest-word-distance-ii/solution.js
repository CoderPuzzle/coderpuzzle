// One index list per word, built once at construction; shortest walks
// the two sorted index lists in lockstep, always advancing the smaller
// index — every pair that can still improve the gap gets examined, so one
// merge finds the closest pair.
class WordDistance {
    constructor(wordsDict) {
        // Appending left to right keeps each list ascending — the walk
        // relies on both lists being sorted.
        this.positions = new Map();
        wordsDict.forEach((word, index) => {
            const list = this.positions.get(word);
            if (list === undefined) {
                this.positions.set(word, [index]);
            } else {
                list.push(index);
            }
        });
    }

    shortest(word1, word2) {
        const first = this.positions.get(word1);
        const second = this.positions.get(word2);
        let best = Math.abs(first[0] - second[0]);
        let i = 0;
        let j = 0;
        while (i < first.length && j < second.length) {
            const gap = Math.abs(first[i] - second[j]);
            if (gap < best) {
                best = gap;
            }
            // Advancing the larger index can only widen the gap, so the
            // smaller one takes the step.
            if (first[i] < second[j]) {
                i++;
            } else {
                j++;
            }
        }
        return best;
    }
}
