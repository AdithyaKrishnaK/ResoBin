import axios from 'axios'

import { toastError } from 'components/toast'
import { camelizeKeys, snakeizeKeys } from 'helpers/transformKeys'

export const APIInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api'
      : 'http://10.105.177.70/api',

  timeout: 30000,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
})

APIInstance.interceptors.request.use(
  (request) => {
    if (request.headers['content-type'] === 'application/json')
      return { ...request, data: snakeizeKeys(request.data) }

    return request
  },
  (error) => {
    return Promise.reject(error.message)
  }
)

APIInstance.interceptors.response.use(
  (response) => {
    if (response.headers['content-type'] === 'application/json')
      return camelizeKeys(response.data)

    return response.data
  },
  (error) => {
    try {
      if (error.response.status === 401) {
        toastError('Please login again')
      }
    } catch (e) {
      toastError('Server is offline')
    }

    return Promise.reject(error.message)
  }
)

// ? API endpoints
export const API = {
  // * Authentication endpoints
  auth: {
    login: async ({ params }) => APIInstance.get('/accounts/login', { params }),
    logout: async () => APIInstance.get('/accounts/logout'),
    authenticate: async () => APIInstance.get('/accounts/authenticate'),
    csrftoken: async () => APIInstance.get('/accounts/csrftoken'),
  },

  // * User profile endpoints
  profile: {
    read: async () => APIInstance.get('/accounts/profile'),
    update: async ({ payload }) =>
      APIInstance.put('/accounts/profile', payload),
    delete: async () => APIInstance.delete('/accounts/profile'),

    favorites: async () => APIInstance.get('/accounts/profile/favorites'),

    resources: {
      list: async () => APIInstance.get('/accounts/profile/resources'),
    },

    reviews: {
      list: async () => APIInstance.get('/accounts/profile/reviews'),
    },

    feed: async () => APIInstance.get('/accounts/profile/feed'),

    timetable: {
      read: async ({ season, year }) =>
        APIInstance.get(
          `/accounts/profile/semester/${season}-${year}/timetable`
        ),
      add: async ({ id }) =>
        APIInstance.put(`/accounts/profile/timetable/${id}`),
      remove: async ({ id }) =>
        APIInstance.delete(`/accounts/profile/timetable/${id}`),
    },
  },

  // * Courses endpoints
  courses: {
    list: async ({ params }) => APIInstance.get('/courses', { params }),
    read: async ({ code }) => APIInstance.get(`/courses/${code}`),
    listResources: async ({ code }) =>
      APIInstance.get(`/courses/${code}/resources`),
    listReviews: async ({ code }) =>
      APIInstance.get(`/courses/${code}/reviews`),

    favorite: {
      add: async ({ code }) =>
        APIInstance.put(`/accounts/profile/courses/${code}/favorite`),
      remove: async ({ code }) =>
        APIInstance.delete(`/accounts/profile/courses/${code}/favorite`),
    },
  },

  // * Resources endpoints
  resources: {
    create: async ({ payload, onUploadProgress }) =>
      APIInstance.post(`/resources`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
      }),
    read: async ({ id }) => APIInstance.get(`/resources/${id}`),
    update: async ({ id, payload }) =>
      APIInstance.patch(`/resources/${id}`, payload),
    delete: async ({ id }) => APIInstance.delete(`/resources/${id}`),

    request: {
      add: async ({ code }) =>
        APIInstance.put(`/accounts/profile/courses/${code}/request/resources`),
      remove: async ({ code }) =>
        APIInstance.delete(
          `/accounts/profile/courses/${code}/request/resources`
        ),
    },
  },

  // * Reviews endpoints
  reviews: {
    create: async ({ payload }) => APIInstance.post(`/reviews`, payload),
    read: async ({ id }) => APIInstance.get(`/reviews/${id}`),
    update: async ({ id, payload }) =>
      APIInstance.put(`/reviews/${id}`, payload),
    delete: async ({ id }) => APIInstance.delete(`/reviews/${id}`),

    request: {
      add: async ({ code }) =>
        APIInstance.put(`/accounts/profile/courses/${code}/request/reviews`),
      remove: async ({ code }) =>
        APIInstance.delete(`/accounts/profile/courses/${code}/request/reviews`),
    },

    vote: {
      add: async ({ id }) =>
        APIInstance.put(`/accounts/profile/reviews/${id}/vote`),
      remove: async ({ id }) =>
        APIInstance.delete(`/accounts/profile/reviews/${id}/vote`),
    },
  },

  // * Departments endpoints
  departments: {
    list: async () => APIInstance.get('/departments'),
    detail: async ({ slug }) => APIInstance.get(`/departments/${slug}`),
  },

  semesters: {
    list: async () => APIInstance.get('/semesters'),
  },

  // * Stats endpoint
  stats: {
    list: async () => APIInstance.get('/stats'),
  },

  // * Developer stats endpoints
  GitHub: {
    getContributors: async () => {
      const ignoredContributors = ['ImgBotApp']
      return axios
        .get('https://api.github.com/repos/arya2331/ResoBin/contributors')
        .then((response) =>
          response.data.filter(
            (contributor) =>
              contributor.type === 'User' &&
              !ignoredContributors.includes(contributor.login)
          )
        )
    },
  },
}

export default APIInstance
