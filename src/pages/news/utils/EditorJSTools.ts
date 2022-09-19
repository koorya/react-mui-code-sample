import Header from '@editorjs/header';
import Image from '@editorjs/image';
import Embed from '@editorjs/embed';
import List from '@editorjs/list';

import { uploadImageStarlightServer } from '../editor/uploadImageStarlightServer';


export const EditorJSTools = {
	header: Header,
	embed: {
		class: Embed,
		config: {
			services: {
				vimeo: {
					// https://vimeo.com/manage/videos/646147291
					// https://player.vimeo.com/video/646147291?title=0&byline=0
					regex: /https?:\/\/vimeo.com(?:\/manage\/videos)?\/([^\/\?\&]*)(?:\?.+)?/,
					embedUrl: 'https://player.vimeo.com/video/<%= remote_id %>?',
					html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' ></iframe>",
					// height: 300,
					// width: 600,
					// id: (groups) => groups.join('/embed/')
				},
			},
		},
	},
	image: {
		class: Image,
		config: {
			// endpoints: { byFile: '' },
			uploader: {
				uploadByFile(file: File) {
					return uploadImageStarlightServer(file);
				},
			},
		},
	},
	list: List,
}