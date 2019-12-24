window.addEventListener("load", () => {
    new Container(config.wish, config.time, config.texts);
});

function Container(wish, time, texts) {
    this.passedSeconds = 0;
    this.finalText = wish;
    this.beginDate = time
    this.texts = texts

    this.renderTexts(this.texts);
    document.querySelector('.pass-time .finalText').innerHTML = this.finalText;
    setInterval(() => {
        this.passedSeconds = Math.ceil((+ new Date() - new Date(this.beginDate).getTime()) / 1000);
        let list = ['days', 'hours', 'minutes', 'seconds'];

        list.forEach(item => {
            document.querySelector(`.pass-time .${item}`).innerHTML = this[item]();
        })
    }, 1000);
}

Container.prototype = {
    renderTexts(texts) {
        let div = document.createElement("div");
        texts.forEach(item => {
            let d = document.createElement("div");
            d.innerHTML = item;
            div.appendChild(d);
        })
        document.getElementById("marquee").innerHTML = div.innerHTML;
    },
    finalText() {
        return this.text || "";
    },
    beginDate() {
        return this.time;
    },
    days: function () {
        if (this.passedSeconds === 0) return "";
        return Math.floor(this.passedSeconds / (3600 * 24));
    },
    hours: function () {
        if (this.passedSeconds === 0) return "";
        return Math.floor(this.passedSeconds / 3600) % 24;
    },
    minutes: function () {
        if (this.passedSeconds === 0) return "";
        return Math.floor(this.passedSeconds / 60) % 60;
    },
    seconds: function () {
        if (this.passedSeconds === 0) return "";
        return this.passedSeconds % 60;
    },
};
