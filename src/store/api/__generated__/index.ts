/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Group {
  /** ID */
  id?: number;

  /** Name */
  name: string;
}

export interface User {
  /**
   * Registration date
   * @format date-time
   */
  registration_date?: string | null;

  /** Location */
  location?: string | null;

  /**
   * Email address
   * @format email
   */
  email?: string;

  /** Phone */
  phone?: string | null;

  /** Avatar */
  avatar?: number | null;
  groups: Group[];

  /** ID */
  id?: number;

  /**
   * Last login
   * @format date-time
   */
  last_login?: string | null;

  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @pattern ^[\w.@+-]+$
   */
  username: string;

  /** First name */
  first_name: string;

  /** Last name */
  last_name: string;

  /** Parent */
  parent?: number | null;

  /** Status */
  status?: number | null;

  /** Degree */
  degree?: number | null;

  /** Pv */
  pv: number;

  /** Team pv */
  team_pv: number;

  /** Coin */
  coin: number;
  steps: number[];
}

export interface NewPassword {
  /** Password */
  password: string;

  /** Repeat password */
  repeat_password: string;
}

export interface Error4XX {
  /** Detail */
  detail: string;
}

export interface RegistrationForm {
  /** Username */
  username: string;

  /**
   * Email
   * @format email
   */
  email: string;

  /** Password */
  password: string;

  /** Repeat password */
  repeat_password: string;
}

export interface RegistrationResponse {
  /**
   * Email
   * @format email
   */
  email: string;
}

export interface ResetNewPassword {
  /** Code */
  code: string;

  /** Password */
  password: string;

  /** Repeat password */
  repeat_password: string;
}

export interface ResetPassword {
  /** Username */
  username?: string;

  /**
   * Email
   * @format email
   */
  email?: string;
}

export interface TokenObtainPair {
  /** Username */
  username: string;

  /** Password */
  password: string;
}

export interface TokenObtainPairResponse {
  /** Access */
  access: string;

  /** Refresh */
  refresh: string;
}

export interface TokenRefresh {
  /** Refresh */
  refresh: string;

  /** Access */
  access?: string;
}

export interface Avatar {
  /** Base64 image */
  base64_image: string;
}

export interface RatingResponse {
  rating: User[];
  user: User;

  /** User rank */
  user_rank: number;
}

export interface EventResponse {
  /** Step */
  step?: number;

  /** Status */
  status?: number;

  /** ID */
  id?: number;

  /** Type */
  type: 'registration' | 'step' | 'status' | 'crew_ready' | 'crew_not_ready';

  /** Is active */
  is_active: boolean;

  /** Is shown */
  is_shown: boolean;
  user: User;

  /**
   * Created
   * @format date-time
   */
  created?: string;
}

export interface CalendarEventType {
  /** Name */
  name: string;

  /** Backgroundcss */
  backgroundcss: string;

  /** ID */
  pk?: number;
}

export interface CalendarEvent {
  /** Name */
  name: string;

  /**
   * Start date
   * @format date-time
   */
  start_date: string;

  /**
   * Created
   * @format date-time
   */
  created?: string;

  /**
   * Duration hours
   * @min -2147483648
   * @max 2147483647
   */
  duration_hours: number;
  type: CalendarEventType;

  /** Address */
  address?: string | null;

  /** Description */
  description?: string | null;

  /** ID */
  pk?: number;
}

export interface CalendarEventEdit {
  /** ID */
  id?: number;

  /** Name */
  name: string;

  /** Description */
  description?: string | null;

  /** Address */
  address?: string | null;

  /**
   * Start date
   * @format date-time
   */
  start_date: string;

  /**
   * Duration hours
   * @min -2147483648
   * @max 2147483647
   */
  duration_hours?: number;

  /**
   * Created
   * @format date-time
   */
  created?: string;

  /** Type */
  type: number;
}

export interface NewsEdit {
  /** ID */
  id?: number;

  /** Name */
  name: string;

