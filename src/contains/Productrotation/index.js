import React,{ Component } from 'react';
import store from '../../Store/Store';
import axios from 'axios';

import styles from './productrotation.module.css';


class ProductRotation extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.state.rotationId = 1;
        this.RotationRef = React.createRef();
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }

    componentDidMount() {
        store.subscribe(() => {
          this.setState(store.getState());
        });

        axios.get('http://localhost:3000/data/productrotation.json').then((response) => {
            store.dispatch({
                type: 'GET_ROTATION',
                rotationData:response.data
            })
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        // 阻止轻轻
        this.source.cancel("组件卸载，取消请求")
    }

    toLeft() {  /* 点击左侧按钮事件 */
        // const node = this.RotationRef.current.children;

        let tempId = this.state.rotationId;
        if (tempId > 1) {
            tempId = tempId - 1;
            this.setState({
                rotationId:tempId
            })
        } else {
            return false;
        }
    }

    toRight() {     /* 点击右侧按钮事件 */
        let tempId = this.state.rotationId;
        if (tempId < 4) {
            this.setState({
                rotationId:tempId+1
            })
        } else {
            return false;
        }
    }

    render() {
        const { rotationData,rotationId } = this.state;

        return (
            <div className={styles.typePage}>
                <span className={styles.toLeft} onClick={() => this.toLeft()}>&lt;</span>
                <div className={styles.toCenter}>
                    <ul ref={this.RotationRef}>
                        {rotationData && rotationData.map((item, index) => {
                            if (index < 4) {
                                return (
                                    <li key={index} className = {item.id === rotationId ? (styles.showRotation) : ''}>
                                        <div className={styles.rotationImg}>
                                            <img alt={index} src={item.img} />
                                        </div>
                                        <div className={styles.rotationRight}>
                                            <h2>{item.title}</h2>
                                            <p>&nbsp;</p>
                                            <article>
                                                {item.description}
                                            </article>
                                            <button>
                                                了解详情
                                            </button>
                                        </div>
                                    </li>
                                )
                            } else {
                                return false;
                            }

                        })}
                    </ul>
                </div>
                <span className={styles.toRight} onClick = {() => this.toRight()}>&gt;</span>
            </div>
        )
    }
}

export default ProductRotation;