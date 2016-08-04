/*!
 * vue-pagination v1.0.0
 * (c) 2016 Luo Ye
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vuePagination = factory());
}(this, function () { 'use strict';

  var mixin = function mixin(source, target) {
  	for (var i in target) {
  		if (target.hasOwnProperty(i)) {
  			source[i] = target[i];
  		}
  	}
  	return source;
  };

  var warn = function warn(e) {
  	console.warn(e);
  };

  var defaultOptions$1 = {
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
  	onChange: function onChange() {}
  };

  function vPagination (componentOptions) {
  	return {
  		name: 'vue-pagination',
  		template: '<div class="pagination-con" v-show="paginationConfig.totalItems !== 0">\n\t\t\t<ul>\n\t\t\t\t<li @click="changePage(1)" v-show="paginationConfig.first && paginationConfig.currentPage !== 1">{{paginationConfig.firstStr}}</li>\n\t\t\t\t<li @click="prevPage()" v-show="paginationConfig.prev" :class="{\'disabled\': paginationConfig.currentPage === 1}">{{paginationConfig.prevStr}}</li>\n\t\t\t\t<li @click="changePage(item)" v-show="paginationConfig.normal" v-for="item in pageList" :class="{\'gap\': item === \'...\', \'active\': paginationConfig.currentPage === item}" track-by="$index">{{item}}</li>\n\t\t\t\t<li @click="nextPage()" v-show="paginationConfig.next" :class="{\'disabled\': paginationConfig.currentPage === numberOfPages}">{{paginationConfig.nextStr}}</li>\n\t\t\t\t<li @click="changePage(numberOfPages)" v-show="paginationConfig.last && paginationConfig.currentPage !== numberOfPages">{{paginationConfig.lastStr}}</li>\n\t\t\t</ul>\n\t\t</div>',
  		props: ['paginationConfig'],
  		data: function data() {
  			return {
  				componentOptions: componentOptions,
  				pageList: [],
  				numberOfPages: 0
  			};
  		},
  		ready: function ready() {
  			this.initConfig();
  		},

  		methods: {
  			changePage: function changePage(page) {
  				if (page === '...') {
  					return;
  				}
  				this.paginationConfig.currentPage = page;
  			},
  			prevPage: function prevPage() {
  				if (this.paginationConfig.currentPage > 1) {
  					this.paginationConfig.currentPage -= 1;
  				}
  			},
  			nextPage: function nextPage() {
  				if (this.paginationConfig.currentPage < this.numberOfPages) {
  					this.paginationConfig.currentPage += 1;
  				}
  			},
  			initConfig: function initConfig() {
  				if (this.paginationConfig === undefined) return;
  				this.paginationConfig = mixin(defaultOptions$1, this.paginationConfig);
  				this.numberOfPages = Math.ceil(this.paginationConfig.totalItems / this.paginationConfig.itemsPerPage);
  				if (this.paginationConfig.pagesLength % 2 === 0) {
  					this.paginationConfig.pagesLength = this.paginationConfig.pagesLength - 1;
  				}
  			},
  			generatePageList: function generatePageList() {
  				this.pageList = [];
  				var from = void 0,
  				    to = void 0;
  				var offset = (this.paginationConfig.pagesLength + 1) / 2;
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
  				handler: function handler() {
  					this.initConfig();
  					this.generatePageList();
  				},

  				deep: true
  			},
  			'paginationConfig.currentPage': {
  				handler: function handler() {
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

  var insertStyleStr = function insertStyleStr(styleStr) {
  	var head = document.head || document.getElementsByTagName('head')[0];
  	var style = document.createElement('style');
  	style.type = 'text/css';
  	style.innerHTML = styleStr;
  	head.appendChild(style);
  };

  var styleStr = '\n.pagination-con {\n\ttext-align: center;\n}\n\n.pagination-con ul {\n\tfont-size: 0;\n\tmargin: 21px 0;\n\tborder-radius: 3px;\n}\n\n.pagination-con ul li {\n\tcolor: #5c5c5c;\n\tdisplay: inline-block;\n\tvertical-align: middle;\n\tfont-size: 14px;\n\tpadding: 9px 16px;\n\ttext-align: center;\n\tcursor: pointer;\n\tborder: 1px solid #e5e5e5;\n\tmargin-left: -1px;\n\tfont-weight: 600;\n}\n\n.pagination-con ul li:hover {\n\tbackground-color: #f7faff;\n}\n\n.pagination-con ul li.active, .pagination-con ul li.active:hover {\n\tcolor: #2897ce;\n\tbackground: #fff;\n\tcursor: default;\n}\n\n.pagination-con ul li.gap {\n\tcursor: default;\n}\n\n.pagination-con ul .disabled, .pagination-con ul .disabled:hover {\n\tcolor: #cdcdcd;\n\tbackground-color: #fafafa;\n\tcursor: not-allowed;\n} \n';

  insertStyleStr(styleStr);

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var Pagination = function Pagination() {
  	classCallCheck(this, Pagination);
  };

  ;

  var defaultOptions = {
  	tagName: 'v-pagination'
  };

  Pagination.install = function (Vue) {
  	var customOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  	var options = mixin(defaultOptions, customOptions);
  	Vue.component(options.tagName, Vue.extend(vPagination(options)));
  };

  if (typeof window !== 'undefined' && window.Vue) {
  	window.Vue.use(Pagination);
  }

  return Pagination;

}));