  /** Description */
  description?: string | null;

  /** Image path */
  image_path: string;

  /**
   * Created
   * @format date-time
   */
  created?: string;

  /** Content */
  content: object;

  /** Category */
  category?: number | null;
}

export interface Category {
  /** Name */
  name: string;

  /** ID */
  pk?: number;
}

export interface News {
  /** Name */
  name: string;

  /** Description */
  description?: string | null;

  /** Image path */
  image_path: string;

  /** Content */
  content: object;
  category: Category;

  /**
   * Created
   * @format date-time
   */
  created?: string;

  /** ID */
  pk?: number;
}

export interface RespectEdit {
  /** ID */
  id?: number;

  /** Name */
  name: string;

  /** Description */
  description?: string | null;

  /** Video id */
  video_id?: string | null;

  /**
   * Video date
   * @format date-time
   */
  video_date: string;

  /**
   * Created
   * @format date-time
   */
  created?: string;
}

export interface Respect {
  /** Name */
  name: string;

  /** Description */
  description?: string | null;

  /** Video id */
  video_id?: string | null;

  /**
   * Video date
   * @format date-time
   */
  video_date: string;

  /**
   * Created
   * @format date-time
   */
  created?: string;

  /** ID */
  pk?: number;
}

export interface EventPut {
  /** Is active */
  is_active?: boolean;

  /** Is shown */
  is_shown?: boolean;
}

export interface CommonEvent {
  /** ID */
  id?: number;
  user: User;

  /** Type */
  type: 'registration' | 'step' | 'status' | 'crew_ready' | 'crew_not_ready';

  /** Is active */
  is_active?: boolean;

  /** Is shown */
  is_shown?: boolean;

  /**
   * Created
   * @format date-time
   */
  created?: string;

  /**
   * Updated
   * @format date-time
   */
  updated?: string;
}

export interface Instruction {
  /** ID */
  id?: number;

  /** Name */
  name: string;

  /**
   * Url
   * @format uri
   */
  url: string;

  /**
   * Embed url
   * @format uri
   */
  embed_url: string;
}

export interface ImageRetriver {
  /** Title */
  title: string;
}

export interface NewsCompact {
  /** Name */
  name: string;

  /**
   * Created
   * @format date-time
   */
  created?: string;

  /** Description */
  description?: string | null;

  /** Image path */
  image_path: string;
  category: Category;

  /** ID */
  pk?: number;
}

export interface NewsList {
  news: NewsCompact[];

  /** Total */
  total: number;
}

export interface Step {
  /** ID */
  id?: number;

  /** Name */
  name: string;

  /** Key */
  key: string;

  /** Type */
  type: 'step' | 'achievement' | 'rank';

  /** Optional */
  optional: boolean;

  /** Condition description */
  condition_description: string;

  /**
   * Sequence
   * @min -2147483648
   * @max 2147483647
   */
  sequence: number;
}

export interface StepCondition {
  step: Step;

  /** Description */
  description: string;

  /** Type */
  type: 'out_game' | 'out_game_priority' | 'in_game';

  /**
   * Sequence
   * @min -2147483648
   * @max 2147483647
   */
  sequence: number;
}

export interface StepConditionInfo {
  /** ID */
  id?: number;

  /** User */
  user: number;
  step_condition: StepCondition;

  /** Is valid */
  is_valid: boolean;
}

export interface StaticInfo {
  /** Key */
  key: string;

  /** Path */
  path: string;
}

export interface Status {
  /** ID */
  id?: number;

  /** Name */
  name?:
    | 's1'
    | 's2'
    | 's3'
    | 'l'
    | 'l1'
    | 'l2'
    | 'l3'
    | 'm'
    | 'm1'
    | 'm2'
    | 'm3'
    | 'gm'
    | 'gm1'
    | 'gm2'
    | 'gm3'
    | 'gm5'
    | 'gm7'
    | 'gm10'
    | null;

