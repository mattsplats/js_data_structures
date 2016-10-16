function List (listArr=[]) {
	let tail;

	this.length = listArr.length;
	this.head = new Node(listArr);
	this.tail = tail;

	function Node (listArr, i=0, prev=null, next=null) {
		this.data = listArr[i];
		this.prev = prev;
		if (i === listArr.length - 1) {
			this.next = next;
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

	valueAt: function (index) {
		// if (index > this.length - 1 || index < 0) throw 'SinglyList: get(index) out of range';
		let node;

		if (index < this.length / 2) {
			node = this.head;
			for (let i = 0; i < index; i++) { node = node.next; }

		} else {
			node = this.tail;
			for (let i = this.length - 1; i > index; i--) { node = node.prev }
		}

		return node.data;
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
		// if (index > this.length || index < 0) throw 'SinglyList: insert(index) out of range';

		if (index === this.length) {
			this.tail = {
				data: data,
				next: null,
				prev: this.tail
			};

		} else if (index === 0) {
			this.head = {
				data: data, 
				next: this.head,
				prev: null
			};

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
			let nodeBefore = node.prev;

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
	return [].concat(this.slice(0, index), data, this.slice(index));
}

Array.prototype.insert = function insert (data, index=this.length) {
	for (var i = this.length; i > index; i--) { this[i] = this[i-1]; }
	this[i] = data;
}

let list = new List([0,1,2,3,4,5,6,7,8,9,10]);
console.log(list.toArray());

// for (let i = 0; i < list.length; i++) {
// 	console.log(list.valueAt(i));
// }

// list.insert('X', 3);
// console.log(list.toArray());

list.insert('Y', 8);
console.log(list.toArray());
console.log(list.tail.prev.prev);
