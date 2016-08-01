import { mixin, warn } from './util.js';

export default function(componentOptions) {
	return {
		name: 'vue-pagination',
		template:
		`<div class="pagination-con" v-show="resultOptions.totalItems !== 0">
			<ul>
				<li @click="changePage(1)" v-show="resultOptions.first && resultOptions.currentPage !== 1">{{resultOptions.firstStr}}</li>
				<li @click="prevPage()" v-show="resultOptions.prev" :class="{'disabled': resultOptions.currentPage === 1}">{{resultOptions.prevStr}}</li>
				<li @click="changePage(item)" v-show="resultOptions.normal" v-for="item in pageList" :class="{'gap': item === '...', 'active': resultOptions.currentPage === item}" track-by="$index">{{item}}</li>
				<li @click="nextPage()" v-show="resultOptions.next" :class="{'disabled': resultOptions.currentPage === numberOfPages}">{{resultOptions.nextStr}}</li>
				<li @click="changePage(numberOfPages)" v-show="resultOptions.last && resultOptions.currentPage !== numberOfPages">{{resultOptions.lastStr}}</li>
			</ul>
		</div>`,
		props: ['paginationConfig'],
		data: function() {
			return {
				componentOptions: componentOptions,
				defaultOptions: {
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
				},
				resultOptions: {},
				pageList: [],
				numberOfPages: 0
			};
		},
		methods: {
			changePage(page) {
				if (page === '...') {
					return;
				}
				this.resultOptions.currentPage = page;
			},
			prevPage() {
				if (this.resultOptions.currentPage > 1) {
					this.resultOptions.currentPage -= 1;
				}
			},
			nextPage() {
				if (this.resultOptions.currentPage < this.numberOfPages) {
					this.resultOptions.currentPage += 1;
				}
			},
			initConfig() {
				this.paginationConfig = this.paginationConfig === undefined ? {} : this.paginationConfig;
				this.resultOptions = mixin(this.defaultOptions, this.paginationConfig);
				this.numberOfPages = Math.ceil(this.resultOptions.totalItems / this.resultOptions.itemsPerPage);
				if (this.resultOptions.pagesLength % 2 === 0) {
					this.resultOptions.pagesLength = this.resultOptions.pagesLength - 1;
				}
			},
			generatePageList() {
				this.pageList = [];
				let from, to;
				let offset = (this.resultOptions.pagesLength + 1) / 2;
				if (this.resultOptions.currentPage <= offset) {
					from = 1;
					to = this.numberOfPages < this.resultOptions.pagesLength ? this.numberOfPages : this.resultOptions.pagesLength;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					if (this.numberOfPages > this.resultOptions.pagesLength) {
						this.pageList.push('...');
					}
				} else if (this.resultOptions.currentPage >= this.numberOfPages - offset) {
					from = this.numberOfPages - this.resultOptions.pagesLength;
					to = this.numberOfPages;
					while (from <= to) {
						this.pageList.push(from);
						from++;
					}
					this.pageList.unshift('...');
				} else {
					from = this.resultOptions.currentPage - offset + 1;
					to = this.resultOptions.currentPage + offset - 1;
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
			'paginationConfig.totalItems': {
				handler() {
					this.initConfig();
					this.generatePageList();
				},
				immediate: true
			},
			'resultOptions.currentPage': {
				handler() {
					if (this.paginationConfig.currentPage !== this.resultOptions.currentPage) {
						this.generatePageList();
						this.paginationConfig.currentPage = this.resultOptions.currentPage;
						if (typeof this.paginationConfig.onChange !== 'function') {
							warn('Config of "onChange" must be a function!');
							return;
						}
						this.paginationConfig.onChange && this.paginationConfig.onChange();
					}
				}
			}
		}
	};
};
