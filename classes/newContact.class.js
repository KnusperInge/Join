class newContact {
	name;
	surname;
	icon;
	addedTasks;
	email;
	number;

	constructor(inputs) {
		this.name = inputs.children[0].value.split(" ").slice(0, 1);
		this.surname = inputs.children[0].value.split(" ").slice(1);
		// this.icon =
		// this.addedTasks =
		this.email = inputs.children[2].value;
		this.number = inputs.children[1].value;
	}
}
