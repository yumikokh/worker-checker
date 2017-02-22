import calcDotsArray from "./calcDotArray";
import isNight from "../view";

export default class OfficeWindows {
    constructor(opts = {}) {
        this.canvas = opts.canvas;
        this.cxt = this.canvas.getContext("2d");
        this.width = opts.width || this.canvas.width || 100;
        this.height = opts.height || this.canvas.height || 100;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.gridSize = opts.gridSize || 32;
        this.gridW = opts.gridW || 10;
        this.gridH = opts.gridH || 10;
        this.word = opts.word || "ZAC";
        this.dotsArray = calcDotsArray(this.word, this.gridSize);
        this.gutter = (this.width - Math.ceil(this.width / this.gridW) * this.gridW) / this.gridW || 5;
        this.init();
    }
    init() {
        this.bgColor = isNight ? "#1a5369" : "#DCDEF7";
        this.txtColor = isNight ? "#FFEEA4" : "#FF2994";
    }
    update() {
        const firstCol = this.dotsArray.shift();
        this.dotsArray.push(firstCol);
    }
    draw() {
        this.cxt.clearRect(0, 0, this.width, this.height);
        for (let posY = 0, i = 0; posY < this.height; posY += this.gridH + this.gutter, i++) {
            for (let posX = 0, j = 0; posX < this.width; posX += this.gridW + this.gutter, j++) {
                this.cxt.fillStyle = this.dotsArray[i][j] ? this.txtColor : this.bgColor;
                this.cxt.fillRect(posX, posY, this.gridW, this.gridH);
            }
        }
    }
}
