"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceColorEffectsRenderer() {
    this.alphaBlendAmountTarget1 = 0;
    this.alphaBlendAmountTarget2 = 0;
    this.effectsTarget1 = 0;
    this.colorEffectsType = 0;
    this.effectsTarget2 = 0;
    this.brightnessEffectAmount = 0;
}
GameBoyAdvanceColorEffectsRenderer.prototype.processOAMSemiTransparent = function (lowerPixel, topPixel) {
    lowerPixel = lowerPixel | 0;
    topPixel = topPixel | 0;
    if (((lowerPixel | 0) & (this.effectsTarget2 | 0)) != 0) {
        return this.alphaBlend(topPixel | 0, lowerPixel | 0) | 0;
    }
    else if (((topPixel | 0) & (this.effectsTarget1 | 0)) != 0) {
        switch (this.colorEffectsType | 0) {
            case 2:
                return this.brightnessIncrease(topPixel | 0) | 0;
            case 3:
                return this.brightnessDecrease(topPixel | 0) | 0;
        }
    }
    return topPixel | 0;
}
GameBoyAdvanceColorEffectsRenderer.prototype.process = function (lowerPixel, topPixel) {
    lowerPixel = lowerPixel | 0;
    topPixel = topPixel | 0;
    if (((topPixel | 0) & (this.effectsTarget1 | 0)) != 0) {
        switch (this.colorEffectsType | 0) {
            case 1:
                if (((lowerPixel | 0) & (this.effectsTarget2 | 0)) != 0 && (topPixel | 0) != (lowerPixel | 0)) {
                    return this.alphaBlend(topPixel | 0, lowerPixel | 0) | 0;
                }
                break;
            case 2:
                return this.brightnessIncrease(topPixel | 0) | 0;
            case 3:
                return this.brightnessDecrease(topPixel | 0) | 0;
        }
    }
    return topPixel | 0;
}
if (typeof Math.imul == "function") {
    //Math.imul found, insert the optimized path in:
    GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlend = function (topPixel, lowerPixel) {
        topPixel = topPixel | 0;
        lowerPixel = lowerPixel | 0;
        var b1 = (topPixel >> 10) & 0x1F;
        var g1 = (topPixel >> 5) & 0x1F;
        var r1 = topPixel & 0x1F;
        var b2 = (lowerPixel >> 10) & 0x1F;
        var g2 = (lowerPixel >> 5) & 0x1F;
        var r2 = lowerPixel & 0x1F;
        b1 = Math.imul(b1 | 0, this.alphaBlendAmountTarget1 | 0) | 0;
        g1 = Math.imul(g1 | 0, this.alphaBlendAmountTarget1 | 0) | 0;
        r1 = Math.imul(r1 | 0, this.alphaBlendAmountTarget1 | 0) | 0;
        b2 = Math.imul(b2 | 0, this.alphaBlendAmountTarget2 | 0) | 0;
        g2 = Math.imul(g2 | 0, this.alphaBlendAmountTarget2 | 0) | 0;
        r2 = Math.imul(r2 | 0, this.alphaBlendAmountTarget2 | 0) | 0;
        //Keep this not inlined in the return, firefox 22 grinds on it:
        var b = Math.min(((b1 | 0) + (b2 | 0)) >> 4, 0x1F) | 0;
        var g = Math.min(((g1 | 0) + (g2 | 0)) >> 4, 0x1F) | 0;
        var r = Math.min(((r1 | 0) + (r2 | 0)) >> 4, 0x1F) | 0;
        return (b << 10) | (g << 5) | r;
    }
    GameBoyAdvanceColorEffectsRenderer.prototype.brightnessIncrease = function (topPixel) {
        topPixel = topPixel | 0;
        var b1 = (topPixel >> 10) & 0x1F;
        var g1 = (topPixel >> 5) & 0x1F;
        var r1 = topPixel & 0x1F;
        b1 = ((b1 | 0) + (Math.imul((0x1F - (b1 | 0)) | 0, this.brightnessEffectAmount | 0) >> 4)) | 0;
        g1 = ((g1 | 0) + (Math.imul((0x1F - (g1 | 0)) | 0, this.brightnessEffectAmount | 0) >> 4)) | 0;
        r1 = ((r1 | 0) + (Math.imul((0x1F - (r1 | 0)) | 0, this.brightnessEffectAmount | 0) >> 4)) | 0;
        return (b1 << 10) | (g1 << 5) | r1;
    }
    GameBoyAdvanceColorEffectsRenderer.prototype.brightnessDecrease = function (topPixel) {
        topPixel = topPixel | 0;
        var b1 = (topPixel >> 10) & 0x1F;
        var g1 = (topPixel >> 5) & 0x1F;
        var r1 = topPixel & 0x1F;
        var decreaseMultiplier = (0x10 - (this.brightnessEffectAmount | 0)) | 0;
        b1 = Math.imul(b1 | 0, decreaseMultiplier | 0) >> 4;
        g1 = Math.imul(g1 | 0, decreaseMultiplier | 0) >> 4;
        r1 = Math.imul(r1 | 0, decreaseMultiplier | 0) >> 4;
        return (b1 << 10) | (g1 << 5) | r1;
    }
}
else {
    //Math.imul not found, use the compatibility method:
    GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlend = function (topPixel, lowerPixel) {
        topPixel = topPixel | 0;
        lowerPixel = lowerPixel | 0;
        var b1 = (topPixel >> 10) & 0x1F;
        var g1 = (topPixel >> 5) & 0x1F;
        var r1 = (topPixel & 0x1F);
        var b2 = (lowerPixel >> 10) & 0x1F;
        var g2 = (lowerPixel >> 5) & 0x1F;
        var r2 = lowerPixel & 0x1F;
        b1 = b1 * this.alphaBlendAmountTarget1;
        g1 = g1 * this.alphaBlendAmountTarget1;
        r1 = r1 * this.alphaBlendAmountTarget1;
        b2 = b2 * this.alphaBlendAmountTarget2;
        g2 = g2 * this.alphaBlendAmountTarget2;
        r2 = r2 * this.alphaBlendAmountTarget2;
        return (Math.min((b1 + b2) >> 4, 0x1F) << 10) | (Math.min((g1 + g2) >> 4, 0x1F) << 5) | Math.min((r1 + r2) >> 4, 0x1F);
    }
    GameBoyAdvanceColorEffectsRenderer.prototype.brightnessIncrease = function (topPixel) {
        topPixel = topPixel | 0;
        var b1 = (topPixel >> 10) & 0x1F;
        var g1 = (topPixel >> 5) & 0x1F;
        var r1 = topPixel & 0x1F;
        b1 += ((0x1F - b1) * this.brightnessEffectAmount) >> 4;
        g1 += ((0x1F - g1) * this.brightnessEffectAmount) >> 4;
        r1 += ((0x1F - r1) * this.brightnessEffectAmount) >> 4;
        return (b1 << 10) | (g1 << 5) | r1;
    }
    GameBoyAdvanceColorEffectsRenderer.prototype.brightnessDecrease = function (topPixel) {
        topPixel = topPixel | 0;
        var b1 = (topPixel >> 10) & 0x1F;
        var g1 = (topPixel >> 5) & 0x1F;
        var r1 = topPixel & 0x1F;
        var decreaseMultiplier = 0x10 - this.brightnessEffectAmount;
        b1 = (b1 * decreaseMultiplier) >> 4;
        g1 = (g1 * decreaseMultiplier) >> 4;
        r1 = (r1 * decreaseMultiplier) >> 4;
        return (b1 << 10) | (g1 << 5) | r1;
    }
}
GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDCNT8_0 = function (data) {
    data = data | 0;
    //Select target 1 and color effects mode:
    this.effectsTarget1 = (data & 0x3F) << 16;
    this.colorEffectsType = data >> 6;
}
GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDCNT8_1 = function (data) {
    data = data | 0;
    //Select target 2:
    this.effectsTarget2 = (data & 0x3F) << 16;
}
GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDCNT16 = function (data) {
    data = data | 0;
    //Select target 1 and color effects mode:
    this.effectsTarget1 = (data & 0x3F) << 16;
    this.colorEffectsType = (data >> 6) & 0x3;
    //Select target 2:
    this.effectsTarget2 = (data & 0x3F00) << 8;
}
GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDALPHA8_0 = function (data) {
    data = data | 0;
    this.alphaBlendAmountTarget1Scratch = data & 0x1F;
    this.alphaBlendAmountTarget1 = Math.min(this.alphaBlendAmountTarget1Scratch | 0, 0x10) | 0;
}
GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDALPHA8_1 = function (data) {
    data = data | 0;
    this.alphaBlendAmountTarget2Scratch = data & 0x1F;
    this.alphaBlendAmountTarget2 = Math.min(this.alphaBlendAmountTarget2Scratch | 0, 0x10) | 0;
}
GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDALPHA16 = function (data) {
    data = data | 0;
    this.alphaBlendAmountTarget1Scratch = data & 0x1F;
    this.alphaBlendAmountTarget1 = Math.min(this.alphaBlendAmountTarget1Scratch | 0, 0x10) | 0;
    this.alphaBlendAmountTarget2Scratch = (data >> 8) & 0x1F;
    this.alphaBlendAmountTarget2 = Math.min(this.alphaBlendAmountTarget2Scratch | 0, 0x10) | 0;
}
GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDCNT32 = function (data) {
    data = data | 0;
    //Select target 1 and color effects mode:
    this.effectsTarget1 = (data & 0x3F) << 16;
    this.colorEffectsType = (data >> 6) & 0x3;
    //Select target 2:
    this.effectsTarget2 = (data & 0x3F00) << 8;
    this.alphaBlendAmountTarget1Scratch = (data >> 16) & 0x1F;
    this.alphaBlendAmountTarget1 = Math.min(this.alphaBlendAmountTarget1Scratch | 0, 0x10) | 0;
    this.alphaBlendAmountTarget2Scratch = (data >> 24) & 0x1F;
    this.alphaBlendAmountTarget2 = Math.min(this.alphaBlendAmountTarget2Scratch | 0, 0x10) | 0;
}
GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDY8 = function (data) {
    data = data | 0;
    this.brightnessEffectAmount = Math.min(data & 0x1F, 0x10) | 0;
}