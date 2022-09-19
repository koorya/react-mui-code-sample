import { action, makeObservable, observable } from "mobx";


export class AudioPlayer {
	playing: boolean;
	audio: HTMLAudioElement;

	constructor(url: string) {
		makeObservable(this, {
			playing: observable,
			toggle: action.bound,
		});
		this.audio = new Audio(url);


		this.audio.addEventListener('ended', () => this.playing = false);

	}
	toggle() {
		this.playing = !this.playing;
		this.playing ? this.audio.play() : this.audio.pause();
	}

};
