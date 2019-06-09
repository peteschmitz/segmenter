import { NumberSegmenter } from "../Segmenters/NumberSegmenter";

test("NumberSegmenter: tosegment with two", () => {
    const segmenter = new NumberSegmenter();

    expect(segmenter.toSegment(0, 2).index)
        .toBe(0);
    expect(segmenter.toSegment(1, 2).index)
        .toBe(1);
    expect(segmenter.toSegment(2, 2).index)
        .toBe(0);

    expect(() => segmenter.toSegment(-2, 2))
        .toThrow(Error);
});

test("NumberSegmenter: tosegment with zero", () => {
    const segmenter = new NumberSegmenter();

    expect(segmenter.toSegment(0, 0).index)
        .toBe(0);
    expect(segmenter.toSegment(5, 0).index)
        .toBe(0);

    expect(() => segmenter.toSegment(-5, 0))
        .toThrow(Error);
});

test("NumberSegmenter: tosegment with prime", () => {
    const segmenter = new NumberSegmenter();

    expect(segmenter.toSegment(0, 13).index)
        .toBe(0);
    expect(segmenter.toSegment(28, 13).index)
        .toBe(2);

    expect(() => segmenter.toSegment(-28, 13))
        .toThrow(Error);
});

test("NumberSegmenter: tosegment throw bad values", () => {
    const segmenter = new NumberSegmenter();

    expect(() => segmenter.toSegment(null, 2))
        .toThrow(Error);
    expect(() => segmenter.toSegment(undefined, 2))
        .toThrow(Error);
    expect(() => segmenter.toSegment(2, null))
        .toThrow(Error);
    expect(() => segmenter.toSegment(2, undefined))
        .toThrow(Error);
});

test("NumberSegmenter: segment by single array", () => {
    const segmenter = new NumberSegmenter();

    expect(segmenter.segment(0, "AB".split("")))
        .toBe("A");
    expect(segmenter.segment(1, "AB".split("")))
        .toBe("B");
    expect(segmenter.segment(2, "AB".split("")))
        .toBe("A");

    expect(() => segmenter.segment(2, "".split("")))
        .toThrow(Error);
});

test("NumberSegmenter: segment by two arrays", () => {
    const segmenter = new NumberSegmenter();

    expect(segmenter.segments(0, "ABC".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["A", "W"]));
    expect(segmenter.segments(1, "ABC".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["A", "X"]));
    expect(segmenter.segments(4, "ABC".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "W"]));

    expect(() => segmenter.segments(2, "ABC".split(""), "".split("")))
        .toThrow(Error);
});

test("NumberSegmenter: segment by three arrays", () => {
    const segmenter = new NumberSegmenter();

    expect(segmenter.segments(11, "ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["A", "#", "Z"]));
    expect(segmenter.segments(20, "ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "!", "W"]));
    expect(segmenter.segments(25, "ABC".split(""), "!@#$%".split(""), "WXYZ".split("")))
        .toEqual(expect.arrayContaining(["B", "@", "X"]));

    expect(() => segmenter.segments(2, "ABC".split(""), "!@#$%".split(""), "".split("")))
        .toThrow(Error);
});
