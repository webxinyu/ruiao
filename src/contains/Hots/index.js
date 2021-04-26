import React,{ Component } from 'react';
import styles from './hots.module.css'
import HotList from "../HotList";

class Hots extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={styles.hotsCon}>
                {/* 标题 */}
                <div className={styles.hots}>
                    <h1>
                        <span></span>
                        热门产品
                        <span></span>
                    </h1>
                    {/* 副标题 */}
                    <h6>提供全套产品解决方案</h6>
                </div>
                <HotList />
            </div>
        )
    }
}

export default Hots;