export default function decorate(block) {
    let list = block.getElementsByTagName("ul")[0];
    let listItems = block.getElementsByTagName("li"); 

    list.classList.add("payment-icons");

    for (let item of listItems) {
        let itemClass = item.textContent.toLowerCase().trim().split(" ").join("");
        item.classList.add(itemClass);
        item.innerHTML = ' ';
    }
}