import express from 'express'

import {
    login2F, getBannerF, getCategoryF, getSubCatF,
    prodDetailsF, featuredPF
} from '../controllers/user.js';

const app = express.Router();


app.post('/login2', login2F)

app.get('/getBanner', getBannerF)

app.get('/getCategory', getCategoryF)

app.get('/getSubCat', getSubCatF)

app.get('/prodDetails/:id', prodDetailsF)

app.get("/featuredP", featuredPF)



export default app;