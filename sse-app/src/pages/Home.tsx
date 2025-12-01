import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { useSSE } from '../hooks/useSSE';

const Home: React.FC = () => {
  const data = useSSE("http://localhost:3000/events");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SSE Demo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <h2>Eventos en tiempo real:</h2>
          {data ? (
            <>
              <p><strong>Hora:</strong> {data.time}</p>
              <p><strong>Valor:</strong> {data.value}</p>
            </>
          ) : (
            <p>Esperando eventos...</p>
          )}
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;