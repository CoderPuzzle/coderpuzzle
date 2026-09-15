class Solution {
    run(caseRunner) {
        caseRunner.check(this);
    }

    inversionOfObject(obj) {
        // Single sweep over obj's own slots — property names for an
        // object, decimal index strings for an array. The first time a
        // value is seen it takes its originating key directly; meeting it
        // again promotes that slot from the lone key to a two-element
        // list, and every further collision appends, so duplicate lists
        // keep encounter order exactly as Example 2 shows. Values are
        // strings by contract, hence collision-free against real object
        // keys is not needed: nothing here can mistake the digit-string
        // form of an array index for a number.
        const inverted = {};
        const claim = (key, value) => {
            if (!Object.prototype.hasOwnProperty.call(inverted, value)) {
                inverted[value] = key;
            } else if (typeof inverted[value] === "string") {
                inverted[value] = [inverted[value], key];
            } else {
                inverted[value].push(key);
            }
        };
        if (Array.isArray(obj)) {
            for (let index = 0; index < obj.length; index++) {
                claim(String(index), obj[index]);
            }
        } else {
            for (const key of Object.keys(obj)) {
                claim(key, obj[key]);
            }
        }
        return inverted;
    }
}
