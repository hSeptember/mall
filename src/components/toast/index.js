import Toast from './Toast'

const plugin = {}

plugin.install = (Vue) => {
	// 1.创建组件构造器
	const ToastConstructor = Vue.extend(Toast)
	// 2.new的方式根基组件构造器创建一个组件对象
	const toast = new ToastConstructor()
	// 3.将组建对象手动挂载到某一元素上
	toast.$mount(document.createElement('div'))

	// 4.将toast的$el添加到body中
	document.body.appendChild(toast.$el)

	Vue.prototype.$toast = toast
}


export default plugin



