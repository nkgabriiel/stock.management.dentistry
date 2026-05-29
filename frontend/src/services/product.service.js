import api from './api';
import {data} from "autoprefixer";

export const productService = {
    getAll: () => api.get('/products'),
    create: (data) => api.post('/products', data),
    addLot: (id, data) => api.post(`/products/${id}/lots`, data),
    subtractLot: (id, lotId, data) => api.post(`/products/${id}/lots/${lotId}/exit`, data),
    incrementLot: (id, lotId, data) => api.post(`/products/${id}/lots/${lotId}/entry`, data),
    getExpiring: () => api.get('/products/expiring'),
    remove: (id) => api.delete(`/products/${id}`),
}
