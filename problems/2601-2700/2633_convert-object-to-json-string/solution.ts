class Solution {
    stringifyValue(jsonCase: JsonCase): string {
        // Iterative depth-first emission over an explicit work stack. Legal
        // inputs may nest hundreds of levels deep, far past what the call
        // stack tolerates, so containers expand into pending jobs instead of
        // recursive calls: each container first parks its closing bracket,
        // then its children in REVERSE order separated by commas — popping
        // replays children forward with interleaved commas and lands on the
        // closer last. Strings are wrapped in quotes untouched (case data is
        // alphanumeric only), numbers render through their shortest exact
        // decimal form, and a rendered pair is itself three stacked jobs
        // (key text, colon, value).
        type Job = { t: "raw"; v: string } | { t: "value"; v: unknown };
        const emit: string[] = [];
        const stack: Job[] = [{ t: "value", v: jsonCase.object }];
        while (stack.length > 0) {
            const job = stack.pop() as Job;
            if (job.t === "raw") {
                emit.push(job.v);
                continue;
            }
            const value = job.v as unknown;
            if (value === null || typeof value === "boolean") {
                emit.push(String(value));
            } else if (typeof value === "number") {
                emit.push(String(value));
            } else if (typeof value === "string") {
                emit.push('"' + value + '"');
            } else if (Array.isArray(value)) {
                emit.push("[");
                stack.push({ t: "raw", v: "]" });
                // Reverse walk so the stack pops items in index order.
                for (let i = value.length - 1; i >= 0; i--) {
                    stack.push({ t: "value", v: (value as unknown[])[i] });
                    if (i > 0) {
                        stack.push({ t: "raw", v: "," });
                    }
                }
            } else {
                emit.push("{");
                stack.push({ t: "raw", v: "}" });
                const record = value as Record<string, unknown>;
                const keys = Object.keys(record);
                for (let i = keys.length - 1; i >= 0; i--) {
                    stack.push({ t: "value", v: record[keys[i]] });
                    stack.push({ t: "raw", v: ":" });
                    stack.push({ t: "raw", v: '"' + keys[i] + '"' });
                    if (i > 0) {
                        stack.push({ t: "raw", v: "," });
                    }
                }
            }
        }
        return emit.join("");
    }
}
