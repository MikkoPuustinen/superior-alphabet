
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
const indices = [0, 4, 8, 14, 20, 24];
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function processTextNodes(node) 
{
    if (node.nodeType === Node.TEXT_NODE) 
    {
        let text = node.textContent.toLowerCase();
        for (let i = 0; i < vowels.length; ++i)
        {
            let weekDay = new Date().getDay();
            let index = (indices[i] + weekDay) % alphabet.length;
            let newLetter = alphabet[index];
            let j = 1;
            while (vowels.includes(newLetter))
            {
                newLetter = alphabet[(index + j) % alphabet.length];
                j++;
            }
            text = text.replaceAll(vowels[i], newLetter);
        }
        node.textContent = text
    }
    else if (node.nodeType === Node.ELEMENT_NODE) 
    {
        for (const childNode of node.childNodes) 
        {
            processTextNodes(childNode);
        }
    }
}

const observer = new MutationObserver((mutationsList) => 
{
    for (const mutation of mutationsList) 
    {
        if (mutation.type === "childList")
        {
            for (const addedNode of mutation.addedNodes) 
            {
                processTextNodes(addedNode);
            }
        }
    }
});

observer.observe(document, { childList: true, subtree: true });

processTextNodes(document.body);
  