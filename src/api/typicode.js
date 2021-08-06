import http from '../http/index.js'
const baseUrlOne = 'https://jsonplaceholder.typicode.com'
const baseUrlTwo = 'https://acnhapi.com/v1'
const PublicApi = {
    postsPage: (pageNum, pageSize = 10) => {
        return http.get(`${baseUrlOne}/posts?_page=${pageNum}&_limit=${pageSize}`)
    },
    querySongs: () => http.get(`${baseUrlTwo}/songs`),
    queryMusicById: (songId) => http.get(`${baseUrlTwo}/music/${songId}`)
}

export default PublicApi