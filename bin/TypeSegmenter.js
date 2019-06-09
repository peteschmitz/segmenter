"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeSegmenter {
    /**
     *
     * @param value value to determine a segment for
     * @param array available segments to choose from
     * @returns a chosen segment element from the provided arary
     */
    segment(value, array) {
        this.validArrayOrThrow(array, "segment-array");
        return array[this.toSegment(value, array.length).index];
    }
    /**
     *
     * @param value value to determine multiple segments for
     * @param arrays multi-dimensional segments to choose from
     * @returns an array with a selected element from each array, marching order is determined by
     *          the Type-implementation's toSegment() multiplier
     */
    segments(value, ...arrays) {
        const segments = [];
        let lastSegment = null;
        arrays.reverse().forEach((array) => {
            this.validArrayOrThrow(array, "segments-array");
            lastSegment = this.toSegment(value, array.length, lastSegment ? lastSegment.multiplier : null);
            segments.push(array[lastSegment.index]);
        });
        return segments.reverse();
    }
    /**
     * Sanity check for positive number
     *
     * @param value value to evaluate
     * @throws
     */
    positiveIntOrThrow(value, param = null) {
        if (value === null ||
            value === undefined ||
            value < 0) {
            throw new Error(`Value empty or less than zero, expected non-null and greater-than zero ${param ? (`(param '${param})'`) : ""}.`);
        }
    }
    /**
     * Sanity check for non-empty array
     *
     * @param value value to evaluate
     * @throws
     */
    validArrayOrThrow(value, param = null) {
        if (value === null ||
            value === undefined ||
            !Array.isArray(value) ||
            value.length === 0) {
            throw new Error(`Array empty or null, expected at least one element ${param ? (`(param '${param})'`) : ""}.`);
        }
    }
}
exports.TypeSegmenter = TypeSegmenter;
//# sourceMappingURL=TypeSegmenter.js.map