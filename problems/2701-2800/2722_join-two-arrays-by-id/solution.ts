class Solution {
    run(caseRunner: JoinCase): void {
        caseRunner.check(this);
    }

    joinTwoArrays(arr1: Record<string, unknown>[], arr2: Record<string, unknown>[]): Record<string, unknown>[] {
        // One Map accumulates the merged record per id: the first
        // occurrence seeds a spread copy, and every later occurrence is
        // folded in key-by-key — shared keys take the later object's
        // value wholesale (the shallow merge, so nested containers are
        // replaced rather than combined), while keys unique to either
        // side ride along untouched. Sorting the accumulated records by
        // ascending numeric id yields joinedArray's required order.
        const merged = new Map<number, Record<string, unknown>>();
        const absorb = (objects: Record<string, unknown>[]): void => {
            for (const obj of objects) {
                const id = obj.id as number;
                const existing = merged.get(id);
                if (existing === undefined) {
                    merged.set(id, { ...obj });
                } else {
                    for (const key of Object.keys(obj)) {
                        existing[key] = obj[key];
                    }
                }
            }
        };
        absorb(arr1);
        absorb(arr2);
        return [...merged.values()].sort((a, b) => (a.id as number) - (b.id as number));
    }
}
