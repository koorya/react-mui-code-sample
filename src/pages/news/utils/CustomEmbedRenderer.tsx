import React from 'react';
import { EmbedOutput } from 'editorjs-react-renderer';

const CustomEmbedRenderer = (props) => {
  if (props.data.service === 'vimeo')
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `<iframe src="${props.data.embed}" 

          style="width: 100%; aspect-ratio: 16 / 9; margin-bottom: 30px;"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen></iframe>`,
        }}
      />
    );
  else return EmbedOutput({ ...props });
};
export const renderers = {
  embed: CustomEmbedRenderer,
};
