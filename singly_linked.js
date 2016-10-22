'use strict';

function makeList (arr) {
	let node = null;

	for (let i = arr.length - 1; i >= 0; i--) {
		node = {
			data: arr[i],
			next: node
		};
	}

	return node;
}

function List (listArr=[]) {
	this.length = listArr.length;
	this.head = makeList(listArr);
}

List.prototype = {
	constructor: List,

	toArray: function toArray () {
		let arr = [];
		let node = this.head;

		while (node) {
			arr.push(node.data);
			node = node.next;
		}
		return arr;
	},

	nodeAt: function nodeAt (index) {
		// if (index > this.length - 1 || index < 0) throw 'SinglyList: get(index) out of range';

		let node = this.head;
		for (let i = 0; i < index; i++) { node = node.next; }
		return node;
	},

	indexOf: function indexOf (data) {
		let node = this.head;
		let i = 0;

		while (node) {
			if (node.data === data) return i;
			node = node.next;
			i++;
		}
		return -1;
	},

	insert: function insert (data, index=this.length) {
		// if (index > this.length || index < 0) throw 'SinglyList: insert(index) out of range';
		this.length++;

		if (index === 0) {
			return this.head = {
				data: data, 
				next: this.head
			};

		} else {
			let node = this.head;
			for (let i = 0; i < index - 1; i++) { node = node.next; }
			
			return node.next = {
				data: data, 
				next: node.next
			};
		}
	},

	replace: function replace (data, index) {
		let node = this.head;
		for (let i = 0; i < index; i++) { node = node.next; }
		node.data = data;
		return node;
	},

	delete: function del (index) {
		// if (index > this.length - 1 || index < 0) throw 'SinglyList: delete(index) out of range';
		let deletedNode;

		if (index === 0) {
			deletedNode = this.head;
			this.head = this.head.next;

		} else {
			let node = this.head;
			for (let i = 0; i < index - 1; i++) { node = node.next; }
			
			deletedNode = node.next;
			node.next = node.next.next;
		}
		
		deletedNode = null;
		this.length--;
	}
}

Array.prototype.withValue = function withValue (data, index=this.length) {
	return this.slice(0, index).concat(data, this.slice(index));
}

Array.prototype.insert = function insert (data, index=this.length) {
	for (var i = this.length; i > index; i--) { this[i] = this[i-1]; }
	this[i] = data;
}

// const runs = 100000;

// let startTime;
// let diff = [];

// let arr = [];
// for (let i = 0; i < runs; i++) {
// 	arr.push(i);
// }
// let list = new List();

// console.log(`\n${runs} list insertions`)
// console.log(list.length);

// startTime = process.hrtime();
// diff = process.hrtime(startTime);

// startTime = process.hrtime();
// for (let i = 0; i < runs; i++) {
// 	let rand = Math.floor(Math.random() * (list.length + 1));
// 	list.insert(i, i);
// }
// diff = process.hrtime(startTime);
// console.log(list.length);
// console.log(diff);
// console.log(list.toArray());
// console.log(list.head);

// startTime = process.hrtime();
// for (let i = 0; i < runs; i++) {
// 	let rand = Math.floor(Math.random() * arr.length);
// 	arr.insert(rand, 1);
// }
// diff = process.hrtime(startTime);
// console.log(diff);
// console.log(arr.length);

let list = new List([0,1,2,3,4,5,6,7,8,9]);
list.replace('X', 3);
console.log(list.toArray());