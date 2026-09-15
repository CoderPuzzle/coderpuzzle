class Solution {
    run(caseRunner: CompactCase): void {
        caseRunner.check(this);
    }

    compactObject(obj: unknown): unknown {
        // Build the compact result top-down with an explicit stack instead
        // of recursion: a legal input can nest tens of thousands of levels
        // deep within the serialized-size bound (a `[[[[…]]]]` chain spends
        // two characters per level), which outruns the call stack. Every
        // container is truthy, so each container slot survives as an empty
        // shell pushed for the same sweep, while primitive slots are kept
        // exactly when the value is truthy — dropping false, null, 0 and
        // "" — which preserves object keys and writes each surviving array
        // element into the next free position so removals genuinely
        // shorten the array instead of leaving holes behind.
        const root: unknown = Array.isArray(obj) ? [] : {};
        const stack: [any, any][] = [[root, obj]];
        while (stack.length > 0) {
            const [target, source] = stack.pop() as [any, any];
            if (Array.isArray(source)) {
                let write = 0;
                for (let index = 0; index < source.length; index++) {
                    const value = source[index];
                    if (value !== null && typeof value === "object") {
                        const child = Array.isArray(value) ? [] : {};
                        target[write++] = child;
                        stack.push([child, value]);
                    } else if (value) {
                        target[write++] = value;
                    }
                }
            } else {
                const record = source as Record<string, unknown>;
                for (const key of Object.keys(record)) {
                    const value = record[key];
                    if (value !== null && typeof value === "object") {
                        const child = Array.isArray(value) ? [] : {};
                        target[key] = child;
                        stack.push([child, value]);
                    } else if (value) {
                        target[key] = value;
                    }
                }
            }
        }
        return root;
    }
}
