import * as _ from 'lodash'


let root: HTMLElement = document.querySelector('#root')

root.onclick = function(e: MouseEvent){
	console.log(e)
}