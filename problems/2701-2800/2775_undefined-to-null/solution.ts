class Solution {
    run(caseRunner: UndefinedCase): void {
        caseRunner.check(this);
    }

    undefinedToNull(obj: unknown): unknown {
        // Deep-copy first, then sweep the copy: an explicit stack instead
        // of recursion, because a legal input can nest tens of thousands
        // of levels deep (a `[[[[…]]]]` chain spends two serialized
        // characters per level) and that outruns the call stack. In the
        // sweep an `undefined` slot becomes null; other containers are
        // pushed for the same treatment; every other value — pre-existing
        // nulls included — passes through untouched.
        const copy = this.cloneValue(obj);
        const stack: unknown[] = [copy];
        while (stack.length > 0) {
            const current = stack.pop() as unknown;
            if (Array.isArray(current)) {
                for (let index = 0; index < current.length; index++) {
                    const value = current[index];
                    if (value === undefined) {
                        current[index] = null;
                    } else if (value !== null && typeof value === "object") {
                        stack.push(value);
                    }
                }
            } else {
                const record = current as Record<string, unknown>;
                for (const key of Object.keys(record)) {
                    const value = record[key];
                    if (value === undefined) {
                        record[key] = null;
                    } else if (value !== null && typeof value === "object") {
                        stack.push(value);
                    }
                }
            }
        }
        return copy;
    }

    private cloneValue(root: unknown): unknown {
        if (root === null || typeof root !== "object") return root;
        const copy: unknown = Array.isArray(root) ? [] : {};
        const stack: [any, any][] = [[copy, root]];
        while (stack.length > 0) {
            const [target, source] = stack.pop() as [any, any];
            if (Array.isArray(source)) {
                for (let index = 0; index < source.length; index++) {
                    const value = source[index];
                    if (value !== null && typeof value === "object") {
                        const child = Array.isArray(value) ? [] : {};
                        target[index] = child;
                        stack.push([child, value]);
                    } else {
                        target[index] = value;
                    }
                }
            } else {
                for (const key of Object.keys(source)) {
                    const value = source[key];
                    if (value !== null && typeof value === "object") {
                        const child = Array.isArray(value) ? [] : {};
                        target[key] = child;
                        stack.push([child, value]);
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
        return copy;
    }
}
