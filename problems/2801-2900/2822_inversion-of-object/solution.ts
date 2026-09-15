class Solution {
    run(caseRunner: InversionCase): void {
        caseRunner.check(this);
    }

    inversionOfObject(obj: unknown): unknown {
        // Single sweep over obj's own slots — property names for an
        // object, decimal index strings for an array. The first time a
        // value is seen it takes its originating key directly; meeting it
        // again promotes that slot from the lone key to a two-element
        // list, and every further collision appends, so duplicate lists
        // keep encounter order exactly as Example 2 shows. Values are
        // strings by contract, hence collision-free against real object
        // keys is not needed: nothing here can mistake the digit-string
        // form of an array index for a number.
        const inverted: Record<string, unknown> = {};
        const claim = (key: string, value: string): void => {
            if (!Object.prototype.hasOwnProperty.call(inverted, value)) {
                inverted[value] = key;
            } else {
                const current = inverted[value];
                if (typeof current === "string") {
                    inverted[value] = [current, key];
                } else {
                    (current as string[]).push(key);
                }
            }
        };
        if (Array.isArray(obj)) {
            const list = obj as unknown[];
            for (let index = 0; index < list.length; index++) {
                claim(String(index), list[index] as string);
            }
        } else {
            const record = obj as Record<string, unknown>;
            for (const key of Object.keys(record)) {
                claim(key, record[key] as string);
            }
        }
        return inverted;
    }
}
