document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector(".message-input");
    textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });

    const suggestionChips = document.querySelectorAll(".suggestion-chip");
    suggestionChips.forEach((chip) => {
        chip.addEventListener("click", function () {
            textarea.value = this.textContent;
            textarea.focus();
            textarea.dispatchEvent(new Event('input'));
        });
    });

    const conversationItems = document.querySelectorAll(".conversation-item");
    conversationItems.forEach((item) => {
        item.addEventListener("click", function () {

            conversationItems.forEach((i) => i.classList.remove("active"));

            this.classList.add("active");

        });
    });

    const sendBtn = document.querySelector(".send-btn");
    sendBtn.addEventListener("click", function () {
        const message = textarea.value.trim();
        if (message) {

            console.log("Message sent:", message);
            textarea.value = "";
            textarea.style.height = "auto";
        }
    });
    textarea.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });
});