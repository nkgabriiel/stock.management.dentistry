import api from './api';
import {data} from "autoprefixer";

export const productService = {
    getAll: () => api.get('/product'),
    create: (data) => api.post('/product', data),
    addLot: (id, data) => api.post(`/product/${id}/lots`, data),
    subtractLot: (id, lotId, data) => api.patch(`/product/${id}/lots/${lotId}/exit`, data),
    getExpiring: () => api.get('/product/expiring'),
    remove: (id) => api.delete(`/product/${id}`),
}
