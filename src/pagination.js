import { mixin, warn } from './util.js';

let defaultOptions = {
	firstStr: 'First',
	prevStr: 'Prev',
	nextStr: 'Next',
	lastStr: 'Last',
	first: true,
	prev: true,
	next: true,
	last: true,
	normal: true,
	currentPage: 1,
	itemsPerPage: 10,
	pagesLength: 5,
	totalItems: 0,
	onChange: function() {}
};

export default function(componentOptions) {
	return {
		name: 'vue-pagination',
		template: `<div class="pagination-con" v-show="paginationConfig.totalItems !== 0">
			<ul>
				<li @click="changePage(1)" v-show="paginationConfig.first && paginationConfig.currentPage !== 1">{{paginationConfig.firstStr}}</li>
				<li @click="prevPage()" v-show="paginationConfig.prev" :class="{'disabled': paginationConfig.currentPage === 1}">{{paginationConfig.prevStr}}</li>
				<li @click="changePage(item)" v-show="paginationConfig.normal" v-for="item in pageList" :class="{'gap': item === '...', 'active': paginationConfig.currentPage === item}" track-by="$index">{{item}}</li>
				<li @click="nextPage()" v-show="paginationConfig.next" :class="{'disabled': paginationConfig.currentPage === numberOfPages}">{{paginationConfig.nextStr}}</li>
				<li @click="changePage(numberOfPages)" v-show="paginationConfig.last && paginationConfig.currentPage !== numberOfPages">{{paginationConfig.lastStr}}</li>
			</ul>
		</div>`,
		props: ['paginationConfig'],
		data: function() {
			return {
				componentOptions: componentOptions,
				pageList: [],
				numberOfPages: 0
			};
		},
		ready() {
			this.initConfig();
		},
		methods: {
			changePage(page) {
				if (page === '...') {
					return;
				}
				this.paginationConfig.currentPage = page;
			},
			prevPage() {
				if (this.paginationConfig.currentPage > 1) {
					this.paginationConfig.currentPage -= 1;
				}
			},
			nextPage() {
				if (this.paginationConfig.currentPage < this.numberOfPages) {
					this.paginationConfig.currentPage += 1;
				}
			},
			initConfig() {
				if (this.paginationConfig === undefined) return;
				this.paginationConfig = mixin(defaultOptions, this.paginationConfig);
				this.numberOfPages = Math.ceil(this.paginationConfig.totalItems / this.paginationConfig.itemsPerPage);
				if (this.paginationConfig.pagesLength % 2 === 0) {
					this.paginationConfig.pagesLength = this.paginationConfig.pagesLength - 1;
				}
			},
			generatePageList() {
				this.pageList = [];
				let from, to;
				let offset = (this.paginationConfig.pagesLength + 1) / 2;
				if (this.paginationConfig.currentPage <= offset) {
					from = 1;
					to = this.numberOfPages < this.paginationConfig.pagesLength ? this.numberOfPages : this.paginationConfig.pagesLength;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					if (this.numberOfPages > this.paginationConfig.pagesLength) {
						this.pageList.push('...');
					}
				} else if (this.paginationConfig.currentPage >= this.numberOfPages - offset) {
					from = this.numberOfPages - this.paginationConfig.pagesLength;
					to = this.numberOfPages;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					this.pageList.unshift('...');
				} else {
					from = this.paginationConfig.currentPage - offset + 1;
					to = this.paginationConfig.currentPage + offset - 1;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					this.pageList.push('...');
					this.pageList.unshift('...');
				}
			}
		},
		watch: {
			'paginationConfig': {
				handler() {
					this.initConfig();
					this.generatePageList();
				},
				deep: true
			},
			'paginationConfig.currentPage': {
				handler() {
					this.generatePageList();
					if (typeof this.paginationConfig.onChange !== 'function') {
						warn('Config of "onChange" must be a function!');
						return;
					}
					this.paginationConfig.onChange && this.paginationConfig.onChange();
				}
			}
		}
	};
};
