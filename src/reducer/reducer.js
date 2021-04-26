
const defaultState = {
    imgUrl:[],
};

const reducer = (state = defaultState, action) => {
    // banner列表
    if (action.type === 'banner_list') {
        let tempState = state;
        tempState.imgUrl = action.imgUrl;
        return tempState;
    }
    // 热门产品类表
    if (action.type === 'get_hotUrl') {
        let tempState = state;
        tempState.hotList = action.hotList;
        return tempState;
    }
    // 产品分类列表
    if (action.type === 'get_productList') {
        let tempState = state;
        tempState.productList = action.productList;
        return tempState;
    }
    // 产品列表简介
    if (action.type === 'GET_ROTATION') {
        let tempState = state;
        tempState.rotationData = action.rotationData;
        return tempState;
    }
    //  三个热门产品
    if (action.type === 'GET_ThreeHot') {
        let tempState = state;
        tempState.threeHot = action.threeHot;
        return tempState;
    }
    // 合作共赢
    if (action.type === 'GET_COOPERATION') {
        let tempState = state;
        tempState.cooperation = action.cooperation;
        return tempState;
    }
    // 主页新闻列表内容
    if (action.type === 'GET_NEWS') {
        let tempState = state;
        tempState.newsData = action.newsData;
        return tempState;
    }
    // 主页关于我们
    if (action.type === 'GET_ABOUT') {
        let tempState = state;
        tempState.aboutData = action.aboutData;
        return tempState;
    }
    // 主页新闻列表内容
    if (action.type === 'GET_FOOTER') {
        let tempState = state;
        tempState.footerData = action.footerData;
        return tempState;
    }
    // 产品中心的banner
    if (action.type === 'GET_BANNER') {
        let tempState = state;
        tempState.productBannerList = action.productBannerList;
        return tempState;
    }
    // 产品中心的banner
    if (action.type === 'GET_PRODUCT') {
        let tempState = state;
        tempState.productData = action.productData;
        return tempState;
    }
    // 新闻数据
    if (action.type === 'GET_NEWSLIST') {
        let tempState = state;
        tempState.newsListData = action.newsListData;
        return tempState;
    }
    // 关于我们
    if (action.type === 'GET_ABOUTSHOW') {
        let tempState = state;
        tempState.aboutShowData = action.aboutShowData;
        return tempState;
    }

    return state;
};

export default reducer;