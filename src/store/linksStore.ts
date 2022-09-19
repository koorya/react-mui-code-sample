import { action, makeObservable, observable, reaction } from "mobx";
import { LinkItem } from "store/LinkItem";
import { Path } from "routes/path";
import { UtilsStore } from "./utilsStore";


const learningLinks = [
	{ path: Path.level1, label: 'До активации', isAllowed: ({ userRegalia: { lo, qualification } }: UtilsStore) => true },
	{ path: Path.level2, label: 'Активным партнёрам ', isAllowed: ({ userRegalia: { lo, qualification } }: UtilsStore) => lo > 50 },
	{
		path: Path.level3,
		label: 'Квалифицированным S1 и выше',
		isAllowed: ({ userRegalia: { lo, qualification } }: UtilsStore) => qualification?.match(/^(s|l|m|g).*/),
	},
	{
		path: Path.level4,
		label: 'Квалифицированным L и выше ',
		isAllowed: ({ userRegalia: { lo, qualification } }: UtilsStore) => qualification?.match(/^(l|m|g).*/),
	},
];

const editorLinks = [
	{ path: Path.news, label: 'Новости', isAllowed: ({ userStore: { canEdit } }: UtilsStore) => canEdit },
	{ path: Path.calendar, label: 'Календарь', isAllowed: ({ userStore: { canEdit } }: UtilsStore) => canEdit },
	{ path: Path.respect, label: 'Признание', isAllowed: ({ userStore: { canEdit } }: UtilsStore) => canEdit },
];

export class LinksStore {
	count: number = 0;
	learningLinks: LinkItem[];
	editorLinks: LinkItem[];
	utilsStore: UtilsStore;
	constructor(utilsStore: UtilsStore) {
		makeObservable(this, {
			learningLinks: observable,
			editorLinks: observable,
			updateLinks: action.bound,
		});
		this.utilsStore = utilsStore;
		reaction(() => this.utilsStore.userRegalia, () => this.updateLinks());
		reaction(() => this.utilsStore.userStore.userData, () => this.updateLinks());
	}

	updateLinks() {
		this.editorLinks = editorLinks.filter(({ isAllowed }) => isAllowed(this.utilsStore)).map(({ isAllowed, ...rest }) => rest);
		this.learningLinks = learningLinks.filter(({ isAllowed }) => isAllowed(this.utilsStore)).map(({ isAllowed, ...rest }) => rest);
	}
}
