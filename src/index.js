import vPagination from './pagination.js';
import v2Pagination from './pagination-vue2.js';
import './style.js';

import { mixin } from './util.js';

class Pagination {};

let defaultOptions = {
	tagName: 'v-pagination'
};

Pagination.install = (Vue, customOptions = {}) => {
	let options = mixin(defaultOptions, customOptions);
	if(Vue.version && /^2\..+/.test(Vue.version)) {
		Vue.component(options.tagName, Vue.extend(v2Pagination(options)));
	} else {
		Vue.component(options.tagName, Vue.extend(vPagination(options)));
	}
};

if (typeof window !== 'undefined' && window.Vue) {

	window.Vue.use(Pagination);
}

export default Pagination;
