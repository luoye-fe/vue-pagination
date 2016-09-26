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
		render(createElement) {
			let pageElements = this.pageList.map((item, index) => {
					return createElement('li', {
						domProps: {
							innerText: item
						},
						style: {
							display: (this.paginationConfig.normal) ? 'inline-block' : 'none'
						},
						on: {
						   click: () => this.changePage(item)
						},
						class: {
							gap: item === '...', 
							active: this.paginationConfig.currentPage === item
						},
						key: index,
					});
				});
			let liLists = [
				createElement('li', {
					domProps: {
						innerText: this.paginationConfig.firstStr
					},
					style: {
						display: (this.paginationConfig.first && this.paginationConfig.currentPage !== 1) ? 'inline-block' : 'none'
					},
					on: {
					   click: () => this.changePage(1)
					}
				}),
				createElement('li', {
					domProps: {
						innerText: this.paginationConfig.prevStr
					},
					style: {
						display: (this.paginationConfig.prev) ? 'inline-block' : 'none'
					},
					on: {
					   click: () => this.prevPage()
					},
					class: {disabled: this.paginationConfig.currentPage === 1}
				})];
			if (this.pageList.length) {
				liLists.push(...pageElements);
			}
			liLists.push(
				createElement('li', {
					domProps: {
						innerText: this.paginationConfig.nextStr
					},
					style: {
						display: (this.paginationConfig.next) ? 'inline-block' : 'none'
					},
					on: {
					   click: () => this.nextPage()
					},
					class: {disabled: this.paginationConfig.currentPage === this.numberOfPages}
				}),
				createElement('li', {
					domProps: {
						innerText: this.paginationConfig.lastStr
					},
					style: {
						display: (this.paginationConfig.last && this.paginationConfig.currentPage !== this.numberOfPages) ? 'inline-block' : 'none'
					},
					on: {
					   click: () => this.changePage(this.numberOfPages)
					}
				})
			);

			return createElement('div', {
				style: {
					display: this.paginationConfig.totalItems !== 0 ? 'block' : 'none'
				},
				class: {'pagination-con': true}
			}, [createElement('ul', {}, liLists)]);
		},
		props: ['paginationConfig'],
		data: function() {
			return {
				componentOptions: componentOptions,
				pageList: [],
				numberOfPages: 0
			};
		},
		mounted() {
			this.initConfig();
			this.generatePageList();
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
				let mixedobj = mixin(defaultOptions, this.paginationConfig);
				mixin(this.paginationConfig, mixedobj);
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
