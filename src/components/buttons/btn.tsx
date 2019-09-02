import * as React from 'react';
import { Button, Image } from 'semantic-ui-react';
import './stylesButtons.css';
import BtnProps from './BtnProps';
import BtnState from './BtnState';

export default class Btn extends React.Component<BtnProps, BtnState> {

    constructor(props: BtnProps) {
        super(props);
        this.state = {
            stateDisabled: this.props.btnState,
        };
    }

    public componentWillReceiveProps(nextProps: BtnProps) {
        if (nextProps.btnState !== this.state.stateDisabled) {
            this.setState({ stateDisabled: nextProps.btnState });
        }

    }

    public render() {
        return (
            // disabled={this.state.newState}
            <Button
                id={this.props.id}
                disabled={this.state.stateDisabled}
                animated="vertical"
                onClick={this.props.onClick}
                className={this.props.className !== undefined
                ? this.props.className
                : 'btnButton'}>
                <Button.Content hidden id={this.props.id}> {this.props.label} </Button.Content>
                <Button.Content visible>
                    <Image src={this.props.img} size="mini" className="btnImg" />
                </Button.Content>
            </Button>
        );
    }
}
