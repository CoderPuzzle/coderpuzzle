class Solution {
    groupBy(groupCase) {
        // Enhance every array with a single-pass grouping walk: append each
        // item under its selector key, creating the bucket on first sight.
        // Items land in bucket order equal to their array order because the
        // scan is sequential, and a plain object keeps whatever key set the
        // selector produces — comparison reads buckets by name, so insertion
        // order of keys is free.
        Array.prototype.groupBy = function (fn) {
            const grouped = {};
            for (const item of this) {
                const key = fn(item);
                if (!Object.prototype.hasOwnProperty.call(grouped, key)) {
                    grouped[key] = [];
                }
                grouped[key].push(item);
            }
            return grouped;
        };
        return groupCase.array.groupBy(groupCase.fn);
    }
}
