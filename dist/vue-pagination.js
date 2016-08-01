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

  function vPagination (componentOptions) {
  	return {
  		name: 'vue-pagination',
  		template: '<div class="pagination-con" v-show="resultOptions.totalItems !== 0">\n\t\t\t<ul>\n\t\t\t\t<li @click="changePage(1)" v-show="resultOptions.first && resultOptions.currentPage !== 1">{{resultOptions.firstStr}}</li>\n\t\t\t\t<li @click="prevPage()" v-show="resultOptions.prev" :class="{\'disabled\': resultOptions.currentPage === 1}">{{resultOptions.prevStr}}</li>\n\t\t\t\t<li @click="changePage(item)" v-show="resultOptions.normal" v-for="item in pageList" :class="{\'gap\': item === \'...\', \'active\': resultOptions.currentPage === item}" track-by="$index">{{item}}</li>\n\t\t\t\t<li @click="nextPage()" v-show="resultOptions.next" :class="{\'disabled\': resultOptions.currentPage === numberOfPages}">{{resultOptions.nextStr}}</li>\n\t\t\t\t<li @click="changePage(numberOfPages)" v-show="resultOptions.last && resultOptions.currentPage !== numberOfPages">{{resultOptions.lastStr}}</li>\n\t\t\t</ul>\n\t\t</div>',
  		props: ['paginationConfig'],
  		data: function data() {
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
  					onChange: function onChange() {}
  				},
  				resultOptions: {},
  				pageList: [],
  				numberOfPages: 0
  			};
  		},
  		methods: {
  			changePage: function changePage(page) {
  				if (page === '...') {
  					return;
  				}
  				this.resultOptions.currentPage = page;
  			},
  			prevPage: function prevPage() {
  				if (this.resultOptions.currentPage > 1) {
  					this.resultOptions.currentPage -= 1;
  				}
  			},
  			nextPage: function nextPage() {
  				if (this.resultOptions.currentPage < this.numberOfPages) {
  					this.resultOptions.currentPage += 1;
  				}
  			},
  			initConfig: function initConfig() {
  				this.paginationConfig = this.paginationConfig === undefined ? {} : this.paginationConfig;
  				this.resultOptions = mixin(this.defaultOptions, this.paginationConfig);
  				this.numberOfPages = Math.ceil(this.resultOptions.totalItems / this.resultOptions.itemsPerPage);
  				if (this.resultOptions.pagesLength % 2 === 0) {
  					this.resultOptions.pagesLength = this.resultOptions.pagesLength - 1;
  				}
  			},
  			generatePageList: function generatePageList() {
  				this.pageList = [];
  				var from = void 0,
  				    to = void 0;
  				var offset = (this.resultOptions.pagesLength + 1) / 2;
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
  				handler: function handler() {
  					this.initConfig();
  					this.generatePageList();
  				},

  				immediate: true
  			},
  			'resultOptions.currentPage': {
  				handler: function handler() {
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