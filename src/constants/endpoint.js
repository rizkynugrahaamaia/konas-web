const endpoint = {
    signin: '/api/auth/v1/signin',
    signout: '/api/auth/v1/signout',
    getListPeserta: '/api/users/v1/list',
    getRegion: '/api/auth/v1/region',
    getStatusPeserta: '/api/auth/v1/role',
    createUser: '/api/users/v1/create',
    getDetailUser: (id) => `/api/users/v1/user/${id}`,
    getByuserLogin: '/api/users/v1/user',
    updateUser: '/api/users/v1/edit',
    deleteUser: (id) => `/api/users/v1/delete/${id}`,
    updateKehadiran: (id) => `/api/users/v1/presence/${id}`,
}

export default endpoint;