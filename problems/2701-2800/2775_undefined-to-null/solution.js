class Solution {
    run(caseRunner) {
        caseRunner.check(this);
    }

    undefinedToNull(obj) {
        // Deep-copy first, then sweep the copy: an explicit stack instead
        // of recursion, because a legal input can nest tens of thousands
        // of levels deep (a `[[[[…]]]]` chain spends two serialized
        // characters per level) and that outruns the call stack. In the
        // sweep an `undefined` slot becomes null; other containers are
        // pushed for the same treatment; every other value — pre-existing
        // nulls included — passes through untouched.
        const copy = this.cloneValue(obj);
        const stack = [copy];
        while (stack.length > 0) {
            const current = stack.pop();
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
                for (const key of Object.keys(current)) {
                    const value = current[key];
                    if (value === undefined) {
                        current[key] = null;
                    } else if (value !== null && typeof value === "object") {
                        stack.push(value);
                    }
                }
            }
        }
        return copy;
    }

    cloneValue(root) {
        if (root === null || typeof root !== "object") return root;
        const copy = Array.isArray(root) ? [] : {};
        const stack = [[copy, root]];
        while (stack.length > 0) {
            const [target, source] = stack.pop();
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
