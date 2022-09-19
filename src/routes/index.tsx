import { NewsEditorPage } from '@pages/news/editor/NewsEditorPage';
import { RegistrationSuccessPage } from '@pages/auth/registration_success';
import { ResetPasswordPage } from '@pages/auth/reset_password';
import { MainLayout } from '@pages/MainLayout/MainLayout';
import { NewsListPage } from '@pages/news/NewsListPage';
import { NewsPage } from '@pages/news/NewsPage';
import { ProfilePage } from '@pages/profile/ProfilePage';
import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthRoute, EditorRoute, QualificatedRoute } from './AuthRoute';
import { Path } from './path';
import { AutobonusPage } from '@pages/autobonus/AutobonusPage';
import { StudyingPage } from '@pages/studying/StudyingPage';
import { StudyingPageLevel } from '@pages/studying/StudyingPageLevel';
import { CalendarPanel } from '@pages/calendar/CalendarPanel';
import { RespectPanel } from '@pages/respect/RespectPanel';
import { CalendarEditor } from '@pages/calendar/editor/CalendarEditor';
import { RespectEditor } from '@pages/respect/editor/RespectEditor';

export const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path={Path.news} element={<AuthRoute />}>
          <Route path="" element={<NewsListPage title={'Новости'} path={Path.news} />} />
          <Route path=":newsId" element={<NewsPage />} />
        </Route>
        <Route path={Path.autobonus} element={<Outlet />}>
          <Route
            path=""
            element={<NewsListPage title={'Автобонус'} path={Path.autobonus} categoryOnly={'автобонус'} />}
          />
          <Route path=":newsId" element={<AutobonusPage />} />
        </Route>

        <Route path={Path.studying} element={<AuthRoute />}>
          <Route path="" element={<StudyingPage />}>
            <Route
              path={Path.level1}
              element={
                <StudyingPageLevel
                  title={'До Активации'}
                  videoIdList={['642256072', '642271699', '639688184', '639689019', '639689857', '642271115']}
                />
              }
            />
            <Route path={Path.level2} element={<QualificatedRoute step="active" />}>
              <Route
                path={''}
                element={<StudyingPageLevel title={'Активным партнерам'} videoIdList={['642264827', '642250346']} />}
              />
            </Route>
            <Route path={Path.level3} element={<QualificatedRoute step="s" />}>
              <Route
                path={''}
                element={<StudyingPageLevel title={'Квалифицированным S1 и выше'} videoIdList={['639667128']} />}
              />
            </Route>
            <Route path={Path.level4} element={<QualificatedRoute step="l" />}>
              <Route path={''} element={<StudyingPageLevel title={'Квалифицированным L и выше'} videoIdList={[]} />} />
            </Route>
          </Route>
        </Route>
        <Route path={Path.calendar} element={<AuthRoute />}>
          <Route path="" element={<CalendarPanel isMobile />} />
        </Route>
        <Route path={Path.respect} element={<AuthRoute />}>
          <Route path="" element={<RespectPanel />} />
        </Route>

        <Route path={Path.editor} element={<EditorRoute />}>
          <Route path={Path.news} element={<Outlet />}>
            <Route path=":newsId" element={<NewsEditorPage />} />
            <Route path="" element={<NewsEditorPage />} />
          </Route>
          <Route path={Path.calendar} element={<Outlet />}>
            <Route path="" element={<CalendarEditor />} />
          </Route>
          <Route path={Path.respect} element={<Outlet />}>
            <Route path="" element={<RespectEditor />} />
          </Route>
        </Route>

        <Route path={Path.profile} element={<AuthRoute />}>
          <Route path="" element={<ProfilePage />} />
        </Route>

        <Route path="" element={<Navigate to={`/${Path.default}`} />} />

        <Route path="*" element={<>404</>} />
      </Route>
      <Route path={Path.reset_password} element={<ResetPasswordPage />} />
      <Route path={Path.registration_success} element={<RegistrationSuccessPage />} />
    </Routes>
  );
};
