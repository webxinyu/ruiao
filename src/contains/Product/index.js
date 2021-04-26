import React,{ Component } from 'react';
import Banner from "../Banner";
import store from "../../Store/Store";
import axios from 'axios';
import ProductShow from "../ProductShow";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }


    componentDidMount() {
        axios.get('http://localhost:3000/data/banner.json').then((response) => {

            const bannerObj = {
                type: 'GET_BANNER',
                productBannerList:response.data.productBanners
            };
            store.dispatch(bannerObj);
        })
    }

    render() {
        return (
            <div>
                <Banner />
                <ProductShow />
            </div>
        )
    }
}


export default Product;