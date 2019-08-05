let root = document.querySelector('#root')

root.onclick = function() {
	import ('./home.js').then(({
		test
	}) => {
		test()
	})
}