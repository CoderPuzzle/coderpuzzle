var maxTwoEvents = function (events) {
    events.sort((left, right) => left[0] - right[0]);
    const suffixMaximum = new Array(events.length + 1).fill(0);
    for (let index = events.length - 1; index >= 0; index--) {
        suffixMaximum[index] = Math.max(events[index][2], suffixMaximum[index + 1]);
    }

    let answer = 0;
    for (const event of events) {
        let low = 0;
        let high = events.length;
        while (low < high) {
            const middle = Math.floor((low + high) / 2);
            if (events[middle][0] <= event[1]) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        answer = Math.max(answer, event[2] + suffixMaximum[low]);
    }

    return answer;
};
