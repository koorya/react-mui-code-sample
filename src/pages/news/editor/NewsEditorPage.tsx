import React, { useCallback, useEffect, useRef, useState } from 'react';

import ReactEditorJS from '@react-editor-js/client';
import { HeaderBackgroundImage, NewsContentStyled, NewsTitle, Paper, TitleSizes } from '@pages/news/NewsPage.styled';
import { Container } from '@pages/MainLayout/MainLayout.styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { uploadImageStarlightServer } from './uploadImageStarlightServer';
import { EditorJSTools } from '../utils/EditorJSTools';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';
import { CategoryTooltip } from './CategoryTooltip';
import { Category, News } from 'store/api/__generated__';
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from './hooks/useCategories';
import { Path } from 'routes/path';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

export const NewsEditorPage = observer(() => {
  const {
    ApiStore,
    AlertStore: { reset, setProgress, setErrorMessage },
  } = useStores();
  const categoryList = useCategories();

  const editorRef = useRef(null);

  const [contentLoaded, setConsentLoaded] = useState<{ blocks?: [] }>({});
  const [editorInitialized, setEditorInitialized] = useState(false);

  useEffect(() => {
    const a = async () => {
      if (contentLoaded?.blocks && editorInitialized) {
        console.log('contentLoaded: ', contentLoaded);
        console.log('editorInitialized: ', editorInitialized);
        const timedOutRender = () => {
          try {
            console.log('timedOutRender');
            editorRef.current._editorJS.render(contentLoaded);
          } catch (e) {
            setTimeout(timedOutRender, 100);
          }
        };
        timedOutRender();
      }
    };
    a();
  }, [contentLoaded, editorInitialized]);
  const handleInitialize = useCallback((instance) => {
    editorRef.current = instance;
    setEditorInitialized(true);
  }, []);

  const [news, setNews] = useState<News>({
    image_path: null,
    name: 'заголовок',
    content: {},
    category: null,
    created: moment().format('YYYY-MM-DDTHH:mmZ'),
  });
  const setCurrentCategroy = (category: Category) => {
    setNews({ ...news, category });
  };

  const { newsId } = useParams();
  useEffect(() => {
    if (!newsId) return;
    console.log('newsId: ', newsId);
    ApiStore.api.news.newsRead(newsId).then(async ({ data }) => {
      setNews(data);
      setConsentLoaded({ ...data.content });
    });
  }, [newsId]);

  useEffect(() => {
    if (!newsId) {
      console.log('category setted', categoryList[0]);

      setCurrentCategroy(categoryList[0]);
    }
  }, [categoryList]);

  const bgImageInput = useRef(null);
  const bgImageClickHandler = () => {
    bgImageInput.current.click();
  };

  const headerChangeHandler = ({ currentTarget }) => {
    console.log('headerChangeHandler');
    const prepared_title = currentTarget.innerText.replace(/\s+/g, ' ').trim();
    currentTarget.innerText = prepared_title;
    const new_news = {
      ...news,
      name: prepared_title,
    };
    setNews(new_news);
    console.log(new_news);
    console.log(prepared_title);
  };
  const editableTitle = useRef(null);

  const saveHandler = async () => {
    setProgress();
    const created_news = { ...news, content: await editorRef.current.save() };
    console.log(created_news);

    const generateTitle = ({ blocks }: { blocks: { type: string; data: { text: string } }[] }) => {
      const firs_paragraph = blocks.find((block) => block.type === 'paragraph');
      if (!firs_paragraph) return null;
      const html_reducer = window.document.createElement('div');
      html_reducer.innerHTML = firs_paragraph.data.text;
      const title = html_reducer.innerText.match(/(\S*\s){15}/);
      html_reducer.remove();
      if (title) return title[0];
      return firs_paragraph.data.text;
    };

    if (news.category.name === 'автобонус') {
      const blocks: { data: { source: string }; type: string }[] = created_news.content.blocks;
      const vimeo_url = blocks.find(({ type }) => type === 'embed')?.data.source;
      if (!vimeo_url) {
        setErrorMessage('Для категории автобонус в новости должно быть хотябы одно видео vimeo');
        return;
      }
      const video_id = vimeo_url.match(/\/(\d+)/)[1];
      console.log(video_id);
      if (!created_news.image_path) {
        const api_url = `https://vimeo.com/api/v2/video/${video_id}.json`;
        const response: { thumbnail_large: string }[] = await (await fetch(api_url)).json();
        const { success, file } = await uploadImageStarlightServer(response[0].thumbnail_large);
        if (!success) {
          setErrorMessage('Не получилось загрузить превью');
          return;
        }
        created_news.image_path = file.url;
      }
    }
    try {
      if (!newsId) {
        await ApiStore.api.editor.editorNewsCreate({
          name: created_news.name,
          category: news.category.pk,
          image_path: created_news.image_path,
          description: generateTitle(created_news.content),
          content: created_news.content,
          created: created_news.created,
        });
      } else {
        await ApiStore.api.editor.editorNewsUpdate(newsId, {
          name: created_news.name,
          category: news.category.pk,
          image_path: created_news.image_path,
          description: generateTitle(created_news.content),
          content: created_news.content,
          created: created_news.created,
        });
      }
      setNews(created_news);

      navigate('/' + Path.news);
      reset();
    } catch (e) {
      setErrorMessage(e.response.data.detail);
    }
  };

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const navigate = useNavigate();
  const deleteHandler = async (certain: boolean = false) => {
    if (certain) {
      if (newsId) await ApiStore.api.editor.editorNewsDelete(newsId);
      setNews({
        image_path: null,
        name: 'заголовок',
        content: {},
        category: categoryList[0],
      });
      setConsentLoaded({});
      editorRef.current._editorJS.clear();

      navigate('/' + Path.editor + '/' + Path.news);
      setRemoveDialogOpen(false);
    } else {
      setRemoveDialogOpen(true);
    }
  };

  const setBackgroundImage = async (data: File) => {
    const uploaded = await uploadImageStarlightServer(data);
    setNews({ ...news, image_path: uploaded.file.url });
  };
  const fileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files[0];
    setBackgroundImage(file);
  };
  const pasteImageHandler = async (e) => {
    setProgress();
    try {
      const transfer = e.clipboardData || e.dataTransfer;
      console.log(transfer.items[0]);
      const file = transfer.items[0].getAsFile();
      if (file) {
        await setBackgroundImage(file);
        reset();
      } else {
        setErrorMessage('Вставьте изображение');
      }
    } catch (e) {
      setErrorMessage('Ошибка при загрузке изображения');
      console.log(e);
    }
    editableTitle.current.focus();
  };

  return (
    <div style={{ alignSelf: 'center' }}>
      <input type="file" ref={bgImageInput} hidden accept="image/*" onChange={fileSelected} />
      <Stack>
        <IconButton
          color="error"
          sx={{ position: 'absolute', alignSelf: 'end' }}
          onClick={() => setNews({ ...news, image_path: null })}
        >
          <HighlightOffIcon fontSize="large" />
        </IconButton>
        <HeaderBackgroundImage
          imageUrl={news.image_path}
          onDoubleClick={bgImageClickHandler}
          tabIndex={-1}
          onPaste={pasteImageHandler}
          editable
        />
      </Stack>
      <Container>
        <NewsContentStyled>
          <Paper>
            <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
              <CategoryTooltip
                currentCategroy={news.category}
                setCurrentCategroy={setCurrentCategroy}
                categoryList={categoryList}
              />
              <Stack direction="row">
                <DatePicker
                  InputProps={{ size: 'small', sx: { minWidth: '150px', width: '150px' } }}
                  label="Дата публикации"
                  value={news.created}
                  onChange={(e) => setNews({ ...news, created: moment(e).format('YYYY-MM-DDTHH:mmZ') })}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Button onClick={saveHandler} startIcon={<SaveIcon />}>
                  Сохранить
                </Button>
                <Button onClick={() => deleteHandler()} startIcon={<DeleteOutlineIcon />}>
                  Удалить
                </Button>
              </Stack>
            </Stack>
            <NewsTitle
              ref={editableTitle}
              contentEditable
              suppressContentEditableWarning
              onBlur={headerChangeHandler}
              size={TitleSizes.lg}
            >
              {news.name}
            </NewsTitle>
            <ReactEditorJS onInitialize={handleInitialize} tools={EditorJSTools} />
          </Paper>
        </NewsContentStyled>
      </Container>
      <Dialog open={removeDialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Подвердите удаление новости'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите безвозватно удалить новость?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveDialogOpen(false)}>Отмена</Button>
          <Button onClick={() => deleteHandler(true)} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
