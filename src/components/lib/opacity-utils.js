export function animationOpacityClose (node, parentNode, timeout = 50) {
    if (node && parentNode) {
        let opacity = 10
        const timer = setInterval(function () {
            opacity = opacity - 1
            setOpacity(node, opacity)
            if (opacity === 0) {
                clearInterval(timer)
                parentNode.removeChild(node)
            }
        }, timeout)
    }
}

export function animationOpacityShow (node, timeout = 50) {
    if (node) {
        let opacity = 0
        const timer = setInterval(function () {
            opacity = opacity + 1
            setOpacity(node, opacity)
            if (opacity === 10) {
                clearInterval(timer)
            }
        }, timeout)
    }
}

function setOpacity (node, opacity) {
    if (node.childNodes && node.childNodes.length) {
        node.childNodes[0].style.opacity = opacity / 10
        if (node.childNodes[0].childNodes && node.childNodes[0].childNodes.length) {
            node.childNodes[0].childNodes[0].style.opacity = opacity / 10
        }
    }
}