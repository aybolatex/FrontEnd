import React, { ComponentType } from 'react';

interface Props {
    backgroundColor: string;
    [key: string]: any;
}

const withBackgroundColor = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return class extends React.Component<Props & P> {
        render() {
            const { backgroundColor, ...rest } = this.props;
            return (
                <div style={{ backgroundColor }}>
                    <WrappedComponent {...rest as P} />
                </div>
            );
        }
    };
};

export default withBackgroundColor;
