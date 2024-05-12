import classNames from 'classnames'
import './Dashboard.style.scss'

type Props = {}

export const Dashboard = ({}: Props) => {

    return (
        <div className={classNames('dashboard__container')}>
            <h3>Seja bem-vindo(a)!</h3>
            <span>Ainda não temos nada nessa tela, mas em seguida será implementado</span>
        </div>
    )
}
