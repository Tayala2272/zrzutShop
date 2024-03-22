
import { useTranslation } from 'react-i18next';
import { AppContext } from '../hooks/firebaseContext';

export default function Account() {
    const { t } = useTranslation();
    const { changeLanguage } = AppContext()

    return (
        <>
            <h1 className="text-center" style={{margin:"200px 0 200px 0"}}>{t('Ustawienia konta wkrótce!')}</h1>
            <button onClick={()=>{changeLanguage("ua")}}>Ukrainski</button>
        </>
    )
}