  /**
   * Sequence
   * @min -2147483648
   * @max 2147483647
   */
  sequence: number;
}

export interface StepConditionInfoPut {
  /** Is valid */
  is_valid?: boolean;
}

export interface StepGroup {
  /** ID */
  id?: number;

  /** Key */
  key: string;

  /** Name */
  name: string;
}

export interface SupportMessage {
  /** Subject */
  subject: string;

  /** Body */
  body: string;
}

export interface Message {
  /** Message */
  message: string;
}

export interface Answer {
  /** ID */
  id?: number;

  /** Name */
  name: string;

  /** Is right */
  is_right: boolean;
}

export interface Question {
  /** ID */
  id?: number;

  /** Name */
  name: string;

  /** Type */
  type: 'single' | 'multiple';
  answers: Answer[];
}

export interface Test {
  /** ID */
  id?: number;

  /** Key */
  key: string;
  questions: Question[];
}

export interface TestPutRequest {
  /** User id */
  user_id: string;

  /** Question id */
  question_id: number;
  answer_ids: number[];
}

export interface LoadTestResultsResponse {
  /** Result */
  result: boolean;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'http://192.168.0.7:8000/starlight',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === 'object' && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      requestParams.headers.common = { Accept: '*/*' };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Starlight API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://192.168.0.7:8000/starlight
 * @contact <contact@snippets.local>
 *
 * Starlight description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthRead
     * @request GET:/auth/
     * @secure
     * @response `200` `User`
     */
    authRead: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/auth/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  authorization = {
    /**
     * No description
     *
     * @tags authorization
     * @name AuthorizationNewPasswordUpdate
     * @request PUT:/authorization/new_password/
     * @secure
     * @response `200` `User`
     * @response `400` `Error4XX`
     */
    authorizationNewPasswordUpdate: (data: NewPassword, params: RequestParams = {}) =>
      this.request<User, Error4XX>({
        path: `/authorization/new_password/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags authorization
     * @name AuthorizationRegistrationCreate
     * @request POST:/authorization/registration/
     * @secure
     * @response `200` `RegistrationResponse`
     * @response `400` `Error4XX`
     */
    authorizationRegistrationCreate: (data: RegistrationForm, params: RequestParams = {}) =>
      this.request<RegistrationResponse, Error4XX>({
        path: `/authorization/registration/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags authorization
     * @name AuthorizationResetNewPasswordUpdate
     * @request PUT:/authorization/reset_new_password/
     * @secure
     * @response `200` `User`
     * @response `400` `Error4XX`
     */
    authorizationResetNewPasswordUpdate: (data: ResetNewPassword, params: RequestParams = {}) =>
      this.request<User, Error4XX>({
        path: `/authorization/reset_new_password/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags authorization
     * @name AuthorizationResetPasswordUpdate
     * @request POST:/authorization/reset_password/
     * @secure
     * @response `200` `RegistrationResponse`
     * @response `400` `Error4XX`
     */
    authorizationResetPasswordUpdate: (data: ResetPassword, params: RequestParams = {}) =>
      this.request<RegistrationResponse, Error4XX>({
        path: `/authorization/reset_password/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags authorization
     * @name AuthorizationSubmitRegistrationRead
     * @request GET:/authorization/submit_registration/
     * @secure
     * @response `200` `User`
     */
    authorizationSubmitRegistrationRead: (query?: { code?: string }, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/authorization/submit_registration/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags authorization
     * @name AuthorizationTokenCreate
     * @request POST:/authorization/token/
     * @secure
     * @response `200` `TokenObtainPairResponse`
     * @response `401` `Error4XX`
     */
    authorizationTokenCreate: (data: TokenObtainPair, params: RequestParams = {}) =>
      this.request<TokenObtainPairResponse, Error4XX>({
        path: `/authorization/token/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     *
     * @tags authorization
     * @name AuthorizationTokenRefreshCreate
     * @request POST:/authorization/token/refresh/
     * @secure
     * @response `201` `TokenRefresh`
     */
    authorizationTokenRefreshCreate: (data: TokenRefresh, params: RequestParams = {}) =>
      this.request<TokenRefresh, any>({
        path: `/authorization/token/refresh/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  avatar = {
    /**
     * No description
     *
     * @tags avatar
     * @name AvatarRead
     * @request GET:/avatar/
     * @secure
     * @response `200` `Avatar`
     */
    avatarRead: (params: RequestParams = {}) =>
      this.request<Avatar, any>({
        path: `/avatar/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags avatar
     * @name AvatarUpdate
     * @request PUT:/avatar/
     * @secure
     * @response `200` `Avatar`
     */
    avatarUpdate: (data: { base64_image: string }, params: RequestParams = {}) =>
      this.request<Avatar, any>({
        path: `/avatar/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  bestsellerRating = {
    /**
     * No description
     *
     * @tags bestseller_rating
     * @name BestsellerRatingRead
     * @request GET:/bestseller_rating/
     * @secure
     * @response `200` `RatingResponse`
     */
    bestsellerRatingRead: (params: RequestParams = {}) =>
      this.request<RatingResponse, any>({
        path: `/bestseller_rating/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  bulkEventIsActive = {
    /**
     * No description
     *
     * @tags bulk_event_is_active
     * @name BulkEventIsActiveUpdate
     * @request PUT:/bulk_event_is_active/
     * @secure
     * @response `200` `(EventResponse)[]`
     */
    bulkEventIsActiveUpdate: (params: RequestParams = {}) =>
      this.request<EventResponse[], any>({
        path: `/bulk_event_is_active/`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  bulkEventIsShown = {
    /**
     * No description
     *
     * @tags bulk_event_is_shown
     * @name BulkEventIsShownUpdate
     * @request PUT:/bulk_event_is_shown/
     * @secure
     * @response `200` `(EventResponse)[]`
     */
    bulkEventIsShownUpdate: (params: RequestParams = {}) =>
      this.request<EventResponse[], any>({
        path: `/bulk_event_is_shown/`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  calendarEvents = {
    /**
     * No description
     *
     * @tags calendar_events
     * @name CalendarEventsList
     * @request GET:/calendar_events/
     * @secure
     * @response `200` `(CalendarEvent)[]`
     */
    calendarEventsList: (params: RequestParams = {}) =>
      this.request<CalendarEvent[], any>({
        path: `/calendar_events/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags calendar_events
     * @name CalendarEventsTypesList
     * @request GET:/calendar_events/types/
     * @secure
     * @response `200` `(CalendarEventType)[]`
     */
    calendarEventsTypesList: (params: RequestParams = {}) =>
      this.request<CalendarEventType[], any>({
        path: `/calendar_events/types/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  coinRating = {
    /**
     * No description
     *
     * @tags coin_rating
     * @name CoinRatingRead
     * @request GET:/coin_rating/
     * @secure
     * @response `200` `RatingResponse`
     */
    coinRatingRead: (params: RequestParams = {}) =>
      this.request<RatingResponse, any>({
        path: `/coin_rating/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  editor = {
    /**
     * No description
     *
     * @tags editor
     * @name EditorCalendarEventCreate
     * @request POST:/editor/calendar_event/
     * @secure
     * @response `200` `CalendarEvent`
     */
    editorCalendarEventCreate: (data: CalendarEventEdit, params: RequestParams = {}) =>
      this.request<CalendarEvent, any>({
        path: `/editor/calendar_event/`,
        method: 'POST',
        body: data,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags editor
     * @name EditorCalendarEventUpdate
     * @request PUT:/editor/calendar_event/{event_id}
     * @secure
     * @response `200` `CalendarEvent`
     */
    editorCalendarEventUpdate: (
      eventId: string,
      data: CalendarEventEdit,
      query?: { event_id?: number },
      params: RequestParams = {},
    ) =>
      this.request<CalendarEvent, any>({
        path: `/editor/calendar_event/${eventId}`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags editor
     * @name EditorCalendarEventDelete
     * @request DELETE:/editor/calendar_event/{event_id}
     * @secure
     * @response `204` `void`
     */
    editorCalendarEventDelete: (eventId: string, query?: { event_id?: number }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/editor/calendar_event/${eventId}`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags editor
     * @name EditorGroupsList
     * @request GET:/editor/groups/
     * @secure
     * @response `200` `(Group)[]`
     */
    editorGroupsList: (params: RequestParams = {}) =>
      this.request<Group[], any>({
        path: `/editor/groups/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags editor
     * @name EditorNewsCreate
     * @request POST:/editor/news/
     * @secure
     * @response `200` `News`
     */
    editorNewsCreate: (data: NewsEdit, params: RequestParams = {}) =>
      this.request<News, any>({
        path: `/editor/news/`,
        method: 'POST',
        body: data,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags editor
     * @name EditorNewsUpdate
     * @request PUT:/editor/news/{news_id}
     * @secure
     * @response `200` `News`
     */
    editorNewsUpdate: (newsId: string, data: NewsEdit, query?: { news_id?: number }, params: RequestParams = {}) =>
      this.request<News, any>({
        path: `/editor/news/${newsId}`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags editor
     * @name EditorNewsDelete
     * @request DELETE:/editor/news/{news_id}
     * @secure
     * @response `204` `void`
     */
    editorNewsDelete: (newsId: string, query?: { news_id?: number }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/editor/news/${newsId}`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags editor
     * @name EditorRespectCreate
     * @request POST:/editor/respect/
     * @secure
     * @response `200` `Respect`
     */
    editorRespectCreate: (data: RespectEdit, params: RequestParams = {}) =>
      this.request<Respect, any>({
        path: `/editor/respect/`,
        method: 'POST',
        body: data,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags editor
     * @name EditorRespectUpdate
     * @request PUT:/editor/respect/{respect_id}
     * @secure
     * @response `200` `Respect`
     */
    editorRespectUpdate: (
      respectId: string,
      data: RespectEdit,
      query?: { respect_id?: number },
      params: RequestParams = {},
    ) =>
      this.request<Respect, any>({
        path: `/editor/respect/${respectId}`,
        method: 'PUT',
        query: query,
        body: data,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags editor
     * @name EditorRespectDelete
     * @request DELETE:/editor/respect/{respect_id}
     * @secure
     * @response `204` `void`
     */
    editorRespectDelete: (respectId: string, query?: { respect_id?: number }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/editor/respect/${respectId}`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),
  };
  event = {
    /**
     * No description
     *
     * @tags event
     * @name EventList
     * @request GET:/event/
     * @secure
     * @response `200` `(EventResponse)[]`
     */
    eventList: (query?: { offset?: number; limit?: number }, params: RequestParams = {}) =>
      this.request<EventResponse[], any>({
        path: `/event/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name EventUpdate
     * @request PUT:/event/{event_id}/
     * @secure
     * @response `200` `CommonEvent`
     */
    eventUpdate: (eventId: string, data: EventPut, params: RequestParams = {}) =>
      this.request<CommonEvent, any>({
        path: `/event/${eventId}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  firstLine = {
    /**
     * No description
     *
     * @tags first_line
     * @name FirstLineRead
     * @request GET:/first_line/
     * @secure
     * @response `200` `(User)[]`
     */
    firstLineRead: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/first_line/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  instruction = {
    /**
     * No description
     *
     * @tags instruction
     * @name InstructionList
     * @request GET:/instruction/
     * @secure
     * @response `200` `(Instruction)[]`
     */
    instructionList: (params: RequestParams = {}) =>
      this.request<Instruction[], any>({
        path: `/instruction/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  media = {
    /**
     * No description
     *
     * @tags media
     * @name MediaCreate
     * @request POST:/media/
     * @secure
     * @response `200` `ImageRetriver`
     */
    mediaCreate: (data: { cover: File }, params: RequestParams = {}) =>
      this.request<ImageRetriver, any>({
        path: `/media/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name MediaRead
     * @request GET:/media/{title}
     * @secure
     * @response `200` `void` file
     */
    mediaRead: (title: string, query?: { title?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/media/${title}`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),
  };
  newFirstLine = {
    /**
     * No description
     *
     * @tags new_first_line
     * @name NewFirstLineRead
     * @request GET:/new_first_line/
     * @secure
     * @response `200` `(User)[]`
     */
    newFirstLineRead: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/new_first_line/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  news = {
    /**
     * No description
     *
     * @tags news
     * @name NewsList
     * @request POST:/news/
     * @secure
     * @response `200` `NewsList`
     */
    newsList: (
      data: { offset?: number; limit?: number; categories?: { include?: string[]; exclude?: string[] } },
      params: RequestParams = {},
    ) =>
      this.request<NewsList, any>({
        path: `/news/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags news
     * @name NewsCategoryList
     * @request GET:/news/category/
     * @secure
     * @response `200` `(NewsCompact)[]`
     */
    newsCategoryList: (query?: { limit?: number }, params: RequestParams = {}) =>
      this.request<NewsCompact[], any>({
        path: `/news/category/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags news
     * @name NewsCategoryCreate
     * @request PUT:/news/category/
     * @secure
     * @response `200` `Category`
     */
    newsCategoryCreate: (data: { name: string }, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/news/category/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags news
     * @name NewsCategoryRead
     * @request GET:/news/category/{category_id}
     * @secure
     * @response `200` `Category`
     */
    newsCategoryRead: (categoryId: string, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/news/category/${categoryId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags news
     * @name NewsPopularNewsList
     * @request POST:/news/popular_news/
     * @secure
     * @response `200` `(NewsCompact)[]`
     */
    newsPopularNewsList: (
      data: { limit?: number; categories?: { include?: string[]; exclude?: string[] } },
      params: RequestParams = {},
    ) =>
      this.request<NewsCompact[], any>({
        path: `/news/popular_news/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags news
     * @name NewsRead
     * @request GET:/news/{news_id}
     * @secure
     * @response `200` `News`
     */
    newsRead: (newsId: string, query?: { news_id?: number }, params: RequestParams = {}) =>
      this.request<News, any>({
        path: `/news/${newsId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  optionalStepConditionInfo = {
    /**
     * No description
     *
     * @tags optional_step_condition_info
     * @name OptionalStepConditionInfoList
     * @request GET:/optional_step_condition_info/
     * @secure
     * @response `200` `(StepConditionInfo)[]`
     */
    optionalStepConditionInfoList: (params: RequestParams = {}) =>
      this.request<StepConditionInfo[], any>({
        path: `/optional_step_condition_info/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  reset = {
    /**
     * No description
     *
     * @tags reset
     * @name ResetUpdate
     * @request PUT:/reset/
     * @secure
     * @response `200` `void`
     */
    resetUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reset/`,
        method: 'PUT',
        secure: true,
        ...params,
      }),
  };
  respect = {
    /**
     * No description
     *
     * @tags respect
     * @name RespectList
     * @request GET:/respect/
     * @secure
     * @response `200` `(Respect)[]`
     */
    respectList: (params: RequestParams = {}) =>
      this.request<Respect[], any>({
        path: `/respect/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  staticInfo = {
    /**
     * No description
     *
     * @tags static_info
     * @name StaticInfoList
     * @request GET:/static_info/
     * @secure
     * @response `200` `StaticInfo`
     */
    staticInfoList: (params: RequestParams = {}) =>
      this.request<StaticInfo, any>({
        path: `/static_info/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  status = {
    /**
     * No description
     *
     * @tags status
     * @name StatusList
     * @request GET:/status/
     * @secure
     * @response `200` `(Status)[]`
     */
    statusList: (params: RequestParams = {}) =>
      this.request<Status[], any>({
        path: `/status/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  statusRating = {
    /**
     * No description
     *
     * @tags status_rating
     * @name StatusRatingRead
     * @request GET:/status_rating/
     * @secure
     * @response `200` `RatingResponse`
     */
    statusRatingRead: (params: RequestParams = {}) =>
      this.request<RatingResponse, any>({
        path: `/status_rating/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  step = {
    /**
     * No description
     *
     * @tags step
     * @name StepList
     * @request GET:/step/
     * @secure
     * @response `200` `(Step)[]`
     */
    stepList: (params: RequestParams = {}) =>
      this.request<Step[], any>({
        path: `/step/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  stepConditionInfo = {
    /**
     * No description
     *
     * @tags step_condition_info
     * @name StepConditionInfoList
     * @request GET:/step_condition_info/
     * @secure
     * @response `200` `(StepConditionInfo)[]`
     */
    stepConditionInfoList: (params: RequestParams = {}) =>
      this.request<StepConditionInfo[], any>({
        path: `/step_condition_info/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags step_condition_info
     * @name StepConditionInfoUpdate
     * @request PUT:/step_condition_info/{step_condition_info_id}/
     * @secure
     * @response `200` `StepConditionInfo`
     */
    stepConditionInfoUpdate: (stepConditionInfoId: string, data: StepConditionInfoPut, params: RequestParams = {}) =>
      this.request<StepConditionInfo, any>({
        path: `/step_condition_info/${stepConditionInfoId}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  stepGroup = {
    /**
     * No description
     *
     * @tags step_group
     * @name StepGroupRead
     * @request GET:/step_group/
     * @secure
     * @response `200` `StepGroup`
     */
    stepGroupRead: (params: RequestParams = {}) =>
      this.request<StepGroup, any>({
        path: `/step_group/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  stepRating = {
    /**
     * No description
     *
     * @tags step_rating
     * @name StepRatingRead
     * @request GET:/step_rating/
     * @secure
     * @response `200` `RatingResponse`
     */
    stepRatingRead: (params: RequestParams = {}) =>
      this.request<RatingResponse, any>({
        path: `/step_rating/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  supportMessage = {
    /**
     * No description
     *
     * @tags support_message
     * @name SupportMessageCreate
     * @request POST:/support_message/
     * @secure
     * @response `200` `Message`
     * @response `400` `Error4XX`
     */
    supportMessageCreate: (data: SupportMessage, params: RequestParams = {}) =>
      this.request<Message, Error4XX>({
        path: `/support_message/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  team = {
    /**
     * No description
     *
     * @tags team
     * @name TeamRead
     * @request GET:/team/
     * @secure
     * @response `200` `(User)[]`
     */
    teamRead: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/team/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  teamRating = {
    /**
     * No description
     *
     * @tags team_rating
     * @name TeamRatingRead
     * @request GET:/team_rating/
     * @secure
     * @response `200` `RatingResponse`
     */
    teamRatingRead: (params: RequestParams = {}) =>
      this.request<RatingResponse, any>({
        path: `/team_rating/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  test = {
    /**
     * No description
     *
     * @tags test
     * @name TestRead
     * @request GET:/test/{test_id}/
     * @secure
     * @response `200` `Test`
     */
    testRead: (testId: string, query?: { test_id?: string }, params: RequestParams = {}) =>
      this.request<Test, any>({
        path: `/test/${testId}/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  testResults = {
    /**
     * No description
     *
     * @tags test_results
     * @name TestResultsUpdate
     * @request PUT:/test_results/
     * @secure
     * @response `200` `LoadTestResultsResponse`
     */
    testResultsUpdate: (data: TestPutRequest, params: RequestParams = {}) =>
      this.request<LoadTestResultsResponse, any>({
        path: `/test_results/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/
     * @secure
     * @response `200` `User`
     */
    userRead: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/
     * @secure
     * @response `200` `User`
     */
    userUpdate: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
