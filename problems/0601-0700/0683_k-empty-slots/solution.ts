// Invert to days: days[p] is the turn on which position p lights. A window
// (i, i+k+1) qualifies exactly when both endpoints light before every
// interior position, and it qualifies on the day max(days[i], days[i+k+1]);
// the answer is the minimum such day.
function kEmptySlots(bulbs: number[], k: number): number {
    const n = bulbs.length;
    if (n < k + 2) {
        return -1;
    }
    const days = new Array<number>(n);
    for (let day = 0; day < n; day += 1) {
        days[bulbs[day] - 1] = day + 1;
    }
    let best = -1;
    // The interior [right-k, right-1] slides one position at a time; the
    // deque keeps indices of strictly increasing day values, so its front is
    // always the interior minimum.
    const window: number[] = [];
    for (let index = 1; index < k; index += 1) {
        while (window.length > 0 && days[window[window.length - 1]] >= days[index]) {
            window.pop();
        }
        window.push(index);
    }
    for (let right = k + 1; right < n; right += 1) {
        const entering = right - 1;
        while (window.length > 0 && days[window[window.length - 1]] >= days[entering]) {
            window.pop();
        }
        window.push(entering);
        while (window.length > 0 && window[0] < right - k) {
            window.shift();
        }
        const pairDay = Math.max(days[right - k - 1], days[right]);
        if ((k === 0 || days[window[0]] > pairDay) && (best === -1 || pairDay < best)) {
            best = pairDay;
        }
    }
    return best;
}
