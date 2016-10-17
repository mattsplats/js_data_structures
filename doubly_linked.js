// function makeList (arr) {
// 	let node, prev, next;

// 	for (let i = arr.length - 1; i >= 0; i--) {
// 		next = node;
// 		node = {
// 			data: arr[i],
// 			next: next
// 		};
// 	}

// 	node.prev = 
// 	return node;
// }

function List (listArr=[]) {
	let tail;

	this.length = listArr.length;
	this.head = listArr.length > 0 ? new Node(listArr) : undefined;
	this.tail = tail;

	function Node (listArr, i=0, prev=null) {
		this.data = listArr[i];
		this.prev = prev;
		if (i >= listArr.length - 1) {
			this.next = null;
			tail = this;

		} else {
			this.next = new Node(listArr, i + 1, this);
		}
	}
}

List.prototype = {
	constructor: List,

	toArray: function () {
		let arr = [];
		let node = this.head;

		while (node) {
			arr.push(node.data);
			node = node.next;
		}
		return arr;
	},

	nodeAt: function (index) {
		let node;

		if (index < this.length / 2) {
			node = this.head;
			for (let i = 0; i < index; i++) { node = node.next; }

		} else {
			node = this.tail;
			for (let i = this.length - 1; i > index; i--) { node = node.prev }
		}

		return node;
	},

	indexOf: function (data) {
		if (this.tail.data === data) return this.length - 1;

		let node = this.head;
		let i = 0;

		while (node) {
			if (node.data === data) return i;
			node = node.next;
			i++;
		}
		return -1;
	},

	insert: function (data, index=this.length) {
		// console.log(`\n${index} ${this.length}`);

		if (this.length === 0) {
			this.head = this.tail = {
				data: data,
				next: null,
				prev: null
			}

		} else if (index === 0) {
			this.head = {
				data: data, 
				next: this.head,
				prev: null
			};
			this.head.next.prev = this.head;
			
		} else if (index === this.length) {
			this.tail = {
				data: data,
				next: null,
				prev: this.tail
			};
			this.tail.prev.next = this.tail;

			// if (this.length === 1) this.head.next = this.tail;

		} else if (index < this.length / 2) {
			let node = this.head;
			let nodeAfter = node.next;

			for (let i = 0; i < index - 1; i++) {
				node = node.next;
				nodeAfter = nodeAfter.next;
			}
			
			node.next = nodeAfter.prev = {
				data: data, 
				next: node.next,
				prev: node
			};

		} else {
			let node = this.tail;
			// console.log(`\nnode:`)
			// console.log(node);
			let nodeBefore = node.prev;
			// console.log(`\nnodeBefore:`)
			// console.log(nodeBefore);

			for (let i = this.length - 1; i > index + 1; i--) {
				node = node.prev;
				nodeBefore = nodeBefore.prev;
			}

			node.prev = nodeBefore.next = {
				data: data, 
				next: node,
				prev: node.prev
			};
		}

		this.length++;
	},

	delete: function (index) {
		let deletedNode;

		if (index === this.length - 1) {
			deletedNode = this.tail;
			this.tail = this.tail.prev;
			this.tail.next = null;

		} else if (index === 0) {
			deletedNode = this.head;
			this.head = this.head.next;
			this.head.prev = null;

		} else if (index < this.length / 2) {
			let node = this.head;
			let nodeAfter = node.next;

			for (let i = 0; i < index - 1; i++) { node = node.next; }
			
			deletedNode = node.next;
			node.next.next.prev = node;
			node.next = node.next.next;

		} else {
			let node = this.tail;
			let nodeBefore = node.prev;

			for (let i = this.length - 1; i > index + 1; i--) { node = node.prev; }

			deletedNode = node.prev;
			node.prev.prev.next = node;
			node.prev = node.prev.prev;
		}
		
		deletedNode = null;
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

// let list = new List([0,1,2,3,4,5,6,7,8,9,10]);
// console.log(list.toArray());

// for (let i = 0; i < list.length; i++) {
// 	console.log(list.nodeAt(i).data);
// }

// list.insert('X', 3);
// console.log(list.toArray());

const runs = 100000;

let startTime;
let diff = [];

let arr = [];
for (let i = 0; i < runs; i++) {
	arr.push(i);
}
let list = new List();

console.log(`\n${runs} list insertions`)
console.log(list.length);

startTime = process.hrtime();
diff = process.hrtime(startTime);

startTime = process.hrtime();
for (let i = 0; i < runs; i++) {
	let rand = Math.floor(Math.random() * (list.length + 1));
	list.insert(i, rand);
}
diff = process.hrtime(startTime);
console.log(list.length);
console.log(diff);
// console.log(list.toArray());
// console.log(list.head);
// console.log(list.tail);