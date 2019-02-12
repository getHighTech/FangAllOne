import React from 'react';
import RegisterFormWithMobx from '../withMobx/RegisterFormWithMobx';
import registerFormStore from '../../mobx/components/RegisterFormStore';
import { withRouter } from 'react-router';
import { IPageProps } from '../../interfaces/components';
import { observer, inject } from 'mobx-react';
import Layout from '../stateless/Layout';
import { Typography } from '@material-ui/core';
import LayoutWithMobx from '../withMobx/LayoutWithMobx';

@inject('currentUser')
@inject('msg')
@inject('app')
@observer
class Register extends React.Component<IPageProps> {
    redirectSuccess = (isSuccess:any) => {
        const { history } = this.props;
        if(isSuccess){
            history.push('/dashboard');
            this.props.msg.show('注册成功');
            this.props.currentUser.checkLogined();
        }
        
    }
    
    render(){
        const { app } = this.props;
        return (
            <LayoutWithMobx>
                 <Typography variant="h4" gutterBottom>
                    注册{app.name}账号
                </Typography>
                <RegisterFormWithMobx store={registerFormStore} redirectSuccess={this.redirectSuccess} />
            </LayoutWithMobx>
        )
    }
    
}

export default withRouter(Register as any);