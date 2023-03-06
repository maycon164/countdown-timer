import nintendoLogo from '../../imgs/nintendo.png';
import mplLogo from '../../imgs/mpl.png';
import championsLogo from '../../imgs/champions.png';
import './style.css'
import { TypeEvents } from './types';

export const InputTypeEvent = ({ type }: { type: TypeEvents }) => {

    const inputItems = {
        'nintendo': {
            logo: nintendoLogo,
            title: 'Nintendo Event'
        },
        'mpl': {
            logo: mplLogo,
            title: 'MPL Match'
        },
        'champions': {
            logo: championsLogo,
            title: 'Champions League Match'
        },
        'birthday': {
            logo: nintendoLogo,
            title: 'Birthday Event'
        }
    }

    return (

        < div className='select-event'>
            <img src={inputItems[type].logo} alt={inputItems[type].title} />
            <label htmlFor="">{inputItems[type].title}</label>
        </div >
    )

}