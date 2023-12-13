export default function decorate(block) {
    console.log(block);
    const ul = document.createElement('ul');
    block.append(ul);
}
