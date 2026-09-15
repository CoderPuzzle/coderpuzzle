// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   IsEmptyCase exposes .obj as the genuine JavaScript value produced by
//   JSON.parse of the case's raw text, exactly as the statement promises.
class IsEmptyCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values plus the query budget (unused — this problem makes
    // one synchronous call and needs no call accounting).
    constructor([objText], budget) {
        void budget;
        this.obj = JSON.parse(objText);
    }
}
