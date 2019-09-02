import * as React from 'react';
import './stylesPageContent.css';
import ContentProps from './contentProps';
import ContentState from './contentState';
import Header from '../header/header';

class Content extends React.Component<ContentProps, ContentState> {
    constructor(props: ContentProps) {
        super(props);
    }

    public render() {
        return (
            <div className="cards first">
                <Header {...this.props} />
                <h3 className="pcTittle">{this.props.title}</h3>
                {this.props.children}
            </div>
        );
    }
}

export default Content;
