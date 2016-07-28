const insertStyleStr = (styleStr) => {
	let head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = styleStr;
	head.appendChild(style);
};

let styleStr =
`
.pagination-con {
	text-align: center;
}

.pagination-con ul {
	font-size: 0;
	margin: 21px 0;
	border-radius: 3px;
}

.pagination-con ul li {
	color: #5c5c5c;
	display: inline-block;
	vertical-align: middle;
	font-size: 14px;
	padding: 9px 16px;
	text-align: center;
	cursor: pointer;
	border: 1px solid #e5e5e5;
	margin-left: -1px;
	font-weight: 600;
}

.pagination-con ul li:hover {
	background-color: #f7faff;
}

.pagination-con ul li.active, .pagination-con ul li.active:hover {
	color: #2897ce;
	background: #fff;
	cursor: default;
}

.pagination-con ul li.gap {
	cursor: default;
}

.pagination-con ul .disabled, .pagination-con ul .disabled:hover {
	color: #cdcdcd;
	background-color: #fafafa;
	cursor: not-allowed;
} 
`;

insertStyleStr(styleStr);
