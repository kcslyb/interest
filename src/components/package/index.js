const requireContext = import.meta.globEager('./*/index.js')
const contexts = Object.values(requireContext)
const components = []
contexts.forEach(context => {
    context.default && components.push(context.default)
})

export default components