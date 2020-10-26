define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createUI = void 0;
    exports.createUI = () => {
        const flashInfo = (message) => {
            var _a;
            let flashBG = document.getElementById("flash-bg");
            if (flashBG) {
                (_a = flashBG.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(flashBG);
            }
            flashBG = document.createElement("div");
            flashBG.id = "flash-bg";
            const p = document.createElement("p");
            p.textContent = message;
            flashBG.appendChild(p);
            document.body.appendChild(flashBG);
            setTimeout(() => {
                var _a;
                (_a = flashBG === null || flashBG === void 0 ? void 0 : flashBG.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(flashBG);
            }, 1000);
        };
        const createModalOverlay = (postFocalElement, classList) => {
            document.querySelectorAll(".navbar-sub li.open").forEach(i => i.classList.remove("open"));
            const existingPopover = document.getElementById("popover-modal");
            if (existingPopover)
                existingPopover.parentElement.removeChild(existingPopover);
            const modalBG = document.createElement("div");
            modalBG.id = "popover-background";
            document.body.appendChild(modalBG);
            const modal = document.createElement("div");
            modal.id = "popover-modal";
            if (classList)
                modal.className = classList;
            const closeButton = document.createElement("button");
            closeButton.innerText = "Close";
            closeButton.classList.add("close");
            closeButton.tabIndex = 1;
            modal.appendChild(closeButton);
            const oldOnkeyDown = document.onkeydown;
            const close = () => {
                modalBG.parentNode.removeChild(modalBG);
                modal.parentNode.removeChild(modal);
                // @ts-ignore
                document.onkeydown = oldOnkeyDown;
                postFocalElement.focus();
            };
            modalBG.onclick = close;
            closeButton.onclick = close;
            // Support hiding the modal via escape
            document.onkeydown = whenEscape(close);
            document.body.appendChild(modal);
            return modal;
        };
        /** For showing a lot of code */
        const showModal = (code, postFocalElement, subtitle, links) => {
            const modal = createModalOverlay(postFocalElement);
            if (subtitle) {
                const titleElement = document.createElement("h3");
                titleElement.textContent = subtitle;
                titleElement.setAttribute("role", "alert");
                modal.appendChild(titleElement);
            }
            const textarea = document.createElement("textarea");
            textarea.autofocus = true;
            textarea.readOnly = true;
            textarea.wrap = "off";
            textarea.style.marginBottom = "20px";
            modal.appendChild(textarea);
            textarea.textContent = code;
            textarea.rows = 60;
            const buttonContainer = document.createElement("div");
            const copyButton = document.createElement("button");
            copyButton.innerText = "Copy";
            buttonContainer.appendChild(copyButton);
            const selectAllButton = document.createElement("button");
            selectAllButton.innerText = "Select All";
            buttonContainer.appendChild(selectAllButton);
            modal.appendChild(buttonContainer);
            const close = modal.querySelector(".close");
            close.addEventListener("keydown", e => {
                if (e.key === "Tab") {
                    ;
                    modal.querySelector("textarea").focus();
                    e.preventDefault();
                }
            });
            if (links) {
                Object.keys(links).forEach(name => {
                    const href = links[name];
                    const extraButton = document.createElement("button");
                    extraButton.innerText = name;
                    extraButton.onclick = () => (document.location = href);
                    buttonContainer.appendChild(extraButton);
                });
            }
            const selectAll = () => {
                textarea.select();
            };
            selectAll();
            const buttons = modal.querySelectorAll("button");
            const lastButton = buttons.item(buttons.length - 1);
            lastButton.addEventListener("keydown", e => {
                if (e.key === "Tab") {
                    ;
                    document.querySelector(".close").focus();
                    e.preventDefault();
                }
            });
            selectAllButton.onclick = selectAll;
            copyButton.onclick = () => {
                navigator.clipboard.writeText(code);
            };
        };
        return {
            createModalOverlay,
            showModal,
            flashInfo,
        };
    };
    /**
     * Runs the closure when escape is tapped
     * @param func closure to run on escape being pressed
     */
    const whenEscape = (func) => (event) => {
        const evt = event || window.event;
        let isEscape = false;
        if ("key" in evt) {
            isEscape = evt.key === "Escape" || evt.key === "Esc";
        }
        else {
            // @ts-ignore - this used to be the case
            isEscape = evt.keyCode === 27;
        }
        if (isEscape) {
            func();
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlVUkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wbGF5Z3JvdW5kL3NyYy9jcmVhdGVVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBU2EsUUFBQSxRQUFRLEdBQUcsR0FBTyxFQUFFO1FBQy9CLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7O1lBQ3BDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsTUFBQSxPQUFPLENBQUMsYUFBYSwwQ0FBRSxXQUFXLENBQUMsT0FBTyxFQUFDO2FBQzVDO1lBRUQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdkMsT0FBTyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUE7WUFFdkIsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNyQyxDQUFDLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQTtZQUN2QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRWxDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7O2dCQUNkLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLGFBQWEsMENBQUUsV0FBVyxDQUFDLE9BQU8sRUFBQztZQUM5QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDVixDQUFDLENBQUE7UUFFRCxNQUFNLGtCQUFrQixHQUFHLENBQUMsZ0JBQTZCLEVBQUUsU0FBa0IsRUFBRSxFQUFFO1lBQy9FLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENB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QUFFLEVBQUU7UUFDaEUsTUFBTSxHQUFHLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDakMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFBO1FBQ3BCLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtZQUNoQixRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUE7U0FDckQ7YUFBTTtZQUNMLHdDQUF3QztZQUN4QyxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUE7U0FDOUI7UUFDRCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksRUFBRSxDQUFBO1NBQ1A7SUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFVJIHtcbiAgLyoqIFNob3cgYSB0ZXh0IG1vZGFsLCB3aXRoIHNvbWUgYnV0dG9ucyAqL1xuICBzaG93TW9kYWw6IChtZXNzYWdlOiBzdHJpbmcsIHBvc3RGb2NhbEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdWJ0aXRsZT86IHN0cmluZywgYnV0dG9ucz86IHsgW3RleHQ6IHN0cmluZ106IHN0cmluZyB9KSA9PiB2b2lkXG4gIC8qKiBBIHF1aWNrIGZsYXNoIG9mIHNvbWUgdGV4dCAqL1xuICBmbGFzaEluZm86IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWRcbiAgLyoqIENyZWF0ZXMgYSBtb2RhbCBjb250YWluZXIgd2hpY2ggeW91IGNhbiBwdXQgeW91ciBvd24gRE9NIGVsZW1lbnRzIGluc2lkZSAqL1xuICBjcmVhdGVNb2RhbE92ZXJsYXk6IChwb3N0Rm9jYWxFbGVtZW50OiBIVE1MRWxlbWVudCwgY2xhc3Nlcz86IHN0cmluZykgPT4gSFRNTERpdkVsZW1lbnRcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVJID0gKCk6IFVJID0+IHtcbiAgY29uc3QgZmxhc2hJbmZvID0gKG1lc3NhZ2U6IHN0cmluZykgPT4ge1xuICAgIGxldCBmbGFzaEJHID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbGFzaC1iZ1wiKVxuICAgIGlmIChmbGFzaEJHKSB7XG4gICAgICBmbGFzaEJHLnBhcmVudEVsZW1lbnQ/LnJlbW92ZUNoaWxkKGZsYXNoQkcpXG4gICAgfVxuXG4gICAgZmxhc2hCRyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBmbGFzaEJHLmlkID0gXCJmbGFzaC1iZ1wiXG5cbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcbiAgICBwLnRleHRDb250ZW50ID0gbWVzc2FnZVxuICAgIGZsYXNoQkcuYXBwZW5kQ2hpbGQocClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZsYXNoQkcpXG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZsYXNoQkc/LnBhcmVudEVsZW1lbnQ/LnJlbW92ZUNoaWxkKGZsYXNoQkcpXG4gICAgfSwgMTAwMClcbiAgfVxuXG4gIGNvbnN0IGNyZWF0ZU1vZGFsT3ZlcmxheSA9IChwb3N0Rm9jYWxFbGVtZW50OiBIVE1MRWxlbWVudCwgY2xhc3NMaXN0Pzogc3RyaW5nKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZiYXItc3ViIGxpLm9wZW5cIikuZm9yRWFjaChpID0+IGkuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIikpXG5cbiAgICBjb25zdCBleGlzdGluZ1BvcG92ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcG92ZXItbW9kYWxcIilcbiAgICBpZiAoZXhpc3RpbmdQb3BvdmVyKSBleGlzdGluZ1BvcG92ZXIucGFyZW50RWxlbWVudCEucmVtb3ZlQ2hpbGQoZXhpc3RpbmdQb3BvdmVyKVxuXG4gICAgY29uc3QgbW9kYWxCRyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBtb2RhbEJHLmlkID0gXCJwb3BvdmVyLWJhY2tncm91bmRcIlxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWxCRylcblxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIG1vZGFsLmlkID0gXCJwb3BvdmVyLW1vZGFsXCJcbiAgICBpZiAoY2xhc3NMaXN0KSBtb2RhbC5jbGFzc05hbWUgPSBjbGFzc0xpc3RcblxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgIGNsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiQ2xvc2VcIlxuICAgIGNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjbG9zZVwiKVxuICAgIGNsb3NlQnV0dG9uLnRhYkluZGV4ID0gMVxuICAgIG1vZGFsLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKVxuXG4gICAgY29uc3Qgb2xkT25rZXlEb3duID0gZG9jdW1lbnQub25rZXlkb3duXG5cbiAgICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICAgIG1vZGFsQkcucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQobW9kYWxCRylcbiAgICAgIG1vZGFsLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKG1vZGFsKVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gb2xkT25rZXlEb3duXG4gICAgICBwb3N0Rm9jYWxFbGVtZW50LmZvY3VzKClcbiAgICB9XG5cbiAgICBtb2RhbEJHLm9uY2xpY2sgPSBjbG9zZVxuICAgIGNsb3NlQnV0dG9uLm9uY2xpY2sgPSBjbG9zZVxuXG4gICAgLy8gU3VwcG9ydCBoaWRpbmcgdGhlIG1vZGFsIHZpYSBlc2NhcGVcbiAgICBkb2N1bWVudC5vbmtleWRvd24gPSB3aGVuRXNjYXBlKGNsb3NlKVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbClcblxuICAgIHJldHVybiBtb2RhbFxuICB9XG5cbiAgLyoqIEZvciBzaG93aW5nIGEgbG90IG9mIGNvZGUgKi9cbiAgY29uc3Qgc2hvd01vZGFsID0gKGNvZGU6IHN0cmluZywgcG9zdEZvY2FsRWxlbWVudDogSFRNTEVsZW1lbnQsIHN1YnRpdGxlPzogc3RyaW5nLCBsaW5rcz86IHsgW3RleHQ6IHN0cmluZ106IHN0cmluZyB9KSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBjcmVhdGVNb2RhbE92ZXJsYXkocG9zdEZvY2FsRWxlbWVudClcblxuICAgIGlmIChzdWJ0aXRsZSkge1xuICAgICAgY29uc3QgdGl0bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXG4gICAgICB0aXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBzdWJ0aXRsZVxuICAgICAgdGl0bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJhbGVydFwiKVxuICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQodGl0bGVFbGVtZW50KVxuICAgIH1cblxuICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgdGV4dGFyZWEuYXV0b2ZvY3VzID0gdHJ1ZVxuICAgIHRleHRhcmVhLnJlYWRPbmx5ID0gdHJ1ZVxuICAgIHRleHRhcmVhLndyYXAgPSBcIm9mZlwiXG4gICAgdGV4dGFyZWEuc3R5bGUubWFyZ2luQm90dG9tID0gXCIyMHB4XCJcbiAgICBtb2RhbC5hcHBlbmRDaGlsZCh0ZXh0YXJlYSlcbiAgICB0ZXh0YXJlYS50ZXh0Q29udGVudCA9IGNvZGVcbiAgICB0ZXh0YXJlYS5yb3dzID0gNjBcblxuICAgIGNvbnN0IGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblxuICAgIGNvbnN0IGNvcHlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgY29weUJ1dHRvbi5pbm5lclRleHQgPSBcIkNvcHlcIlxuICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb3B5QnV0dG9uKVxuXG4gICAgY29uc3Qgc2VsZWN0QWxsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgIHNlbGVjdEFsbEJ1dHRvbi5pbm5lclRleHQgPSBcIlNlbGVjdCBBbGxcIlxuICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RBbGxCdXR0b24pXG5cbiAgICBtb2RhbC5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpXG4gICAgY29uc3QgY2xvc2UgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlXCIpIGFzIEhUTUxFbGVtZW50XG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09IFwiVGFiXCIpIHtcbiAgICAgICAgOyAobW9kYWwucXVlcnlTZWxlY3RvcihcInRleHRhcmVhXCIpIGFzIGFueSkuZm9jdXMoKVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKGxpbmtzKSB7XG4gICAgICBPYmplY3Qua2V5cyhsaW5rcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgY29uc3QgaHJlZiA9IGxpbmtzW25hbWVdXG4gICAgICAgIGNvbnN0IGV4dHJhQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgICBleHRyYUJ1dHRvbi5pbm5lclRleHQgPSBuYW1lXG4gICAgICAgIGV4dHJhQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiAoZG9jdW1lbnQubG9jYXRpb24gPSBocmVmIGFzIGFueSlcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGV4dHJhQnV0dG9uKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RBbGwgPSAoKSA9PiB7XG4gICAgICB0ZXh0YXJlYS5zZWxlY3QoKVxuICAgIH1cbiAgICBzZWxlY3RBbGwoKVxuXG4gICAgY29uc3QgYnV0dG9ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcbiAgICBjb25zdCBsYXN0QnV0dG9uID0gYnV0dG9ucy5pdGVtKGJ1dHRvbnMubGVuZ3RoIC0gMSkgYXMgSFRNTEVsZW1lbnRcbiAgICBsYXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSBcIlRhYlwiKSB7XG4gICAgICAgIDsgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2VcIikgYXMgYW55KS5mb2N1cygpXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBzZWxlY3RBbGxCdXR0b24ub25jbGljayA9IHNlbGVjdEFsbFxuICAgIGNvcHlCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGNvZGUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVNb2RhbE92ZXJsYXksXG4gICAgc2hvd01vZGFsLFxuICAgIGZsYXNoSW5mbyxcbiAgfVxufVxuXG4vKipcbiAqIFJ1bnMgdGhlIGNsb3N1cmUgd2hlbiBlc2NhcGUgaXMgdGFwcGVkXG4gKiBAcGFyYW0gZnVuYyBjbG9zdXJlIHRvIHJ1biBvbiBlc2NhcGUgYmVpbmcgcHJlc3NlZFxuICovXG5jb25zdCB3aGVuRXNjYXBlID0gKGZ1bmM6ICgpID0+IHZvaWQpID0+IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICBjb25zdCBldnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnRcbiAgbGV0IGlzRXNjYXBlID0gZmFsc2VcbiAgaWYgKFwia2V5XCIgaW4gZXZ0KSB7XG4gICAgaXNFc2NhcGUgPSBldnQua2V5ID09PSBcIkVzY2FwZVwiIHx8IGV2dC5rZXkgPT09IFwiRXNjXCJcbiAgfSBlbHNlIHtcbiAgICAvLyBAdHMtaWdub3JlIC0gdGhpcyB1c2VkIHRvIGJlIHRoZSBjYXNlXG4gICAgaXNFc2NhcGUgPSBldnQua2V5Q29kZSA9PT0gMjdcbiAgfVxuICBpZiAoaXNFc2NhcGUpIHtcbiAgICBmdW5jKClcbiAgfVxufVxuIl19