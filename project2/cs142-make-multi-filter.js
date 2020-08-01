"use strict";
function cs142MakeMultiFilter(array) {
    function arrayFilterer(filter, call) {
        let currentArray = array;
        if (typeof (filter) !== "function") {
            return currentArray;
        }
        let newarr = [];
        for (var i = 0; i < currentArray.length; i++) {
            if (filter(currentArray[i])) {
                newarr.push(currentArray[i]);
            }
        }
        if (typeof (call) === "function") {
            call = call.bind(array);
            call(newarr);
        }
        return arrayFilterer;
    }
    return arrayFilterer;
}
//# sourceMappingURL=cs142-make-multi-filter.js.map