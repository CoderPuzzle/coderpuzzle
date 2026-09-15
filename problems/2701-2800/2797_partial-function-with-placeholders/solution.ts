// The wrapper copies args, walks the copy once overwriting each exact "_"
// with restArgs[cursor++], and appends whatever restArgs the cursor never
// reached. Top-level-only exact equality keeps a "_" nested inside an
// array — or a near-miss like "__" — an ordinary value.
type AnyFn = (...args: any[]) => any;

const partial = function (fn: AnyFn, args: any[]): (...restArgs: any[]) => any {
    return (...restArgs: any[]): any => {
        const modified = [...args];
        let cursor = 0;
        for (let i = 0; i < modified.length && cursor < restArgs.length; i++) {
            if (modified[i] === "_") {
                modified[i] = restArgs[cursor++];
            }
        }
        return fn(...modified, ...restArgs.slice(cursor));
    };
};

class Solution {
    runPartial(fnCase: FnCase): string {
        const partialFn = partial(fnCase.fn, fnCase.args);
        return partialFn(...fnCase.restArgs);
    }
}
