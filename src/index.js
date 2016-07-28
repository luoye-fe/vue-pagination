import vPagination from './pagination.js';
import './style.js';

import { mixin } from './util.js';

class Pagination {};

let defaultOptions = {
	tagName: 'v-pagination'
};

Pagination.install = (Vue, customOptions = {}) => {
	let options = mixin(defaultOptions, customOptions);
	Vue.component(options.tagName, Vue.extend(vPagination(options)));
};

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Pagination);
}

export default Pagination;
