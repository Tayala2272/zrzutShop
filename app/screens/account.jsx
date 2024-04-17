
import { useTranslation } from 'react-i18next';
import { AppContext } from '../hooks/firebaseContext';

import { Link } from 'react-router-dom';

// svg
    import orders from '../assets/svg/online-delivery.svg'
    import account_settings from '../assets/svg/account-settings.svg'


export default function Account() {
    const { t } = useTranslation();
    const { changeLanguage } = AppContext()

    return (
        <div className='container'>
            <div  style={styles.grid}>
                <Card icon={<img style={styles.icon} src={orders}/>} text="Twoje zamówienia" link="/account/orders" />
                <Card icon={<img style={styles.icon} src={account_settings}/>} text="Twoje dane" link="/account/info" />
                <Card icon={<svg></svg>} text="Trzy" link="/" />
                <Card icon={<svg></svg>} text="Cztery" link="/" />
            </div>
        </div>
    )
}


const Card = ({ icon, text, link }) => (
    <Link to={link}>
        <div
        className="card"
        style={styles.card}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(0.93)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
        >
        <>{icon}</>
        <p>{text}</p>
        </div>
    </Link>
  );

const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      padding: '1rem',
    },
    card: {
      display: 'flex',
      color:'black',
      fontWeight:'bold',
      letterSpacing:'1px',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      border: '1px solid #ccc',
      transition: 'transform 0.2s ease-in-out',
    },
    cardHover: {
      transform: 'scale(0.93)',
    },
    icon: {
      margin: '0 auto 1rem auto',
      width:'100px',
      // Tutaj dodaj swoje style dla ikony
    },
  };