"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeSegmenter_1 = require("../TypeSegmenter");
class NumberSegmenter extends TypeSegmenter_1.TypeSegmenter {
    toSegment(value, segmentCount, segmentMultiplier) {
        this.positiveIntOrThrow(value, "value");
        this.positiveIntOrThrow(segmentCount, "segmentCount");
        const segmentResult = {
            index: 0,
            multiplier: segmentCount
        };
        // no buckets to choose from
        if (segmentCount === 0) {
            return segmentResult;
        }
        // multi-dimensional segment; we'll use the multiplier as a dividend
        if (segmentMultiplier && segmentMultiplier > 0) {
            value = Math.max(0, Math.floor(value / segmentMultiplier));
            segmentResult.multiplier = segmentResult.multiplier * segmentMultiplier;
        }
        // mod against overflow
        if (value >= segmentCount) {
            value = value % segmentCount;
        }
        segmentResult.index = value;
        return segmentResult;
    }
}
exports.NumberSegmenter = NumberSegmenter;
//# sourceMappingURL=NumberSegmenter.js.map