function makeList (arr) {
	let node, next;

	for (let i = arr.length - 1; i >= 0; i--) {
		next = node;
		node = {
			data: arr[i],
			next: next
		};
	}

	return node;
}

// function Node (data, next) {
// 	this.data = data;
// 	this.next = next;
// }

function List (listArr=[]) {
	this.length = listArr.length;
	this.firstNode = makeList(listArr);
}

List.prototype = {
	constructor: List,

	toArray: function () {
		let arr = [];
		let node = this.firstNode;

		while (node) {
			arr.push(node.data);
			node = node.next;
		}
		return arr;
	},

	valueAt: function (index) {
		// if (index > this.length - 1 || index < 0) throw 'SinglyList: get(index) out of range';

		let node = this.firstNode;
		for (let i = 0; i < index; i++) { node = node.next; }
		return node.data;
	},

	indexOf: function (data) {
		let node = this.firstNode;
		let i = 0;

		while (node) {
			if (node.data === data) return i;
			node = node.next;
			i++;
		}
		return -1;
	},

	insert: function (data, index=this.length) {
		// if (index > this.length || index < 0) throw 'SinglyList: insert(index) out of range';

		if (index === 0) {
			this.firstNode = {
				data: data, 
				next: this.firstNode
			};

		} else {
			let node = this.firstNode;
			for (let i = 0; i < index - 1; i++) { node = node.next; }
			
			node.next = {
				data: data, 
				next: node.next
			};
		}

		this.length++;
	},

	delete: function (index) {
		// if (index > this.length - 1 || index < 0) throw 'SinglyList: delete(index) out of range';

		if (index === 0) {
			this.firstNode = this.firstNode.next;
			
		} else {
			let node = this.firstNode;
			for (let i = 0; i < index - 1; i++) { node = node.next; }
			
			let deletedNode = node.next;
			node.next = node.next.next;
			deletedNode = null;
		}

		this.length--;
	}
}

Array.prototype.withValue = function withValue (data, index=this.length) {
	return [].concat(this.slice(0, index), data, this.slice(index));
}

Array.prototype.insert = function insert (data, index=this.length) {
	for (var i = this.length; i > index; i--) { this[i] = this[i-1]; }
	this[i] = data;
}

const runs = 50000;

let startTime;
let diff = [];

// let arr = [];
// for (let i = 0; i < runs; i++) {
// 	arr.push(i);
// }
// let list = new List(arr);

startTime = process.hrtime();
diff = process.hrtime(startTime);

// startTime = process.hrtime();
// for (let i = 0; i < runs; i++) {
// 	let rand = Math.floor(Math.random() * list.length);
// 	list.insert(i, rand);
// }
// diff = process.hrtime(startTime);
// console.log(diff);

startTime = process.hrtime();
diff = process.hrtime(startTime);

// startTime = process.hrtime();
// for (let i = 0; i < runs; i++) {
// 	let rand = Math.floor(Math.random() * arr.length);
// 	arr.insert(i, rand);
// }
// diff = process.hrtime(startTime);
// console.log(diff);

// let arr = [];
let list = new List([0]);

startTime = process.hrtime();
diff = process.hrtime(startTime);

// startTime = process.hrtime();
// for (let i = 0; i < runs; i++) {
// 	let rand = Math.floor(Math.random() * arr.length);
// 	arr.insert(i, rand);
// }
// diff = process.hrtime(startTime);
// console.log(diff);

startTime = process.hrtime();
diff = process.hrtime(startTime);

startTime = process.hrtime();
for (let i = 0; i < runs; i++) {
	let rand = Math.floor(Math.random() * list.length);
	list.insert(i, rand);
}
diff = process.hrtime(startTime);
console.log(diff);