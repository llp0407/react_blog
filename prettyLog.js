/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | info ]
 */
function typeColor(type = 'default') {
    let color = ''
    switch (type) {
        case 'primary':
            color = '#146aa9'
            break
        case 'success':
            color = '#19be6b'
            break
        case 'info':
            color = '#3ab869'
            break
        case 'warning':
            color = '#ff9900'
            break
        case 'danger':
            color = '#f03f14'
            break
        case 'default':
            color = '#35495E'
            break
        default:
            color = type
            break
    }
    return color
}

const prettyLog = (() => {
    /**
     * 漂亮的输出
     * @param title 前面的标题
     * @param text 输出文本
     * @param type 输出样式，可以是6个状态值，也可以是自定义颜色
     */
    const pretty = (title, text, type = 'primary') => {
        console.log(
            `%c ${title} %c ${text} %c`,
            `background: #606060; border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;`,
            `border:1px solid ${typeColor(type)}; padding: 1px; border-radius: 0 4px 4px 0; background: ${typeColor(type)}; color: #fff;`,
            'background:transparent'
        )
    }

    const primary = function (title, text) {
        pretty(title, text, 'primary')
    }
    const success = function  (title, text)  {
		pretty(title, text, 'success')
    }
    const info = function  (title, text) {
		pretty(title, text, 'info')
    }
    const warning = function  (title, text)  {
		pretty(title, text, 'warning')
	}

	const danger = function (title, text) {
		pretty(title, text, 'danger')
    }

	/**
	 *
	 * @param {*} 性能指标输出
	 * @param {*} "网页重定向的耗时"、"DNS查询的耗时"、 "TCP连接的耗时"、"下载服务端返回数据的时间"、"http请求总耗时"、"dom加载完成的时间"、"页面load的总耗时"
	 */
	const performance = ()=>{
		setTimeout(() => {
			let performance = window.performance;
			if (performance) {
				let time = performance.getEntriesByType("navigation")[0];
				let resource = 0;
				time || (resource = (time = performance.timing).navigationStart);
				let detail = [{
					key: "Redirect",
					desc: "网页重定向的耗时",
					value: time.redirectEnd - time.redirectStart
				}, {
					key: "AppCache",
					desc: "检查本地缓存的耗时",
					value: time.domainLookupStart - time.fetchStart
				}, {
					key: "DNS",
					desc: "DNS查询的耗时",
					value: time.domainLookupEnd - time.domainLookupStart
				}, {
					key: "TCP",
					desc: "TCP连接的耗时",
					value: time.connectEnd - time.connectStart
				}, {
					key: "Waiting(TTFB)",
					desc: "从客户端发起请求到接收到响应的时间 / Time To First Byte",
					value: time.responseStart - time.requestStart
				}, {
					key: "Content Download",
					desc: "下载服务端返回数据的时间",
					value: time.responseEnd - time.responseStart
				}, {
					key: "HTTP Total Time",
					desc: "http请求总耗时",
					value: time.responseEnd - time.requestStart
				}, {
					key: "DOMContentLoaded",
					desc: "dom加载完成的时间",
					value: time.domContentLoadedEventEnd - resource
				}, {
					key: "Loaded",
					desc:"页面load的总耗时",
					value: time.loadEventEnd - resource
				}];
				console.log(detail)
			}
		}, 0)
	}
    return {
        primary, success, info, warning, danger, performance
    }

})()

// export default prettyLog;
