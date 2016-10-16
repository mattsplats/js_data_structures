function Node (arr, i, next) {
	this.data = arr[i];
	i++;
	this.next = i < arr.length ? new Node(arr, i) : next;
}

function List (listArr=[]) {
	this.length = listArr.length;
	this.firstNode = listArr.length > 0 ? new Node(listArr, 0, undefined) : undefined;
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
		if (index > this.length - 1 || index < 0) throw 'SinglyList: get(index) out of range';

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
		if (index > this.length || index < 0) throw 'SinglyList: insert(index) out of range';

		if (index === 0) {
			this.firstNode = new Node([data], 0, this.firstNode);
		} else {
			let node = this.firstNode;
			for (let i = 0; i < index - 1; i++) { node = node.next; }
			
			node.next = new Node([data], 0, node.next);
		}

		this.length++;
	},

	delete: function (index=(this.length - 1)) {
		if (index > this.length - 1 || index < 0) throw 'SinglyList: delete(index) out of range';

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

const startTime = process.hrtime();

let list = new List();

for (let i = 0; i < 10; i++) {
	list.insert(i, i);
}

// console.log(list.length);
// console.log(list.toArray());
// console.log('');

// list.insert(0);
// console.log(list.length);
// console.log(list.toArray());
// console.log('');

// list.insert(1);
// console.log(list.length);
// console.log(list.toArray());
// console.log('');

// list.insert(2, 1);
// console.log(list.length);
// console.log(list.toArray());
// console.log('');

// console.log(list.indexOf(5));

const diff = process.hrtime(startTime);

console.log(diff);

console.log('');
console.log(list.length);
console.log(list.toArray());
console.log('');