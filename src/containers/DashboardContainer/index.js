
import React from 'react';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';

class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { token } = this.props;
        return (
            <div className="login-container">
                <div className="home-info">
                    <div className="col-sm-12">
                        You are successfully Logged in to Stigasoft system. Here is your details-- 
                        <span>{token}</span>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    let token = _get(state, 'loginReducer.lookUpData.token');
    return { token };
}

export default connect(mapStateToProps)(DashboardContainer)
