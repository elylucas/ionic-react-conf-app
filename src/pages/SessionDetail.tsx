import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, withIonLifeCycle } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../store';
import formatTime from '../utils/formatTime';
import './SessionDetail.css';

type Props = RouteComponentProps<{ id: string; tab: string }> &
  ReturnType<typeof mapStateToProps> & {
    goBack: () => void;
  };

export class SessionDetail extends React.Component<Props> {
  ionViewWillEnter() {
    console.log('ionViewWillEnter from Detail Page!');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter from Detail Page!');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave from Detail Page!');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave from Detail Page!');
  }
  render() {
    const { sessions, speakers, match, goBack } = this.props;
    const session = sessions.find(s => s.id === parseInt(match.params.id, 10));
    if (session == null) {
      return null;
    }
    const sessionSpeakers = speakers.filter(s => session.speakerIds.indexOf(s.id) !== -1);

    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton goBack={goBack} defaultHref={`/${match.params.tab}`} />
            </IonButtons>
            <IonTitle>{session.name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <div>
            <h1>{session.name}</h1>
            {sessionSpeakers.map(speaker => (
              <h4 key={speaker.name}>{speaker.name}</h4>
            ))}
            <p>
              {formatTime(session.dateTimeStart, 'h:MM a')} &mdash;&nbsp;
              {formatTime(session.dateTimeEnd, 'h:MM a')}
            </p>
            <p>{session.location}</p>
            <p>{session.description}</p>
          </div>
        </IonContent>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  sessions: state.sessions.sessions,
  speakers: state.speakers.speakers
});

export default connect(mapStateToProps)(withIonLifeCycle(SessionDetail));
