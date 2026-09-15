// Bucket ids by required size, then slice each bucket into chunks of
// exactly that size — the input guarantees each bucket divides evenly.
/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
var groupThePeople = function (groupSizes) {
    const buckets = new Map();
    groupSizes.forEach((size, person) => {
        const bucket = buckets.get(size);
        if (bucket) bucket.push(person);
        else buckets.set(size, [person]);
    });
    const groups = [];
    // A valid grouping exists, so every bucket length is a multiple of
    // its size and the slices come out even.
    for (const [size, members] of buckets) {
        for (let start = 0; start < members.length; start += size) {
            groups.push(members.slice(start, start + size));
        }
    }
    return groups;
};
