import React, { useEffect } from 'react';
import { NewsTitle, TitleSizes } from '@pages/news/NewsPage.styled';

export const StudyingPageLevel = ({ title, videoIdList }: { title: string; videoIdList: string[] }) => {
  return (
    <>
      <NewsTitle size={TitleSizes.lg}>{title}</NewsTitle>
      {videoIdList.map((id) => (
        <iframe
          key={id + 'iframe'}
          src={`https://player.vimeo.com/video/${id}`}
          style={{ width: '100%', aspectRatio: '16 / 9', marginBottom: '30px' }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      ))}
    </>
  );
};
