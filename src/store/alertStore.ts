import { action, makeObservable, observable } from "mobx";


export enum messageStatus {
	init,
	progress,
	succsess,
	error,
}


export class AlertStore {
	status: messageStatus = messageStatus.init;
	message: string;
	timeout;

	constructor() {
		makeObservable(this, {
			status: observable,
			message: observable,
			reset: action.bound,
			setProgress: action.bound,
			setSuccessMessage: action.bound,
			setErrorMessage: action.bound,
		});
	}

	reset() {
		clearTimeout(this.timeout);
		this.status = messageStatus.init;
	}
	setProgress() {
		clearTimeout(this.timeout);
		this.status = messageStatus.progress;
	}
	setSuccessMessage(message: string) {
		this.message = message;
		this.status = messageStatus.succsess;
		this.timeout = setTimeout(() => this.reset(), 3000);
	}
	setErrorMessage(message: string) {
		this.message = message;
		this.status = messageStatus.error;
		this.timeout = setTimeout(() => this.reset(), 3000);
	}
}
