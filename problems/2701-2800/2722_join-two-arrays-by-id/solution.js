class Solution {
    run(caseRunner) {
        caseRunner.check(this);
    }

    joinTwoArrays(arr1, arr2) {
        // One Map accumulates the merged record per id: the first
        // occurrence seeds a spread copy, and every later occurrence is
        // folded in key-by-key — shared keys take the later object's
        // value wholesale (the shallow merge, so nested containers are
        // replaced rather than combined), while keys unique to either
        // side ride along untouched. Sorting the accumulated records by
        // ascending numeric id yields joinedArray's required order.
        const merged = new Map();
        const absorb = (objects) => {
            for (const obj of objects) {
                const existing = merged.get(obj.id);
                if (existing === undefined) {
                    merged.set(obj.id, { ...obj });
                } else {
                    for (const key of Object.keys(obj)) {
                        existing[key] = obj[key];
                    }
                }
            }
        };
        absorb(arr1);
        absorb(arr2);
        return [...merged.values()].sort((a, b) => a.id - b.id);
    }
}
