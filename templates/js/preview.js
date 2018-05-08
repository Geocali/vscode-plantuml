class Zoom {
    constructor() {}
    reset() {
        this.zoomUpperLimit = document.getElementById("zoomUpperLimit").innerText === "true";
        this.isWheelActionZoom = document.getElementById("wheelAction").innerText === "zoom";
        this.marginPixels = 20;
        this.img = document.getElementById("image");
        this.naturalWidth = this.img.naturalWidth;
        this.naturalHeight = this.img.naturalHeight;
        this.zoom = (window.innerWidth - this.marginPixels) / this.naturalWidth * 100;
        if (this.zoom > 100) this.zoom = 100;
        this.img.style.width = "";
        this.img.style.maxWidth = "";
        document.body.style.width = "";
        if (document.body.offsetHeight < window.innerHeight) document.body.style.height = window.innerHeight - this.marginPixels + "px";
    }
    smoothZomm(to, callback, ...args) {
        let winWidth = window.innerWidth;
        let contentWidth = winWidth - this.marginPixels
        let minWidth = contentWidth < this.naturalWidth ? contentWidth : this.naturalWidth;
        let minZoom = parseInt(minWidth / this.naturalWidth * 100);
        if (to < minZoom) to = minZoom - 1;
        let from = this.zoom;
        const interval = 10;
        const level = 10;
        const delta = (to - from) / level;
        for (let i = 1; i <= level; i++) {
            setTimeout(() => {
                this.setZoom(from + delta * i);
                callback(...args);
            }, interval * i);
        }
    }
    setZoom(zoom) {
        let winWidth = window.innerWidth;
        let contentWidth = winWidth - this.marginPixels
        let minWidth = contentWidth < this.naturalWidth ? contentWidth : this.naturalWidth;
        let minZoom = parseInt(minWidth / this.naturalWidth * 100);
        const maxZoom = 100;

        if (this.zoomUpperLimit && zoom > maxZoom) zoom = maxZoom;
        if (zoom < minZoom || (minZoom == maxZoom && this.zoomUpperLimit)) {
            this.img.style.width = "";
            this.img.style.maxWidth = "";
            document.body.style.width = "";
            zoom = minZoom;
        } else {
            let imgWidth = parseInt(this.naturalWidth * zoom / 100);
            this.img.style.width = imgWidth + 'px';
            let body = document.body;
            let bodyWidth = imgWidth + this.marginPixels < winWidth ? winWidth : imgWidth + this.marginPixels;
            body.style.width = bodyWidth + 'px'
            if (body.offsetHeight < window.innerHeight) body.style.height = window.innerHeight - this.marginPixels + "px";
        }
        this.zoom = zoom;
    }
    setScroll(left, top) {
        document.body.scrollLeft = left;
        document.body.scrollTop = top;
    }
    add() {
        let afterZoom = mouseAt => {
            this.followMousePointer(mouseAt);
            this.setToggleIcon();
            saveStatus();
        }
        this.reset();
        this.img.addEventListener("dblclick", () => {
            let mouseAt = this.getMousePointer();
            if (this.img.style.width)
                this.smoothZomm(0, afterZoom, mouseAt);
            else
                this.smoothZomm(100, afterZoom, mouseAt);
        })
        document.getElementById("btnZoomIn").addEventListener("click", () => {
            this.smoothZomm(this.zoom + 10, afterZoom, this.getImageCenterMousePointer());
        });
        document.getElementById("btnZoomOut").addEventListener("click", () => {
            this.smoothZomm(this.zoom - 10, afterZoom, this.getImageCenterMousePointer());
        });
        document.getElementById("btnZoomToggle").addEventListener("click", () => {
            if (this.img.style.width)
                this.smoothZomm(0, afterZoom, this.getImageCenterMousePointer());
            else
                this.smoothZomm(100, afterZoom, this.getImageCenterMousePointer());
        });
        document.body.addEventListener("mousewheel", () => {
            // console.log(event.ctrlKey, event.wheelDeltaX, event.wheelDeltaY);
            // scroll to zoom, or ctrl key pressed scroll
            if (this.isWheelActionZoom || event.ctrlKey) {
                // ctrlKey == true: pinch
                let delta = event.ctrlKey ? event.wheelDelta / 60 : event.wheelDelta / 12;
                let mouseAt = this.getMousePointer();
                if (this.zoomUpperLimit) {
                    this.setZoom(this.zoom + delta);
                } else {
                    // zoom level increase / decrease by 30% for each wheel scroll
                    this.setZoom(this.zoom * (delta / 50 + 1));
                }
                this.followMousePointer(mouseAt);
                this.setToggleIcon();
                saveStatus();
                if (event.preventDefault) event.preventDefault();
                return false;
            }
        });
        window.onresize = () => {
            let winWidth = window.innerWidth;
            let contentWidth = winWidth - this.marginPixels
            let minWidth = contentWidth < this.naturalWidth ? contentWidth : this.naturalWidth;
            let minZoom = parseInt(minWidth / this.naturalWidth * 100);

            if (this.img.style.width == "") {
                // console.log("update zoom value due to resize");
                this.zoom = minZoom;
            } else if (this.zoom < minZoom) {
                // console.log("change zoom to fit");
                this.zoom = minZoom;
                this.img.style.width = "";
                this.img.style.maxWidth = "";
                document.body.style.width = "";
            }
        };
    }
    followMousePointer(mouseAt) {
        let e = event || window.event;
        let imgWidth = parseInt(this.naturalWidth * this.zoom / 100);
        let imgHeight = parseInt(this.naturalHeight * this.zoom / 100);
        document.body.scrollLeft = parseInt(imgWidth * mouseAt.imageX + this.marginPixels / 2) - mouseAt.x;
        document.body.scrollTop = parseInt(imgHeight * mouseAt.imageY + this.marginPixels / 2) - mouseAt.y;
    }
    getMousePointer(x, y) {
        let imgWidth = parseInt(this.naturalWidth * this.zoom / 100);
        let imgHeight = parseInt(this.naturalHeight * this.zoom / 100);
        let e = event || window.event;
        let clientX = x || e.clientX
        let clientY = y || e.clientY
        let mouseAt = {
            x: clientX,
            y: clientY,
            imageX: (clientX + document.body.scrollLeft - this.marginPixels / 2) / imgWidth,
            imageY: (clientY + document.body.scrollTop - this.marginPixels / 2) / imgHeight,
        }
        return mouseAt;
    }
    getImageCenterMousePointer() {
        let ph = document.getElementById("placeholder");
        let x = (window.innerWidth - this.marginPixels) / 2;
        let y = (window.innerHeight - this.marginPixels - ph.clientHeight) / 2;
        return this.getMousePointer(x, y);
    }
    setToggleIcon() {
        let fit = document.getElementById("icon-fit");
        let expand = document.getElementById("icon-expand");
        if (this.img.style.width) {
            fit.style.display = "";
            expand.style.display = "none";
        } else {
            fit.style.display = "none";
            expand.style.display = "";
        }

    }
}
class Switcher {
    constructor() {
        this.current = 0;
        this.images = [];
        this.image = document.getElementById("image");
        this.pInfo = document.getElementById("pageInfo");
        this.pInfoTpl = this.pInfo.innerText;
        for (let e of document.getElementById("images").getElementsByTagName("img")) {
            this.images.push(e.src);
        }
    }
    add() {
        if (this.images.length <= 1) {
            // document.getElementById("placeholder").style.display = "none";
            document.getElementById("page-ctrls").style.display = "none";
            return;
        }
        document.getElementById("btnNext").addEventListener("click", () => {
            if (this.current == this.images.length) return;
            this.moveTo(++this.current);
            saveStatus();
        });
        document.getElementById("btnPrev").addEventListener("click", () => {
            if (this.current == 1) return;
            this.moveTo(--this.current);
            saveStatus();
        });

        this.moveTo(1);
        document.getElementById("images").remove();
        // console.log(this.images.length);
    }
    moveTo(page) {
        if (page < 1 || page > this.images.length) return;
        this.image.src = this.images[page - 1];
        this.pInfo.innerText = String.format(this.pInfoTpl, page, this.images.length);
        this.current = page;
        zoomer.reset();
    }
}
String.format = function format() {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}
let zoomer;
let switcher;
let sendStatus;

function saveStatus() {
    if (sendStatus) {
        let status = JSON.stringify({
            page: switcher.current,
            zoom: zoomer.zoom,
            x: document.body.scrollLeft,
            y: document.body.scrollTop
        });
        // console.log("save status: " + status);
        sendStatus.attributes["href"].value = 'command:plantuml.previewStatus?' + encodeURIComponent(status);
        sendStatus.click();
    }
}
window.addEventListener("load", () => {
    sendStatus = document.getElementById("sendStatus");
    zoomer = new Zoom();
    switcher = new Switcher();
    switcher.add();
    zoomer.add();
    let jsonStatus = document.getElementById("status").innerHTML;
    if (jsonStatus) {
        let status = {};
        try {
            status = JSON.parse(jsonStatus);
        } catch (error) {}
        status.page = status.page || 1;
        status.zoom = status.zoom || 1;
        status.x = status.x || 0;
        status.y = status.y || 0;
        switcher.moveTo(status.page);
        zoomer.setZoom(status.zoom);
        zoomer.setScroll(status.x, status.y);
    }
    if (!document.getElementById("errtxt").innerText.trim())
        document.getElementById("error-warning").style.display = "none";

});
window.addEventListener("mouseup", () => saveStatus());