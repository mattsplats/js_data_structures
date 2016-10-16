function makeNode (arr) {
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

function Node (arr, i, next) {
	this.data = arr[i];
	i++;
	this.next = i < arr.length ? new Node(arr, i) : next;
}

function List (listArr=[]) {
	this.length = listArr.length;
	this.firstNode = makeNode(listArr);
	// this.firstNode = listArr.length > 0 ? new Node(listArr, 0, undefined) : undefined;
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
			this.firstNode = new Node([data], 0, this.firstNode);
		} else {
			let node = this.firstNode;
			for (let i = 0; i < index - 1; i++) { node = node.next; }
			
			node.next = new Node([data], 0, node.next);
		}

		this.length++;
	},

	delete: function (index=(this.length - 1)) {
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

let startTime;
let diff = [];

// startTime = process.hrtime();

// let arr = [];
// for (let i = 0; i < 100; i++) {
// 	arr.push(i);
// }

// diff = process.hrtime(startTime);
// console.log(diff);

const runs = 10000;
const arr = [0,1,2,3,4,5,6,7,8,9,10];

let testArr = [];

for (let i = 0; i < runs; i++) {
	startTime = process.hrtime();

	testArr.push(arr);
	testArr.push(arr);
	testArr.push(arr);
	testArr.push(arr);
	testArr.push(arr);

	// list1 = new List(arr);
	// list2 = new List(arr);
	// list3 = new List(arr);
	// list4 = new List(arr);
	// list5 = new List(arr);

	diff[i] = process.hrtime(startTime);
}

// console.log(diff);
console.log(diff.map(a => a[1]).reduce((a,b) => b > 10000 ? a : a+b) / runs);

// for (let i = 0; i < 100; i++) {
// 	list.insert(i);
// }

// 