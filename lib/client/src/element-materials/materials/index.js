import vue2Material from './vue2'
import vue3Material from './vue3'

export default function (vueType) {
    if (vueType === 'VUE3') {
        return vue3Material
    } else {
        return vue2Material
    }
}
