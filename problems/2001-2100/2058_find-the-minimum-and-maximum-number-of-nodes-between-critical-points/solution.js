var nodesBetweenCriticalPoints = function (head) {
    let previous = head;
    let current = head.next;
    let index = 1;
    let first = -1;
    let last = -1;
    let minimumGap = Infinity;

    while (current.next !== null) {
        const following = current.next;
        if (
            (current.val > previous.val && current.val > following.val) ||
            (current.val < previous.val && current.val < following.val)
        ) {
            if (first === -1) {
                first = index;
            } else {
                minimumGap = Math.min(minimumGap, index - last);
            }
            last = index;
        }
        previous = current;
        current = following;
        index++;
    }

    return first === last ? [-1, -1] : [minimumGap, last - first];
};
