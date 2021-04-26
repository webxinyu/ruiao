import React,{ Component } from 'react';
import axios from 'axios';
import styles from './productShow.module.css';

import store from '../../Store/Store';
import Footer from "../Footer";
import Copyright from "../Copyright";

class ProductShow extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.state.classifyId = 0;
        this.source = axios.CancelToken.source(); //生成取消令牌用于组件卸载阻止axios请求
    }


    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState());
        });
        axios.get('http://localhost:3000/data/productShow.json').then((response) => {
            const productObj = {
                type: 'GET_PRODUCT',
                productData:response.data
            };
            store.dispatch(productObj);
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        this.source.cancel("组件销毁，终止请求");
    }

    classifyClick(classifyPara) {
        this.setState({
            classifyId:classifyPara
        })
    }

    render() {
        const { productData,classifyId } = this.state;
        return (
            <div>
                <div className={styles.nav}>
                    <ul>
                        {productData && productData.map((item,index) => {
                            return (
                                <li key={"classify"+index} onClick={() => this.classifyClick(item.id)}>
                                    <div className={styles.imgCon}>
                                        <img alt="classify" src={item.img} />
                                    </div>
                                    <h5>{item.name}</h5>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <h2 className={styles.title}>产品展示</h2>
                <p className={styles.line}>&nbsp;</p>
                <ul className={styles.productList}>
                    {productData && productData[classifyId].list.map((item,index) => {
                        return(
                            <li key={"product"+index}>
                                <img alt="productImg" src={item.img} />
                                <h5>{item.name}</h5>
                            </li>
                            )
                    })}
                </ul>
                {/* 底部导航 */}
                <div style={{width:"100%",backgroundColor:"#404040"}}>
                    <Footer />
                </div>
                {/* 版权栏 */}
                <div style={{width:"100%",backgroundColor:"#0c4da2"}}>
                    <Copyright />
                </div>
            </div>
        )
    }
}

export default ProductShow;