class Solution {
    run(caseRunner: TwoArrayCase): void {
        caseRunner.check(this);
    }

    createObject(keysArr: unknown[], valuesArr: unknown[]): Record<string, unknown> {
        // One ascending pass; a pair only writes when its coerced key is
        // not already an OWN property, so the first occurrence of every
        // string wins and later duplicates are skipped outright. The probe
        // must be hasOwnProperty, never `in`: `in` sees prototype-chain
        // names like "toString" or "constructor" and would drop a key the
        // object never stored — and truthiness fails twice over, since
        // falsey keys ("", 0, false) are real keys and falsey values would
        // masquerade as empty slots. Values are carried through untouched:
        // String() applies to keys only, so null stays null and arrays
        // stay arrays.
        const obj: Record<string, unknown> = {};
        for (let index = 0; index < keysArr.length; index++) {
            const key = String(keysArr[index]);
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                obj[key] = valuesArr[index];
            }
        }
        return obj;
    }
}
