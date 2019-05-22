import React from 'react';
import { LifeCycleContext } from '@ionic/react';

interface IonLifeCycleState {
  loaded: boolean;
}

export const withLifeCycle = (WrappedComponent: React.ComponentType<any>) => {
  class IonLifeCycle extends React.Component<any, IonLifeCycleState> {
    context!: React.ContextType<typeof LifeCycleContext>;

    elementRef = React.createRef<any>();
    componentRef = React.createRef<any>();

    constructor(props: any) {
      super(props);

      this.state = {
        loaded: false
      };
    }

    componentWillMount() {}

    componentDidMount() {
      const parent = (this.context as any).parent.current;
      parent.addEventListener('ionViewWillEnter', () => {
        if (this.componentRef.current.ionViewWillEnter) {
          this.componentRef.current.ionViewWillEnter();
        }
      });
      parent.addEventListener('ionViewDidEnter', () => {
        if (this.componentRef.current.ionViewDidEnter) {
          this.componentRef.current.ionViewDidEnter();
        }
      });
      parent.addEventListener('ionViewWillLeave', () => {
        if (this.componentRef.current.ionViewWillLeave) {
          this.componentRef.current.ionViewWillLeave();
        }
      });

      parent.addEventListener('ionViewDidLeave', () => {
        if (this.componentRef.current.ionViewDidLeave) {
          this.componentRef.current.ionViewDidLeave();
        }
      });
      this.setState({ loaded: true });
    }

    render() {
      const { loaded } = this.state;
      return loaded && <WrappedComponent ref={this.componentRef} {...this.props} />;
    }
  }
  IonLifeCycle.contextType = LifeCycleContext;
  return IonLifeCycle;
};
