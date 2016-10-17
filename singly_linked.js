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

function List (listArr=[]) {
	this.length = listArr.length;
	this.head = makeList(listArr);
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
		// if (index > this.length - 1 || index < 0) throw 'SinglyList: get(index) out of range';

		let node = this.head;
		for (let i = 0; i < index; i++) { node = node.next; }
		return node;
	},

	indexOf: function (data) {
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

		if (index === 0) {
			this.head = {
				data: data, 
				next: this.head
			};

		} else {
			let node = this.head;
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

const runs = 10000;

let startTime;
let diff = [];

// let arr = [];
// for (let i = 0; i < runs * 2; i++) {
// 	arr.push(i);
// }
let list = new List();

console.log(`\n${runs} list insertions`)
console.log(list.length);

startTime = process.hrtime();
diff = process.hrtime(startTime);

startTime = process.hrtime();
for (let i = 0; i < runs; i++) {
	let rand = Math.floor(Math.random() * list.length);
	list.insert(i, rand);
}
diff = process.hrtime(startTime);
console.log(list.length);
console.log(diff);

// startTime = process.hrtime();
// for (let i = 0; i < runs; i++) {
// 	let rand = Math.floor(Math.random() * arr.length);
// 	arr.splice(rand, 1);
// }
// diff = process.hrtime(startTime);
// console.log(diff);
// console.log(arr.length);