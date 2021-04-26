import React,{ Component } from 'react';
import styles from './productList.module.css';
import store from '../../Store/Store';
import axios from 'axios';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState());
        });
        axios.get('http://localhost:3000/data/productList.json').then((response) => {
            let productListAction = {
                type:"get_productList",
                productList:response.data.list
            };
            store.dispatch(productListAction);
            console.log("是否执行此处？");
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        // 阻止轻轻
        this.source.cancel("组件卸载，取消请求")
    }

    render() {
        const { productList } = this.state;

        return (
            <div className={styles.container}>
                <h1>产品列表</h1>
                <ul>
                    {productList && productList.map((item, index) => {
                        // 展示列表的前四项
                        if (index < 4) {
                            return (
                                <li key={index}>{item}</li>
                            )
                        } else {
                            return false;
                        }

                    })}
                </ul>
                <button>查看所有 &gt;&gt;</button>
                {/* 热线电话 */}
                <div className={styles.telCon}>
                    <div className={styles.telImg}>
                        <img alt="telImg" src="http://localhost:3000/data/img/tel.png" />
                    </div>
                    <div>
                        <p>咨询热线：</p>
                        <p>888-8888888</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductList;