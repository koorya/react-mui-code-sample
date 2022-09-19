import { API_BASE_URL } from 'common/const';
import { stores } from 'store';

export const uploadImageStarlightServer = async (file: File | string) => {
  if (file instanceof File) return await uploadImageFileStarlightServer(file);
  const fileUrl: string = file;
  const ulpoadedFile = new File([await (await fetch(fileUrl)).blob()], 'image.png');
  console.log(ulpoadedFile);
  return await uploadImageFileStarlightServer(ulpoadedFile);
};

const uploadImageFileStarlightServer = async (file: File) => {
  const {
    ApiStore: { api },
  } = stores;

  var formData = new FormData();
  formData.append('cover', file);
  const res = (await api.media.mediaCreate({ cover: file as File })).data;
  return { success: 1, file: { url: API_BASE_URL + '/media/' + res.title } };
};
